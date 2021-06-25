import axios from 'axios'
import React, { Component } from 'react'
import SearchBar from './components/SearchBar/SearchBar';
import SuggestedVideos from './components/SuggestedVideos/suggestedVideos';
import TitleBar from './components/TitleBar/TitleBar';
import Comments from './components/Comments/Comments';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      videoIds: [],
      videoObjects: [],
      currentVideo: "67gYEK4FtzA",
      currentVideoObj: null,
    };
  }
  //need to build out the search function and input where query is 
  getSearchResults  = async (search) => { 
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${search}&type=video&key=AIzaSyBfujvtTWvjKZ1BnAuWjb9RU5h3pYkeeQc&part=snippet`
    );
    if (this.state.videoObjects.length !== 0) {
      this.setState({
        videoIds: [],
        videoObjects: []
      })
    }

    response.data.items.map((item) => (
      this.state.videoIds.push(item.id.videoId),
      this.state.videoObjects.push(item)
    ))
<<<<<<< HEAD
    this.setState({});
    console.log(this.state.videoIds);
    }
    //   videoId: '', // put pathing to the video id here. 
    // })
=======
    if (this.state.currentVideo === '') {
      this.setState({
        currentVideo: this.state.videoIds[0],
        currentVideoObj: this.state.videoObjects[0]
      });
   }
  }
  
  getVideoSelection = (selection) => {
    this.setState ({
      currentVideo: this.state.videoIds[selection],
      currentVideoObj: this.state.videoObjects[selection]
    });
    this.getSearchResults(this.state.videoObjects[selection].snippet.title);
    setTimeout (() => { 
      this.setState({})
    }, 1200)
  }
>>>>>>> 2c600c611e9c2d4502fcb5dc62dc8ccf7604483a


  render() {
    return (
      <div>
        <div className="nav-bar">
          <div className="logo">
            <h2> YouClone </h2>
          </div>
          <div className="search-bar">
            <SearchBar getSearchResults={this.getSearchResults} />
          </div>
        </div>
        <div className="video-container">
          <div className="video-player">
            <iframe
              id="ytplayer"
              type="text/html"
              width="854"
              height="480"
              src={`https://www.youtube.com/embed/${this.state.currentVideo}?autoplay=0&origin=http://example.com`}
              // `https://www.youtube.com/embed/${this.state.currentVideo}?autoplay=0&origin=http://example.com`
              frameborder="0"
            ></iframe>
          </div>

          <div className="suggestedSection">
            <SuggestedVideos
              videosObjects={this.state.videoObjects.slice(1, 5)}
              videoSelection={this.getVideoSelection}
            />
          </div>
        </div>
        <div className="info-area">
          {this.state.currentVideoObj ? (
            <TitleBar currentVideo={this.state.currentVideoObj} />
          ) : null}
        </div>
        <div>
        {/* <div>{this.state.currentVideoObj ? <Comments videoId={this.state.currentVideo}/> : null} */}
        <Comments videoId={this.state.currentVideo}/>
        </div>
      </div>
    );
  }
}

export default App

