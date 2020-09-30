import React from 'react'
import classnames from 'classnames'
import styles from './index.less'

class TypesTabList extends React.Component {
    constructor(props) {
        super()
        this.state = {
            currentTab: 1
        }

        console.log(props);
        this.projectInfo = props.projectInfo
    }

    // tab点击
    switchToTab = cur => {
        console.log(cur);
        this.setState({
            currentTab: cur
        })
    }

    render() {
        return (
            <div className={styles.typeTabsOuterW}>
                {/* <div className={classnames(styles.tabsListContent, { 'hor': this.props.listType == '2' })}> */}
                <div className={classnames(styles.tabsListContent, this.props.listType == '2' ? styles.hor : '')}>
                    {
                        this.projectInfo.map(({ idProject, projectName }) => {
                            return (
                                // <div className={classnames('item-wrap', { 'org': this.props.dataType === '2' })} key={idProject}>
                                <div className={classnames(styles.itemWrap, this.props.listType == '2' ? styles.org : '')} key={idProject}>
                                    {/* <div className={classnames('tabs-list-item', { 'cur': this.state.currentTab === idProject })} onClick={this.switchToTab.bind(this, idProject)}> {projectName}</div> */}
                                    <div className={classnames(styles.tabsListItem, this.state.currentTab === idProject ? styles.cur : '')} onClick={this.switchToTab.bind(this, idProject)}> {projectName}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default TypesTabList