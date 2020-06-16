//时间格式化原型对象
Date.prototype.Format = function(fmt) {
	let o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
			k]).substr(("" + o[k]).length)));
	return fmt;
}
//获取周几
Date.prototype.GetWeek = function() {
	let week = this.getDay().toString();
	let text = '';
	switch (week) {
		case "1":
			text = '周一';
			break;
		case "2":
			text = '周二';
			break;
		case "3":
			text = '周三';
			break;
		case "4":
			text = '周四';
			break;
		case "5":
			text = '周五';
			break;
		case "6":
			text = '周六';
			break;
		case "0":
			text = '周日';
			break;
		default:
			break;
	}
	return text;
}
