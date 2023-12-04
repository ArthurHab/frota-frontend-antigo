import React, { useEffect } from 'react';

const Notification = ({ text, type, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onRemove]);

  let backgroundColor;
  if (type === 'error') {
    backgroundColor = 'bg-red-200';
  } else if (type === 'alert') {
    backgroundColor = 'bg-yellow-200';
  } else {
    backgroundColor = 'bg-green-200';
  }

  return (
    <div
      className={`top-6 right-6 p-3 rounded-md mt-4 ${backgroundColor} shadow-md`}
    >
      {text}
    </div>
  );
};

export default Notification;