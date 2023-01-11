import { useState, useEffect, useReducer } from "react";
import Search from "../../components/search";
import RecipeItem from "../../components/recipe-item";
import './style.css';
import FavoriteItem from "../../components/favorite-item";

const reducer = (state, action) => {
    switch (action.type) {
        case 'filterFavorites':
            console.log(action.type)
            return {
                ...state,
                filterValue: action.value,
            };
        default:
            return state;
    }
}

const initialState = {
    filterValue: ''
}

const Homepage = () => {
    // loading state
    const [loadingState, setLoadingState] = useState(false)

    // save the results from the api
    const [recipes, setRecipes] = useState([])

    // favorites data state
    const [favorites, setFavorites] = useState([])

    // state for api success
    const [apiSuccessful, setApiSuccessful] = useState(false)

    // use reducer function
    const [filterState, dispatch] = useReducer(reducer, initialState)

    // this gets data from the search props
    const getDataFromSearchComponent = (getData) => {
        // set loading state to true before calling api
        setLoadingState(true);

        // console.log(getData, 'getData')

        async function getRecipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=c45746bdebd542e3a270596a7bc4ed85&query=${getData}`)
            const result = await apiResponse.json();
            const { results } = result;
            if (results && results.length > 0) {

                setLoadingState(false)
                setRecipes(results)
                setApiSuccessful(true)
            }

            console.log(result)
        }

        getRecipes()
    };

    // console.log(loadingState, recipes, 'loading state and recipes')

    const addFavorites = (getCurrentRecipeItem) => {
        // console.log(getCurrentRecipeItem);
        let favoritesCopy = [...favorites];

        const getIndex = favoritesCopy.findIndex(item => item.id === getCurrentRecipeItem.id)
        console.log(getIndex)
        if (getIndex === -1) {
            favoritesCopy.push(getCurrentRecipeItem)
            setFavorites(favoritesCopy)
            // save in local storage
            localStorage.setItem('favorites', JSON.stringify(favoritesCopy))
        } else {
            alert('Item is already in your favorites page')
        }
    }

    const deleteFav = (getCurrentId) => {
        let favoritesCopy = [...favorites]
        favoritesCopy = favoritesCopy.filter((item) => item.id !== getCurrentId)

        setFavorites(favoritesCopy)
        localStorage.getItem('favorites', JSON.stringify(favoritesCopy))
    }

    useEffect(() => {
        const getFavoritesFromLS = JSON.parse(localStorage.getItem('favorites'))
        setFavorites(getFavoritesFromLS)
    }, [])

    console.log(filterState)

    // filter favorites
    const filterFavoritesItems = favorites.filter(item =>
        item.title.toLowerCase().includes(filterState.filterValue)
    );


    return (
        <div className="homepage">
            <Search
                getDataFromSearchComponent={getDataFromSearchComponent}
                apiSuccessful={apiSuccessful}
                setApiSuccessful={setApiSuccessful}
            />

            {/* Favorites items */}
            <div className="favorite-wrapper">
                <h1>Favorites</h1>

                <div className="searchFav">
                    <input
                        className="fav-input"
                        
                        onChange={(event) => dispatch({ type: 'filterFavorites', value: event.target.value })}
                        value={filterState.filterValue}
                        name="searchFavorites"
                        placeholder="🔎 Search 
                        Favorites"
                    />
                </div>

                <div className="fav-items">
                    {
                        filterFavoritesItems && filterFavoritesItems.length > 0 ?
                            filterFavoritesItems.map?.((item) => (
                                <FavoriteItem
                                    deleteFav={() => deleteFav(item.id)}
                                    id={item.id}
                                    image={item.image}
                                    title={item.title}
                                    key={item.id}
                                />
                            ))
                            : null
                    }
                </div>
            </div>

            {/* show loading state */}
            {
                loadingState && (<div className="loading">Loading recipes!</div>)
            }

            {/* map through recipes */}
            <div className="items">
                {
                    recipes && recipes.length > 0
                        ? recipes.map((item) =>
                            <RecipeItem
                                addFavorites={() => addFavorites(item)}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                key={item.id}
                            />
                        ) : null
                }
            </div>

        </div>
    )
}

export default Homepage;