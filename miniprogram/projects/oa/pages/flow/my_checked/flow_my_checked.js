const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js'); 
const FlowBiz = require('../../../biz/flow_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLogin: true,
		search: '',
		isEdit: true,

		sortMenusDefaultIndex: -1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!await PassportBiz.loginMustBackWin(this)) return;

		this._getSearchMenu();

		this.setData({
			nowUserId: PassportBiz.getUserId()
		})

		if (PassportBiz.isLogin()) {
			let token = PassportBiz.getToken();
			this.setData({ dept: token.dept });
		}
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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},


	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	/** 搜索菜单设置 */
	_getSearchMenu: function () {

		let sortItems1 = FlowBiz.getCateMenu('分类');

		let sortMenus = [
			{ label: '全部', type: 'status', value: '' },
			{ label: '审批中', type: 'status', value: '1' },
			{ label: '已驳回', type: 'status', value: '8' },
			{ label: '已完成', type: 'status', value: '9' }
		];

		this.setData({
			search: '',
			sortItems: [sortItems1],
			sortMenus: sortMenus,
			isLoad: true
		});

	},

})