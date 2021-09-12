import React from 'react';
import { Card } from 'antd';

const LocationCard = ({ item }) => {
  return (
    <Card title={item.name} bordered={false}>
      <p>
        Dimensión:
        <span className="bold"> {item.dimension}</span>
      </p>
      <p>
        Tipo:
        <span className="bold"> {item.type}</span>
      </p>
    </Card>
  );
};

export default LocationCard;
