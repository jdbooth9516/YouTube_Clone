import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import Replies from "../Replies/Replies";
import axios from "axios";
import CreateComment from "../CreateComment/createComment";
import CreateReplies from "../createReplies/createReplies";
import "./Comments.css";


export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      replyVisible: false,
      comments: [],
      filteredComments: [],
    };
  }

  componentDidMount = () => {
    this.getComments();
    console.log(this.state.comments);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.videoId !== this.props.videoId) {
      this.getComments();
    }
  }

  getComments = async () => {
    let response = await axios.get(`http://127.0.0.1:8000/comments/`);
    if (this.state.comments !== 0) {
      this.setState({
        comments: [],
      });
      response.data.map(
        (comment) => (
          this.state.comments.push(comment), console.log(response.data)
        )
      );
    } else {
      response.data.map(
        (comment) => (
          this.state.comments.push(comment), console.log(response.data)
        )
      );
    }
    this.filterComments();
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

  showForm = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  addComment = async (comment) => {
    await axios.post("http://127.0.0.1:8000/comments/", comment);
    let response = await this.getComments();
    if (response === undefined) {
      this.setState({});
    } else {
      this.setState({
        comments: response.data,
      });
    }
  };

  addReply = async (reply) => {
    let response = await axios.post(
      "http://127.0.0.1:8000/comments-reply/",
      reply
    );

    if (response === undefined) {
      this.setState({});
    } else {
      this.setState({
        comments: response.data,
      });
      this.updateWindow();
    }
  };

  filterComments = () => {
    console.log("running");
    console.log(this.props.videoId);
    let filter = this.state.comments.filter((comment) =>
      comment.video_id.includes(this.props.videoId)
    );
    if (this.state.filteredComments.length !== 0) {
      this.setState({
        filteredComments: [],
        filteredComments: filter,
      });
    } else {
      this.setState({
        filteredComments: filter,
      });
    }
  };

  updateWindow = () => {
    this.forceUpdate();
    this.props.appUpdate();
    this.setState({})
  };

  render() {
    return (
      <div className="comment-section">
        <div>
          <button
            className="comment-btn"
            onClick={() => {
              this.showForm();
            }}
          >
            Add Comment
          </button>
          {this.state.visible ? (
            <CreateComment
              addComment={this.addComment}
              videoId={this.props.videoId}
            />
          ) : null}
        </div>
        {this.state.filteredComments.map((comment, index) => (
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
              {/* maybe move the visblepart to the actually reply class */}
              <Replies comment={comment.id} addReply={this.addReply} updateWindow={this.updateWindow} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
