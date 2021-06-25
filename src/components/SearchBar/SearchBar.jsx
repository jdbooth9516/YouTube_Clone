import React, { Component } from 'react'
import Button from "react-bootstrap/Button";
import "./SearchBar.css"

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: 'Search',
        }
    }

    handleChange = (event) => { 
        this.setState({
        [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => { 
        event.preventDefault();
        this.props.getSearchResults(this.state.searchValue) 
    }

    render() {
        return (
            <div className='search-form'>
               <form className="search" onSubmit={(event) => this.handleSubmit(event)}>
                    <input className='search-bar' type="text" name='searchValue' onChange={this.handleChange} value={this.searchValue}/>
                    <Button className='search-btn' variant='info' type="submit">Search</Button>
               </form>
            </div>
        )
    }
}
