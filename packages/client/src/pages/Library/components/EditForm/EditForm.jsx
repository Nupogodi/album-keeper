import React, { useState } from 'react';
import { toast } from 'react-toastify';

// api
import api from 'util/api';

// constants
import {
  ICON_TYPES,
  BTN_TYPES,
  EDIT_FORM_VIEWS,
  API_ROUTES,
} from 'util/constants';

// components
import Icon from 'components/Icon/Icon';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

// styles
import styles from './EditForm.module.css';

const EditForm = ({ onSuccess, viewType, initialState }) => {
  const [data, setData] = useState(initialState);
  const { artists, albums } = EDIT_FORM_VIEWS;

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
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

  const handleSubmitArtist = async (e) => {
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

  const handleAlbumSubmit = async (e) => {
    e.preventDefault();

    try {
      setData({
        ...data,
        isSubmitting: true,
        errorMessage: null,
      });
      const body = {
        albumTitle: data.albumTitle,
        description: data.description,
        releaseYear: data.releaseYear,
      };
      const response = await api.put(
        `${API_ROUTES.albums.update}/${data.albumId}`,
        body
      );
      if (response.data) {
        toast.success(response.data.msg);
        onSuccess(response.data.album);
      } else {
        toast.error('Something went wrong');
      }

      setData({
        ...data,
        isSubmitting: false,
        errorMessage: null,
      });
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

  // useEffect(() => {
  //   renderBandMembers();
  // }, [data.bandMembers]);
  switch (viewType) {
    case artists:
      return (
        <form className={styles.editForm} onSubmit={handleSubmitArtist}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>Edit Artist</h3>
          </div>
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
      );
    case albums:
      return (
        <div>
          <form className={styles.albumForm} onSubmit={handleAlbumSubmit}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>{data.albumTitle}</h3>
            </div>
            <div className={styles.formBody}>
              <Input
                type='text'
                name='albumTitle'
                id='albumTitle'
                inputValue={data.albumTitle}
                onChange={handleInputChange}
                labelValue='Title'
                htmlFor='albumTitle'
              />

              <Input
                min='1900'
                type='number'
                name='releaseYear'
                id='releaseYear'
                inputValue={data.releaseYear}
                onChange={handleInputChange}
                labelValue='Release Year'
                htmlFor='releaseYear'
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
            </div>
            <div className={styles.formFooter}>
              <Button btnType={BTN_TYPES.button} onClick={onSuccess}>
                Cancel
              </Button>
              <Button btnType={BTN_TYPES.submit}>
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

export default EditForm;
