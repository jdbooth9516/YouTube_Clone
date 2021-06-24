import React from 'react'


export default function TitleBar(props) {
    if(props.currentVideo === undefined) {
        return (
            <div>
                
            </div>
        )
    } else {
        return (
            <div>
                <h3>{props.currentVideo.snippet.title}</h3> <br/>
                <p>{props.currentVideo.snippet.description} </p>
            </div>
        )
    }
}
