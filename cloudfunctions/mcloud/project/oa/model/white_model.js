/**
 * Notes: 白名单
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-05-11 10:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class WhiteModel extends BaseProjectModel {

}

// 集合名
WhiteModel.CL = BaseProjectModel.C('white');

WhiteModel.DB_STRUCTURE = {
	_pid: 'string|true',
	WHITE_ID: 'string|true',

	WHITE_TITLE: 'string|false|comment=手机',
	WHITE_NAME: 'string|false|comment=姓名', 
	WHITE_DEPT: 'string|false|comment=部门', 

	WHITE_STATUS: 'int|true|default=1|comment=状态 0/1',

	WHITE_CATE_ID: 'string|true|comment=分类编号',
	WHITE_CATE_NAME: 'string|true|comment=分类冗余',

	WHITE_ORDER: 'int|true|default=9999',

	WHITE_FORMS: 'array|true|default=[]',
	WHITE_OBJ: 'object|true|default={}',

	WHITE_ADD_TIME: 'int|true',
	WHITE_EDIT_TIME: 'int|true',
	WHITE_ADD_IP: 'string|false',
	WHITE_EDIT_IP: 'string|false',

};

// 字段前缀
WhiteModel.FIELD_PREFIX = "WHITE_";


module.exports = WhiteModel;