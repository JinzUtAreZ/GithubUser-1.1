import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
  const [text, setText] = useState('');

  const onSubmitSearch = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter something', 'Alert');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  const onChangeSearch = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmitSearch} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users here..."
          value={text}
          onChange={onChangeSearch}
        />

        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
