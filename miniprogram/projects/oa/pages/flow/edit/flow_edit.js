const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const FlowBiz = require('../../../biz/flow_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const dataHelper = require('../../../../../helper/data_helper.js');
const projectSetting = require('../../../public/project_setting.js');

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

		if (!pageHelper.getOptions(this, options)) return;
		if (!pageHelper.getOptions(this, options, 'cateId')) return;

		if (!await PassportBiz.loginMustBackWin(this)) return;


		this.setData(FlowBiz.initFormData(this.data.id, this.data.cateId)); // 初始化表单数据 

		let allSteps = projectSetting.FLOW_ALL_STEPS;
		for (let k = 0; k < allSteps.length; k++) {
			if (allSteps[k].FLOW_CATE_ID == this.data.cateId) {
				{ 
					this.setData({ curStep: allSteps[k], title: allSteps[k].FLOW_NAME });
					wx.setNavigationBarTitle({
						title: '申请单修改 - ' + allSteps[k].FLOW_NAME,
					});
					break;
				}
			}
		}

		this._loadDetail(this);

	},

	_loadDetail: async function (e) {
		await FlowBiz.loadDetail(this);
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
		this.setData({
			isLoad: false
		}, async () => {
			await this._loadDetail(this);
		});
		wx.stopPullDownRefresh();
	},



	url: function (e) {
		pageHelper.url(e, this);
	},


	bindCheckTap: async function (e) {
		this.selectComponent("#flow-form-show").checkForms();
	},

	bindSubmitCmpt: async function (e) {
		let forms = e.detail;
		let callback = async () => {
			try {
				let id = this.data.id;
				let params = {
					id,
					forms
				}
				await cloudHelper.callCloudSumbit('flow/edit', params);

				await cloudHelper.transFormsTempPics(forms, 'flow-day/' + timeHelper.time('Y-M-D') + '/', id, 'flow/update_forms', { step: 1 });

				let cb = () => {
					let node = {
						'FLOW1_OBJ': {
							'person': dataHelper.getDataByKey(forms, 'mark', 'person').val,
							'phone': dataHelper.getDataByKey(forms, 'mark', 'phone').val
						}
					}
					pageHelper.modifyPrevPageListNodeObject(id, node);

					wx.navigateBack();
				};
				pageHelper.showModal('已提交，请耐心等待审批', '温馨提示', cb);
			} catch (err) {
				console.log(err);
			}
		}

		wx.requestSubscribeMessage({
			tmplIds: [projectSetting.NOTICE_TEMP_RESULT_FLOW, projectSetting.NOTICE_TEMP_NEW_FLOW],
			async complete() {
				callback();
			}
		});
	},


})