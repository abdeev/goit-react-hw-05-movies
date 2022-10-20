import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Error.module.css';

const Error = () => {
  return (
    <div className={css.container}>
      <h1 className={css.errorTitle}>
        Unfortunately, we didn't find anything for this query 😔
      </h1>
      <NavLink className={css.goBackLink} to={'/'}>
        To the main page
      </NavLink>
    </div>
  );
};

export default Error;
