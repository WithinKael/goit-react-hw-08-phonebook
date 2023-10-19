import React from 'react';
import { requestLogIn } from 'redux/authSlice';
import { useDispatch } from 'react-redux';
import css from '../components/App.module.css';

const LogIn = () => {
  const dispatch = useDispatch();

  const handleLogInSubmit = event => {
    event.preventDefault();

    const email = event.currentTarget.elements.email.value;
    const password = event.currentTarget.elements.password.value;
    dispatch(requestLogIn({ email, password }));
    event.currentTarget.reset();
  };

  return (
    <div>
      <h1 className={css.titlePage}>Login Page</h1>
      <form className={css.form} onSubmit={handleLogInSubmit}>
        <label className={css.labelName}>Email</label>
        <input type="text" name="email" className={css.inputName} />
        <label className={css.labelNumber}>Password</label>
        <input
          type="password"
          name="password"
          required
          className={css.inputNumber}
        />
        <button className={css.btnAddContact} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
