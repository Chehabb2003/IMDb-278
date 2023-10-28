import { useParams } from "react-router-dom";

const Search = () => {
    const { searchvalue } = useParams();
     
    //here we fetch item from db 

    return (
        <div className="search">
            {searchvalue && <p>{searchvalue} is what you searched for!</p>}
        </div>
    );
}

export default Search;