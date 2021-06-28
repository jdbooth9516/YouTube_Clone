import React, {Component} from 'react';
import "./createComment.css";


class CreateComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            video_id: '',
            body: '',
            likes: '',
            dislikes: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const comment = {
            video_id: this.props.videoId,
            body: this.state.body,
            likes: 0,
            dislikes: 0
        }
        this.props.addComment(comment);
        this.setState({
            video_id: '',
            body: '',
            likes: '',
            dislikes: ''
        });
    }

    render(){
        return(
            <div>
                <form onSubmit ={this.handleSubmit}>
                    <label>Comment:  </label>
                    <input  className="comment-field" type='text' name='body' onChange={this.handleChange} value={this.state.body}/>
                    <input className="comment-submit" type='submit' value='Submit'/>
                </form>
            </div>
        );
    }
}
export default CreateComment;