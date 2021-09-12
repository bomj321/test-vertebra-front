import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const CharacterCard = ({ item }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="character" src={item.image} />}
    >
      <Meta title={item.name} description={item.gender} />
    </Card>
  );
};

export default CharacterCard;
