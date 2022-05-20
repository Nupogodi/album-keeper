import React from 'react';

// constants
import { ICONS } from 'util/constants';

const Icon = ({ iconType, className, text = '' }) => {
  const IconConmponent = ICONS[iconType];

  return (
    <>
      {text}
      <IconConmponent className={className} />
    </>
  );
};

export default Icon;
