const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');

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


		wx.chooseMessageFile({
			count: 1,
			type: 'file',
			extension: ['xlsx'],
			fail (err) {
				console.log(err)
			},
			success: async (res) => {
				console.log(res)
				let path = res.tempFiles[0].path;

				wx.showLoading({
					title: '上传中',
					mask: true
				});



				// 上传到云空间 
				let cloudId = await cloudHelper.transTempPicOne(path, 'white/', 'white', false);
				if (!cloudId) return;

				let params = {
					cloudId
				};

				try {
					let options = {
						title: '导入中'
					}
					await cloudHelper.callCloudSumbit('admin/white_import', params, options).then(res => {
						let data = res.data;
						PublicBiz.removeCacheList('admin-white-list');
						PublicBiz.removeCacheList('white-list');

						pageHelper.showModal('共有数据' + data.total + '条，导入成功' + data.succ + '条，重复' + data.has + '条，格式错误' + data.err + '条');

					});
				} catch (err) {
					pageHelper.showModal('导入失败，请重新导入');
				}

			}
		});
	},



})