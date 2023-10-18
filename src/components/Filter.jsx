import React from 'react';

export const Filter = ({ filter, onInputChange }) => {
  return (
    <div className="contacts">
      <h2 className="contactsListTitle">Contacts List</h2>
      <label className="labelInputFilter">Find contacts by name</label>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onInputChange}
        className="inputFilter"
      />
    </div>
  );
};
