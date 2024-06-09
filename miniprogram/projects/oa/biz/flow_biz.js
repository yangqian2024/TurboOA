/**
 * Notes: 工作流模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-06-24 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const projectSetting = require('../public/project_setting.js');
const pageHelper = require('../../../helper/page_helper.js');
const fileHelper = require('../../../helper/file_helper.js');
const cloudHelper = require('../../../helper/cloud_helper.js');

class FlowBiz extends BaseBiz {

	static async openFlowFile(e, that) {
		let idx = pageHelper.dataset(e, 'idx');
		let node = that.data.flow.FLOW_OBJ.file[idx];
		return fileHelper.openFile(node);
	}

	// 分类菜单
	static getCateMenu(name = '') {
		let sortItems = [{ label: name || '分类', type: 'cateId', value: '' }];

		let allSteps = projectSetting.FLOW_ALL_STEPS;
		for (let k = 0; k < allSteps.length; k++) {
			sortItems.push({ label: allSteps[k].FLOW_NAME, type: 'cateId', value: allSteps[k].FLOW_CATE_ID });
		}

		return sortItems;
	}

	static async loadDetail(that) {
		let id = that.data.id;
		if (!id) return;

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let flow = await cloudHelper.callCloudData('flow/view', params, opt);
		if (!flow) {
			that.setData({
				isLoad: null
			})
			return;
		}

		that.setData({
			isLoad: true,
			flow,
		});

	}


	static initFormData(id = '', cateId) {
		let fields = null;
		let allSteps = projectSetting.FLOW_ALL_STEPS;
		for (let k = 0; k < allSteps.length; k++) {
			if (allSteps[k].FLOW_CATE_ID == cateId) {
				fields = allSteps[k].FLOW_FIELDS;
				break;
			}
		}
		return {
			id,
			fields
		}
	}

	static initFormStepData(id = '') {
		return {
			id,
			fields: projectSetting.FLOW_SETP_FIELDS
		}
	}


	static async delFlow(id, callback) {
		let cb = async () => {
			try {
				let params = {
					id
				}
				let opts = {
					title: '删除中'
				}

				await cloudHelper.callCloudSumbit('flow/del', params, opts).then(res => {
					pageHelper.showSuccToast('删除成功', 1500, callback);
				});
			} catch (err) {
				console.log(err);
			}
		}

		pageHelper.showConfirm('确认删除? 删除不可恢复', cb);
	}
}

FlowBiz.CHECK_FORM = {
	forms: 'formForms|array',
};

module.exports = FlowBiz;