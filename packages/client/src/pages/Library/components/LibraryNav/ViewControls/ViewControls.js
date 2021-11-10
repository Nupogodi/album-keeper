import React from 'react';
import { useHistory } from 'react-router-dom';

//constants
import { ICON_TYPES } from 'util/constants';

//components
import CustomIcon from 'components/CustomIcon/CustomIcon';
import ButtonWrapper from 'components/wrappers/ButtonWrapper/ButtonWrapper';

//styles
import styles from './ViewControls.module.css';

const ViewControls = ({ onAddItem, showItem }) => {
  const history = useHistory();

  return (
    <div className={styles.controls}>
      <div className={styles.controlsWrapper}>
        <ButtonWrapper btnType='button' action={() => history.goBack()}>
          <CustomIcon iconType={ICON_TYPES.backArrow} className={styles.icon} />
        </ButtonWrapper>
        <ButtonWrapper
          btnType='button'
          action={onAddItem}
          className={styles.btn}
        >
          {showItem && (
            <CustomIcon iconType={ICON_TYPES.plus} className={styles.icon} />
          )}
        </ButtonWrapper>
      </div>
    </div>
  );
};

export default ViewControls;