import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

//api
import api from 'util/api';

// constants
import { API_ROUTES, ICON_TYPES } from 'util/constants';

//components
import CustomIcon from 'components/CustomIcon/CustomIcon';
import ButtonWrapper from 'components/wrappers/ButtonWrapper';

//styles
import styles from './ArtistForm.module.css';
import 'index.css';
import LoadingSpinner from 'components/LoadingSpinner';

const ArtistForm = ({
  onSuccess,
  artistTitle,
  artistId,
  bandMembers,
  description = '',
}) => {
  const initialState = {
    artistTitle: artistTitle,
    bandMembers: bandMembers,
    newBandMember: '',
    description: description,
    isSubmitting: false,
    errorMessage: null,
    artistId: artistId,
  };

  const [data, setData] = useState(initialState);

  useEffect(() => {
    renderBandMembers();
  }, [data.bandMembers]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitArtist = async (e) => {
    e.preventDefault();

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });


    try {
      const body = {
        artistTitle:data.artistTitle,
        bandMembers: data.bandMembers,
        description: data.description,
      }

      const response = await api.put(`${API_ROUTES.artists.update}/${data.artistId}`, body)

      toast.success(response.data.msg);

      onSuccess();

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
      <form className={styles.artistForm} onSubmit={handleSubmitArtist}>
        <div className={styles.formHeader}></div>
        <h3 className={styles.formTitle}>Edit Artist</h3>
        <div className={styles.formBody}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='artistTitle'>
              Title
            </label>
            <input
              className={styles.input}
              type='text'
              name='artistTitle'
              id='artistTitle'
              value={data.artistTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='description'>
              Description
            </label>
            <input
              className={styles.input}
              type='text'
              name='description'
              id='description'
              value={data.description}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.relative}`}>
            <label className={styles.label} htmlFor='bandMembers'>
              Band Members
            </label>
            <input
              className={styles.input}
              type='text'
              name='newBandMember'
              id='newBandMember'
              value={data.newBandMember}
              onChange={handleInputChange}
            />
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
        </div>

        <div className={styles.formFooter}>
          <button
            onClick={onSuccess}
            className={`${styles.btn} ${styles.clearBtn}`}
            type='button'
          >
            Cancel
          </button>
          <button className={styles.btn} type='submit'>
            {data.isSubmitting ? <LoadingSpinner /> : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtistForm;
