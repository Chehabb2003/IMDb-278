import React, { useState, useEffect } from "react";
import '../styles/ComingSoon.css';

const ComingSoon = () => {
    const [comingsoon, setComingsoon] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/comingsoon")
            .then((response) => response.json())
            .then((data) => {
                setComingsoon(data);
            })
            .catch((error) => console.error("Error fetching movies", error));
    }, []);

    return (
        <div className="coming-soon-container">
            <h2>Coming Soon</h2>
            <div className="movies-container">
                {comingsoon.map((movie) => (
                    <a key={movie.id} href={`/movie/${movie.id}`} className="movie-item-link">
                        <div className="movie-item">
                            <img src={movie.image} alt={movie.title} />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ComingSoon;