import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

// constants
import { API_ROUTES, SETTINGS_MENU_OPTIONS, ICON_TYPES } from 'util/constants';

// api
import api from 'util/api';

// hooks
import useRouter from 'hooks/useRouter';

// components
import SettingsMenu from 'components/SettingsMenu/SettingsMenu';
import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';

import DefaultSvg from '../../../DefaultSvg/DefaultSvg';

// styles
import styles from './Album.module.css';

const Album = ({ albumTitle, albumYear, artist, albumId }) => {
  const router = useRouter();
  const { url } = useRouteMatch();
  const [showSettings, setShowSettings] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const { edit, remove } = SETTINGS_MENU_OPTIONS;
  const toggleShowSettings = () => {
    setShowSettings(!showSettings);
  };
  const handleEdit = async () => {
    router.push(`${url}/${albumId}`);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `${API_ROUTES.albums.delete}/${albumId}`
      );
      toast.success(response.data.msg);
    } catch (error) {
      // eslint-disable-next-line
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
          <div className={styles.iconBtnWrapper}>
            <Button transparent onClick={toggleShowSettings}>
              <Icon
                className={styles.editIcon}
                iconType={ICON_TYPES.threeDots}
              />
            </Button>
          </div>
        )}

        <Link to={`${url}/${albumId}`}>
          <div className={styles.imgWrapper}>
            <DefaultSvg width={200} height={200} fill='transparent' />
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
