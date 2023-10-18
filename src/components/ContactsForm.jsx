import React, { useState } from 'react';
import { nanoid } from 'nanoid';

export const ContactsForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const onInputChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value.trim());
        break;
      case 'phone':
        setPhone(event.target.value.trim());
        break;
      default:
        break;
    }
  };

  const onBtnSubmit = event => {
    event.preventDefault();

    if (name === '' || phone === '') {
      alert('Enter your data');
      return;
    }

    const newContact = { id: nanoid(), name, phone };
    onAddContact(newContact);

    setPhone('');
    setName('');
  };

  return (
    <form onSubmit={onBtnSubmit} className="form">
      <label className="label-name">Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onInputChange}
        className="input-name"
      />
      <label className="label-number">Number</label>
      <input
        type="tel"
        name="phone"
        value={phone}
        onChange={onInputChange}
        className="input-number"
      />
      <button className="btnAddContact" type="submit">
        Add Contact
      </button>
    </form>
  );
};
