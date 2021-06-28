import React, { Component } from "react";
import "./craeteReplies.css"

class CreateReplies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: props.comment,
      body: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const reply = {
      comment: this.props.comment,
      body: this.state.body,
    };
    this.props.addReply(reply);
    this.props.updateWindow();
    this.setState({
      comment: this.props.comment,
      body: "",
    });
    
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Reply: </label>
          <input
            className="reply-field"
            type="text"
            name="body"
            onChange={this.handleChange}
            value={this.state.body}
          />
          <input className="reply-submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default CreateReplies;
