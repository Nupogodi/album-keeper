import React from 'react';

// constants
import { SETTINGS_MENU_OPTIONS } from 'util/constants';

// components
import OutsideClickDetector from 'components/wrappers/OutsideClickDetector';
import CustomIcon from 'components/CustomIcon/CustomIcon';

// styles
import styles from './SettingsMenu.module.css';

const SettingsItem = ({
  iconType, action, label, className,
}) => (
  <button
    className={`${styles.btnWrapper} ${styles.controlItem}`}
    onClick={action}
    type="button"
  >
    <CustomIcon className={className} iconType={iconType} />
    {' '}
    {label}
  </button>
);

const SettingsMenu = (props) => {
  const {
    editAction = null,
    removeAction = null,
    addAction = null,
    outsideClickAction,
    settingsOptions,
  } = props;

  const findActionType = (actionType) => {
    const {
      edit, remove, addSong, addArtist, addAlbum, addPlaylist,
    } = SETTINGS_MENU_OPTIONS;

    switch (actionType) {
      case edit.action:
        return editAction;
      case remove.action:
        return removeAction;
      case addAlbum.action
        || addSong.action
        || addArtist.action
        || addPlaylist.action:
        return addAction;
      default:
        return null;
    }
  };

  console.log('open')

  return (
    <OutsideClickDetector outsideClickAction={outsideClickAction}>
      <div className={styles.settingsBody}>
        {settingsOptions.map((option, index) => (
          <SettingsItem
            iconType={option.icon}
            action={findActionType(option.action)}
            label={option.label}
            className={styles.icon}
            key={index}
          />
        ))}
      </div>
    </OutsideClickDetector>
  );
};

export default SettingsMenu;
