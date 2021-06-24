import React, { Component } from "react";
import axios from "axios";

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
      console.log(this.state.comments)
  }

  getComments = async () => { 
    let response = await axios.get(`http://127.0.0.1:8000/comments/`);
    response.data.map((comment) => (
        this.state.comments.push(comment)
    ))
    this.setState({})
  }

  render() {
    return (
      <div className="comment-section">
        {this.state.comments.map((comment) => (
            <div>
                <p>{comment.body}</p>
                <p>{comment.likes}</p>
                <button>like</button>
                <p>{comment.dislikes}</p>
                <button>dislike</button>
            </div>
        ))}
      </div>
    );
  }
}
