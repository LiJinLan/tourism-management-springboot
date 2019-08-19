package com.tourism.management.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class FileUtil {
	
	/**
	 * 复制文件
	 * 
	 * @param oldfile
	 * @param newPath
	 * @return
	 */
	public static boolean copy(File oldfile, String newPath) {
		try {

			int byteread = 0;

			if (oldfile.exists()) {
				File file = new File(newPath);
				if (newPath.endsWith("/"))
					file = new File(newPath, oldfile.getName());
				if (!file.exists()) {
					file.getParentFile().mkdirs();
					file.createNewFile();
				}

				InputStream inStream = new FileInputStream(oldfile);
				FileOutputStream fs = new FileOutputStream(file);
				byte[] buffer = new byte[8196];
				while ((byteread = inStream.read(buffer)) != -1) {
					fs.write(buffer, 0, byteread);
				}
				inStream.close();
				fs.flush();
				fs.close();
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	
	public static String filePath(String Path) {
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		return Path+File.separatorChar+df.format(date)+File.separatorChar;
		
	}
	
	/**
	 * 获得如"20181030"字符串
	 * @return
	 */
	public static String dateFolderString() {
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		return df.format(date);
		
	}
	
	public static String getUUIDFileName(String fileName) {
		String uuid = UUID.randomUUID().toString().replace("-", "");
		String fileNameEnd = "";
		String[] fileNameList = fileName.split("\\.");
		if(fileNameList.length>=2) {
			fileNameEnd ="."+ fileNameList[fileNameList.length-1];
		}
		return uuid+fileNameEnd;
		
	}
	
	/**
	 * 十三位的时间戳
	 * @return
	 */
	public static String getTimestamp() {
		long timeStampSec = System.currentTimeMillis();
        String timestamp = String.format("%013d", timeStampSec);
        return timestamp;
	}
	

}
