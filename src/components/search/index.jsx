import './style.css'

const Search = () => {
    return (
        <form className="search">
            <input name='search' placeholder="Search Recipes" id='search-input' />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search;