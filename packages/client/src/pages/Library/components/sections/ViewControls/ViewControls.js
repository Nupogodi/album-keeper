import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { AiOutlinePlusCircle, AiOutlineArrowLeft } from 'react-icons/ai';

//components
import Sort from './Sort';

//styles
import styles from './ViewControls.module.css';

const ViewControls = (props) => {
  const { action, setSorted } = props;
  return (
    <div className={styles.controls}>
      <Sort setSorted={setSorted} />
      <div className={styles.controlsWrapper}>
        <button type='button' className={styles.btn}>
          <AiOutlineArrowLeft className={styles.icon} />
        </button>
        <button type='button' onClick={action} className={styles.btn}>
          <AiOutlinePlusCircle className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default ViewControls;
