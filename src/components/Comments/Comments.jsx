import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import Replies from "../Replies/Replies";
import axios from "axios";
import "./Comments.css";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      replyVisible: false,
      comments: [],
    };
  }

  componentDidMount = () => {
    this.getComments();
    console.log(this.state.comments);
  };

  getComments = async () => {
    let response = await axios.get(`http://127.0.0.1:8000/comments/`);
    response.data.map(
      (comment) => (
        this.state.comments.push(comment), console.log(response.data)
      )
    );
    this.setState({});
  };

  updateLikes = async (id, key) => {
    this.state.comments = [];
    await axios.patch(`http://127.0.0.1:8000/comments/${key}/${id}/`);
    let response = await this.getComments();
    if (response === undefined) {
      this.setState({});
    } else {
      this.setState({
        comments: response.data,
      });
    }
  };

  updateDislikes = async (id, key) => {
    this.state.comments = [];
    await axios.patch(`http://127.0.0.1:8000/comments/${id}/${key}/`);
    let response = await this.getComments();
    if (response === undefined) {
      this.setState({});
    } else {
      this.setState({
        comments: response.data,
      });
    }
  };

  makeVisible = () => {
    this.setState({
      replyVisible: !this.state.replyVisible,
    })
    
  }

  render() {
    return (
      <div className="comment-section">
        {this.state.comments.map((comment, index) => (
          <div className="comment-block">
            <p>{comment.body}</p>
            <div className="like-block">
              <p>{comment.likes}</p>
              <FontAwesomeIcon
                onClick={() => {
                  this.updateLikes(comment.video_id, index + 1);
                }}
                icon={faThumbsUp}
                className="thumb"
              />
            </div>
            <div className="like-block">
              <p>{comment.dislikes}</p>
              <FontAwesomeIcon
                onClick={() => {
                  this.updateDislikes(comment.video_id, index + 1);
                }}
                icon={faThumbsDown}
                className="thumb"
              />
            </div>
            <div>
              <button onClick={() => this.makeVisible()}>reply</button>
              {this.state.replyVisible ? (<Replies comment={index + 1} /> ): null}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
