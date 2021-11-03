import React, { useState } from 'react';
import { toast } from 'react-toastify';

//api
import api from 'util/api';

// constants
import { API_ROUTES, BTN_TYPES, BTN_STYLES, ICON_TYPES } from 'util/constants';



//components
import LoadingSpinner from 'components/LoadingSpinner/index';
import CustomButton from 'components/CustomButton/CustomButton';
import ButtonWrapper from 'components/wrappers/ButtonWrapper/ButtonWrapper';
import CustomIcon from 'components/CustomIcon/CustomIcon';

//styles
import styles from './ArtistForm.module.css';

const ArtistForm = ({ onSuccess }) => {
  const initialState = {
    modalOpen: false,
    artistTitle: '',
    bandMembers: [],
    newBandMember: '',
    description: '',
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAlbum = async (e) => {
    e.preventDefault();

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    const body = {
      artistTitle: data.artistTitle,
      description: data.description,
      bandMembers: data.bandMembers,
    };

    try {
      const response = await api.post(API_ROUTES.artists.post, body);

      toast.success(response.data.msg);
      onSuccess(response.data.artist);
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      });
      console.log(error);
      toast.error(error.response.error);
    }
  };

  const handleAddBandMember = () => {
    setData({
      ...data,
      bandMembers: [...data.bandMembers, data.newBandMember],
      newBandMember: '',
    });
  };

  const handleRemoveBandMember = (index) => {
    setData({
      ...data,
      bandMembers: [
        ...data.bandMembers.filter((member) => {
          return member !== data.bandMembers[index];
        }),
      ],
    });
  };

  const renderBandMembers = () => {
    return data.bandMembers.map((bandMember, index) => {
      return (
        <div key={index} className={styles.bandMemberWrapper}>
          <p className={styles.bandMember}>{bandMember}</p>
          <ButtonWrapper
            action={() => handleRemoveBandMember(index)}
            className={styles.iconBtnMinus}
            type='button'
          >
            <CustomIcon
              iconType={ICON_TYPES.cancel}
              className={styles.iconSmall}
            />
          </ButtonWrapper>
        </div>
      );
    });
  };


  return (
    <div>
      <form className={styles.artistForm} onSubmit={handleSubmitAlbum}>
        <h3 className={styles.formTitle}>New Artist</h3>
        <div className={styles.formGroup}>
          <input
            className={`${styles.input} ${data.artistTitle && styles.hasValue}`}
            type='text'
            name='artistTitle'
            id='artistTitle'
            value={data.artistTitle}
            onChange={handleInputChange}
          />
          <label className={styles.label} htmlFor='artist'>
            Artist
          </label>
        </div>
        <div className={styles.formGroup}>
          <input
            className={`${styles.input} ${data.description && styles.hasValue}`}
            type='text'
            name='description'
            id='description'
            value={data.description}
            onChange={handleInputChange}
          />
          <label className={styles.label} htmlFor='albumTitle'>
            Description
          </label>
        </div>
        <div className={`${styles.formGroup} ${styles.relative}`}>
            <input
              className={styles.input}
              type='text'
              name='newBandMember'
              id='newBandMember'
              value={data.newBandMember}
              onChange={handleInputChange}
            />
            <label className={styles.label} htmlFor='bandMembers'>
              Band Members
            </label>
            <ButtonWrapper
              action={handleAddBandMember}
              type='button'
              className={styles.iconBtnPlus}
            >
              <CustomIcon iconType={ICON_TYPES.plus} className={styles.icon} />
            </ButtonWrapper>
            <div className={styles.bandMembers}>
              {data.bandMembers && data.bandMembers.length > 0
                ? renderBandMembers()
                : null}
            </div>
          </div>
        <CustomButton className={styles.btnSubmit} btnStyle={BTN_STYLES.fillLight} btnType={BTN_TYPES.submit}>
          {data.isSubmitting ? <LoadingSpinner /> : 'Add'}
        </CustomButton>
      </form>
    </div>
  );
};

export default ArtistForm;
