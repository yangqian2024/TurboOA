const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const FlowBiz = require('../../../biz/flow_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const PublicBiz = require('../../../../../comm/biz/public_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const timeHelper = require('../../../../../helper/time_helper.js');

Page({


	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,

		state: 1 // 通过
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;
		if (!pageHelper.getOptions(this, options, 'flag')) return;

		if (!await PassportBiz.loginMustBackWin(this)) return;


		this.setData(FlowBiz.initFormStepData(this.data.id)); // 初始化表单数据  

		await this._loadDetail(this);

		if (this.data.flow.FLOW_STATUS == 1) {
			// 待审批
			wx.setNavigationBarTitle({
				title: this.data.flow.FLOW_TO_NATIVE_DEPT + ' - 审批',
			});

		}
		else if (this.data.flow.FLOW_STATUS == 8) {
			// 驳回
			wx.setNavigationBarTitle({
				title: this.data.flow.FLOW_NOW_NATIVE_DEPT + ' - 审批',
			});
		}
		else if (this.data.flow.FLOW_STATUS == 9) {
			// 驳回
			wx.setNavigationBarTitle({
				title: '审批完成',
			});
		}

		// 当前审批部门
		if (this.data.flag == 'edit') {
			this.setData({ nowDept: this.data.flow.FLOW_NOW_NATIVE_DEPT + ' - 修改审批意见' });
		}
		else {
			this.setData({ nowDept: this.data.flow.FLOW_TO_NATIVE_DEPT });
		}

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

	bindOpenFileTap: function (e) {
		FlowBiz.openFlowFile(e, this);
	},

	bindCheckTap: async function (e) {
		this.setData({
			state: pageHelper.dataset(e, 'state')
		}, () => {
			this.selectComponent("#flow-form-show").checkForms();
		});
	},

	bindSubmitCmpt: async function (e) {

		if (!await PassportBiz.loginMustCancelWin(this)) return;

		let forms = e.detail;

		let callback = async () => {
			try {
				let opts = {
					title: '提交中'
				}
				let params = {
					id: this.data.id,
					flag: this.data.flag,
					state: this.data.state,
					forms,
				}

				await cloudHelper.callCloudSumbit('flow/step', params, opts).then(async res => { 

					let cb = () => {
						PublicBiz.removeCacheList('my-flow-checked');
						PublicBiz.removeCacheList('my-flow-checking');
						PublicBiz.removeCacheList('my-flow-list');

						wx.navigateBack();

					}
					if (this.data.state == 1) {
						if (res.data.dept)
							pageHelper.showModal('审批意见已提交，待 [' + res.data.dept + '] 处理', '温馨提示', cb);
						else
							pageHelper.showModal('审批通过，本申请审批流程全部完成！', '温馨提示', cb);
					}
					else if (this.data.state == 8)
						pageHelper.showModal('提交成功，该申请已经做驳回处理~', '温馨提示', cb);
				});




			} catch (err) {
				console.log(err);
			};
		}


		let cb = () => {
			wx.requestSubscribeMessage({
				tmplIds: [projectSetting.NOTICE_TEMP_NEW_FLOW, projectSetting.NOTICE_TEMP_RESULT_FLOW],
				async complete() {
					callback();
				}
			});
		}

		pageHelper.showConfirm('确认提交？', cb);
	},

	url: function (e) {
		pageHelper.url(e, this);
	}
})