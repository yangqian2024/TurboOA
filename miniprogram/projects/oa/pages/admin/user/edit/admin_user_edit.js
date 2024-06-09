const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');
const validate = require('../../../../../../helper/validate.js');

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
	onLoad(options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options)) return;

		this._loadDetail();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	async onPullDownRefresh() {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},


	bindSubmitTap: async function (e) {
		const CHECK_FORM = {
			name: 'formName|must|string|min:2|max:30|name=姓名',
			mobile: 'formMobile|must|mobile|name=手机',
			dept: 'formDept|must|string|name=部门',
			auth: 'formAuth|must|int|name=审批权限',
		};

		try {
			let data = this.data;
			// 数据校验 
			data = validate.check(data, CHECK_FORM, this);
			if (!data) return;

			let forms = this.selectComponent("#cmpt-form").getForms(true);
			if (!forms) return;
			data.forms = forms;
			data.id = this.data.id;

			let opts = {
				title: '提交中'
			}
			await cloudHelper.callCloudSumbit('admin/user_edit', data, opts).then(res => {
				let callback = () => {
					// 更新列表页面数据
					let node = {
						'USER_OBJ': {

						},
						'USER_NAME': data.name,
						'USER_DEPT': data.dept,
						'USER_AUTH': data.auth,
						'USER_MOBILE': data.mobile,
					}
					pageHelper.modifyPrevPageListNodeObject(data.id, node, 2, 'dataList', 'USER_MINI_OPENID');

					wx.navigateBack();
				}
				pageHelper.showSuccToast('编辑成功', 1500, callback);
			});
		} catch (err) {
			console.error(err);
		}
	},

	_loadDetail: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let id = this.data.id;
		if (!id) return;

		let params = {
			id
		}
		let opts = {
			hint: false
		}
		let user = await cloudHelper.callCloudData('admin/user_detail', params, opts);
		if (!user) {
			this.setData({
				isLoad: null,
			})
			return;
		};

		this.setData({
			isLoad: true,

			isEdit: true,

			user,

			fields: projectSetting.USER_FIELDS,
			deptOptions: projectSetting.DEPT_OPTIONS,

			formName: user.USER_NAME,
			formMobile: user.USER_MOBILE,
			formAuth: user.USER_AUTH,
			formDept: user.USER_DEPT,

			formForms: user.USER_FORMS
		})
	},

})