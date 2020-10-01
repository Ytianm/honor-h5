import React from 'react';
import styles from './index.less'
import classnames from 'classnames'
import SortTypes from '../SortTypes'
import RankNumTypes from '../RankNumTypes'

class ListTable extends React.Component {
    constructor(props) {
        super()
    }

    sortTypesChange = num => {

    }

    render() {
        const { dataType, tabType, list } = this.props
        const show1 = dataType === '1'
        const show2 = dataType === '2'
        const show3 = (dataType === '1' && tabType !== '9') || dataType === '2'
        const show4 = (dataType === '1' && tabType === '9')
        const show5 = list && list.length > 0

        return (
            <div>
                <div className={styles.cardTopList}>
                    <table className={styles.listTable} border="0" cellSpacing="0" cellPadding="0">
                        <thead align="center">
                            <tr>
                                <th>
                                    <div className={styles.tableIndex}>
                                        <span>序号</span>
                                    </div>
                                </th>
                                {show2 && <th>机构号</th>}
                                {show2 && <th>机构名</th>}
                                {show1 && <th>员工名</th>}
                                {show3 && <th>
                                    <div className={styles.columnSort}>
                                        <div className={styles.columnSort}>
                                            <span>周新增</span>
                                            <SortTypes onSortChange={this.sortTypesChange} />
                                        </div>
                                        <span className={styles.separator}>/</span>
                                        <div className={styles.columnSort}>
                                            <span>排名</span>
                                            <SortTypes onSortChange={this.sortTypesChange} />
                                        </div>
                                    </div>
                                </th>
                                }
                                {show3 && <th>
                                    <div className={styles.columnSort}>
                                        <span>资产余额</span>
                                        <SortTypes onSortChange={this.sortTypesChange} />
                                    </div>
                                </th>
                                }
                                {show3 && <th>
                                    <div className={styles.columnSort}>
                                        <div className={styles.columnSort}>
                                            <span>日新增</span>
                                            <SortTypes onSortChange={this.sortTypesChange} />
                                        </div>
                                        <span className={styles.separator}>/</span>
                                        <div className={styles.columnSort}>
                                            <span>排名</span>
                                            <SortTypes onSortChange={this.sortTypesChange} />
                                        </div>
                                    </div>
                                </th>
                                }
                                {show1 && <th>所属机构</th>}
                                {show4 && <th>所属团队</th>}
                                {show4 && <th>
                                    <div className={styles.columnSort}>
                                        <span>累计积分</span>
                                        <SortTypes onSortChange={this.sortTypesChange} />
                                    </div>
                                </th>
                                }
                                {show4 && <th>
                                    <div className={styles.columnSort}>
                                        <span>周积分</span>
                                        <SortTypes onSortChange={this.sortTypesChange} />
                                    </div>
                                </th>
                                }
                            </tr>
                        </thead>
                        {show5 && <tbody>
                            {
                                list.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            {/* 机构号 */}
                                            <td>{index + 1}</td>
                                            {/* 机构名 */}
                                            {show2 && <td>{index + 1}</td>}
                                            {/* 机构名 */}
                                            {show2 && <td>
                                                <div className={styles.starTag}>
                                                    {item.numAll > 10 && <img src={require('../../imgs/star.png')} alt="" />}
                                                    {item.addMostName}
                                                </div>
                                            </td>
                                            }
                                            {/* 员工名 */}
                                            {show1 && <td>
                                                <div className={styles.starTag}>
                                                    {item.numAll > 10 && <img src={require('../../imgs/star.png')} alt="" />}
                                                    {item.staffName}
                                                </div>
                                            </td>}
                                            {/* 周新增 */}
                                            {show3 && <td>
                                                <div className={classnames(styles.columnSort, styles.complex)}>
                                                    {item.comparePreWeek}
                                                    <span className={styles.separator}>/</span>
                                                    <div className={styles.rankWrapComp}>
                                                        <RankNumTypes rankNum={item.weekNewRanking} />
                                                    </div>
                                                </div>
                                            </td>
                                            }
                                            {/* 资产余额 */}
                                            {show3 && <td>{item.projectNumber}</td>}
                                            {/* 日新增 */}
                                            {show3 && <td>
                                                <div className={classnames(styles.columnSort, styles.complex)}>
                                                    {item.comparePreDay}
                                                    <span className={styles.separator}>/</span>
                                                    <div className={styles.rankWrapComp}>
                                                        <RankNumTypes rankNum={item.dayNewRanking} />
                                                    </div>
                                                </div>
                                            </td>
                                            }
                                            {/* 所属机构 */}
                                            <td>{item.belongOrganization}</td>
                                            {/* 所属团队 */}
                                            {show4 && <td>市场</td>}
                                            {/* 累计积分 */}
                                            {show4 && <td>{item.numAll}</td>}
                                            {/* 周积分 */}
                                            {show4 && <td>{item.numAll}</td>}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        }
                    </table>
                </div>
                {!show5 && <div className={styles.rowNo}>暂无数据</div>}
                <div className={styles.loadMore}>查看更多</div>
            </div>
        )
    }
}

export default ListTable
