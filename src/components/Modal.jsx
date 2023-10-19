import { useState } from 'react';
import css from '../css/Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, updateContactThunk } from 'redux/phoneBookReducer';

const Modal = ({ closeModal }) => {
  const [scrollBlocked, setScrollBlocked] = useState(false);
  const id = useSelector(selectId);
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

  const onEditSubmit = event => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const number = event.target.elements.number.value;

    dispatch(updateContactThunk({ name, number, id }));
    event.currentTarget.reset();
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
          <input type="text" name="name" className={css.inputName} />
          <label className={css.labelNumber}>Number</label>
          <input
            type="tel"
            name="number"
            className={css.inputNumber}
            maxLength={13}
            required
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
