import { useState } from 'react';

/* 모달 창 열고, 닫기*/ 
export const ModalFunction = () => {
  const [modalOpenMap, setModalOpenMap] = useState({});

  const handleModalOpen = (rowId) => {
    const updatedMap = { ...modalOpenMap, [rowId]: true };
    setModalOpenMap(updatedMap);
  };

  const handleModalClose = (rowId) => {
    const updatedMap = { ...modalOpenMap, [rowId]: false };
    setModalOpenMap(updatedMap);
  };

  return {
    modalOpenMap,
    handleModalOpen,
    handleModalClose,
  };
};
