import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/ComingSoon.css';

const ComingSoon = () => {
    const [comingsoon, setComingsoon] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/comingsoon")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setComingsoon(data);
            })
            .catch((error) => console.error("Error fetching movies", error));
    }, []);

    return (
        <div className="coming-soon-container">
            <h2>Coming Soon</h2>
            <div className="movies-container">
                {comingsoon.map((movie) => (
                    <Link to={`/movie/${movie.id}`} className="movie-item-link">
                        <div className="movie-item">
                            <img src={movie.image} alt={movie.name} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ComingSoon;