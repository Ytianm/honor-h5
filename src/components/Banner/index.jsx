import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./index.less";
import dataImg from "../../imgs/date-icon.png";

class Banner extends Component {
  static propTypes = {
    timeStr: PropTypes.string,
  };

  render() {
    const { timeStr } = this.props;
    return (
      <div className={styles.banner}>
        <img className={styles.dateImg} src={dataImg} alt="" />
        <span className={styles.date}>{timeStr}</span>
      </div>
    );
  }
}

export default Banner;
