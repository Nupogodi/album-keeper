import React from 'react';
import Modal from 'react-modal';

import modalStyles from './CustomModal.module.css';

Modal.setAppElement('#root');

const CustomModal = ({ children, ...props }) => {
  const { modalOpen, toggleModal } = props;

  const {
    overlayBase,
    overlayAfter,
    overlayBefore,
    contentBase,
    contentAfter,
    contentBefore,
  } = modalStyles;
  return (
    <Modal
      overlayClassName={{
        base: overlayBase,
        afterOpen: overlayAfter,
        beforeClose: overlayBefore,
      }}
      className={{
        base: contentBase,
        afterOpen: contentAfter,
        beforeClose: contentBefore,
      }}
      closeTimeoutMS={500}
      isOpen={modalOpen}
      onRequestClose={toggleModal}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
