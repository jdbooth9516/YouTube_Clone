import React from 'react';

function SuggestedVideos(props){
    console.log(props);
    if(props.videosObjects === false){
        return(
            <div>
                <h1>Suggested Videos</h1>
            </div>
        );
    }
    else{
        let videos = props.videosObjects.map(function(video){
            return <tr>
                    <img src={video.snippet.thumbnails.default.url}/>
                </tr>
            
        })
        return(
            <div>
                <div>
                    <h1>Suggested Videos</h1>
                    <table>
                        {videos}
                    </table>
                </div>
            </div>
        );
    }
}

export default SuggestedVideos;