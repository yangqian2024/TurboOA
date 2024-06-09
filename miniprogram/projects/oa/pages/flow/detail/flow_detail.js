
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const FlowBiz = require('../../../biz/flow_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

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

		if (options && options.flag == 'admin') {
			this.setData({ isLogin: true });
		}
		else {
			if (!await PassportBiz.loginMustBackWin(this)) return;
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


	bindOpenFileTap: function (e) {
		FlowBiz.openFlowFile(e, this);
	},

	url: function (e) {
		pageHelper.url(e, this);
	},

})