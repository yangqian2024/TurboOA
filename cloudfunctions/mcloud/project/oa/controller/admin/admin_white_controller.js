/**
 * Notes: 白名单模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-05-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminWhiteService = require('../../service/admin/admin_white_service.js');

const timeUtil = require('../../../../framework/utils/time_util.js');
const contentCheck = require('../../../../framework/validate/content_check.js');
const WhiteModel = require('../../model/white_model.js');

class AdminWhiteController extends BaseProjectAdminController {

	async importWhiteDataExcel() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			cloudId: 'must|string|min:5|max:500|name=cloudId',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminWhiteService();
		return await service.importWhiteDataExcel(input.cloudId);

	}

	async statusWhite() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminWhiteService();
		await service.statusWhite(input.id, input.status);

	}

	async getAdminWhiteList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminWhiteService();
		let result = await service.getAdminWhiteList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].WHITE_ADD_TIME = timeUtil.timestamp2Time(list[k].WHITE_ADD_TIME, 'Y-M-D h:m');
			list[k].WHITE_EDIT_TIME = timeUtil.timestamp2Time(list[k].WHITE_EDIT_TIME, 'Y-M-D h:m');

		}
		result.list = list;

		return result;

	}

	async insertWhite() {
		await this.isAdmin();

		// 数据校验 
		let rules = { 
			name: 'must|string|name=姓名', 
			title: 'must|mobile|name=号码',
			dept: 'must|string|name=部门',
			cateId: 'must|string|name=分类',
			cateName: 'must|string|name=分类名',
			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminWhiteService();
		let result = await service.insertWhite(input);

		return result;

	}


	async getWhiteDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminWhiteService();
		return await service.getWhiteDetail(input.id);

	}
 
	async delWhite() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);
		let service = new AdminWhiteService();
		await service.delWhite(input.id);

	}

}

module.exports = AdminWhiteController;