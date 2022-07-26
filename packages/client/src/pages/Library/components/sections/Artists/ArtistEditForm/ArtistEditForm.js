import React, { useState, useEffect, memo } from 'react';
import { toast } from 'react-toastify';

// api
import api from 'util/api';

// constants
import { API_ROUTES, ICON_TYPES, BTN_TYPES } from 'util/constants';

// components
import Icon from 'components/Icon/Icon';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

// styles
import styles from './ArtistEditForm.module.css';

const ArtistForm = ({
  onSuccess,
  artistTitle,
  artistId,
  bandMembers,
  description = '',
}) => {
  const initialState = {
    artistTitle,
    bandMembers,
    newBandMember: '',
    description,
    isSubmitting: false,
    errorMessage: null,
    artistId,
  };

  const [data, setData] = useState(initialState);

  const handleRemoveBandMember = (index) => {
    setData({
      ...data,
      bandMembers: [
        ...data.bandMembers.filter(
          (member) => member !== data.bandMembers[index]
        ),
      ],
    });
  };

  const renderBandMembers = () =>
    data.bandMembers.map((bandMember, index) => (
      // eslint-disable-next-line
      <div key={index} className={styles.bandMemberWrapper}>
        <p className={styles.bandMember}>{bandMember}</p>
        <Button
          isWrapper
          onClick={() => handleRemoveBandMember(index)}
          className={styles.iconBtnMinus}
          type='button'
        >
          <Icon iconType={ICON_TYPES.cancel} className={styles.iconSmall} />
        </Button>
      </div>
    ));

  const handleAddBandMember = () => {
    setData({
      ...data,
      bandMembers: [...data.bandMembers, data.newBandMember],
      newBandMember: '',
    });
  };

  useEffect(() => {
    renderBandMembers();
  }, [data.bandMembers]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitArtist = async (e, onSuccess) => {
    e.preventDefault();

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    try {
      const body = {
        artistTitle: data.artistTitle,
        bandMembers: data.bandMembers,
        description: data.description,
      };

      const response = await api.put(
        `${API_ROUTES.artists.update}/${data.artistId}`,
        body
      );

      toast.success(response.data.msg);

      onSuccess();
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      });
      // eslint-disable-next-line
      console.log(error);
      toast.error(error.response.error);
    }
  };

  return (
    <div className={styles.glassContainer}>
      <form className={styles.artistForm} onSubmit={handleSubmitArtist}>
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
            onClick={onSuccess}
            className={`${styles.btn} ${styles.clearBtn}`}
            btnType={BTN_TYPES.button}
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
};

export default memo(ArtistForm);
