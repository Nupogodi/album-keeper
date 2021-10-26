import React from 'react';
import { Switch, Route, useRouteMatch, useLocation,useHistory } from 'react-router-dom';
import { AiOutlinePlusCircle, AiOutlineArrowLeft } from 'react-icons/ai';

//constants
import { ICON_TYPES } from 'util/constants';

//components
import Sort from './Sort';
import CustomIcon from 'components/CustomIcon/CustomIcon';
import ButtonWrapper from 'components/wrappers/ButtonWrapper/ButtonWrapper';

//styles
import styles from './ViewControls.module.css';


const ViewControls = ({ onAddItem }) => {


  const history = useHistory();


  return (
    <div className={styles.controls}>
      {/* <Sort setSorted={setSorted} /> */}
      <div className={styles.controlsWrapper}>
        <ButtonWrapper btnType='button' action={() => history.goBack()}>
          <CustomIcon iconType={ICON_TYPES.backArrow} className={styles.icon} />
        </ButtonWrapper>
        <ButtonWrapper
          btnType='button'
          action={onAddItem}
          className={styles.btn}
        >
          <CustomIcon iconType={ICON_TYPES.plus} className={styles.icon} />
        </ButtonWrapper>
      </div>
    </div>
  );
};

export default ViewControls;
