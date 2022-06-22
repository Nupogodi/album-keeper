import React, { useState } from 'react';
import { toast } from 'react-toastify';

// api
import api from 'util/api';

// constants
import { API_ROUTES, BTN_TYPES, ICON_TYPES } from 'util/constants';

// components
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Button from 'components/Button/Button';
import ButtonWrapper from 'components/wrappers/ButtonWrapper/ButtonWrapper';
import Icon from 'components/Icon/Icon';
import Input from 'components/Input/Input';

// styles
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
      // eslint-disable-next-line
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
        ...data.bandMembers.filter(
          (member) => member !== data.bandMembers[index]
        ),
      ],
    });
  };

  // eslint-disable-next-line
  const renderBandMembers = () =>
    data.bandMembers.map((bandMember, index) => (
      // eslint-disable-next-line
      <div key={index} className={styles.bandMemberWrapper}>
        <p className={styles.bandMember}>{bandMember}</p>
        <ButtonWrapper
          action={() => handleRemoveBandMember(index)}
          className={styles.iconBtnMinus}
          type='button'
        >
          <Icon iconType={ICON_TYPES.cancel} className={styles.iconSmall} />
        </ButtonWrapper>
      </div>
    ));

  return (
    <div>
      <form className={styles.artistForm} onSubmit={handleSubmitAlbum}>
        <h3 className={styles.formTitle}>New Artist</h3>
        <Input
          inputClassName={data.artistTitle && styles.hasValue}
          type='text'
          name='artistTitle'
          id='artistTitle'
          inputValue={data.artistTitle}
          onChange={handleInputChange}
          labelValue='Artist'
          htmlFor='artist'
        />

        <Input
          inputClassName={data.description && styles.hasValue}
          type='text'
          name='description'
          id='description'
          inputValue={data.description}
          onChange={handleInputChange}
          labelValue='Description'
          htmlFor='description'
        />

        <div className={styles.bandMembers}>
          <Input
            inputClassName={styles.relative}
            type='text'
            name='newBandMember'
            id='newBandMember'
            inputValue={data.newBandMember}
            onChange={handleInputChange}
            labelValue='Band Members'
            htmlFor='bandMembers'
          />

          <ButtonWrapper
            onClick={handleAddBandMember}
            type='button'
            className={styles.absolute}
          >
            <Icon iconType={ICON_TYPES.plus} className={styles.icon} />
          </ButtonWrapper>
        </div>
        <div className={styles.bandMembers}>
          {data.bandMembers && data.bandMembers.length > 0
            ? renderBandMembers()
            : null}
        </div>
        <Button className={styles.btnSubmit} btnType={BTN_TYPES.submit}>
          {data.isSubmitting ? <LoadingSpinner /> : 'Add'}
        </Button>
      </form>
    </div>
  );
};

export default ArtistForm;
