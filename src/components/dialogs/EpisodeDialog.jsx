import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
// Services
import EpisodeService from '../../services/EpisodeService';

import Spinner from '../Spinner';

import { getCharactersId } from '../../libs/utils';

const { Option } = Select;

const EpisodeDialog = ({
  type,
  idEpisode,
  getEpisodes,
  items,
  itemsCharacters,
}) => {
  const [loading, setLoading] = useState(false);
  const [episode, setEpisode] = useState(false);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (formValues) => {
    const values = { ...formValues.getFieldsValue() };

    if (values.name === '' || values.name === null) {
      toastr.error('Debe ingresar un nombre');
      return;
    }

    if (values.locationId === '' || values.locationId === null) {
      toastr.error('Debe ingresar un lugar');
      return;
    }

    if (
      !values.charactersIds ||
      values.charactersIds === undefined ||
      values.charactersIds.length === 0
    ) {
      toastr.error('Debe ingresar al menos un personaje');
      return;
    }

    if (type === 'edit') {
      EpisodeService.editEpisode(values, idEpisode)
        .then(async () => {
          toastr.success('Episodio editado con éxito.');
          setLoading(false);
          handleCancel();
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            toastr.error('El nombre debe ser único');
          } else {
            toastr.error(
              'Ha ocurrido un error al intentar editar el episodio.'
            );
          }
          setLoading(false);
        });
    } else {
      EpisodeService.saveEpisode(values)
        .then(async () => {
          toastr.success('Episodio guardado con éxito.');

          setLoading(false);
          handleCancel();
          getEpisodes();
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            toastr.error('El nombre debe ser único');
          } else {
            toastr.error(
              'Ha ocurrido un error al intentar guardar el episodio.'
            );
          }

          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (idEpisode) {
      EpisodeService.getEpisode(idEpisode)
        .then(async (response) => {
          setEpisode(response.data);
        })
        .catch(() => {
          toastr.error('Ha ocurrido un error al obtener el episodio.');
        });
    }
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
        onOk={() => onFinish(form)}
        onCancel={handleCancel}
      >
        {loading && <Spinner />}
        {!loading && (
          <Form
            preserve={false}
            form={form}
            name="register"
            initialValues={{
              name: episode ? episode.name : '',
              locationId: episode ? episode.location.id : null,
              charactersIds: episode ? getCharactersId(episode.characters) : [],
            }}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              tooltip="Nombre del episodio/Debe ser único"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Por favor ingresar un nombre',
                },
              ]}
            >
              <Input placeholder="Escribe un nombre *" />
            </Form.Item>

            <Form.Item
              name="locationId"
              rules={[
                { required: true, message: 'Por favor ingresar un lugar' },
              ]}
            >
              <Select placeholder="Seleccione un lugar *">
                {items.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="charactersIds"
              rules={[
                { required: true, message: 'Por favor ingresar un personaje' },
              ]}
            >
              <Select
                placeholder="Seleccione los personajes *"
                mode="multiple"
                filterOption={false}
              >
                {itemsCharacters.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default EpisodeDialog;
