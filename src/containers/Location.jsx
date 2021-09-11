import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import LocationCard from '../components/LocationCard';

const Location = () => {
  const style = { padding: '8px 0' };

  return (
    <Row gutter={16} justify="space-between" align="middle">
      <Col className="gutter-row" span={8}>
        <div style={style}>
          <LocationCard />
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
          <LocationCard />
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
          <LocationCard />
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
          <LocationCard />
        </div>
      </Col>
    </Row>
  );
};

export default Location;
