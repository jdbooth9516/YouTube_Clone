import axios from 'axios'
import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsup } from "@fortawesome/free-regular-svg-icons";
import SearchBar from './components/SearchBar/SearchBar';
import SuggestedVideos from './components/SuggestedVideos/suggestedVideos';
import TitleBar from './components/TitleBar/TitleBar';
import Comments from './components/Comments/Comments';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './components/Replies/Replies.css'


export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      videoIds: [],
      videoObjects: [],
      homeName:"I Live for the S*** Mr. Robot",
      currentVideo: "67gYEK4FtzA",
      currentVideoObj: null,
    };
  }

  componentDidMount = async() => {
    this.getHomeVideo();
    console.log(this.state.currentVideo);
  } 

  getHomeVideo = async() => {
     let response = await axios.get(
       `https://www.googleapis.com/youtube/v3/search?maxResults=1&q=${this.state.homeName}&type=video&key=AIzaSyCoqGH89zTrGir_zyhiiW6qFlhs_mGbm7M&part=snippet`
     );
     response.data.items.map(
       (item) => (
         this.state.videoIds.push(item.id.videoId),
         this.state.videoObjects.push(item)
       )
     );
     this.setState({
       currentVideo: this.state.videoIds[0],
       currentVideoObj: this.state.videoObjects[0],
     });
  }

  //grabs 5 videos display the first
  getSearchResults  = async (search) => { 
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${search}&type=video&key=AIzaSyCoqGH89zTrGir_zyhiiW6qFlhs_mGbm7M
      &part=snippet`
    );
    //clears list in case of a second search
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
      this.setState({
        currentVideo: this.state.videoIds[0],
        currentVideoObj: this.state.videoObjects[0]
      });
  }

  // gets the video that the user clicked on and moves
  getVideoSelection = (selection) => {
    this.setState ({
      currentVideo: this.state.videoIds[selection],
      currentVideoObj: this.state.videoObjects[selection]
    });
    this.getSearchResults(this.state.videoObjects[selection].snippet.title);
    setTimeout (() => { 
      this.setState({})
    }, 800)
  }
  
  appUpdate = () => {
    this.forceUpdate()
    this.setState({})
  }

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
        <Comments videoId={this.state.currentVideo} appUpdate={this.appUpdate}/>
        </div>
      </div>
    );
  }
}

export default App

