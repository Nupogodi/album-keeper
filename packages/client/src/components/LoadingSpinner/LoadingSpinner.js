import React from 'react';

// Constants
import { ICON_TYPES } from 'util/constants';

//  Components
import Icon from 'components/Icon/Icon';

// Styles
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ full }) => (
  <Icon
    className={`${full ? `${styles.fullPageSpinner}` : `${styles.spinner}`}`}
    iconType={ICON_TYPES.loadingSpinner}
  />
  // <div>lel</div>
);

export default LoadingSpinner;
