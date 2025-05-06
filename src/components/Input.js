import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Input = (props) => {
  const [value, setValue] = useState(props.initialValue || '');

  const onChangeText = (text) => {
    setValue(text);
    props.onInputChanged(props.id, text);
  };

  const getIcon = () => {
    switch (props.icon) {
      case 'user-o':
        return <FaUser className="text-gray-400" />;
      case 'mail':
        return <FaEnvelope className="text-gray-400" />;
      case 'lock':
        return <FaLock className="text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {props.label}
      </label>

      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {getIcon()}
        </div>
        <input
          {...props}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => onChangeText(e.target.value)}
          value={value}
        />
      </div>

      {props.errorText && (
        <div className="mt-1">
          <p className="text-sm text-red-600">{props.errorText}</p>
        </div>
      )}
    </div>
  );
};

export default Input; 