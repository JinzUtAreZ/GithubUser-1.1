import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import githubContext from './githubContext';
import { SEARCH_USERS } from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //// search users in github
  const searchUsers = async text => {
    setLoading();

    const res = await axios.get(
      `http://api.github.com/search/users?q=${text}&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.emv.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data
    });
  };

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        alert: state.alert
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
