import React from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import SortTypes from '../../components/SortTypes'
import RankNumTypes from '../../components/RankNumTypes'
import TypesTabList from '../../components/TypesTabList'
import ListTable from '../../components/ListTable'
import Picker from '../../components/Picker'
import { selectProjectInfo, selectProjectProperty, selectStaffInfo, selectStaffInfoOrg, selectAllOrganization } from '../../http/api'
import styles from './index.less'

class DetailPage extends React.Component {
    constructor() {
        super()
        this.state = {
            projectInfo: [],
            orgFlag: false,
            tableList: [],
            allOrganization: [],
            currentOrg: {},
        }

        this.dataList = [
            {
                rangeMostName: '李梦琪梦琪',
                numAll: 1,
                itemName: '金融资产',
                itemPath: require('../../imgs/detail-icon1.png'),
                addMostName: '李后裔'
            },
            {
                rangeMostName: '李梦琪',
                numAll: 5,
                itemName: '储蓄存款',
                itemPath: require('../../imgs/detail-icon2.png'),
                addMostName: '李后裔'
            },
            {
                rangeMostName: '李梦琪',
                numAll: 1200,
                itemName: '小微贷款',
                itemPath: require('../../imgs/detail-icon3.png'),
                addMostName: '李后裔'
            },
            {
                rangeMostName: '李梦琪',
                numAll: 0,
                itemName: '非按揭消贷',
                itemPath: require('../../imgs/detail-icon4.png'),
                addMostName: '李后裔'
            },
            {
                rangeMostName: '李梦琪',
                numAll: -3,
                itemName: '保险中收',
                itemPath: require('../../imgs/detail-icon5.png'),
                addMostName: '李后裔'
            },
            {
                rangeMostName: '李梦琪',
                numAll: 5,
                itemName: '基金销量',
                itemPath: require('../../imgs/detail-icon6.png'),
                addMostName: '李后裔'
            },
            {
                rangeMostName: '李梦琪',
                numAll: 6,
                itemName: '五星级管家卡发卡且达标',
                itemPath: require('../../imgs/detail-icon7.png'),
                addMostName: '李后裔'
            },
            {
                rangeMostName: '李梦琪',
                numAll: -12,
                itemName: '厅堂外行吸金',
                itemPath: require('../../imgs/detail-icon8.png'),
                addMostName: '李后裔'
            }
        ]
        // 数据类型 1 员工 2 机构
        this.currentType = '1'

        // tab类型 1 资产 2 存款 3 贷款 4 吸金 5 中收 6 销量 7 发卡 8 消贷 9 积分
        this.currentTab = '1'
    }

    onBack = () => { }

    componentDidMount() {
        this.getProjectInfo()
        this.getDataList()
        this.getStaffInfo()
        this.getAllOrganization()
    }


    // 查询项目信息
    getProjectInfo = () => {
        selectProjectInfo().then(res => {
            if (res && res.data) {
                let { data } = res.data
                this.setState({
                    projectInfo: data
                })
            }
        })
    }

    // 查询机构信息
    getDataList = () => {
        const params = {
            dateBelong: '1601308800000',
            idOrganization: '1'
        }
        selectProjectProperty(params).then(res => {
            if (res && res.data) {
                let { data } = res.data
            }
        })
    }

    // 查询机构菜单
    getAllOrganization = () => {
        selectAllOrganization().then(res => {
            if (res && res.data) {
                let { data } = res.data
                console.log(data);
                this.setState({
                    allOrganization: data
                })
            }
        })
    }

    // 查询员工数据
    getStaffInfo = () => {
        const ajaxFn = this.currentType === '1' ? selectStaffInfo : selectStaffInfoOrg
        const params = {
            dateBelong: '1601308800000',
            idProject: '1',
            staffName: '',
            pageNo: 1,
            pageSize: 10,
            idOrganization: '',
            sortStr: ''
        }
        ajaxFn(params).then(res => {
            if (res && res.data) {
                let { data } = res.data
                this.setState({
                    tableList: data
                })
            }
        })
    }

    sortTypesChange = () => {

    }

    // 机构弹框
    showOrg = (num) => {
        this.setState({
            orgFlag: true
        })
    }

    // 机构选中回调
    onChange = (val) => {
        console.log(val);
    }
    // 隐藏机构菜单
    onCancel = (val) => {
        this.setState({
            orgFlag: false
        })
    }
    // 机构选中确认
    onConfirm = (val) => {
        console.log('机构', val);
        this.setState({
            orgFlag: false
        })
    }

    render() {
        return (
            <div>
                <Header
                    title="民生银行"
                    onBack={this.onBack}
                />
                <Banner pageType="1" timeStr="2020-09-09" />
                <div className={styles.pageDetailW}>
                    <div className={styles.cardTopList}>
                        <table className={styles.table} border="0" cellSpacing="0" cellPadding="0">
                            <thead align="center">
                                <tr>
                                    <th>
                                        <div className={styles.orgSelect} onClick={this.showOrg}>
                                            <span>{this.state.currentOrg.label}</span>
                                        </div>
                                    </th>
                                    <th>规模</th>
                                    <th>
                                        <div className={styles.columnSort}>
                                            <span>排名</span>
                                            <SortTypes sortTypesChange={this.sortTypesChange}></SortTypes>
                                        </div>
                                    </th>
                                    <th>
                                        <div className={styles.columnSort}>
                                            <span>周新增</span>
                                            <SortTypes sortTypesChange={this.sortTypesChange}></SortTypes>
                                        </div>
                                    </th>
                                    <th>新增排名</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.dataList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className={styles.column1}>
                                                        <img src={item.itemPath} alt="" />
                                                        <div className={styles.rowName}>{item.itemName}</div>
                                                    </div>
                                                </td>
                                                <td>{item.numAll}粮票</td>
                                                <td>{item.numAll}粮票</td>
                                                <td>{item.numAll}粮票</td>
                                                <td>
                                                    <div className={styles.rankWrap}>
                                                        <RankNumTypes rankNum={item.numAll} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.cardTypesWrap}>
                        <TypesTabList listType={2} currentType={this.currentType} projectInfo={this.state.projectInfo} />
                    </div>
                    <div>
                        <ListTable list={this.dataList} dataType={this.currentType} tabType={this.currentTab} />
                    </div>
                </div>
                { this.state.orgFlag
                    ? <Picker allOrganization={this.state.allOrganization} onCancel={this.onCancel} onConfirm={this.onConfirm} />
                    : null}
            </div>
        )
    }
}


export default DetailPage;
