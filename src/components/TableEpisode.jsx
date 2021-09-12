import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

import EpisodeDialog from './dialogs/EpisodeDialog';
import Spinner from './Spinner';

// Services
import EpisodeService from '../services/EpisodeService';

const TableEpisode = () => {
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [dataSource, setDataSource] = useState([]);
  const [columns] = useState([
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
              onClick={() => deleteEpisode(data.id)}
            />
            <EpisodeDialog type="edit" />
          </>
        );
      },
    },
  ]);

  const getEpisodes = (pageNumber = 1, pageSizeNumber = 10) => {
    setLoading(true);
    EpisodeService.getEpisodes(pageNumber, pageSizeNumber)
      .then((response) => {
        setDataSource([]);
        const rows = [];
        response.data.items.forEach((item, index) =>
          rows.push({
            ...item,
            key: `${index}`,
          })
        );

        setDataSource(rows);
        setTotalItems(response.data.meta.totalItems);
        setLoading(false);
      })
      .catch(() => {
        toastr.error('Hubo un error al obtener los episodios.');
        setLoading(false);
      });
  };

  const getPaginatedRows = (pageNumber, pageSizeNumber) => {
    setPage(pageNumber);
    setPageSize(pageSizeNumber);
    getEpisodes(pageNumber, pageSizeNumber);
  };

  const deleteEpisode = (id) => {
    setLoading(true);
    EpisodeService.deleteEpisode(id)
      .then(() => {
        if (dataSource.length - 1 === 0) {
          getEpisodes(page - 1 === 0 ? 1 : page);
          setPage(page - 1 === 0 ? 1 : page);
        } else {
          getEpisodes(page);
        }
      })
      .catch(() => {
        toastr.error('Ha ocurrido un error al borrar el episodio.');
        setLoading(false);
      });
  };

  useEffect(() => {
    getEpisodes(page);
  }, []);

  return (
    <>
      <EpisodeDialog />

      {loading && <Spinner />}

      {!loading && (
        <Table
          className="mt-1"
          dataSource={dataSource}
          columns={columns}
          onChange={getPaginatedRows}
          pagination={{ pageSize, total: totalItems, defaultCurrent: page }}
        />
      )}
    </>
  );
};

export default TableEpisode;
