import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

import EpisodeDialog from './dialogs/EpisodeDialog';
import Spinner from './Spinner';

// Services
import EpisodeService from '../services/EpisodeService';
import LocationService from '../services/LocationService';
import CharacterService from '../services/CharacterService';

const { Column } = Table;

const TableEpisode = () => {
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [items, setItems] = useState([]);
  const [itemsCharacters, setItemsCharacters] = useState([]);
  const [dataSource, setDataSource] = useState([]);

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

  const deleteEpisode = (id) => {
    setLoading(true);
    EpisodeService.deleteEpisode(id)
      .then(() => {
        toastr.success('Episodio eliminado con éxito.');

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

  const getLocations = (pageNumber = 1, pageSizeNumber = 10) => {
    setLoading(true);
    LocationService.getLocations(pageNumber, pageSizeNumber)
      .then((response) => {
        setItems(response.data.items);
        setLoading(false);
      })
      .catch(() => {
        toastr.error('Hubo un error al obtener los lugares.');
        setLoading(false);
      });
  };

  const getCharacters = (pageNumber = 1, pageSizeNumber = 10) => {
    setLoading(true);
    CharacterService.getCharacters(pageNumber, pageSizeNumber)
      .then((response) => {
        setItemsCharacters(response.data.items);
        setLoading(false);
      })
      .catch(() => {
        toastr.error('Hubo un error al obtener los personajes.');
        setLoading(false);
      });
  };

  const getPaginatedRows = (pageNumber, pageSizeNumber) => {
    setPage(pageNumber);
    setPageSize(pageSizeNumber);
    getEpisodes(pageNumber, pageSizeNumber);
  };

  useEffect(() => {
    getEpisodes(page);
    getLocations(1, 200);
    getCharacters(1, 700);
  }, []);

  return (
    <>
      {loading && <Spinner />}

      {!loading && items.length > 0 && itemsCharacters.length > 0 && (
        <EpisodeDialog
          getEpisodes={() => getEpisodes(page)}
          items={items}
          itemsCharacters={itemsCharacters}
        />
      )}

      {!loading && items.length > 0 && itemsCharacters.length > 0 && (
        <Table
          className="mt-1"
          dataSource={dataSource}
          onChange={getPaginatedRows}
          pagination={{ pageSize, total: totalItems, defaultCurrent: page }}
        >
          <Column title="Nombre" dataIndex="name" key="name" />
          <Column
            title="Acciones"
            key="actions"
            render={(data) => {
              return (
                <>
                  <DeleteOutlined
                    className="mr-1"
                    onClick={() => deleteEpisode(data.id)}
                  />
                  <EpisodeDialog
                    type="edit"
                    getEpisodes={() => getEpisodes(page)}
                    idEpisode={data.id}
                    items={items}
                    itemsCharacters={itemsCharacters}
                  />
                </>
              );
            }}
          />
        </Table>
      )}
    </>
  );
};

export default TableEpisode;
