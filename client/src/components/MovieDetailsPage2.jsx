import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MovieDetailsPage2.css';
const MovieDetailsPage2 = () => {
    const { id } = useParams();
    console.log(id);
    const [movie, setMovie] = useState({});
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:5000/movie/${id}`);
                const movie_ = await response.json();
                console.log(movie_);
                setMovie(movie_);
                // const response1 = await fetch(`http://localhost:5000/movie/${id}`)
            }
            catch (error) {
                console.log(error);
            }

        }
        fetchMovie();
    }, [])
    return (
        <div className="movies-details-page2">
            <h2>{movie.name}</h2>
            <div className="card-container">
                <div key={movie.id} className="card">
                    <img className="card-img-top" src={movie.image} alt={movie.name} style={{ height: "380px", width: "100%" }} />
                    <div className="card-body">
                        {/* <p className="card-text" style={{ textDecoration: 'none' }}>{movie.name}</p> */}
                    </div>
                </div>
            </div>
        </div>
        // <div className="featured-container">
        //     <h2>Featured today</h2>

        // </div>
    );
}


export default MovieDetailsPage2;