import React from 'react';
import css from '../css/PhonebookList.module.css';

export const ContactList = ({ contacts, onDeletePost, openModal }) => {
  return (
    <div className={css.phoneBookContainer}>
      <ul className={css.phoneBookList}>
        {contacts.map(contact => (
          <li className={css.phoneBookItem} key={contact.id}>
            <div className={css.paragraphContainer}>
              <p>{contact.name}</p>
              <p>{contact.number}</p>
            </div>
            <div className={css.phoneBookBtnContainer}>
              <button
                type="button"
                onClick={() => onDeletePost(contact.id)}
                className={css.phoneBookDeleteButton}
              >
                Delete
              </button>
              <button
                type="button"
                className={css.phoneBookEdit}
                onClick={() => openModal(contact.id)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
