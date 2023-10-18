import React from 'react';

export const ContactList = ({ contacts, onDeletePost }) => {
  return (
    <div className="listContactsContainer">
      <ul className="listContacts">
        {contacts.map(contact => (
          <li className="listContactsItem" key={contact.id}>
            {contact.name}: {contact.phone}
            <button
              type="button"
              onClick={() => onDeletePost(contact.id)}
              className="deleteBtn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
