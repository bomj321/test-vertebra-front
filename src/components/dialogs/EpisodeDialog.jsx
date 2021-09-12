import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const EpisodeDialog = ({ type }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    //toastr.error('El título de beneficio es requerido.');
  }, []);

  return (
    <>
      {type === 'edit' ? (
        <EditOutlined onClick={showModal} />
      ) : (
        <Button type="primary" onClick={showModal}>
          <PlusOutlined />
          Episodio
        </Button>
      )}

      <Modal
        title={type === 'edit' ? 'Edición de episodio' : 'Creación de episodio'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default EpisodeDialog;
