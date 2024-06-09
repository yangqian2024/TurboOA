const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js'); 
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const validate = require('../../../../../../helper/validate.js');
const AdminWhiteBiz = require('../../../../biz/admin_white_biz.js');
const projectSetting = require('../../../../public/project_setting.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.WHITE_NAME + '-添加',
		});

		this.setData(AdminWhiteBiz.initFormData()); // 初始化表单数据
		this.setData({
			isLoad: true
		});
 

	}, 
 

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

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

	model: function (e) {
		pageHelper.model(this, e);
	},


	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let data = this.data;

		data = validate.check(data, AdminWhiteBiz.CHECK_FORM, this);
		if (!data) return;

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		data.cateName = AdminWhiteBiz.getCateName(data.cateId);

		try { 
			await cloudHelper.callCloudSumbit('admin/white_insert', data).then(res => {
				let cb = () => {
					PublicBiz.removeCacheList('admin-white-list');
					PublicBiz.removeCacheList('white-list');
					wx.navigateBack();
				}
				pageHelper.showSuccToast('添加成功', 2000, cb);
			});

		} catch (err) {
			console.log(err);
		}

	},


	bindImgUploadCmpt: function (e) {
		this.setData({
			imgList: e.detail
		});
	},

	url: function (e) {
		pageHelper.url(e, this);
	}
})