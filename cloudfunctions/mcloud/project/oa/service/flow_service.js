/**
 * Notes: 工作流模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-08-12 07:48:00  
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const cloudUtil = require('../../../framework/cloud/cloud_util.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const FlowModel = require('../model/flow_model.js');
const UserModel = require('../model/user_model.js');
const MsgService = require('./msg_service.js');


class FlowService extends BaseProjectService {

	// 审批通知
	async sendCheckMsg(flowId) {

	}

	getFlowPrefix(step) {
		return 'FLOW' + step;
	}


	async getFlowDetail(userId, id) {
		let where = {
			_id: id
		}
		let flow = await FlowModel.getOne(where);

		return flow;
	}

	async viewFlow(userId, id) {
		let where = {
			_id: id
		}

		let flow = await FlowModel.getOne(where);

		if (!flow) return null;

		// 判断当前用户是否有审批权限
		let isAuthEdit = false;
		let user = await UserModel.getOne({ USER_MINI_OPENID: userId, USER_STATUS: 1, USER_AUTH: 1 });


		if (user
			&& flow.FLOW_LIST.length > 0
			&& flow.FLOW_LIST[flow.FLOW_LIST.length - 1].dept == user.USER_DEPT
			&& flow.FLOW_LIST[flow.FLOW_LIST.length - 1].userId == userId
		) {
			// 已经审批，且最后一次审批是本人
			isAuthEdit = true;
			flow.stepForms = flow.FLOW_LIST[flow.FLOW_LIST.length - 1].forms; // 加载本次填写的表单
		}
		else if (user /*&& flow.FLOW_LIST.length == 0*/) {
			if (user.USER_DEPT == flow.FLOW_TO_DEPT) {
				// 尚未开始审批
				isAuthEdit = true;
			}
		}


		flow.isAuthEdit = isAuthEdit;
		return flow;
	}

	/**添加申请数据 */
	async insertFlow() {

		this.AppError('[审批]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**修改申请 */
	async editFlow() {

		this.AppError('[审批]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	/**逐级审批*/
	async stepFlow() { 
		this.AppError('[审批]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// 更新申请forms信息
	async updateFlowForms({
		id,
		hasImageForms
	}) {
		this.AppError('[审批]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// 更新审批forms信息
	async updateStepForms({
		id,
		hasImageForms
	}) {
		this.AppError('[审批]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	/**删除数据 */
	async delFlow(userId, id) {

		this.AppError('[审批]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/** 取得我的 */
	async getMyFlowList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		orderBy = orderBy || {
			'FLOW_ADD_TIME': 'desc'
		};
		let fields = 'FLOW_NO,FLOW_DEPTS,FLOW_CATE_ID,FLOW_TO_STEP,FLOW_NOW_NATIVE_DEPT,FLOW_CATE_NAME,FLOW_TO_DEPT,FLOW_NOW_STEP,FLOW_OBJ,FLOW_USER_DEPT,FLOW_NOW_USER_NAME,FLOW_NOW_DEPT,FLOW_STATUS,FLOW_ADD_TIME';

		let where = {};
		where.and = {
			_pid: this.getProjectId(), //复杂的查询在此处标注PID 
			FLOW_USER_ID: userId
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ ['FLOW_OBJ.person']: ['like', search] },
				{ ['FLOW_NO']: Number(search) },
			];
		} else if (sortType && sortVal !== '') {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.FLOW_CATE_ID = sortVal;
					break;
				}
				case 'status': {
					where.and.FLOW_STATUS = Number(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'FLOW_ADD_TIME');
					break;
				}
			}
		}
		let result = await FlowModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		return result;
	}

	/** 取得待我审批的 */
	async getMyCheckingList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		// 检查我的身份条件
		let user = await UserModel.getOne({ USER_MINI_OPENID: userId, USER_STATUS: 1, USER_AUTH: 1 });
		if (!user) this.AppError('您没有审批权限');

		orderBy = orderBy || {
			'FLOW_ADD_TIME': 'desc'
		};
		let fields = 'FLOW_NO,FLOW_DEPTS,FLOW_TO_STEP,FLOW_NOW_NATIVE_DEPT,FLOW_CATE_NAME,FLOW_OBJ,FLOW_USER_DEPT,FLOW_NOW_USER_NAME,FLOW_NOW_STEP,FLOW_NOW_DEPT,FLOW_STATUS,FLOW_ADD_TIME';


		let where = {};
		where.and = {
			_pid: this.getProjectId(), //复杂的查询在此处标注PID  
			FLOW_STATUS: FlowModel.STATUS.RUN,
			FLOW_TO_DEPT: user.USER_DEPT
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ ['FLOW_OBJ.person']: ['like', search] },
				{ ['FLOW_NO']: Number(search) },
			];
			/*
			where.and.or
			where.and = [
				{ ['FLOW_OBJ.person']: ['like', search] }
			];*/
		} else if (sortType && sortVal !== '') {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.FLOW_CATE_ID = sortVal;
					break;
				}
				case 'status': {
					where.and.FLOW_STATUS = Number(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'FLOW_ADD_TIME');
					break;
				}
			}
		}
		let result = await FlowModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);


		return result;
	}

	/** 取得我已审批的 */
	async getMyCheckedList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		// 检查我的身份条件
		let user = await UserModel.getOne({ USER_MINI_OPENID: userId, USER_STATUS: 1, USER_AUTH: 1 });
		if (!user) this.AppError('您没有审批权限');

		orderBy = orderBy || {
			'FLOW_ADD_TIME': 'desc'
		};
		let fields = 'FLOW_NO,FLOW_DEPTS,FLOW_TO_STEP,FLOW_NOW_NATIVE_DEPT,FLOW_CATE_NAME,FLOW_TO_DEPT,FLOW_NOW_USER_ID,FLOW_OBJ,FLOW_USER_DEPT,FLOW_NOW_USER_NAME,FLOW_NOW_STEP,FLOW_NOW_DEPT,FLOW_STATUS,FLOW_ADD_TIME';

		let where = {};
		where.and = {
			_pid: this.getProjectId(), //复杂的查询在此处标注PID  
			'FLOW_LIST.userId': userId
		};


		if (util.isDefined(search) && search) {
			where.or = [
				{ ['FLOW_OBJ.person']: ['like', search] },
				{ ['FLOW_NO']: Number(search) },
			];
			/*+
			where.and.or
			where.and['FLOW_OBJ.person'] = ['like', search];*/

		} else if (sortType && sortVal !== '') {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.FLOW_CATE_ID = sortVal;
					break;
				}
				case 'status': {
					where.and.FLOW_STATUS = Number(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'FLOW_ADD_TIME');
					break;
				}
			}
		}
		let result = await FlowModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		return result;
	}

}

module.exports = FlowService;