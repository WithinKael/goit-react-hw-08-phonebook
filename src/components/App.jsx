import React, { useEffect } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from 'pages/Home';
import Contacts from 'pages/Contacts';
import LogIn from 'pages/LogIn';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';
import { requestAutoLogin, requestLogOut, selectSignIn } from 'redux/authSlice';
import css from '../css/App.module.css';
import RestrictedRoute from './RestrictedRoute';
import ProtectedRoute from './ProtectedRoute';
import { Watch } from 'react-loader-spinner';

export const App = () => {
  const isSignedIn = useSelector(selectSignIn);
  const isLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch();

  const onBtnLogOutClick = () => {
    dispatch(requestLogOut());
  };

  useEffect(() => {
    dispatch(requestAutoLogin());
  }, [dispatch]);

  return (
    <div>
      <header>
        <nav className={css.navigation}>
          <div className={css.navlinkcontainer}>
            <NavLink to="/" className={css.navLink}>
              Home
            </NavLink>
            {isSignedIn ? (
              <NavLink to="/contacts" className={css.navLink}>
                Contacts
              </NavLink>
            ) : (
              <>
                <NavLink to="/register" className={css.navLink}>
                  Register
                </NavLink>
                <NavLink to="/login" className={css.navLink}>
                  Login
                </NavLink>
              </>
            )}
          </div>
          {isSignedIn ? (
            <button
              type="button"
              className={css.logoutButton}
              onClick={onBtnLogOutClick}
            >
              LOG OUT
            </button>
          ) : null}
        </nav>
      </header>
      {isLoading ? (
        <div className={css.centeredContainer}>
          <Watch
            height="80"
            width="80"
            radius="48"
            color="#333"
            ariaLabel="watch-loading"
            wrapperStyle={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute redirectTo="/contacts">
                  <Register />
                </RestrictedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/contacts">
                  <LogIn />
                </RestrictedRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <ProtectedRoute>
                  <Contacts />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      )}
    </div>
  );
};
