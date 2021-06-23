import React, { Component } from 'react'

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
               <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name='searchValue' onChange={this.handleChange} value={this.searchValue}/>
                    <button type="submit">Search</button>
               </form>
            </div>
        )
    }
}
