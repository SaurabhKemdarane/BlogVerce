import React from 'react';
import logo from './Assets/logo.png';

function Logo({ width = '100px', height = 'auto' }) {
  return (
    <div>
      <img src={logo} alt="BlogVerce" style={{ width: width, height: height }} />
    </div>
  );
}

export default Logo;
