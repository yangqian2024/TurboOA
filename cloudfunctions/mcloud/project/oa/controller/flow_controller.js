/**
 * Notes: 工作量模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-06-12 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const FlowService = require('../service/flow_service.js');
const contentCheck = require('../../../framework/validate/content_check.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class FlowController extends BaseProjectController {



	async getFlowDetail() {

		// 数据校验 
		let rules = {
			id: 'id|must',
		};

		// 取得数据
		let input = this.validateData(rules);


		let service = new FlowService();
		let flow = await service.getFlowDetail(this._userId, input.id);

		if (flow) {
			for (let k = 0; k < flow.FLOW_LIST.length; k++) {
				flow.FLOW_LIST[k].time = timeUtil.timestamp2Time(flow.FLOW_LIST[k].time, 'Y-M-D h:m');
			}
			flow.FLOW_ADD_TIME = timeUtil.timestamp2Time(flow.FLOW_ADD_TIME, 'Y-M-D h:m');
		}

		return flow;

	}

	async viewFlow() {

		// 数据校验 
		let rules = {
			id: 'id|must',
		};

		// 取得数据
		let input = this.validateData(rules);


		let service = new FlowService();
		let flow = await service.viewFlow(this._userId, input.id);

		if (flow) {
			for (let k = 0; k < flow.FLOW_LIST.length; k++) {
				flow.FLOW_LIST[k].time = timeUtil.timestamp2Time(flow.FLOW_LIST[k].time, 'Y-M-D h:m');
			}
			flow.FLOW_ADD_TIME = timeUtil.timestamp2Time(flow.FLOW_ADD_TIME, 'Y-M-D h:m');
		}

		return flow;

	}

	async insertFlow() {

		// 数据校验 
		let rules = {
		 
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new FlowService();
		let result = await service.insertFlow(this._userId, input);

		return result;

	}

	async editFlow() {

		let rules = {
			 
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new FlowService();
		let result = service.editFlow(this._userId, input);

		return result;
	}

	async stepFlow() {

		let rules = {
		 
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new FlowService();
		let result = service.stepFlow(this._userId, input);

		return result;
	}

	async updateFlowForms() {

		// 数据校验
		let rules = {
		 
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiClient(input);

		let service = new FlowService();
		return await service.updateFlowForms(input);
	}
  

	/** 删除 */
	async delFlow() {

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FlowService();
		await service.delFlow(this._userId, input.id);

	}

	/** 我的申请列表 */
	async getMyFlowList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FlowService();
		let result = await service.getMyFlowList(this._userId, input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].FLOW_ADD_TIME = timeUtil.timestamp2Time(list[k].FLOW_ADD_TIME, 'Y-M-D h:m'); 
		}

		result.list = list;

		return result;

	}

	// 待我审批
	async getMyCheckingList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FlowService();
		let result = await service.getMyCheckingList(this._userId, input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].FLOW_ADD_TIME = timeUtil.timestamp2Time(list[k].FLOW_ADD_TIME, 'Y-M-D h:m'); 
		}

		result.list = list;

		return result;

	}

	// 我已审批
	async getMyCheckedList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new FlowService();
		let result = await service.getMyCheckedList(this._userId, input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].FLOW_ADD_TIME = timeUtil.timestamp2Time(list[k].FLOW_ADD_TIME, 'Y-M-D h:m'); 
		}

		result.list = list;

		return result;

	}

}

module.exports = FlowController;