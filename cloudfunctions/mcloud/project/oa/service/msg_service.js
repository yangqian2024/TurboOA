/**
 * Notes: 消息模块业务逻辑 
 * Date: 2025-09-26 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const miniLib = require('../../../framework/lib/mini_lib.js');
const projectConfig = require('../public/project_config.js');

class MsgService extends BaseProjectService {

	getUserId(userId) {
		if (userId.includes('^^^'))
			return userId.split('^^^')[1];
		else
			return userId;
	}

	// 新审批
	async newFLow(userId, dept, person, cate, no, desc) {
		this.AppError('[审批]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// 审批结果
	async resultFlow(userId, person, cate, no, result, desc) {
		this.AppError('[审批]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

}

module.exports = MsgService;