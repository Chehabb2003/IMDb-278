import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const MoviesDetailsPage2 = () => {
    const id = useParams();
    const [movie, setMovie] = useState({});
    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch(`http://localhost:5000/movie/${id}`)
            const movie = await response.json();
        }
        fetchMovie();
    }, [])
    return (
        <div className="movies-details-page2">
        </div>
    );
}


export default MoviesDetailsPage2;