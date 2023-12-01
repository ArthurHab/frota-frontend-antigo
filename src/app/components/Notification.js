// components/Notification.js
import React, { useState, useEffect } from 'react';

const Notification = ({ messages, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return isVisible ? (
    <div className="fixed top-4 right-4 space-y-2">
      {messages.map((message, index) => (
        <div key={index} className="bg-red-500 text-white p-4 rounded-md shadow-md">
          {message}
        </div>
      ))}
    </div>
  ) : null;
};

export default Notification;