var roleId = "";
var roleName = "";
var id = "";

var roleTreeSetting = {
	callback: {
		onClick: function onClick(event, treeId, treeNode) {
			var treeData = treeNode;
			roleName = treeData.name;
			id = treeData.id;
			selectedRoleNode = treeNode;
			console.log(treeNode);
			$(".user-order-box .modifyRolrBtn").removeAttr("disabled").css("background-color","#33d41d");
			$(".user-order-box .deleteRoleBtn").removeAttr("disabled").css("background-color","#33d41d");
			return false;
		}
	}
};

$(function() {
	var roleId = checkRoleId();
	if(roleId != null) {
		queryAllRole().then(function (resData) {
			$(".user-order-box .modifyRolrBtn").attr("disabled","disabled").css("background-color","grey");
			$(".user-order-box .deleteRoleBtn").attr("disabled","disabled").css("background-color","grey");
			$.fn.zTree.init($("#role-tree-box"), roleTreeSetting, resData.data);
		}).catch(function (error) {
			console.log(error);
		});
    }
});

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

//添加角色
function openRoleModal() {
	var modal = $(this);
	$('#roleAddModal').modal("show");
	$('#roleAddModal').find('input[name="roleName"]').val("");
}

function addRoleBtn() {
	var newRoleName = $('#roleAddModal').find('input[name="roleName"]').val();
	var repData = {
		name: newRoleName
	}
	$("#roleAddModal input[name='roleName']").on("keyup",function() {
		$("#roleAddModal span").text("*");
	})
	if(newRoleName.length == 0) {
		$("#roleAddModal span").text("角色名称不能为空！");
		return false;
	}

	$.ajax({
	    url: "http://127.0.0.1:8086/role/addRole",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(repData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true){
	    		alert("添加角色成功");
	    		$("#roleAddModal").modal("hide");  //模态框自动关闭
	    		roleId = checkRoleId();
				if(roleId != null) {
			    	queryAllRole().then(function (resData) {
			    		$("#role-tree-box").html("");
			        	//初始化角色
			    		$.fn.zTree.init($("#role-tree-box"), roleTreeSetting, resData.data);
				    }).catch(function (error) {
						console.log(error);
					}); 
				}
			}
	    },
	    error: function errorCallBack(xhr) {
	    	alert("添加角色失败");
	    }
	});
}

//修改角色
function openModifyRoleModal() {
	$("#updateRoleModal").modal("show");
	$("#updateRoleModal input[name='modifyRoleName']").val(roleName);
}

function modifyRoleBtn() {
	var newRoleName = $("#updateRoleModal input[name='modifyRoleName']").val();
	var repData = {
		id: id,
		name: newRoleName
	}
	$("#updateRoleModal input[name='modifyRoleName']").on("keyup",function() {
		$("#updateRoleModal span").text("*");
	})
	if(newRoleName.length == 0) {
		$("#updateRoleModal span").text("角色名称不能为空！");
		return false;
	}
	$.ajax({
	    url: "http://127.0.0.1:8086/role/updateRole",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(repData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true){
	    		alert("修改角色成功");
	    		$("#updateRoleModal").modal("hide");  //模态框自动关闭
	    		roleId = checkRoleId();
				if(roleId != null) {
			    	queryAllRole().then(function (resData) {
			    		$("#role-tree-box").html("");
			        	//初始化角色
			    		$.fn.zTree.init($("#role-tree-box"), roleTreeSetting, resData.data);
				    }).catch(function (error) {
						console.log(error);
					}); 
				}
			}
	    },
	    error: function errorCallBack(xhr) {
	    	alert("修改角色失败");
	    }
	});
}

//删除角色
function deleteRoleBtn() {
    $.ajax({
        url: "http://127.0.0.1:8086/role/deleteRoleById/" + id,
        type: "DELETE",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true){
            	alert("删除角色成功");
				roleId = checkRoleId();
				if(roleId != null) {
			    	queryAllRole().then(function (resData) {
			    		$("#role-tree-box").html("");
			        	//初始化角色
			    		$.fn.zTree.init($("#role-tree-box"), roleTreeSetting, resData.data);
				    }).catch(function (error) {
						console.log(error);
					}); 
				}
            }else{
                alert("删除角色失败");
            }
        },
        error : function(xhr, text, error) {
            alert("删除角色失败");
        }
    });
}






