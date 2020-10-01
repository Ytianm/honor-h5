import React from 'react';
import classnames from 'classnames'
import styles from './index.less'

class RankNumTypes extends React.Component {
    constructor(props) {
        super()
    }

    showIcon = () => {
        const {rankNum} = this.props
        if (rankNum > 10) {
            return 1
        } else if (rankNum > 0 && rankNum < 10) {
            return 2
        } else if (rankNum === 0) {
            return 3
        } else if (rankNum < 0 && rankNum > -10) {
            return 4
        } else {
            return 5
        }
    }

    render() {
        const rankType = this.showIcon()
        const {rankNum} = this.props
        return (
            <div className={styles.rankOuterW}>
                {rankType === 1 && <img className={styles.rankIcon} src={require('../../imgs/icon-big-up.png')} alt="" />}
                {rankType === 2 && <img className={styles.rankIcon} src={require('../../imgs/icon-up.png')} alt="" />}
                {rankType === 3 && <img className={styles.rankIcon} src={require('../../imgs/icon-big-up.png')} alt="" />}
                {rankType === 4 && <img className={styles.rankIcon} src={require('../../imgs/icon-down.png')} alt="" />}
                {rankType === 5 && <img className={styles.rankIcon} src={require('../../imgs/icon-big-down.png')} alt="" />}
                <span className={classnames(styles.num, rankType === 1 ? styles.up : '' , rankType === 5 ? styles.down : '')}>{Math.abs(rankNum)}</span>
            </div>
        )
    }
}

export default RankNumTypes