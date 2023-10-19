import React, { useState } from 'react';
import css from './App.module.css';

export const ContactsForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      default:
        break;
    }
  };

  const onBtnSubmit = event => {
    event.preventDefault();

    if (name === '' || number === '') {
      alert('Enter your data');
      return;
    }

    const newContact = { name, number };
    onAddContact(newContact);

    setNumber('');
    setName('');
  };

  return (
    <form onSubmit={onBtnSubmit} className={css.form}>
      <label className={css.labelName}>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onInputChange}
        className={css.inputName}
      />
      <label className={css.labelNumber}>Number</label>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={onInputChange}
        className={css.inputNumber}
      />
      <button className={css.btnAddContact} type="submit">
        Add Contact
      </button>
    </form>
  );
};
