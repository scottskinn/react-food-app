import Search from "../../components/search";

const Homepage = () => {

    // this gets data from the search props
    const getDataFromSearchComponent = (getDataFromSearchComponent) => {
        console.log(getDataFromSearchComponent, 'getData')
    }

    return (
        <div className="homepage">
            <Search getDataFromSearchComponent = {getDataFromSearchComponent} />
        </div>
    )
}

export default Homepage;