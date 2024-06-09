const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const WhiteBiz = require('../../../../biz/white_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
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
			title: projectSetting.WHITE_NAME + '-管理',
		});
		this.setData({
			WHITE_NAME: projectSetting.WHITE_NAME
		});

		//设置搜索菜单
		this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { },

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

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	}, 

	bindDelTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('admin/white_del', params, opts).then(res => {
					pageHelper.delListNode(id, this.data.dataList.list, '_id');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (e) {
				console.log(e);
			}
		}
		pageHelper.showConfirm('确认删除？删除不可恢复', callback);

	},  

	_getSearchMenu: function () {
		let cateIdOptions = WhiteBiz.getCateList();

		let sortItem1 = [{ label: '分类', type: '', value: 0 }];
		sortItem1 = sortItem1.concat(WhiteBiz.getCateList());
		let sortItems = [sortItem1];

		let sortItems2 = [{ label: '部门', type: '', value: '' }];
		let deptOptions = projectSetting.DEPT_OPTIONS;
		for (let k = 0; k < deptOptions.length; k++) {
			sortItems2.push({ label: deptOptions[k], type: 'dept', value: deptOptions[k] })
		}

		let sortMenus = [
			{ label: '全部', type: '', value: '' },
			{ label: '正常', type: 'status', value: 1 },
			{ label: '停用', type: 'status', value: 0 }, 
		];

		this.setData({
			search: '',
			cateIdOptions,
			sortItems:[sortItems2],
			sortMenus:[],
			isLoad: true
		})


	}

})