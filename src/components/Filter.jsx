import React from 'react';
import css from './Contacts.module.css';

export const Filter = ({ filter, onInputChange }) => {
  return (
    <div className={css.contacts}>
      <h2 className={css.contactsListTitle}>Contacts List</h2>
      <label className={css.labelInputFilter}>Find contacts by name</label>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onInputChange}
        className={css.inputFilter}
      />
    </div>
  );
};
