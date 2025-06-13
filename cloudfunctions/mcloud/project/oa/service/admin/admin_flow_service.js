/**
 * Notes:工作流后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-02 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const exportUtil = require('../../../../framework/utils/export_util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const util = require('../../../../framework/utils/util.js');
const timeUtil = require('../../../../framework/utils/time_util.js');

const FlowModel = require('../../model/flow_model.js');

// 导出数据KEY
const EXPORT_FLOW_DATA_KEY = 'EXPORT_FLOW_DATA';

class AdminFlowService extends BaseProjectAdminService {

	async getAdminFlowList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
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
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ ['FLOW_OBJ.person']: ['like', search] },
				{ ['FLOW_NO']: Number(search) },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.FLOW_CATE_ID = String(sortVal);
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

		return await FlowModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/**修改资讯状态 */
	async statusFlow(id, status) {
		this.AppError('[审批]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	// #####################导出数据

	/**获取数据 */
	async getFlowDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_FLOW_DATA_KEY);
	}

	/**删除数据 */
	async deleteFlowDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_FLOW_DATA_KEY);
	}

	/**导出数据 */
	async exportFlowDataExcel({ start, end, cateId, status, fields }) {

		this.AppError('[审批]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

}

module.exports = AdminFlowService;