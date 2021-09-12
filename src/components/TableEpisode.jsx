import React from 'react';
import { Table } from 'antd';
import { DeleteOutlined, AreaChartOutlined } from '@ant-design/icons';

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
      render: () => {
        return (
          <>
            <DeleteOutlined />
            <AreaChartOutlined />
          </>
        );
      },
    },
  ];

  const onChange = (action) => {
    console.log(action);
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      onChange={onChange}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default TableEpisode;
