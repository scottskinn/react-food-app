import './styles.css'

const RecipeItem = (props) => {

    const { id, title, image } = props;

    console.log(props, 'recipe item props')

    return (
        <div key={id} className="recipeItem">
            <div>
                <img src={image} alt='image of recipe' />
            </div>
            <p>{title}</p>
            <button className='favBtn'>Add to favorites</button>
        </div>
    )
}

export default RecipeItem;