import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <header className={css.layoutHeader}>
        <div className={css.container}>
          <NavLink className={css.layoutLink} to="/" end>
            Home
          </NavLink>
          <NavLink className={css.layoutLink} to="movies">
            Movies
          </NavLink>
        </div>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
export default Layout;
