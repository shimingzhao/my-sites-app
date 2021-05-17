import React from 'react';
import { Link } from 'react-router-dom';
import { Card, WhiteSpace } from 'antd-mobile';

export const Site = ({ site }) => {
  const { zipCode, city, street, country, state } = site.address;
  const { firstName, lastName } = site.contacts['main'];
  return (
    <div>
      <WhiteSpace size="lg" />
      <Card full>
        <Link to={`/sites/${site.id}`}>
          <Card.Header
            title={site.title}
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          />
        </Link>
        <Card.Body>
          <div>{`${street}, ${city}, ${state}, ${country}, ${zipCode}`}</div>
        </Card.Body>
        <Card.Footer content={`${firstName} ${lastName}`} />
      </Card>
    </div>
  );
};
