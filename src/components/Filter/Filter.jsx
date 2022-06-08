import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ value, inputFilterContact }) => {
  return (
    <label>
      <p className={s.text}>Find contact by name</p>
      <input
        type="text"
        value={value}
        onChange={inputFilterContact}
        className={s.input}
      ></input>
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  inputFilterContact: PropTypes.func.isRequired,
};

export default Filter;
