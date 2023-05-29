import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const UsePasswordToggle = () => {
  const [visibility, setVisibility] = useState(false);
  const Icon = (
    <FontAwesomeIcon
      icon={visibility ? faEyeSlash : faEye}
      onClick={() => setVisibility((visibility) => !visibility)}
      size="lg"
    />
  );
  const InputType = visibility ? 'text' : 'password';
  return [InputType, Icon];
};
export default UsePasswordToggle;
