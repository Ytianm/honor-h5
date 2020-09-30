import service from './request'

// 日期
export const queryTimeStamp = params => service.get('/lsxyms/api/staff/selectDateBelong', {params})

// 查询项目信息
export const selectProjectInfo = params => service.get('/lsxyms/api/staff/selectProjectInfo', {params})

// 周新增
export const selectWeekNewAdd = params => service.get('/lsxyms/api/staff/selectWeekNewAdd', {params})

// 员工数据列表 -- 员工
export const selectStaffInfo = params => service.get('/lsxyms/api/staff/selectStaffInfo', {params})

// 机构列表数据
export const selectNewAdd = params => service.get('/lsxyms/api/organization/selectNewAdd', {params})

// 员工数据列表 -- 机构
export const selectStaffInfoOrg = params => service.get('/lsxyms/api/organization/selectStaffInfo', {params})

// 根据机构id查询项目资产明细
export const selectProjectProperty = params => service.get('/lsxyms/api/organization/selectProjectProperty', {params})

// 机构信息列表
export const selectAllOrganization = params => service.get('/lsxyms/api/organization/selectAllOrganization', {params})