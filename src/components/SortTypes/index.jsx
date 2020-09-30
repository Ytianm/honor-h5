import React from 'react';
import styles from './index.less'
import classnames from 'classnames'

class SortTypes extends React.Component{
    constructor() {
        super()
        this.state = {
            status: 1
        }
    }

    changeStatus = num => {
        this.setState({
            status: num
        })
    }

    render() {
        return (
            <div className={styles.sortOuterW}>
                {this.state.status === 1 && <img onClick={()=>this.changeStatus(2)} className={styles.rankIcon} src={require('../../imgs/sort-normal.png')} alt=""/> }
                {this.state.status === 2 && <img onClick={()=>this.changeStatus(3)} className={styles.rankIcon} src={require('../../imgs/sort-asc.png')} alt=""/>}
                {(this.state.status !== 1 && this.state.status !== 2) && <img onClick={()=>this.changeStatus(1)} className={styles.rankIcon} src={require('../../imgs/sort-des.png')} alt=""/>}
            </div>
        )
    }
}

export default SortTypes
