import React from 'react';
import classnames from 'classnames'
import styles from './index.less'

class RankNumTypes extends React.Component {
    constructor(props) {
        super()
        this.props = props
        this.rankType = this.showIcon()
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
            <div className={styles.rankOuterW}>
                {this.rankType === 1 && <img className={classnames(styles.rankIcon)} src={require('../../imgs/icon-big-up.png')} alt="" />}
                {this.rankType === 2 && <img className={classnames(styles.rankIcon)} src={require('../../imgs/icon-up.png')} alt="" />}
                {this.rankType === 3 && <img className={classnames(styles.rankIcon)} src={require('../../imgs/icon-big-up.png')} alt="" />}
                {this.rankType === 4 && <img className={classnames(styles.rankIcon)} src={require('../../imgs/icon-down.png')} alt="" />}
                {this.rankType === 5 && <img className={classnames(styles.rankIcon)} src={require('../../imgs/icon-big-down.png')} alt="" />}
                <span className={classnames(styles.num, this.rankType === 1 ? styles.down : '' , this.rankType === 5 && styles.down)}>{Math.abs(this.props.rankNum)}</span>
            </div>
        )
    }
}

export default RankNumTypes