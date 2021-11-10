import React, { useState, useEffect, memo } from 'react';
import { toast } from 'react-toastify';

//api
import api from 'util/api';

// constants
import { API_ROUTES, ICON_TYPES, BTN_TYPES, BTN_STYLES } from 'util/constants';

//components
import CustomIcon from 'components/CustomIcon/CustomIcon';
import ButtonWrapper from 'components/wrappers/ButtonWrapper/ButtonWrapper';
import LoadingSpinner from 'components/LoadingSpinner';
import Input from 'components/Input/Input';
import CustomButton from 'components/CustomButton/CustomButton';

//styles
import styles from './ArtistEditForm.module.css';

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
            type="button"
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
    <div className={styles.glassContainer}>
      <form className={styles.artistForm} onSubmit={handleSubmitArtist}>
        <div className={styles.formHeader}></div>
        <h3 className={styles.formTitle}>Edit Artist</h3>
        <div className={styles.formBody}>
          <Input
            type="text"
            name="artistTitle"
            id="artistTitle"
            inputValue={data.artistTitle}
            onChange={handleInputChange}
            labelValue={'Title'}
            htmlFor={'artistTitle'}
          />

          <Input
            type="text"
            name="description"
            id="description"
            inputValue={data.description}
            onChange={handleInputChange}
            labelValue={'Description'}
            htmlFor={'description'}
          />

          <div className={styles.relative}>
            <Input
              type="text"
              name="newBandMember"
              id="newBandMember"
              inputValue={data.newBandMember}
              onChange={handleInputChange}
              labelValue={'Band Members'}
              htmlFor={'newBandMember'}
            />
            <ButtonWrapper
              action={handleAddBandMember}
              type="button"
              className={styles.iconBtnPlus}
            >
              <CustomIcon iconType={ICON_TYPES.plus} className={styles.icon} />
            </ButtonWrapper>
          </div>

          <div className={styles.bandMembers}>
            {data.bandMembers && data.bandMembers.length > 0
              ? renderBandMembers()
              : null}
          </div>
        </div>

        <div className={styles.formFooter}>
          <CustomButton
            action={onSuccess}
            className={`${styles.btn} ${styles.clearBtn}`}
            btnType={BTN_TYPES.button}
            btnStyle={BTN_STYLES.outlineDark}
          >
            Cancel
          </CustomButton>
          <CustomButton
            className={styles.btn}
            btnType={BTN_TYPES.submit}
            btnStyle={BTN_STYLES.outlineDark}
          >
            {data.isSubmitting ? <LoadingSpinner /> : 'Save'}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default memo(ArtistForm);