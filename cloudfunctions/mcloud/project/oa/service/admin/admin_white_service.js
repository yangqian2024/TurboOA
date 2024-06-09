/**
 * Notes: 白名单后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-05-11 10:20:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const util = require('../../../../framework/utils/util.js');
const cloudBase = require('../../../../framework/cloud/cloud_base.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');

const WhiteModel = require('../../model/white_model.js');

class AdminWhiteService extends BaseProjectAdminService {

	// 导入数据
	async importWhiteDataExcel(cloudId, isDel = true) {

		const xlsx = require('node-xlsx');

		console.log('############IMPORT WHITE BEGIN....');


		//const fs = require('fs'); 
		//const buffer = fs.readFileSync(cloudId); 


		console.log('[IMPORT WHITE]Read Data File');
		const cloud = cloudBase.getCloud();
		const res = await cloud.downloadFile({
			fileID: cloudId,
		})
		const buffer = await res.fileContent;

		// 删除文件
		if (isDel) cloudUtil.deleteFiles([cloudId]);


		const sheets = await xlsx.parse(buffer); //解析下载后的Excel Buffer文件，sheets是一个对象，而sheets['data']是数组，Excel有多少行数据，这个数组里就有多少个数组；
		const content = sheets[0].data //取出第一张表里的数组，注意这里的sheet为数组
		//content.splice(0, 1) //一般来说表中的第一条数据可能是标题没有用，所以删掉

		console.log('[IMPORT WHITE]Get  Data begin');

		let allDBData = await WhiteModel.getAll({}, 'WHITE_TITLE', {}, 100000);
		console.log('[IMPORT WHITE]Get DB Data COUNT=' + allDBData.length);

		console.log('[IMPORT WHITE]Insert Data');

		let succ = 0;
		let total = 0;
		let has = 0;
		let err = 0;
		let importData = [];
		for (let k = 0; k < content.length; k++) {

			console.log('[IMPORT WHITE]Insert Data[' + k + ']');

			total++;
			//if (total >= 20) break;   

			let line = content[k];
			if (line.length < 3) {
				console.error('[' + k + ']Line ERR', line);
				err++;
				continue;
			};


			let data = {};

			// 手机
			let mobile = line[0];
			if (!mobile) mobile = '';
			mobile = String(mobile).trim();
			if (!mobile || mobile.length != 11) {
				console.error('[' + k + ']mobile ERR:', line);
				err++;
				continue;
			}

			// 姓名
			let name = line[1];
			if (!name) name = '';
			name = String(name).trim();
			if (!name) {
				console.error('[' + k + ']name ERR:', line);
				err++;
				continue;
			}

			// 部门
			let dept = line[2];
			if (!dept) dept = '';
			dept = String(dept).trim();
			if (!dept) {
				console.error('[' + k + ']dept ERR:', line);
				err++;
				continue;
			}

			data.WHITE_TITLE = mobile;
			data.WHITE_NAME = name;
			data.WHITE_DEPT = dept;

			data.WHITE_CATE_ID = '1';
			data.WHITE_CATE_NAME = '白名单';


			// 记录是否存在
			if (dataUtil.checkObjArrExist(allDBData, data, ['WHITE_TITLE'])) {
				//console.error('[' + k + ']SELF White EXIST ERR:', line);
				has++;
				continue;
			}


			importData.push(data);

			succ++;

			if (total % 1000 == 0)
				console.log('[' + k + '][IMPORT WHITE]Total=' + total + ', Succ=' + succ + ', Exist=' + has + ', Err=' + err);
		}

		//批量插入
		console.log('importData CNT=' + importData.length);
		if (importData.length > 0) {
			WhiteModel.insertBatch(importData, 10000);
		}

		console.error('IMPORT WHITE DATA OVER, Total=' + total + ', SUCC=' + succ + ', Exist=' + has + ', Err=' + err);

		return {
			total,
			succ,
			has,
			err
		}
	}
	async insertWhite({
		name,
		title,
		dept,
		cateId, //分类
		cateName,
		order,
		forms
	}) {


		// 重复性判断
		let where = {
			WHITE_TITLE: title,
		}
		if (await WhiteModel.count(where))
			this.AppError('该号码已经存在');

		// 赋值 
		let data = {};
		data.WHITE_NAME = name;
		data.WHITE_TITLE = title;
		data.WHITE_DEPT = dept;

		data.WHITE_CATE_ID = cateId;
		data.WHITE_CATE_NAME = cateName;
		data.WHITE_ORDER = order;

		data.WHITE_OBJ = dataUtil.dbForms2Obj(forms);
		data.WHITE_FORMS = forms;

		let id = await WhiteModel.insert(data);

		return {
			id
		};
	}

	async delWhite(id) {
		let where = {
			_id: id
		}
		return await WhiteModel.del(where);
	}

	async getWhiteDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let white = await WhiteModel.getOne(where, fields);
		if (!white) return null;

		return white;
	}

	async getAdminWhiteList({
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
			'WHITE_ORDER': 'asc',
			'WHITE_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ WHITE_TITLE: ['like', search] },
				{ WHITE_NAME: ['like', search] }
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.WHITE_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.WHITE_STATUS = Number(sortVal);
					break;
				}
				case 'dept': {
					where.and.WHITE_DEPT = sortVal;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'WHITE_ADD_TIME');
					break;
				}

			}
		}

		return await WhiteModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	async statusWhite(id, status) {
		let data = {
			WHITE_STATUS: status
		}
		let where = {
			_id: id,
		}

		return await WhiteModel.edit(where, data);
	}

}

module.exports = AdminWhiteService;