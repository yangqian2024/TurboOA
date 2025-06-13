/**
 * Notes:工作流模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminFlowService = require('../../service/admin/admin_flow_service.js');
const FlowService = require('../../service/flow_service.js');

const timeUtil = require('../../../../framework/utils/time_util.js');
const contentCheck = require('../../../../framework/validate/content_check.js');
const FlowModel = require('../../model/flow_model.js');

class AdminFlowController extends BaseProjectAdminController {


	/** 状态修改 */
	async statusFlow() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminFlowService();
		await service.statusFlow(input.id, input.status);

	}

	/** 列表 */
	async getAdminFlowList() {
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

		let service = new AdminFlowService();
		let result = await service.getAdminFlowList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].FLOW_ADD_TIME = timeUtil.timestamp2Time(list[k].FLOW_ADD_TIME, 'Y-M-D h:m');
			list[k].FLOW_DEPTS = list[k].FLOW_DEPTS.join('⇒');

			if (list[k].FLOW_OBJ && list[k].FLOW_OBJ.desc)
				delete list[k].FLOW_OBJ.desc;
		}
		result.list = list;

		return result;

	}


	async getFlowDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new FlowService();
		return await service.getFlowDetail(null, input.id);

	}


	async delFlow() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FlowService();
		await service.delFlow(null, input.id);

	}


	/**************数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async flowDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminFlowService();

		if (input.isDel === 1)
			await service.deleteFlowDataExcel(); //先删除

		return await service.getFlowDataURL();
	}

	/** 导出数据 */
	async flowDataExport() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			cateId: 'id|must',
			status: 'int|must',
			start: 'string|must',
			end: 'string|must',
			fields: 'array|must',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminFlowService();
		return await service.exportFlowDataExcel(input);
	}

	/** 删除导出的数据文件 */
	async flowDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminFlowService();
		return await service.deleteFlowDataExcel();
	}

}

module.exports = AdminFlowController;