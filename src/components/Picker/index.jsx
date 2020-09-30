import React from 'react';
import './index.less';
import { PickerView } from 'antd-mobile'

class Picker extends React.Component {
    constructor() {
        super()
        this.state = {
            defaultValue: [1], // 默认选中
            dataList: [] // 列表数据
        }
    }

    componentDidMount() {
        let dataList = this.props.allOrganization.map(item => {
            return {
                value: item.idOrganization,
                label: item.organizationName,
                organizationNo: item.organizationNo
            }
        })
        this.setState({
            dataList
        })
    }


    // 选中回调
    onChange = (val) => {
        this.setState({
            defaultValue: val
        })        
    }
    // 隐藏机构菜单
    cancel = (val) => {
        this.props.onCancel(val)
    }
    // 机构选中确认
    confirm = () => {
        let selectOrg = this.state.dataList.filter(item => {
            return item.value === this.state.defaultValue[0]
        })
        this.props.onConfirm(selectOrg[0] || {})
    }
    render() {
        return (
            <div className="org-picker">
                <div className="mask" onClick={this.cancel}></div>
                <div className="picker-wrapper">
                    <div className="picker-bar">
                        <div className="picker-btn" onClick={this.cancel}>取消</div>
                        <div className="picker-btn" onClick={this.confirm}>确定</div>
                    </div>
                    <PickerView data={this.state.dataList} value={this.state.defaultValue} cols={1} onChange={this.onChange} />
                </div>
            </div>
        )
    }
}

export default Picker