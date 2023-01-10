import './styles.css'

const FavoriteItem = (props) => {

    const { id, title, image, deleteFav } = props;

    // console.log(props, 'recipe item props')

    return (
        <div key={id} className="favoriteItem">
            <div>
                <img src={image} alt='of recipe' />
            </div>
            <p>{title}</p>
            <button 
                type='button' 
                onClick={deleteFav} 
                className='delBtn'>
                    Delete
            </button>
        </div>
    )
}

export default FavoriteItem;