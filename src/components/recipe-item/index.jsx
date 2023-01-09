import './styles.css'

const RecipeItem = (props) => {

    const { id, title, image, addFavorites } = props;

    console.log(props, 'recipe item props')

    return (
        <div key={id} className="recipeItem">
            <div>
                <img src={image} alt='of recipe' />
            </div>
            <p>{title}</p>
            <button type='button' onClick={addFavorites} className='favBtn'>Add to favorites</button>
        </div>
    )
}

export default RecipeItem;