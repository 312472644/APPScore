import md5 from '../lib/md5.js';
import vue from 'vue';

const utils = {
	// 获取接口请求sign属性
	getArticleSign(param) {
		// const key = 'FAMULEIENCODE2329';
		const secretKey = '34CEBE82E427CCB9761DCB6F74AA7739';
		param = Object.assign({
			ts: Math.round(new Date / 1e3),
			api_version: '9.9.9',
			appid: 1,
			gameID: 1,
			language_id: 1,
			plate: 'web',
			platform: 'web',
			timezone: 8,
		}, param);
		let encryString = '';
		//参数属性列表,并按照属性升序排列
		let porpList = Object.keys(param).sort();
		porpList.forEach(t => {
			for (let prop in param) {
				if (prop == t) {
					encryString += t + param[t];
				}
			}
		})
		encryString += secretKey;
		param.sign = md5(md5(encryString).toUpperCase()).toUpperCase();
		return param;
	},
	bus() {
		return new vue();
	}
};
export default utils;
