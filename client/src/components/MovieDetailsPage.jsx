import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MovieDetailsPage.css'; // Import the CSS file

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/movies/${id}`);
                if (response.ok) {
                    const movieData = await response.json();
                    setMovie(movieData);
                } else {
                    console.error('Failed to fetch movie details');
                }
            } catch (error) {
                console.error('Error fetching movie details', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    return (
        <div className="content">
            <h2>Movie Details</h2>
            {movie && (
                <div className="movie-details-container">
                    <h3 className="movie-title">{movie.title}</h3>
                </div>
            )}
        </div>
    );
};

export default MovieDetailsPage;