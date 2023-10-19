import React, { useEffect, useState } from 'react';
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
  setIdUser,
} from 'redux/phoneBookReducer';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/Modal';

const Contacts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

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

  const openModal = contactId => {
    setIsOpen(true);
    dispatch(setIdUser(contactId));
  };

  const closeModal = () => {
    setIsOpen(false);
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
      <h1 className="titlePhoneBook">Phonebook</h1>
      <ContactsForm contacts={contacts} onAddContact={onAddContact} />
      <Filter filter={filter} onInputChange={onInputChange} />
      <ContactList
        contacts={filteredContacts}
        onDeletePost={onDeletePost}
        openModal={openModal}
      />
      {isOpen ? <Modal closeModal={closeModal} /> : null}
    </div>
  );
};

export default Contacts;
