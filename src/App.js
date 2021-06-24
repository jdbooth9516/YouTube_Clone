import './App.css';
import axios from 'axios'
import React, { Component } from 'react'
import SearchBar from './components/SearchBar/SearchBar';
import SuggestedVideos from './components/SuggestedVideos/suggestedVideos';

export class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      videoIds: [],
      videoObjects: [],
      currentVideo: ''
    }
  }
  //need to build out the search function and input where query is 
  getSearchResults  = async (search) => { 
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${search}&type=video&key=AIzaSyCoqGH89zTrGir_zyhiiW6qFlhs_mGbm7M&part=snippet`)
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
    if (this.state.currentVideo === '') {
      this.setState({
        currentVideo: this.state.videoIds[0]
      });
   }
  }
  
  getVideoSelection = (selection) => {
    this.setState ({
      currentVideo: this.state.videoIds[selection]
    });
    this.getSearchResults(this.state.videoObjects[selection].snippet.title);
    setTimeout (() => { 
      this.setState({})
    }, 1200)
  }


  render() {
    return (
      <div>
        <div className="nav-bar">
          <div className="logo">
            <h1> YouClone</h1>
          </div>
          <div className="search-bar">
            <SearchBar getSearchResults={this.getSearchResults}/>
          </div>
        </div>

        <div className='video-player'>
          <iframe id="ytplayer" type="text/html" width="640" height="360"
            src={`https://www.youtube.com/embed/${this.state.currentVideo}?autoplay=0&origin=http://example.com`}
            frameborder="0"></iframe>
        </div>
          <div className='suggestedSection'>
            <SuggestedVideos videosObjects={this.state.videoObjects.slice(1,5)} videoSelection={this.getVideoSelection}/>
          </div>
      </div>
    )
  }
}

export default App

