// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import type { RouterHistory } from "react-router-dom";
import { setSearchTerm } from "./actionCreators";

class Landing extends Component {
  props: {
    searchTerm: string,
    handleSearchTermChange: Function,
    history: RouterHistory
  };

  goToSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    this.props.history.push("/search");
  };
  // TODO create action to reset search term when back button submitted
  render() {
    return (
      <div className="app">
        <div className="landing">
          <h1>My Video</h1>
          <form onSubmit={this.goToSearch}>
            <input
              onChange={this.props.handleSearchTermChange}
              value={this.props.searchTerm}
              type="text"
              placeholder="Search"
            />
          </form>
          <Link to="/search">Or Browse All</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ searchTerm: state.searchTerm });
const mapDispatchToProps = (dispatch: Function) => ({
  handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
