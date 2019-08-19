var roleId = "";
var firstMenuImage = "";
var firstMenuId = "";
var firstMenuName = "";
var firstMenuImgPath = "";
var secondMenuId = "";
var secondMenuName = "";
var secondMenuUrl = "";
var selectedMenuNode = undefined;
var setting = {
	callback: {
		onClick: function onClick(event, treeId, treeNode) {
			console.log(treeNode);
			var treeData = treeNode;
			firstMenuId = treeNode.firstMenuId;
			firstMenuName = treeNode.name;
			firstMenuImgPath = treeNode.icon;
			secondMenuId = treeNode.secondMenuId;
			secondMenuName = treeNode.name;
			secondMenuUrl = treeNode.pageUrl;
			selectedMenuNode = treeNode;
			ctrolBtn(treeNode);
			return false;
		}
	}
};

//如可以把返回的数据里的child对象数组改为children, text=Name的值等
function transformJsonkey(returnData) { // 
	$.each(returnData, function(index, item) {
		if (item.children != null) { // 如果对象包含有子分类文件夹，那么再递归
			item.open = true; 
			item.isParent = true;
			item.type = "branch";
			transformJsonkey(item.children);
			if(item.hasOwnProperty("firstMenuImg")) {
				item["icon"] = "http://127.0.0.1:8086/file/downloadFile?filePath=" + item["firstMenuImg"];
				delete item["firstMenuImg"];
			}
		}else {
			item.isParent = false;
			item.type = "leaf";
			item.pageUrl = item.url;   //禁止跳转
			delete item["url"];
		}
	});
}

function openFirstMenuModal() {
	var modal = $(this);
	$('#firstMenuAddModal').modal("show");
	$('#firstMenuAddModal').find('input[name="firstMenuName"]').val("");
	fileInput();
}


function addFirstMenuBtn() {
	var name = $('#firstMenuAddModal').find('input[name="firstMenuName"]').val();
}

/**
* 根据角色id获取菜单
*/
function queryMenusByRole(roleId) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://127.0.0.1:8086/menu/queryMenusByRole/" +  roleId,
            type: "GET",
            contentType: "applicatin/json",
            success: function successCallBack(data) {
                resolve(data);
            },
            error: function errorCallBack(xhr) {
                console.log('error');
                reject(xhr);
            }
        });
    });
}

function checkRoleId() {
	var userInfoStr = getCookie("user");
	if(userInfoStr.length == 0) {   //表示没有登录成功
        window.location.href = "../../../login/page/login.html";
    }else {
        var userInfo = JSON.parse(userInfoStr);   //转换成对象 
    	var roleId = userInfo.roleId;
    	return roleId;
    }
}


$(function() {
	var menu = [];
	var roleId = checkRoleId();
	if(roleId != null) {
    	queryAllMenus().then(function (resData) {
    		$(".addSecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
    		$(".modifyFirstMenuBtn").attr("disabled","disabled").css("background-color","grey");
    		$(".modifySecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
    		$(".deleteFirstMenuBtn").attr("disabled","disabled").css("background-color","grey");
    		$(".deleteSecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
			var menus = combineMenus(resData.data);
        	//初始化菜单 
            transformJsonkey(menus);
            $.fn.zTree.init($("#hint-msg-box"), setting, menus);

            $('#firstMenuAddModal').modal({backdrop: 'static',show: false});   //禁止点非模态框地方也关闭
/*            $('#firstMenuAddModal').on('show.bs.modal',function(event) {
		    });*/
		}).catch(function (error) {
			console.log(error);
		});
    }
});

function ctrolBtn(treeNode) {
	if(treeNode.type == "branch") {
		$(".addFirstMenuBtn").removeAttr("disabled").css("background-color","#33d41d");
		$(".addSecondMenuBtn").removeAttr("disabled").css("background-color","#33d41d");
		$(".modifyFirstMenuBtn").removeAttr("disabled").css("background-color","#33d41d");
		$(".modifySecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
		$(".deleteFirstMenuBtn").removeAttr("disabled").css("background-color","#33d41d");
		$(".deleteSecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
	}else {
		$(".addFirstMenuBtn").attr("disabled","disabled").css("background-color","grey");
		$(".addSecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
		$(".modifyFirstMenuBtn").attr("disabled","disabled").css("background-color","grey");
		$(".modifySecondMenuBtn").removeAttr("disabled").css("background-color","#33d41d");
		$(".deleteFirstMenuBtn").attr("disabled","disabled").css("background-color","grey");
		$(".deleteSecondMenuBtn").removeAttr("disabled").css("background-color","#33d41d");
	}
}

function showFirstMenuImg() {
	var fd = new FormData();
	$("#firstMenuAddModal .col-menu-1 input").each(function(index,item){
		fd.append("file",item.files[0]);
	});
    $.ajax({
    	type: "POST",
        url: "http://127.0.0.1:8086/file/upload",
        data: fd,
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
        	for(var i= 0; i< data.data.length; i++){
        		firstMenuImage = ""+data["data"][i]["filePath"];
        	}
        	$("#firstMenuAddModal .col-menu-1").each(function(index,item){
        		$(item).find("input").hide();
        		$(item).find("button").hide();
        		$(item).find("img").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath="+data["data"][index]["filePath"]).show();
        	});
        	$(".modal-footer .btn-primary").removeAttr("disabled","none");
        },error:function(error){
        	alert("上传失败");
        }
    });
}

function fileInput() {
	$(".col-menu-1 input").on("click",function() {
		$(".modal-footer .btn-primary").attr("disabled","disabled");
	})
}

function addFirstMenuBtn() {
	var firstMenuName = $(".col-md-3 input[name='firstMenuName']").val();
	var repData = {
		name: firstMenuName,
		imagePath: firstMenuImage
	}
	$(".col-md-3 input[name='firstMenuName']").on("keyup",function() {
		$("#firstMenuAddModal .modal-body .col-md-3 span").text("*");
	})
	if(firstMenuName.length == 0) {
		$("#firstMenuAddModal .modal-body .col-md-3 span").text("一级菜单名称不能为空！");
		return false;
	}

	$.ajax({
	    url: "http://127.0.0.1:8086/menu/addFirstMenu",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(repData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true){
	    		alert("添加一级菜单成功");
	    		$("#firstMenuAddModal").modal("hide");  //模态框自动关闭
	    		roleId = checkRoleId();
				if(roleId != null) {
			    	queryAllMenus().then(function (resData) {
			    		var menus = combineMenus(resData.data);
			    		$("#hint-msg-box").html("");
			        	//初始化菜单 
			        	transformJsonkey(menus);
			    		$.fn.zTree.init($("#hint-msg-box"), setting, menus);
			    		$(".add-menu-btn .addSecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
				    }).catch(function (error) {
						console.log(error);
					}); 
				}
			}
	    },
	    error: function errorCallBack(xhr) {
	    	alert("添加菜单失败");
	    }
	});
}

function combineMenus(data) {
	var firstMenus = data.firstMenus;
	var secondMenus = data.secondMenus;
	var newMenu = [];
	var firstMenuArrIndex = {};
	firstMenus.map(function(item,index) {
		var tempObj = $.extend(true,{},item);
		tempObj.firstMenuId = item.id;
		delete tempObj.id;
		tempObj.firstMenuImg = item.imagePath;
		delete tempObj.imagePath;
		tempObj.children = [];
		newMenu.push(tempObj); 
		firstMenuArrIndex[item.id] = newMenu.length - 1;
	});

	secondMenus.map(function(item,index) {
		var tempFirstMenuIndex = firstMenuArrIndex[item.fmid];
		var tempFirstMenuObj = newMenu[tempFirstMenuIndex];

		var tempSecondMenuObj = $.extend(true,{},item);
		tempSecondMenuObj.secondMenuId = item.id;
		delete tempSecondMenuObj.id;

		tempFirstMenuObj.children.push(tempSecondMenuObj);
	});
	return newMenu;
}

function queryAllMenus() {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: "http://127.0.0.1:8086/menu/queryMenusAll",
		    type: "GET",
		    contentType: "application/json;charset=utf-8",
		    dataType: "json",
			success: function successCallBack(data) {
	            resolve(data);
	        },
	        error: function errorCallBack(xhr) {
	            console.log('error');
	            reject(xhr);
	        }
		});
	});
}

function queryFirstMenuAll() {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: "http://127.0.0.1:8086/menu/queryFirstMenuAll",
		    type: "GET",
		    contentType: "application/json;charset=utf-8",
		    dataType: "json",
			success: function successCallBack(data) {
	            resolve(data);
	        },
	        error: function errorCallBack(xhr) {
	            console.log('error');
	            reject(xhr);
	        }
		});
	})
}


//添加二级菜单
function openSecondMenuModal() {
	$('#secondMenuAddModal').modal("show");
	$('#secondMenuAddModal').find('input[name="secondMenuName"]').val("");
	$('#secondMenuAddModal').find('input[name="secondMenuUrl"]').val("");
}

function addSecondMenuBtn() {
	var secondMenuName = $(".col-md-3 input[name='secondMenuName']").val();
	var secondMenuUrl = $(".col-md-3 input[name='secondMenuUrl']").val();
	var repData = {
		fmid: firstMenuId,
		name: secondMenuName,
		url: secondMenuUrl
	}
	$(".col-md-3 input[name='secondMenuName']").on("keyup",function() {
		$("#secondMenuAddModal #secondMenuName span").text("*");
	})
	$(".col-md-3 input[name='secondMenuUrl']").on("keyup",function() {
		$("#secondMenuAddModal #secondMenuUrl span").text("*");
	})
	if(secondMenuName.length == 0) {
		$("#secondMenuAddModal #secondMenuName span").text("二级菜单名称不能为空！");
		return false;
	}
	if(secondMenuUrl.length == 0) {
		$("#secondMenuAddModal #secondMenuUrl span").text("二级菜单url不能为空！");
		return false;
	}

	$.ajax({
	    url: "http://127.0.0.1:8086/menu/addSecondMenu",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(repData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true){
	    		alert("添加二级菜单成功");
	    		$("#secondMenuAddModal").modal("hide");  //模态框自动关闭
	    		roleId = checkRoleId();
				if(roleId != null) {
					addRoleSecondMenu().then(function (requestdata) {
						if(requestdata.success == true) {
							alert("添加角色二级菜单成功");
						}else{
							alert("添加角色二级菜单失败");
						}
				    	queryAllMenus().then(function (resData) {
							$("#hint-msg-box").html("");
							var menus = combineMenus(resData.data);
				        	//初始化菜单 
				            transformJsonkey(menus);
				            $.fn.zTree.init($("#hint-msg-box"), setting, menus);
				            $('#firstMenuAddModal').modal({backdrop: 'static',show: false});   //禁止点非模态框地方也关闭
						}).catch(function (error) {
							console.log(error);
						});
					})
				}
			}
	    },
	    error: function errorCallBack(xhr) {
	    	alert("添加菜单失败");
	    }
	});
}

function addRoleSecondMenu() {
	return new Promise(function (resolve, reject) {
		var reqData = {
			roleId: roleId,
			secmId: "1544598975802"
		}
		$.ajax({
		    url: "http://127.0.0.1:8086/menu/addRoleSecondMenu",
		    type: "POST",
		    contentType: "application/json;charset=utf-8",
		    data: JSON.stringify(reqData),
		    dataType: "json",
		    success: function successCallBack(data) {
		    	resolve(data);
		    },
		    error: function errorCallBack(xhr) {
		    	console.log('error');
		    	reject(xhr);
		    }
		});
	})
}

//修改一级菜单
function openModifyFirstMenuModal() {
	$("#updateFirstMenuModal").modal("show");
	$("#updateFirstMenuModal input[name='modifyFirstMenuName']").val(firstMenuName);
	$("#updateFirstMenuModal .modal-body .oldfirstMenuImg").attr("src",firstMenuImgPath);
}

function showNewFirstMenuImg() {
	var fd = new FormData();
	$("#updateFirstMenuModal .col-menu-1 input").each(function(index,item){
		fd.append("file",item.files[0]);
	});
    $.ajax({
    	type: "POST",
        url: "http://127.0.0.1:8086/file/upload",
        data: fd,
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
        	for(var i= 0; i< data.data.length; i++){
        		firstMenuImage = ""+data["data"][i]["filePath"];
        	}
        	$("#updateFirstMenuModal .col-menu-1").each(function(index,item){
        		$(item).find("input").hide();
        		$(item).find("button").hide();
        		$(item).find(".oldfirstMenuImg").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath="+data["data"][index]["filePath"]).show();
        	});
        	$(".modal-footer .btn-primary").removeAttr("disabled","none");
        },error:function(error){
        	alert("上传失败");
        }
    });
}

function modifyFirstMenuBtn() {
	var newfirstMenuName = $("#updateFirstMenuModal input[name='modifyFirstMenuName']").val();
	if(firstMenuImage.length == 0) {
		firstMenuImage = firstMenuImgPath;
		var index = firstMenuImage.lastIndexOf("\=");  
		firstMenuImage  = firstMenuImage.substring(index + 1, firstMenuImage.length);
	}
	var repData = {
		id: firstMenuId,
		name: newfirstMenuName,
		imagePath: firstMenuImage
	}
	$("#updateFirstMenuModal input[name='modifyFirstMenuName']").on("keyup",function() {
		$("#updateFirstMenuModal #modifyFirstMenuName span").text("*");
	})
	if(newfirstMenuName.length == 0) {
		$("#updateFirstMenuModal #modifyFirstMenuName span").text("一级菜单名称不能为空！");
		return false;
	}
	$.ajax({
	    url: "http://127.0.0.1:8086/menu/updateFirstMemu",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(repData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true){
	    		alert("添加一级菜单成功");
	    		$("#updateFirstMenuModal input").show().val("");
	    		$("#updateFirstMenuModal button").show();
	    		$("#updateFirstMenuModal").modal("hide");  //模态框自动关闭
	    		roleId = checkRoleId();
				if(roleId != null) {
			    	queryAllMenus().then(function (resData) {
			    		var menus = combineMenus(resData.data);
			    		$("#hint-msg-box").html("");
			        	//初始化菜单 
			        	transformJsonkey(menus);
			    		$.fn.zTree.init($("#hint-msg-box"), setting, menus);
			    		$(".add-menu-btn .addSecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
			    		$(".modifyFirstMenuBtn").attr("disabled","disabled").css("background-color","grey");
				    }).catch(function (error) {
						console.log(error);
					}); 
				}
			}
	    },
	    error: function errorCallBack(xhr) {
	    	alert("添加菜单失败");
	    }
	});
}

//修改二级菜单
function openModifySecondMenuModal() {
	$("#updateSecondMenuModal").modal("show");
	$("#updateSecondMenuModal input[name='modifySecondMenuName']").val(secondMenuName);
	$("#updateSecondMenuModal input[name='modifySecondMenuUrl']").val(secondMenuUrl);
}

function modifySecondMenuBtn() {
	var newSecondMenuName = $("#updateSecondMenuModal input[name='modifySecondMenuName']").val();
	var newSecondMenuUrl = $("#updateSecondMenuModal input[name='modifySecondMenuUrl']").val();
	var repData = {
		id: secondMenuId,
		name: newSecondMenuName,
		url: newSecondMenuUrl
	}
	$("#updateSecondMenuModal input[name='modifySecondMenuName']").on("keyup",function() {
		$("#updateSecondMenuModal #modifySecondMenuName span").text("*");
	})
	$("#updateSecondMenuModal input[name='modifySecondMenuUrl']").on("keyup",function() {
		$("#updateSecondMenuModal #modifySecondMenuUrl span").text("*");
	})
	if(newSecondMenuName.length == 0) {
		$("#updateSecondMenuModal #modifySecondMenuName span").text("二级菜单名称不能为空！");
		return false;
	}
	if(newSecondMenuUrl.length == 0) {
		$("#updateSecondMenuModal #modifySecondMenuUrl span").text("二级菜单url不能为空！");
		return false;
	}
	$.ajax({
	    url: "http://127.0.0.1:8086/menu/updateSecondMemu",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(repData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true){
	    		alert("修改二级菜单成功");
	    		$("#updateSecondMenuModal").modal("hide");  //模态框自动关闭
	    		roleId = checkRoleId();
				if(roleId != null) {
			    	queryAllMenus().then(function (resData) {
			    		var menus = combineMenus(resData.data);
			    		$("#hint-msg-box").html("");
			        	//初始化菜单 
			        	transformJsonkey(menus);
			    		$.fn.zTree.init($("#hint-msg-box"), setting, menus);
			    		$(".add-menu-btn .addSecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
			    		$(".modifyFirstMenuBtn").attr("disabled","disabled").css("background-color","grey");
			    		$(".modifySecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
				    }).catch(function (error) {
						console.log(error);
					}); 
				}
			}
	    },
	    error: function errorCallBack(xhr) {
	    	alert("添加菜单失败");
	    }
	});
}

function deleteSecondMenu() {
	return new Promise(function (resolve, reject) {
		var secondMenuId = selectedMenuNode.secondMenuId;
		$.ajax({
	        url: "http://127.0.0.1:8086/menu/deleteSecondMenu/" + secondMenuId,
	        type: "DELETE",
	        contentType: "application/json;charset=utf-8",
	        dataType: "json",
		    success: function successCallBack(data) {
		    	resolve(data);
		    },
		    error: function errorCallBack(xhr) {
		    	console.log('error');
		    	reject(xhr);
		    }
		});
	})
}

//删除二级菜单
function deleteSecondMenuBtn() {
	var secondMenuId = selectedMenuNode.secondMenuId;
	$.ajax({
        url: "http://127.0.0.1:8086/menu/deleteSecondMenu/" + secondMenuId,
        type: "DELETE",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true){
				alert("删除菜单成功");
				roleId = checkRoleId();
				if(roleId != null) {
			    	queryAllMenus().then(function (resData) {
			    		var menus = combineMenus(resData.data);
			    		$("#hint-msg-box").html("");
			        	//初始化菜单 
			        	transformJsonkey(menus);
			    		$.fn.zTree.init($("#hint-msg-box"), setting, menus);
			    		$(".add-menu-btn .addSecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
			    		$(".modifyFirstMenuBtn").attr("disabled","disabled").css("background-color","grey");
			    		$(".modifySecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
				    }).catch(function (error) {
						console.log(error);
					}); 
				}
            }else{
                alert("删除菜单失败");
            }
        },
        error : function(xhr, text, error) {
            alert("删除菜单失败");
        }
    });
}

//删除一级菜单
function deleteFirstMenuBtn() {
	var firstMenuId = selectedMenuNode.firstMenuId;
	var recordArray = [];
	if(selectedMenuNode) {
		selectedMenuNode.children.map(function(item,index){
			var tempObj = {};
			tempObj.id = selectedMenuNode.secondMenuId;
			recordArray.push(tempObj);
		});
	}
	deleteSecondMenu().then(function (data) {
		if(data.success == true) {
			alert("删除菜单成功");
			deleteFirstMenu().then(function(fisData) {
				if(data.success == true) {
					alert("删除一级菜单成功");
					roleId = checkRoleId();
					if(roleId != null) {
				    	queryAllMenus().then(function (resData) {
				    		var menus = combineMenus(resData.data);
				    		$("#hint-msg-box").html("");
				        	//初始化菜单 
				        	transformJsonkey(menus);
				    		$.fn.zTree.init($("#hint-msg-box"), setting, menus);
				    		$(".add-menu-btn .addSecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
				    		$(".modifyFirstMenuBtn").attr("disabled","disabled").css("background-color","grey");
				    		$(".modifySecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
					    }).catch(function (error) {
							console.log(error);
						}); 
					}
				}
			}).catch(function (error) {
				console.log(error);
			}); 
		}
	}).catch(function (error) {
		console.log(error);
	}); 



	$.ajax({
        url: "http://127.0.0.1:8086/menu/deleteFirstMenu/" + secondMenuId,
        type: "DELETE",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true){
				alert("删除菜单成功");
				roleId = checkRoleId();
				if(roleId != null) {
			    	queryAllMenus().then(function (resData) {
			    		var menus = combineMenus(resData.data);
			    		$("#hint-msg-box").html("");
			        	//初始化菜单 
			        	transformJsonkey(menus);
			    		$.fn.zTree.init($("#hint-msg-box"), setting, menus);
			    		$(".add-menu-btn .addSecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
			    		$(".modifyFirstMenuBtn").attr("disabled","disabled").css("background-color","grey");
			    		$(".modifySecondMenuBtn").attr("disabled","disabled").css("background-color","grey");
				    }).catch(function (error) {
						console.log(error);
					}); 
				}
            }else{
                alert("删除菜单失败");
            }
        },
        error : function(xhr, text, error) {
            alert("删除菜单失败");
        }
    });
}


