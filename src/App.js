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
    }
  }
  //need to build out the search function and input where query is 
  getSearchResults  = async (search) => { 
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${search}&key=AIzaSyCoqGH89zTrGir_zyhiiW6qFlhs_mGbm7M&part=snippet`)
    response.data.items.map((item) => (
      this.state.videoIds.push(item.id.videoId),
      this.state.videoObjects.push(item)
    ))
    this.setState({});
    console.log(this.state.videoIds);
    }
    //   videoId: '', // put pathing to the video id here. 
    // })


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
            src={`https://www.youtube.com/embed/${this.state.videoIds[0]}?autoplay=0&origin=http://example.com`}
            frameborder="0"></iframe>
        </div>
          <div>
            <SuggestedVideos videosObjects={this.state.videoObjects.slice(1,5)} />
          </div>
      </div>
    )
  }
}

export default App

