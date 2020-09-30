import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const Header = (props)  => {
    const { onBack, title } = props;

    return (
        <div className={styles.header}>
            <div className={styles.headerBack} onClick={onBack}>
                <svg width="42" height="42">
                    <polyline
                        points="25,13 16,21 25,29"
                        stroke="#333"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>
            </div>
            <h1 className={styles.headerTitle}>{title}</h1>
        </div>
    );
}

Header.propTypes = {
    onBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default Header