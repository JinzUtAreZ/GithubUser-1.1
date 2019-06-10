import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContext);
  const [text, setText] = useState('');

  const onSubmitSearch = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter something', 'Alert');
    } else {
      githubContext.searchUsers(text);
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
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default Search;
