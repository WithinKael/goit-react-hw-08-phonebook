import React, { useEffect } from 'react';
import { ContactsForm } from './ContactsForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import {
  setFilter,
  requestContactsThunk,
  addContactThunk,
  deleteContactThunk,
  selectContacts,
  selectFilter,
  // selectIsLoading,
  // selectError,
} from 'redux/phoneBookReducer';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  // const isLoading = useSelector(selectIsLoading);
  // const error = useSelector(selectError);

  const dispatch = useDispatch();

  const onInputChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const onAddContact = contact => {
    const isDuplicateName = contacts.some(
      existingContact =>
        existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isDuplicateName) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    dispatch(addContactThunk(contact));
  };

  const onDeletePost = postId => {
    dispatch(deleteContactThunk(postId));
  };

  const inputFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  const contactsToInput = inputFilter();

  useEffect(() => {
    dispatch(requestContactsThunk());
  }, [dispatch]);

  return (
    <div>
      <h1 className="titlePhoneBook">Phonebook</h1>
      <ContactsForm contacts={contacts} onAddContact={onAddContact} />

      <Filter filter={filter} onInputChange={onInputChange} />
      <ContactList contacts={contactsToInput} onDeletePost={onDeletePost} />
    </div>
  );
};
