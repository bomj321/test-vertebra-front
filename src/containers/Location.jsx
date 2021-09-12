import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import 'antd/dist/antd.css';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

import LocationCard from '../components/LocationCard';
import Spinner from '../components/Spinner';

// Services
import LocationService from '../services/LocationService';

const Location = () => {
  const style = { padding: '8px 0' };

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getLocations = (pageNumber = 1, pageSizeNumber = 10) => {
    setLoading(true);
    LocationService.getLocations(pageNumber, pageSizeNumber)
      .then((response) => {
        setItems(response.data.items);
        setTotalItems(response.data.meta.totalItems);
        setLoading(false);
      })
      .catch(() => {
        toastr.error('Hubo un error al obtener los lugares.');
        setLoading(false);
      });
  };

  const getPaginatedRows = (pageNumber, pageSizeNumber) => {
    setPage(pageNumber);
    setPageSize(pageSizeNumber);
    getLocations(pageNumber, pageSizeNumber);
  };

  useEffect(() => {
    getLocations(page);
  }, []);

  return (
    <>
      {loading && <Spinner />}

      {!loading && (
        <>
          <Row gutter={16} justify="space-between" align="middle">
            {items.map((item) => (
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
                key={item.id}
              >
                <div style={style}>
                  <LocationCard item={item} />
                </div>
              </Col>
            ))}
          </Row>
          <Row gutter={16} justify="center" align="middle">
            <Col>
              <Pagination
                total={totalItems}
                pageSize={pageSize}
                defaultCurrent={page}
                onChange={getPaginatedRows}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Location;
