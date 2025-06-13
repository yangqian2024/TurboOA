/**
 * Notes: 白名单管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-05-14 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const WhiteBiz = require('./white_biz.js');
const projectSetting = require('../public/project_setting.js');

class AdminWhiteBiz extends BaseBiz {


	/** 表单初始化相关数据 */
	static initFormData(id = '') {
		let cateIdOptions = WhiteBiz.getCateList();

		return {
			id, 
			// 分类
			cateIdOptions,

			fields: projectSetting.WHITE_FIELDS,
			deptOptions: projectSetting.DEPT_OPTIONS,


			// 表单数据  
			formOrder: 9999,
			formTitle: '',
			formName: '', 

			formCateId: (cateIdOptions.length == 1) ? cateIdOptions[0].val : '',
			formForms: [],
		}

	}

	static getCateName(cateId) {
		let cateList = projectSetting.WHITE_CATE;

		for (let k = 0; k < cateList.length; k++) {
			if (cateList[k].id == cateId) return cateList[k].title;
		}
		return '';
	}

}


/** 表单校验  本地 */
AdminWhiteBiz.CHECK_FORM = {
	cateId: 'formCateId|must|id|name=分类',
	name: 'formName|must|string|name=姓名',
	title: 'formTitle|must|mobile|name=电话号码', 
	dept: 'formDept|must|string|name=部门', 
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	forms: 'formForms|array',
};


module.exports = AdminWhiteBiz;