import React from 'react';
import css from '../css/Filter.module.css';

export const Filter = ({ filter, onInputChange }) => {
  return (
    <div className={css.contacts}>
      <h2 className={css.contactsFilterTitle}>Contacts List</h2>
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
