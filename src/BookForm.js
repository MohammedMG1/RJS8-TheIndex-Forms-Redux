import React, { Component } from "react";
import * as actionCreators from "./store/actions"
import { connect } from "react-redux";

class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };
  handelChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  handelSubmit = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.author, this.props.closeModal);
  }

  render() {
    let color = [
      'red',
      'blue',
      'green',
      'white',
      'orange',
      'yellow',
      'black'
    ].map(color => <option value={color}>{color}</option>);
    return (
      <form onSubmit={this.handelSubmit}>
        {!!this.props.errors.length && (
          <div className="alert alert-danger" role="alert">
            {this.props.errors.map(error => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Title</span>
          </div>
        </div>
        <input placeholder="title" name="title" value={this.state.title} onChange={this.handelChange} />
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Color</span>
          </div>

          <select name="color" onChange={this.handelChange}>
            {color}
          </select>
        </div>
        <input type="submit" />
      </form>
    );

  }
}

const mapStateToProps = state => {
  return {
    author: state.rootauthor.author,
    errors: state.rootErrors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (newBook, author, closeModal) =>
      dispatch(actionCreators.postBook(newBook, author, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);

