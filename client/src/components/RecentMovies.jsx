import React, { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import '../styles/RecentMovies.css';
import 'tailwindcss/tailwind.css';

const RecentMovies = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/movies')
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => console.error('Error fetching movies', error));
    }, []);

    const nextMovie = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const prevMovie = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    };

    return (
        <div className='recent-movies' style={{ 'margin-left': '3%' }}>
            <h2>Recent Movies</h2>
            <div className="slider relative">
                <BsChevronLeft className="left-arrow" onClick={prevMovie} />
                {movies.map((movie, index) => (
                    <div key={movie.id} className={`slide ${index === currentIndex ? 'active' : ''}`}>
                        <img
                            src={movie.image}
                            alt={movie.name}
                        />
                        <button key={movie.id}>
                            Watch Trailer
                        </button>
                    </div>
                ))}
                <BsChevronRight className="right-arrow" onClick={nextMovie} />
            </div>
        </div >
    );
};

export default RecentMovies;