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
    else {
        let videos = props.videosObjects.map(function(video, index){
            return (
              <tr className="video-row" onClick={() => {props.videoSelection(index + 1)}}> 
                <a>{video.snippet.title}
                <img className="thumb-img" src={video.snippet.thumbnails.default.url} />
               </a>
              </tr>
            );
            
        })
        return(
            <div>
                <div>
                    <h1 className="suggested-title">Suggested Videos</h1>
                    <table>
                        {videos}
                    </table>
                </div>
            </div>
        );
    }
}

export default SuggestedVideos;