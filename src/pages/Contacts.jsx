import React, { useEffect } from 'react';
import css from '../components/App.module.css';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { ContactsForm } from 'components/ContactsForm';
import {
  deleteContactThunk,
  requestAddContactThunk,
  requestContactsThunk,
  selectContacts,
  selectFilter,
  setFilter,
} from 'redux/phoneBookReducer';
import { useDispatch, useSelector } from 'react-redux';

const Contacts = () => {
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

    dispatch(requestAddContactThunk(contact));
  };

  const onDeletePost = postId => {
    dispatch(deleteContactThunk(postId));
  };

  const getFilteredContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  const filteredContacts = getFilteredContact();

  useEffect(() => {
    dispatch(requestContactsThunk());
  }, [dispatch]);

  return (
    <div>
      <h1 className={css.titlePage}>Phonebook</h1>
      <ContactsForm contacts={contacts} onAddContact={onAddContact} />

      <Filter filter={filter} onInputChange={onInputChange} />
      <ContactList contacts={filteredContacts} onDeletePost={onDeletePost} />
    </div>
  );
};

export default Contacts;
