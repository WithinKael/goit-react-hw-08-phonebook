import React, { useEffect } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from 'pages/Home';
import Contacts from 'pages/Contacts';
import LogIn from 'pages/LogIn';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';
import { requestAutoLogin, requestLogOut, selectSignIn } from 'redux/authSlice';
import css from './App.module.css';
import RestrictedRoute from './RestrictedRoute';
import ProtectedRoute from './ProtectedRoute';

export const App = () => {
  const isSignedIn = useSelector(selectSignIn);
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
              className={css.logoutbtn}
              onClick={onBtnLogOutClick}
            >
              Log Out
            </button>
          ) : null}
        </nav>
      </header>
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
    </div>
  );
};
