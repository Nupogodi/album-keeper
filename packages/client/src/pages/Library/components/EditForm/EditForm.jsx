import React, { useState, memo } from 'react';
// import { toast } from 'react-toastify';

// constants
import { ICON_TYPES, BTN_TYPES, EDIT_FORM_VIEWS } from 'util/constants';

// components
import Icon from 'components/Icon/Icon';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

// styles
import styles from './EditForm.module.css';

const EditForm = ({ onSuccess, viewType, initialState, utilityFunctions }) => {
  const [data, setData] = useState(initialState);
  const { artists } = EDIT_FORM_VIEWS;

  const { handleFormSubmit, handleAddBandMember, renderBandMembers } =
    utilityFunctions;

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  switch (viewType) {
    case artists:
      return (
        <div className={styles.glassContainer}>
          <form className={styles.artistForm} onSubmit={handleFormSubmit}>
            <div className={styles.formHeader} />
            <h3 className={styles.formTitle}>Edit Artist</h3>
            <div className={styles.formBody}>
              <Input
                type='text'
                name='artistTitle'
                id='artistTitle'
                inputValue={data.artistTitle}
                onChange={handleInputChange}
                labelValue='Title'
                htmlFor='artistTitle'
              />

              <Input
                type='text'
                name='description'
                id='description'
                inputValue={data.description}
                onChange={handleInputChange}
                labelValue='Description'
                htmlFor='description'
              />

              <div className={styles.relative}>
                <Input
                  type='text'
                  name='newBandMember'
                  id='newBandMember'
                  inputValue={data.newBandMember}
                  onChange={handleInputChange}
                  labelValue='Band Members'
                  htmlFor='newBandMember'
                />
                <Button
                  isWrapper
                  onClick={handleAddBandMember}
                  type='button'
                  className={styles.iconBtnPlus}
                >
                  <Icon iconType={ICON_TYPES.plus} className={styles.icon} />
                </Button>
              </div>

              <div className={styles.bandMembers}>
                {data.bandMembers && data.bandMembers.length > 0
                  ? renderBandMembers()
                  : null}
              </div>
            </div>

            <div className={styles.formFooter}>
              <Button
                className={`${styles.btn} ${styles.clearBtn}`}
                btnType={BTN_TYPES.button}
                onClick={onSuccess}
              >
                Cancel
              </Button>
              <Button className={styles.btn} btnType={BTN_TYPES.submit}>
                {data.isSubmitting ? <LoadingSpinner /> : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      );
    default:
      return null;
  }
};

export default memo(EditForm);
