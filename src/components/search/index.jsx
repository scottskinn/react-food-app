import { useState } from 'react';
import './style.css'



const Search = (props) => {
    const {getDataFromSearchComponent} = props;

    const [inputValue, setInputValue] = useState('')

    const handleInputValue = (event) => {
        const {value} = event.target;
        setInputValue(value)
    }
    // console.log(inputValue)

    const handleSubmit = (event) => {
        event.preventDefault()
        getDataFromSearchComponent(inputValue)
    }

    return (
        <form onSubmit={handleSubmit} className="search">
            <input 
                name='search' 
                value={inputValue} 
                onChange={handleInputValue} 
                placeholder="Search Recipes" 
                id='search-input' 
            />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search;