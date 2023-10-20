import { useState } from 'react';
import css from '../css/Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, updateContactThunk } from 'redux/phoneBookReducer';

const Modal = ({ closeModal }) => {
  const [scrollBlocked, setScrollBlocked] = useState(false);
  const contact = useSelector(selectId);
  const [form, setForm] = useState({
    name: contact.name,
    number: contact.number,
  });
  const dispatch = useDispatch();

  const disableScroll = () => {
    if (!scrollBlocked) {
      document.body.style.overflow = 'hidden';
      setScrollBlocked(true);
    }
  };

  const enableScroll = () => {
    if (scrollBlocked) {
      document.body.style.overflow = 'auto';
      setScrollBlocked(false);
    }
  };

  const handleChangeInput = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onEditSubmit = event => {
    event.preventDefault();

    dispatch(updateContactThunk({ ...form, id: contact.id }));
    closeModal();
    enableScroll();
  };

  const handleCloseModal = () => {
    closeModal();
    enableScroll();
  };

  disableScroll();

  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <form onSubmit={onEditSubmit} className={css.form}>
          <label className={css.labelName}>Name</label>
          <input
            type="text"
            name="name"
            className={css.inputName}
            value={form.name}
            onChange={handleChangeInput}
          />
          <label className={css.labelNumber}>Number</label>
          <input
            type="tel"
            name="number"
            className={css.inputNumber}
            maxLength={13}
            required
            value={form.number}
            onChange={handleChangeInput}
          />
          <button className={css.btnAddContact} type="submit">
            Edit
          </button>
          <button className={css.btnCloseModal} onClick={handleCloseModal}>
            &times;
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
