import React from 'react';

// constants
import { ICONS } from 'util/constants';

const CustomIcon = ({ iconType, className, text = '' }) => {
  const Icon = ICONS[iconType];

  return (
    <>
      {text}
      <Icon className={className} />
    </>
  );
};

export default CustomIcon;
