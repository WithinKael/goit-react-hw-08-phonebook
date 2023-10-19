import React from 'react';
import css from './Contacts.module.css';

export const ContactList = ({ contacts, onDeletePost }) => {
  return (
    <div className={css.listContactsContainer}>
      <ul className={css.listContacts}>
        {contacts.map(contact => (
          <li className={css.listContactsItem} key={contact.id}>
            {contact.name}: {contact.number}
            <button
              type="button"
              onClick={() => onDeletePost(contact.id)}
              className={css.deleteBtn}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
