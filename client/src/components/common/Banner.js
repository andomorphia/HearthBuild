import React from 'react';
import PropTypes from 'prop-types';

const Banner = ({ title, subtitle, bannerClass }) => (
  <div className={`banner ${bannerClass}`}>
    <div className="container">
      <div className="content">
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  </div>
);

Banner.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Banner;
