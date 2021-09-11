import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import CharacterCard from '../components/CharacterCard';

const Character = () => {
  const style = { padding: '8px 0' };

  return (
    <Row gutter={16} justify="space-between" align="middle">
      <Col className="gutter-row" span={8}>
        <div style={style}>
          <CharacterCard />
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
          <CharacterCard />
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
          <CharacterCard />
        </div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div style={style}>
          <CharacterCard />
        </div>
      </Col>
    </Row>
  );
};

export default Character;
