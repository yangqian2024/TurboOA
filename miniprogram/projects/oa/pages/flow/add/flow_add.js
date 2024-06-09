const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const FlowBiz = require('../../../biz/flow_biz.js');
const PublicBiz = require('../../../../../comm/biz/public_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const timeHelper = require('../../../../../helper/time_helper.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
		if (!await PassportBiz.loginMustBackWin(this)) return;

		if (!pageHelper.getOptions(this, options, 'cateId')) return;

		this.setData(FlowBiz.initFormData('', this.data.cateId)); // 初始化表单数据   

		let allSteps = projectSetting.FLOW_ALL_STEPS;
		for (let k = 0; k < allSteps.length; k++) {
			if (allSteps[k].FLOW_CATE_ID == this.data.cateId) {
				{
					this.setData({ curStep: allSteps[k], title: allSteps[k].FLOW_NAME });
					wx.setNavigationBarTitle({
						title: '填写申请 - ' + allSteps[k].FLOW_NAME,
					});
					break;
				}
			}
		}

		let fields = this.data.fields;
		for (let k = 0; k < fields.length; k++) {
			if (fields[k].mark == 'person') fields[k].def = PassportBiz.getUserName();
			if (fields[k].mark == 'phone') fields[k].def = PassportBiz.getToken().phone;
		}
		this.setData({ fields, isLoad: true });

	},



	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
	},



	url: function (e) {
		pageHelper.url(e, this);
	},



	bindCheckTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;
		this.selectComponent("#flow-form-show").checkForms();
	},

	bindSubmitCmpt: async function (e) {

		if (!await PassportBiz.loginMustCancelWin(this)) return;

		let forms = e.detail;

		let callback = async () => {
			try {
				let opts = {
					title: '提交中'
				}

				let cateId = this.data.cateId;
				let params = {
					cateId: cateId,
					cateName: this.data.curStep['FLOW_NAME'],
					depts: this.data.curStep['FLOW_DEPTS'],
					forms
				}
				// 创建
				let result = await cloudHelper.callCloudSumbit('flow/insert', params, opts);
				let flowId = result.data.id;

				await cloudHelper.transFormsTempPics(forms, 'flow-day/' + timeHelper.time('Y-M-D') + '/', flowId, 'flow/update_forms');

				let cb = () => {
					PublicBiz.removeCacheList('my-flow-list');

					wx.reLaunch({
						url: '../../default/index/default_index'
					});
				}
				pageHelper.showModal('已提交，请耐心等待 [' + this.data.curStep.FLOW_DEPTS[0] + '] 审批', '温馨提示', cb);


			} catch (err) {
				console.log(err);
			};
		}


		wx.requestSubscribeMessage({
			tmplIds: [projectSetting.NOTICE_TEMP_RESULT_FLOW, projectSetting.NOTICE_TEMP_NEW_FLOW],
			async complete() {
				callback();
			}
		});
	}

})