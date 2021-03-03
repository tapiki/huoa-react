//Dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Components, assets, actions, styles etc..
import NavItem from './NavItem';
import { ReactComponent as HUOALogo } from '../../assets/huoa-logo.svg';

const Navbar = () => {
  const [ navState, setNavState ] = useState(false);
  const { routes } = useSelector((state) => state.router);

  const renderMenuItems = (children) => {
    return children.map((item) => (
      <Link
        className="navbar__dropdown--link"
        to={item.slug}
        onClick={() => setNavState(false)}
        key={item.slug}
        data-text={item.title}
      >
        {item.title}
      </Link>
    ));
  };

  const renderNavItems = (items) => {
    return items.map((item) => {
      return item.slug !== 'home' && (
        <NavItem
          name={item.title}
          linkTo={item.slug}
          key={item.slug}
          navState={navState}
          setNavState={setNavState}
        >
          {!!item.children.length && (
            <div className="navbar__dropdown">
              <ul className="navbar__dropdown--links">
                {renderMenuItems(item.children)}
              </ul>
            </div>
          )}
        </NavItem>
      );
    });
  };

  return !!routes && (
    <nav className="navbar__container">
      <div className="navbar__container--sm" onMouseLeave={() => setNavState(false)}>
        <Link to="/">
          <div className="navbar__header">
            <HUOALogo className="navbar__logo" />
            <div className="navbar__titles">
              {/* TODO: need to make this dynamic */}
              <h2 className="navbar__title">Hawaii United Okinawa Association</h2>
              <h5 className="navbar__title--sm">Celebrating 120 years of Uchinanchu in Hawaii</h5>
            </div>
          </div>
        </Link>
        <ul className="navbar__items" onMouseLeave={() => setNavState(false)}>
          {renderNavItems(routes)}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
