import React from 'react';
import "./suggestedVideos.css";

function SuggestedVideos(props){
    console.log(props);
    if(props.videosObjects === false){
        return(
            <div>
               
            </div>
        );
    }
<<<<<<< HEAD
    else{
        let videos = props.videosObjects.map(function(video){
            return <tr>
                        <td>{video.snippet.title}</td>
                        <img src={video.snippet.thumbnails.default.url}/>
                    </tr>
=======
    else {
        let videos = props.videosObjects.map(function(video, index){
            return (
              <tr className="video-row" onClick={() => {props.videoSelection(index + 1)}}> 
                <td>{video.snippet.title}</td>
                <img className="thumb-img" src={video.snippet.thumbnails.default.url} />
               
              </tr>
            );
>>>>>>> 2c600c611e9c2d4502fcb5dc62dc8ccf7604483a
            
        })
        return(
            <div>
                <div>
<<<<<<< HEAD
=======
                    <h1 className="suggested-title">Suggested Videos</h1>
>>>>>>> 2c600c611e9c2d4502fcb5dc62dc8ccf7604483a
                    <table>
                        <h1>Suggested Videos</h1>
                        {videos}
                    </table>
                </div>
            </div>
        );
    }
}

export default SuggestedVideos;