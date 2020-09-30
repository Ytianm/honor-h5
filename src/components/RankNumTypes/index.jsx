import React from 'react';
import classnames from 'classnames'
import './index.less'

class RankNumTypes extends React.Component {
    constructor() {
        super()
    }

    showIcon = () => {
        if (this.props.rankNum > 10) {
            return 1
        } else if (this.props.rankNum > 0 && this.props.rankNum < 10) {
            return 2
        } else if (this.props.rankNum === 0) {
            return 3
        } else if (this.props.rankNum < 0 && this.props.rankNum > -10) {
            return 4
        } else {
            return 5
        }
    }

    render() {
        return (
            <div className="rank-outer-w">
                <img className={classnames('rank-icon', { 'show': this.showIcon() == 1 })} src={require('../../imgs/icon-big-up.png')} alt="" />
                <img className={classnames('rank-icon', { 'show': this.showIcon() == 2 })} src={require('../../imgs/icon-up.png')} alt="" />
                <img className={classnames('rank-icon', { 'show': this.showIcon() == 3 })} src={require('../../imgs/icon-big-up.png')} alt="" />
                <img className={classnames('rank-icon', { 'show': this.showIcon() == 4 })} src={require('../../imgs/icon-down.png')} alt="" />
                <img className={classnames('rank-icon', { 'show': this.showIcon() == 5 })} src={require('../../imgs/icon-big-down.png')} alt="" />
                <span className={classnames('num', { 'up': this.showIcon() == 1, 'down': this.showIcon() == 5 })}>{Math.abs(this.props.rankNum)}</span>
            </div>
        )
    }
}

export default RankNumTypes