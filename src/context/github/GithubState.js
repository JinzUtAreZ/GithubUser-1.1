import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  GET_ALL_USERS,
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // load all users from github

  useEffect(() => {
    //// ComponentdidMount Effect

    const loadAllUsers = async () => {
      setLoading();
      const res = await axios.get(`http://api.github.com/users?client_id=$
        {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
        {process.emv.REACT_APP_GITHUB_CLIENT_SECRET}`);
      //console.log(res.data);
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      });
    };
    loadAllUsers();
  }, []);

  //// search users in github
  const searchUsers = async text => {
    setLoading();

    const res = await axios.get(
      `http://api.github.com/search/users?q=${text}&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.emv.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //console.log(res.data.items);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  // get single github user data
  const getUser = async username => {
    setLoading();
    //console.log(username);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //console.log(res.data);
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // get single github user repo data
  const getUserRepos = async username => {
    setLoading();
    //console.log(username);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //console.log(res.data);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // clear users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        alert: state.alert,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
        //loadAllUsers
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
