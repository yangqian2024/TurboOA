/**
 * Notes: 工作流实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-08-12 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class FlowModel extends BaseProjectModel {

}

// 集合名
FlowModel.CL = BaseProjectModel.C('flow');

FlowModel.DB_STRUCTURE = {
	_pid: 'string|true',
	FLOW_ID: 'string|true',

	FLOW_NO: 'int|true|default=0',

	FLOW_CATE_ID: 'string|true',
	FLOW_CATE_NAME: 'string|false',
	FLOW_DAY: 'string|false',

	FLOW_STATUS: 'int|true|default=1|comment=状态 1=审批中，8=驳回，9=完成',
	FLOW_DEPTS: 'array|true|default=[]|comment=审批流程',

	FLOW_USER_ID: 'string|true',
	FLOW_USER_NAME: 'string|true',
	FLOW_USER_DEPT: 'string|true',
	FLOW_FORMS: 'array|true|default=[]',
	FLOW_OBJ: 'object|true|default={}',
	FLOW_TIME: 'int|true|default=0',

	FLOW_TO_DEPT: 'string|true|comment=待处理的部门',
	FLOW_TO_NATIVE_DEPT: 'string|true|comment=待处理的部门',
	FLOW_TO_STEP: 'int|true|default=0|comment=待处理的步骤',

	FLOW_NOW_STEP: 'int|true|default=0|comment=当前步骤',
	FLOW_NOW_DEPT: 'string|false|comment=审批部门(不包含本部门)',
	FLOW_NOW_NATIVE_DEPT: 'string|false|comment=审批部门(包含本部门)',
	FLOW_NOW_USER_NAME: 'string|false',
	FLOW_NOW_USER_ID: 'string|false',
	FLOW_NOW_STATE: 'int|true|default=1',

	FLOW_LIST: 'array|true|default=[]',
	/*
	step:'int|false|default=0',
	dept: 'string|false',
	nativeDept: 'string|false',
	forms: 'array|false|default=[]',
	obj: 'object|false|default={}',
	time: 'int|false|default=0',
	userId: 'string|false',
	userName: 'string|false', 
	state: 'int|false|default=1|comment=状态 1=通过 8=驳回',
	*/

	FLOW_ADD_TIME: 'int|true',
	FLOW_EDIT_TIME: 'int|true',
	FLOW_ADD_IP: 'string|false',
	FLOW_EDIT_IP: 'string|false',
};

// 字段前缀
FlowModel.FIELD_PREFIX = "FLOW_";



/**
 * 状态 1=审批中，8=驳回，9=完成
 */
FlowModel.STATUS = {
	RUN: 1,
	REJECT: 8,
	OVER: 9
};

FlowModel.STATUS_DESC = {
	RUN: '审批中',
	REJECT: '驳回',
	FORBID: '审批通过'
};


module.exports = FlowModel;