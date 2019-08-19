package com.tourism.management.controller;


import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.fastjson.JSONObject;
import com.tourism.management.constant.Constant;
import com.tourism.management.exception.UnlogonException;
import com.tourism.management.pojo.User;
import com.tourism.management.service.FileService;
import com.tourism.management.util.FileUtil;
import com.tourism.management.util.RedisUtil;


@RequestMapping("file")
@Controller
public class FileController {
	private static Logger logger = Logger.getLogger(FileController.class); 
	
	@Value("${file.upload.path}")
	private String path;
	
	@Autowired
	private FileService fileService;
  
	    

    /**
     * 文件上传
     * @param request
     * @return 返回路径
     */
    @RequestMapping(value = "upload", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object>  uploadFile(HttpServletRequest request) {
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        List<Map<String,Object>> fileList = new ArrayList<>();
        
        String filePath = FileUtil.filePath(path);
        File temp = new File(filePath);
        if(!temp.exists()) temp.mkdirs();
        MultipartFile file = null;    
        BufferedOutputStream stream = null;   
        for (int i = 0; i < files.size(); i++) {
        	Map<String,Object> fileMap = new HashMap<>();
            file = files.get(i);
            String id = FileUtil.getTimestamp();
            if (file.isEmpty()) {
            	logger.info("第" + (i+1) + "个文件为空");
            	fileMap.put("id", id);
            	fileMap.put("name", "");
            	fileMap.put("filePath","");
            	fileMap.put("fileDesc", "");
            	continue;
            }
            String fileName = file.getOriginalFilename();
            fileMap.put("id", id);
            fileMap.put("name", fileName);
            String fileRealName = FileUtil.getUUIDFileName(fileName);
            
            //用%2F替换/，为了防止请求参数的校验（不安全字符 RFC 3986）
            String tempFilePath = (filePath.replace(path, "")+fileRealName).replace("\\", "%2F").replace("//", "%2F");
            fileMap.put("filePath", tempFilePath);
            
            String desc = request.getParameter("fileDesc"+i);
            fileMap.put("fileDesc", desc);
            
            fileList.add(fileMap);
            
            try {
            	byte[] bytes = file.getBytes();
            	stream = new BufferedOutputStream(new FileOutputStream(    
                        new File(filePath+fileRealName)));    
                stream.write(bytes);   
                //file.transferTo(dest);
                logger.info("第" + (i + 1) + "个文件上传成功");
            } catch (IOException e) {
            	logger.error(e.toString(), e);
                return fileMap;
            }finally {
				try {
					if(stream!=null) {
						stream.close();
					}
				} catch (IOException e) {
					
				}
			}
        }
        fileService.addFileRecord(fileList);
		
        Map<String,Object> returnMap = new HashMap<>();
        returnMap.put("success", true);
        returnMap.put("message", "上传文件成功");
        returnMap.put("data", fileList);
        return returnMap ;
    }

    /**
     * 文件下载
     * @param filePath
     * @param request
     * @param response
     */
    @RequestMapping(value = "downloadFile", method = RequestMethod.GET)
    public void  downloadFile(@RequestParam("filePath") String filePath, HttpServletRequest request,HttpServletResponse response) {
    	
    	String fileName = path+filePath;
    	File file = new File(fileName);
    	String ContentType = "application/octet-stream";
    	if(file.exists()) {
    	try {
			BufferedImage image = ImageIO.read(file);
			if(image !=null) {
				String[] filePathList = filePath.split("\\.");
				if(filePathList.length>=2) {
					ContentType ="image/"+ filePathList[filePathList.length-1];
				}
			}
		} catch (IOException e1) {
			
		}
    	response.setHeader("content-type", ContentType);
    	response.setContentType(ContentType);
    	response.setHeader("Content-Disposition", "attachment;filename=" + filePath);
          byte[] buff = new byte[1024];
          BufferedInputStream bis = null;
          OutputStream os = null;
          try {
            os = response.getOutputStream();
            bis = new BufferedInputStream(new FileInputStream(file));
            int i = bis.read(buff);
            while (i != -1) {
              os.write(buff, 0, buff.length);
              os.flush();
              i = bis.read(buff);
            }
          } catch (IOException e) {
            e.printStackTrace();
          } finally {
            if (bis != null) {
              try {
                bis.close();
              } catch (IOException e) {
                e.printStackTrace();
              }
            }
          }
    	}

    }

}
