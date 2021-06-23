import React, { Component } from 'react'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: 'Search',
        }
    }

    hnadleChange = (event) => { 
        this.setState({
        [event.target.name]: event.target.value,
        });
    }

    handleSumbit = (event) => { 
        event.preventDefault();
        // need to call the search function here. 
    }

    render() {
        return (
            <div className='search-form'>
               <form onSubmit={() => this.handleSumbit()}>
                    <input type="text" name='name' onChange={() => this.handleChange()} value={this.searchValue}/>

               </form>
            </div>
        )
    }
}
