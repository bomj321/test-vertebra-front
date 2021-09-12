import React from 'react';
import { Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import EpisodeDialog from './dialogs/EpisodeDialog';

const TableEpisode = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      actions: 32,
    },
    {
      key: '2',
      name: 'Mike',
      actions: 32,
    },
  ];

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
    },
    {
      title: 'Acciones',
      dataIndex: '',
      key: 'x',
      render: (data) => {
        return (
          <>
            <DeleteOutlined
              className="mr-1"
              onClick={() => console.log(data)}
            />
            <EpisodeDialog type="edit" />
          </>
        );
      },
    },
  ];

  const onChange = (action) => {
    console.log(action);
  };

  return (
    <>
      <EpisodeDialog />
      <Table
        className="mt-1"
        dataSource={dataSource}
        columns={columns}
        onChange={onChange}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default TableEpisode;
