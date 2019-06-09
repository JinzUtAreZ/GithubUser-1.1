import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  state = {
    text: ''
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  //    onSubmitSearch(e){
  //        e.preventDefault();
  //        onSubmit={this.onSubmitSearch.bind(this)}  // pasted in form tag
  //    }

  onSubmitSearch = e => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'Alert');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    }
  };

  onChangeSearch = e => {
    this.setState({ text: e.target.value }); //// single
    // this.setState({ [e.target.name]: e.target.value }) //// multiple
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitSearch} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users here..."
            value={this.state.text}
            onChange={this.onChangeSearch}
          />

          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {this.props.showClear && (
          <button
            className="btn btn-light btn-block"
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
