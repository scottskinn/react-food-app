import { useState } from "react";
import Search from "../../components/search";
import RecipeItem from "../../components/recipe-item";
import './style.css';

const Homepage = () => {
    // loading state
    const [loadingState, setLoadingState] = useState(false)

    // save the results from the api
    const [recipes, setRecipes] = useState([])

    // favorites data state
    const [ favorites, setFavorites] = useState([])

    // this gets data from the search props
    const getDataFromSearchComponent = (getData) => {
        // set loading state to true before calling api
        setLoadingState(true);

        console.log(getData, 'getData')

        async function getRecipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=c45746bdebd542e3a270596a7bc4ed85&query=${getData}`)
            const result = await apiResponse.json();
            const { results } = result;
            if (results && results.length > 0) {

                setLoadingState(false)
                setRecipes(results)
            }

            console.log(result)
        }

        getRecipes()
    };

    console.log(loadingState, recipes, 'loading state and recipes')

    const addFavorites = (getCurrentRecipeItem) => {
        console.log(getCurrentRecipeItem);
        let favoritesCopy = [...favorites];

        const getIndex = favoritesCopy.findIndex(item => item.id === getCurrentRecipeItem.id)
        console.log(getIndex)
        if(getIndex === -1) {
            favoritesCopy.push(getCurrentRecipeItem)
            setFavorites(favoritesCopy)
            // save in local storage
            localStorage.setItem('favorites', JSON.stringify(favoritesCopy))
        } else {
            alert('Item is already in your favorites page')
        }
    }

    return (
        <div className="homepage">
            <Search getDataFromSearchComponent={getDataFromSearchComponent} />

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
                                addFavorites={ ()=> addFavorites(item)} 
                                id={item.id} 
                                image={item.image} 
                                title={item.title} 
                            />
                        ) : null
                }
            </div>

        </div>
    )
}

export default Homepage;