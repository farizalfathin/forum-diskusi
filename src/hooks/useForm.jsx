import { useState } from 'react';
import PropTypes from 'prop-types';

export default function useForm(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = ({ target }, key) => {
    setValue((prevState) => ({
      ...prevState,
      [key]: target.value,
    }));
  };

  return [value, onChange];
}

useForm.propTypes = {
  initialValue: PropTypes.object.isRequired,
};
