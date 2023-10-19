import React, { useEffect } from 'react';
import css from '../css/NotFound.module.css';

const NotFound = () => {
  useEffect(() => {
    // Устанавливаем overflow: hidden для body при монтировании
    document.body.style.overflow = 'hidden';

    // Удаление стиля при размонтировании компонента
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <div className={css.notFoundImage}>
      <div className={css.notFoundTitle}>
        <h1 className={css.fourtyFourth}>404</h1>
        <h1>PAGE NOT FOUND</h1>
      </div>
    </div>
  );
};

export default NotFound;
