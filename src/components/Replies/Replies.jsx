import React, { Component } from 'react';
import axios from 'axios';
import CreateReplies from '../createReplies/createReplies';
import './Replies.css';

export default class Replies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblity: false,
      addVisiblity: false,
      commentId: props.comment,
      replies: [],
    };
  }
  componentDidMount = () => {
    this.getReplies(this.state.commentId);
  };

  getReplies = async (commentId) => {
    let response = await axios.get(
      `http://127.0.0.1:8000/comments-reply/${commentId}/`
    );
    this.setState({
      replies: response.data,
    });
    this.updateWindow()
  };

  makeVisible = () => {
    this.setState({
      visiblity: !this.state.visiblity,
    });
  };

  addReplyVisible = () => {
    this.setState({
      addVisiblity: !this.state.addVisiblity,
    });
  };

  updateWindow = () => {
    // this.getReplies(this.state.commentId);
    this.forceUpdate();
  };

  render() {
    return (
      <div className="reply-section">
        <button className='replies-btn'
          onClick={() => {
            this.makeVisible();
          }}
        >
          view replies
        </button>
        {this.state.visiblity ? (
          <div className="reply-section">
            {this.state.replies.map((reply) => (
              <div className="reply-block">
                <p className="reply-body">{reply.body}</p>
              </div>
            ))}

            <button className='replies-btn'
              onClick={() => {
                this.addReplyVisible();
              }}
            >
              Reply
            </button>
          </div>
        ) : null}

        {this.state.addVisiblity ? (
          <CreateReplies
            addReply={this.props.addReply}
            getReply={this.getReplies}
            comment={this.state.commentId}
            updateWindow={() => {this.updateWindow()}}
          />
        ) : null}
      </div>
    );
  }
}
