import React from 'react';
import { useHistory } from 'react-router-dom';

// Constants
import { ICON_TYPES } from 'util/constants';

// Components
import Icon from 'components/Icon/Icon';
import Button from 'components/Button/Button';

// styles
import styles from './ViewControls.module.css';

const ViewControls = ({ onAddItem, showItem }) => {
  const history = useHistory();

  return (
    <div className={styles.controls}>
      <div className={styles.controlsWrapper}>
        <Button transparent btnType='button' onClick={() => history.goBack()}>
          <Icon iconType={ICON_TYPES.backArrow} className={styles.icon} />
        </Button>
        {showItem && (
          <Button
            transparent
            btnType='button'
            onClick={onAddItem}
            className={styles.btn}
          >
            <Icon iconType={ICON_TYPES.plus} className={styles.icon} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ViewControls;
