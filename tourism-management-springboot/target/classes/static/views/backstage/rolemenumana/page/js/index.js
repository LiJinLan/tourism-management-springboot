var roleId = "";
var selectedRoleNode = undefined;   //当前选中的角色节点
var selectedRoleMenuNode = undefined;  //当前选中的菜单

function deleteRoleMenu() {
	if(selectedRoleNode && selectedRoleMenuNode) {
		var recordArray = [];
		var roleId = selectedRoleNode.id;

		if(selectedRoleMenuNode.type == "branch") {
			selectedRoleMenuNode.children.map(function(item,index){
				var tempObj = {};
				tempObj.roleId = roleId;
				tempObj.secmId = item.secondMenuId;
				recordArray.push(tempObj);
			});
		}else {  //leaf
			var tempObj = {};
			tempObj.roleId = selectedRoleNode.id;
			tempObj.secmId = selectedRoleMenuNode.secondMenuId;
			recordArray.push(tempObj);
		}
		deleteRoleSecondMenu(recordArray).then(function (data) {
			var treeObj = $.fn.zTree.getZTreeObj("role-tree-box");
			var node = treeObj.getNodeByTId(selectedRoleNode.tId);	
			if(node != null) {
				treeObj.selectNode(node);//选中指定节点
				treeObj.setting.callback.onClick(null, "role-tree-box", node);//触发函数
			}    
		}).catch(function (error) {
			console.log(error);
		});
	}
}

var roleMenuTreeSetting = {
	callback: {
		onClick: function onClick(event, treeId, treeNode) {
			console.log(treeNode);
			selectedRoleMenuNode = treeNode;

			return false;
		}
	}
};

var roleTreeSetting = {
	callback: {
		onClick: function onClick(event, treeId, treeNode) {
			selectedRoleNode = treeNode;
			console.log(treeNode);
			queryMenusByRole(treeNode.id).then(function (resData) {
				queryAllMenus().then(function (menuData) {
					var checkTreeData = formatCheckTree(menuData.data,resData.data);//设置树的格局
					transformJsonkey(checkTreeData);//设置zTree树的一些属性
					if(checkTreeData.length > 0) {
						$("#check-menu-tree-box").html("");
						$.fn.zTree.init($("#check-menu-tree-box"), checkTreeSetting, checkTreeData);
					}else {
						$("#check-menu-tree-box").html("暂无菜单")
					}
				}).catch(function (error) {
					console.log(error);
				});
				if(resData.data.length > 0) {
					$("#role-menu-tree-box").html("");
					transformJsonkey(resData.data);
					$.fn.zTree.init($("#role-menu-tree-box"), roleMenuTreeSetting, resData.data);
				}else {
					$("#role-menu-tree-box").html("暂无菜单")
				}
			}).catch(function (error) {
				console.log(error);
			});

			return false;
		}
	}
};

function formatCheckTree(allMenuObj,roleMenuArray) {
	allMenuObj.firstMenus.map(function(item,index) {
		for(var i = 0; i<roleMenuArray.length; i++) {
			if(item.id == roleMenuArray[i]["firstMenuId"]) {
				item.chkDisabled = true;
				break;
			}
		}
	});

	allMenuObj.secondMenus.map(function(item,index) {
		for(var i = 0; i<roleMenuArray.length; i++) {
			for(var j = 0; j < roleMenuArray[i]["children"].length; j++) {
				if(item.id == roleMenuArray[i]["children"][j]["secondMenuId"]) {
					item.chkDisabled = true;
					break;
				}
			}
		}
	});

	var newTreeArray = combineMenus(allMenuObj);
	newTreeArray.map(function(item,index) {
		if(item.children.length == 0) {
			item.chkDisabled = true;
		}
	});
	return newTreeArray;
}


var checkTreeSetting = {
	check: {
		enable: true,
		chkDisabledInherit: true
	},
	callback: {
		onClick: function onClick(event, treeId, treeNode) {
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

function addRoleMenu() {
	var treeObj = $.fn.zTree.getZTreeObj("check-menu-tree-box");
	var checkNodes = treeObj.getCheckedNodes(true);

	if(selectedRoleNode) {
		var recordArray = [];
		var roleId = selectedRoleNode.id;
		checkNodes.map(function(item,index){
			if(item.type == "leaf") {
				var tempObj = {};
				tempObj.roleId = roleId;
				tempObj.secmId = item.secondMenuId;
				recordArray.push(tempObj);
			}
		});

		addRoleSecondMenuArray(recordArray).then(function (requestdata) {
			if(requestdata.success == true) {
				alert("添加角色二级菜单成功");
			}else{
				alert("添加角色二级菜单失败");
			}
			var treeObj = $.fn.zTree.getZTreeObj("role-tree-box");
			var node = treeObj.getNodeByTId(selectedRoleNode.tId);	
			if(node != null) {
				treeObj.selectNode(node);//选中指定节点
				treeObj.setting.callback.onClick(null, "role-tree-box", node);//触发函数
			}    	
		});
	}
}

function addRoleSecondMenuArray(reqData) {
	return new Promise(function (resolve, reject) {
		$.ajax({
		    url: "http://127.0.0.1:8086/menu/addRoleSecondMenuArray",
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

/**
* 根据角色id和二级菜单id删除角色二级菜单表
*/
function deleteRoleSecondMenu(reqData) {
    return new Promise(function (resolve, reject) {
		$.ajax({
		    url: "http://127.0.0.1:8086/menu/deleteRoleSecondMenu",
		    type: "DELETE",
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
		$("#role-menu-tree-box").html("还未选择角色，暂无菜单显示！").css("color","red");
		queryAllRole().then(function (resData) {
			$.fn.zTree.init($("#role-tree-box"), roleTreeSetting, resData.data);
		}).catch(function (error) {
			console.log(error);
		});
    }
});

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
		firstMenuArrIndex[item.id] = newMenu.length - 1;	//设置数组的下标，因为下标从0开始，所以-1。
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

function queryAllRole() {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: "http://127.0.0.1:8086/role/queryRoleAll",
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





