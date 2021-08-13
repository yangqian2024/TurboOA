// +----------------------------------------------------------------------
// | CCMiniCloud [ Cloud Framework ]
// +----------------------------------------------------------------------
// | Copyright (c) 2021 www.code942.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 明章科技
// +----------------------------------------------------------------------

/**
 * Notes: 路由配置文件
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY www.code942.com
 * Date: 2020-10-14 07:00:00
 */

module.exports = {

	'test/test': 'TestController@test',

	'home/setup': 'HomeController@getSetup',
	'home/setup_all': 'HomeController@getSetupAll',


	'user/list': 'UserController@getUserList',
	'user/detail': 'UserController@getUser',
	'user/view': 'UserController@viewUser',
	'user/my_detail': 'UserController@getMyDetail',

	'passport/phone': 'PassportController@getPhone',
	'passport/reg': 'PassportController@register',
	'passport/modify': 'PassportController@modifyBase',
	'passport/login': 'PassportController@login',


	//***########### ADMIN ################## */
	'admin/setup_edit': 'AdminController@setupEdit',

	'admin/login': 'AdminController@adminLogin',
	'admin/home': 'AdminController@adminHome',
	'admin/user_list': 'AdminController@getUserList',
	'admin/user_detail': 'AdminController@getUserDetail',
	'admin/user_del': 'AdminController@delUser',
	'admin/user_status': 'AdminController@statusUser',


}