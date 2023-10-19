import React from 'react';
import { useDispatch } from 'react-redux';
import { requestRegister } from 'redux/authSlice';
import css from '../css/Register.module.css';

const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const email = event.currentTarget.elements.email.value;
    const name = event.currentTarget.elements.name.value;
    const password = event.currentTarget.elements.password.value;
    dispatch(requestRegister({ email, name, password }));
    event.currentTarget.reset();
  };

  return (
    <div>
      <h1 className={css.titleRegister}>Register Page</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.labelName}>Email</label>
        <input type="text" name="email" className={css.inputName} required />
        <label className={css.labelName}>Name</label>
        <input type="text" name="name" className={css.inputName} required />
        <label className={css.labelNumber}>Password</label>
        <input
          type="password"
          name="password"
          className={css.inputNumber}
          required
          minLength={7}
        />
        <button className={css.btnAddContact} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
