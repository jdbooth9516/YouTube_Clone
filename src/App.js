import './App.css';
import axios from 'axios'
import React, { Component } from 'react'
import SearchBar from './components/SearchBar/SearchBar';

export class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      videoId: '',
    }
  }
  //need to build out the search function and input where query is 
  getVideoId = () => { 
    let responss = axios.get('https://www.googleapis.com/youtube/v3/search?q={SEARCH QUERY HERE}&key=AIzaSyCoqGH89zTrGir_zyhiiW6qFlhs_mGbm7M')
    this.setState ({
      videoId: '', // put pathing to the video id here. 
    })
  }

  render() {
    return (
      <div>
        <div className="nav-bar">
          <div className="logo">
            <h1> YouClone</h1>
          </div>
          <div className="search-bar">
            <SearchBar/>
          </div>
        </div>
        
        <div className='video-player'>
          <iframe id="ytplayer" type="text/html" width="640" height="360"
            src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=0&origin=http://example.com"
            frameborder="0"></iframe>
        </div>
      </div>
    )
  }
}

export default App

