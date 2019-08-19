/**
 * 消息通知函数
 * type消息的类型
 **/
function pnotify(title, msg, type) {
    new PNotify({
        "title": title,
        "text": msg,
        "type": type
    });
}

//etc
/*new PNotify({
    title: 'Error!',
    text: `解析录入 '${fileName}' 数据失败,原因： ${error.data}`,
    type: 'error'
});
*/
