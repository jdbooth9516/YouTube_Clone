import React, { Component } from 'react'
import axios from 'axios'

export default class Replies extends Component {
    constructor(props){
        super(props)
        this.state = { 
            commentId: props.comment,
            replies: []
        }
    }
    componentDidMount = () => {
        this.getReplies(this.state.commentId)
        
    }

    getReplies = async (commentId) => {
        let response = await axios.get(`http://127.0.0.1:8000/comments-reply/${commentId}/`)
        this.setState({
            replies: response.data
        }) 
    }

    render() {
        return (
            <div className='reply-section'>
                 {this.state.replies.map((reply) => (
                    <div className="reply-block">
                        <p>{reply.body}</p>
                    </div> 
                ))}
            </div>
        )
    }
}
