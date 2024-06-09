/**
 * Notes: 白名单模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-05-14 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const dataHelper = require('../../../helper/data_helper.js'); 
const projectSetting = require('../public/project_setting.js');

class WhiteBiz extends BaseBiz {   

	/** 取得分类 */
	static getCateList() {
		let cateList = projectSetting.WHITE_CATE; 

		let arr = [];
		for (let k = 0; k < cateList.length; k++) {
			arr.push({
				label: cateList[k].title,
				type: 'cateId',

				id: cateList[k].id,
				title: cateList[k].title,
				style: cateList[k].style,
				
				val: cateList[k].id, //for options
				value: cateList[k].id, //for list
			})
		}
		return arr;
	} 
}

module.exports = WhiteBiz;