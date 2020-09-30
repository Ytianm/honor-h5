import React from "react";
import PropTypes from "prop-types";
import styles from "./index.less";
import dataImg from "../../imgs/date-icon.png";

const Banner = ({timeStr}) => {
  return (
    <div className={styles.banner}>
      <img className={styles.dateImg} src={dataImg} alt="" />
      <span className={styles.date}>{timeStr}</span>
    </div>
  );
};

Banner.propTypes = {
  timeStr: PropTypes.string.isRequired,
};

export default Banner;
