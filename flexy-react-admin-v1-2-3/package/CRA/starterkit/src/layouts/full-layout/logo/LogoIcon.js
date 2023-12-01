import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from '../../../assets/images/logos/logo-dark.svg';
import { ReactComponent as LogoLight } from '../../../assets/images/logos/logo-white.svg';

const LogoIcon = () => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <Link underline="none" to="/">
      {customizer.activeMode === 'dark' ? <LogoLight /> : <LogoDark />}
    </Link>
  );
};

export default LogoIcon;
