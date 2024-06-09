/**
 * Notes: 全局/首页模块业务逻辑
 * Date: 2021-03-15 04:00:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectService = require('./base_project_service.js');
const setupUtil = require('../../../framework/utils/setup/setup_util.js');
const constants = require('../public/constants.js');
const UserModel = require('../model/user_model.js');

class HomeService extends BaseProjectService {

	async getSetup(key) {
		return await setupUtil.get(key);
	}

	/**首页列表 */
	async getHomeList(userId) {

		// 检查我的身份条件
		let user = await UserModel.getOne({ USER_MINI_OPENID: userId, USER_STATUS: 1 });
		if (!user) return null;

		const FlowModel = require('../model/flow_model.js');

		// 待我审批
		let checkingCnt = 0;
		if (user.USER_AUTH == 1) {
			let whereChecking = {
				FLOW_STATUS: FlowModel.STATUS.RUN,
				FLOW_TO_DEPT: user.USER_DEPT
			}
			checkingCnt = await FlowModel.count(whereChecking);
		}


		let whereMy = {
			FLOW_STATUS: FlowModel.STATUS.RUN,
			FLOW_USER_ID: userId
		}
		let myCnt = await FlowModel.count(whereMy);

		return { checkingCnt, myCnt };
	}
}

module.exports = HomeService;