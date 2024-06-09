
const DEPT_OPTIONS = ['人事部', '研发部', '财务部', '综合部', '测试部', '市场部', '运营部', '产品部', '公司领导'];

module.exports = { //OA 审批
	PROJECT_COLOR: '#3388EB',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#3388EB',


	// ## 小程序订阅消息
	//待审批通知(8538)  办公 申请人/申请部门/申请类型/单号/备注
	NOTICE_TEMP_NEW_FLOW: 'JQgFscHg1DGkOiQ4y9zXO9LJyHeVa4_vUAlzs6dbcW8',

	//待审批通知(8295)  办公 申请人/申请类型/申请单号/审批结果/备注
	NOTICE_TEMP_RESULT_FLOW: 'znguclNDwEP5IlSBGQ2fmblKb0MwLFu_5vYGLQc4t20',


	DEPT_OPTIONS: DEPT_OPTIONS,

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
		{ title: '使用手册', key: 'SETUP_CONTENT_HELP' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'no', title: '工号', type: 'text', must: true },
		{ mark: 'zhiwu', title: '职务', type: 'text', must: true },
	],


	NEWS_NAME: '通知公告',
	NEWS_CATE: [
		{ id: 1, title: '通知公告', style: 'leftbig1' },
	],
	NEWS_FIELDS: [],

	WHITE_NAME: '白名单',
	WHITE_CATE: [
		{ id: 1, title: '白名单' },
	],
	WHITE_FIELDS: [
	],


	FLOW_NAME: '审批',

	FLOW_ALL_STEPS: [
		{
			FLOW_CATE_ID: '1',
			FLOW_NAME: '请假审批',
			FLOW_DEPTS: ['本部门', '人事部', '公司领导'], //步骤 
			FLOW_FIELDS: [
				{ mark: 'person', title: '申请人', type: 'text', disabled: true, must: true },
				{ mark: 'phone', title: '联系电话', type: 'mobile', disabled: true, must: true },
				{ mark: 'desc', title: '请假原因', type: 'textarea', must: true },
				{ mark: 'jingji', title: '紧急联系人', type: 'text', must: true },
				{ mark: 'start', title: '开始时间', type: 'date', must: true },
				{ mark: 'end', title: '结束时间', type: 'date', must: true },
				{ mark: 'img', type: 'image', title: '补充图片', must: false, max: 8 },
			]
		},
		{
			FLOW_CATE_ID: '2',
			FLOW_NAME: '报销审批',
			FLOW_DEPTS: ['本部门', '财务部', '公司领导'], //步骤 
			FLOW_FIELDS: [
				{ mark: 'person', title: '申请人', type: 'text', must: true },
				{ mark: 'phone', title: '联系电话', type: 'mobile', must: true },
				{ mark: 'desc', title: '报销事由', type: 'textarea', must: true },
				{ mark: 'file', title: '报销发票', type: 'file', must: true, max: 20 },
				{ mark: 'img', type: 'image', title: '补充图片', must: false, max: 8 },
			]
		},
		{
			FLOW_CATE_ID: '3',
			FLOW_NAME: '外出审批',
			FLOW_DEPTS: ['本部门', '人事部', '公司领导'], //步骤 
			FLOW_FIELDS: [
				{ mark: 'person', title: '申请人', type: 'text', must: true },
				{ mark: 'phone', title: '联系电话', type: 'mobile', must: true },
				{ mark: 'desc', title: '外出事由', type: 'textarea', must: true },
				{ mark: 'start', title: '开始时间', type: 'date', must: true },
				{ mark: 'end', title: '结束时间', type: 'date', must: true },
				{ mark: 'img', type: 'image', title: '补充图片', must: false, max: 8 },
			]
		},
		{
			FLOW_CATE_ID: '4',
			FLOW_NAME: '合同审批',
			FLOW_DEPTS: ['财务部', '公司领导'], //步骤 
			FLOW_FIELDS: [
				{ mark: 'person', title: '申请人', type: 'text', must: true },
				{ mark: 'phone', title: '联系电话', type: 'mobile', must: true },
				{ mark: 'desc', title: '合同说明', type: 'textarea', must: true },
				{ mark: 'file', title: '合同文档', type: 'file', must: true, max: 20 },
				{ mark: 'img', type: 'image', title: '补充图片', must: false, max: 8 },
			]
		},
		{
			FLOW_CATE_ID: '5',
			FLOW_NAME: '采购审批',
			FLOW_DEPTS: ['本部门', '综合部', '财务部', '公司领导'], //步骤 
			FLOW_FIELDS: [
				{ mark: 'person', title: '申请人', type: 'text', must: true },
				{ mark: 'phone', title: '联系电话', type: 'mobile', must: true },
				{ mark: 'desc', title: '采购说明', type: 'textarea', must: true },
				{ mark: 'file', title: '相关文档', ext: { hint: '产品介绍，询价你单据等' }, type: 'file', must: true, max: 20 },
				{ mark: 'img', type: 'image', title: '补充图片', ext: { hint: '产品介绍，询价你单据等' }, must: false, max: 8 },
			]
		},
		{
			FLOW_CATE_ID: '6',
			FLOW_NAME: '入职审批',
			FLOW_DEPTS: ['人事部', '公司领导'], //步骤 
			FLOW_FIELDS: [
				{ mark: 'person', title: '申请人', type: 'text', must: true },
				{ mark: 'phone', title: '联系电话', type: 'mobile', must: true },
				{ mark: 'jobname', title: '入职者姓名', type: 'text', must: true },
				{ mark: 'bumen', title: '入职部门', type: 'text', must: true },
				{ mark: 'gangwei', title: '入职岗位', type: 'text', must: true },
				{ mark: 'desc', title: '入职者情况', type: 'textarea', must: true },
				{ mark: 'file', title: '相关文档', ext: { hint: '入职审批表，个人简历等' }, type: 'file', must: true, max: 20 },
				{ mark: 'img', type: 'image', title: '补充图片', must: false, max: 8 },
			]
		},
		{
			FLOW_CATE_ID: '7',
			FLOW_NAME: '其他审批',
			FLOW_DEPTS: ['本部门', '综合部', '公司领导'], //步骤 
			FLOW_FIELDS: [
				{ mark: 'person', title: '申请人', type: 'text', must: true },
				{ mark: 'phone', title: '联系电话', type: 'mobile', must: true },
				{ mark: 'desc', title: '情况说明', type: 'textarea', must: true },
				{ mark: 'file', title: '相关文档', type: 'file', must: true, max: 20 },
				{ mark: 'img', type: 'image', title: '补充图片', must: false, max: 8 },
			]
		},
	],













	FLOW_SETP_FIELDS: [
		{ mark: 'desc', title: '审批意见', type: 'textarea', must: false },
	],
}