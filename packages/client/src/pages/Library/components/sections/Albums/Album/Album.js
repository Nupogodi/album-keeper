import React, { useState, useRef, useEffect } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import {toast} from 'react-toastify';


//constants
import {
  API_ROUTES,
  LIBRARY_ROUTES,
  SETTINGS_MENU_OPTIONS,
  ICON_TYPES,
} from 'util/constants';

//api
import api from 'util/api';

//hooks
import useRouter from 'hooks/useRouter';

//components
import SettingsMenu from 'components/SettingsMenu/SettingsMenu';
import ButtonWrapper from 'components/wrappers/ButtonWrapper';
import CustomIcon from 'components/CustomIcon/CustomIcon';

// styles
import styles from './Album.module.css';

const Album = ({ albumTitle, albumYear, artist, albumCover, albumId }) => {

  const router = useRouter();
  let { path, url } = useRouteMatch();
  const [showSettings, setShowSettings] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const { edit, remove } = SETTINGS_MENU_OPTIONS;
  const toggleShowSettings = () => {
    setShowSettings(!showSettings);
  };
  const handleEdit = async () => {
    router.push(`${url}/${albumId}`)
  
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`${API_ROUTES.albums.delete}/${albumId}`)
      toast.success(response.data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.error);
    }
  };

  return (
    <div className={styles.album}>
      <div
        className={styles.albumBody}
        onMouseLeave={() => setShowIcon(false)}
        onMouseEnter={() => setShowIcon(true)}
      >
        {showSettings && (
          <SettingsMenu
            settingsOptions={[edit, remove]}
            outsideClickAction={toggleShowSettings}
            editAction={handleEdit}
            removeAction={handleDelete}
          />
        )}
        {showIcon && (
          <ButtonWrapper
            action={toggleShowSettings}
            className={styles.iconBtnWrapper}
          >
            <CustomIcon
              className={styles.editIcon}
              iconType={ICON_TYPES.threeDots}
            />
          </ButtonWrapper>
        )}

        <Link to={`${url}/${albumId}`}>
          <div className={styles.imgWrapper}>
            <img className={styles.img} src={albumCover} />
          </div>
        </Link>
      </div>
      <div className={styles.albumFooter}>
        <h3 className={styles.title}>{albumTitle}</h3>
        <div className={styles.albumDetails}>
          <span className={styles.detail}>{artist}</span>
          <span className={styles.detail}>{albumYear}</span>
        </div>
      </div>
    </div>
  );
};

export default Album;
