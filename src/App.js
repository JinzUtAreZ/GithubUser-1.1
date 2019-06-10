import React, { Fragment, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import GithubState from './context/github/GithubState';

const App = () => {
  const [alert, showAlert] = useState(null);

  // // load all users from github
  // async function loadAllUsers() {
  //   setLoading(true);
  //   const res = await axios.get(`http://api.github.com/users?client_id=$
  //     {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
  //     {process.emv.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   console.log(res.data);
  //   setUsers(res.data);
  //   console.log(setUsers.length);
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   //// ComponentdidMount Effect
  //   loadAllUsers();
  // }, []);

  // Validation alert
  const setAlert = (msg, type) => {
    showAlert({ msg, type });
    setTimeout(() => showAlert(null), 3000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search setAlert={setAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
