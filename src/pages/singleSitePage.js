import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSite, siteSelector } from '../slices/site';
import { List, NavBar, Icon } from 'antd-mobile';
import { ImageCarousel } from '../components/imageCarousel';

const Item = List.Item;
const Brief = Item.Brief;

export const SingleSitePage = ({ match }) => {
  const dispatch = useDispatch();
  const { site, loading, hasErrors } = useSelector(
    siteSelector
  );

  useEffect(() => {
    const { id } = match.params;

    dispatch(fetchSite(id))
  }, [dispatch, match]);

  const renderSite = () => {

    if (loading) return <p>Loading site...</p>;
    if (hasErrors) return <p>Unable to display site.</p>;

    const { zipCode, city, street, country, state } = site.address;
    const { firstName, lastName, email, phoneNumber, address, jobTitle } = site.contacts["main"];
    const images = site.images;

    return (
      <List className="my-list">
        <NavBar
          icon={<Link to={`/sites`}><Icon type="left" color="#FFF" /></Link>}
        >{site.title}</NavBar>
        <Item>
          <Brief style={{ color: '#000' }}>{`${street}, ${city}, ${state}, ${country}, ${zipCode}`}</Brief>
        </Item>
        <Item>
          <ImageCarousel images={images} />
        </Item>
        <Item>{`${firstName} ${lastName}`}
          <Brief>{jobTitle}</Brief>
          <Brief>{`Tel: ${phoneNumber}`}</Brief>
          <Brief>{`Email: ${email}`}</Brief>
          <Brief>{`Address Info: ${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zipCode}`}</Brief>
        </Item>
      </List>
    );
  }

  return (
    <section>
      {renderSite()}
    </section>
  );
}