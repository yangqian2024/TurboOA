/**
 * Notes: 路由配置文件
  * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * User: CC
 * Date: 2025-10-14 07:00:00
 */

module.exports = {
	'test/test': 'test/test_controller@test',

	'job/day': 'job_controller@dayJob',

	'home/setup_get': 'home_controller@getSetup',

	'passport/login': 'passport_controller@login',
	'passport/phone': 'passport_controller@getPhone',
	'passport/my_detail': 'passport_controller@getMyDetail',
	'passport/register': 'passport_controller@register',
	'passport/edit_base': 'passport_controller@editBase',

	// 收藏
	'fav/update': 'fav_controller@updateFav',
	'fav/del': 'fav_controller@delFav',
	'fav/is_fav': 'fav_controller@isFav',
	'fav/my_list': 'fav_controller@getMyFavList',

	'admin/home': 'admin/admin_home_controller@adminHome',
	'admin/clear_vouch': 'admin/admin_home_controller@clearVouchData',

	'admin/login': 'admin/admin_mgr_controller@adminLogin',
	'admin/mgr_list': 'admin/admin_mgr_controller@getMgrList',
	'admin/mgr_insert': 'admin/admin_mgr_controller@insertMgr#demo',
	'admin/mgr_del': 'admin/admin_mgr_controller@delMgr#demo',
	'admin/mgr_detail': 'admin/admin_mgr_controller@getMgrDetail',
	'admin/mgr_edit': 'admin/admin_mgr_controller@editMgr#demo',
	'admin/mgr_status': 'admin/admin_mgr_controller@statusMgr#demo',
	'admin/mgr_pwd': 'admin/admin_mgr_controller@pwdMgr#demo',
	'admin/log_list': 'admin/admin_mgr_controller@getLogList',
	'admin/log_clear': 'admin/admin_mgr_controller@clearLog#demo',

	'admin/setup_set': 'admin/admin_setup_controller@setSetup#demo',
	'admin/setup_set_content': 'admin/admin_setup_controller@setContentSetup#demo',
	'admin/setup_qr': 'admin/admin_setup_controller@genMiniQr',

	// 用户
	'admin/user_list': 'admin/admin_user_controller@getUserList',
	'admin/user_detail': 'admin/admin_user_controller@getUserDetail',
	'admin/user_del': 'admin/admin_user_controller@delUser#demo',
	'admin/user_edit': 'admin/admin_user_controller@editUser#demo',
	'admin/user_status': 'admin/admin_user_controller@statusUser#demo',

	'admin/user_data_get': 'admin/admin_user_controller@userDataGet',
	'admin/user_data_export': 'admin/admin_user_controller@userDataExport',
	'admin/user_data_del': 'admin/admin_user_controller@userDataDel',


	// 内容  
	'home/list': 'home_controller@getHomeList',
	'news/list': 'news_controller@getNewsList',
	'news/view': 'news_controller@viewNews',

	'admin/news_list': 'admin/admin_news_controller@getAdminNewsList',
	'admin/news_insert': 'admin/admin_news_controller@insertNews#demo',
	'admin/news_detail': 'admin/admin_news_controller@getNewsDetail',
	'admin/news_edit': 'admin/admin_news_controller@editNews#demo',
	'admin/news_update_forms': 'admin/admin_news_controller@updateNewsForms#demo',
	'admin/news_update_pic': 'admin/admin_news_controller@updateNewsPic#demo',
	'admin/news_update_content': 'admin/admin_news_controller@updateNewsContent#demo',
	'admin/news_del': 'admin/admin_news_controller@delNews#demo',
	'admin/news_sort': 'admin/admin_news_controller@sortNews#demo',
	'admin/news_status': 'admin/admin_news_controller@statusNews#demo',
	'admin/news_vouch': 'admin/admin_news_controller@vouchNews#demo',

	// 白名单
	'admin/white_list': 'admin/admin_white_controller@getAdminWhiteList',
	'admin/white_insert': 'admin/admin_white_controller@insertWhite#demo',
	'admin/white_detail': 'admin/admin_white_controller@getWhiteDetail',
	'admin/white_del': 'admin/admin_white_controller@delWhite#demo',
	'admin/white_status': 'admin/admin_white_controller@statusWhite#demo',
	'admin/white_import': 'admin/admin_white_controller@importWhiteDataExcel#demo',

	// 工作流  
	'flow/insert': 'flow_controller@insertFlow',
	'flow/edit': 'flow_controller@editFlow',
	'flow/step': 'flow_controller@stepFlow',
	'flow/update_forms': 'flow_controller@updateFlowForms', 
	'flow/del': 'flow_controller@delFlow',
	'flow/my_list': 'flow_controller@getMyFlowList',
	'flow/detail': 'flow_controller@getFlowDetail',
	'flow/view': 'flow_controller@viewFlow',
	'flow/my_checking': 'flow_controller@getMyCheckingList',
	'flow/my_checked': 'flow_controller@getMyCheckedList',

	'admin/flow_list': 'admin/admin_flow_controller@getAdminFlowList',
	'admin/flow_detail': 'admin/admin_flow_controller@getFlowDetail',
	'admin/flow_del': 'admin/admin_flow_controller@delFlow#demo',
	'admin/flow_status': 'admin/admin_flow_controller@statusFlow#demo',
	'admin/flow_data_get': 'admin/admin_flow_controller@flowDataGet',
	'admin/flow_data_export': 'admin/admin_flow_controller@flowDataExport',
	'admin/flow_data_del': 'admin/admin_flow_controller@flowDataDel',

}