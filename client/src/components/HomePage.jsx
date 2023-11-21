import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [comingsoon, setComingsoon] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/movies")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => console.error("Error fetching movies", error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/comingsoon")
            .then((response) => response.json())
            .then((data) => {
                setComingsoon(data);
            })
            .catch((error) => console.error("Error fetching movies", error));
    }, []);

    return (
        <div className="home-page" >
            <div className="container">
                <Carousel nextLabel="" prevLabel="" className="custom-carousel">

                    {movies.map((movie) => (
                        <Carousel.Item key={movie.id}>
                            <img
                                src={movie.image}
                                alt={movie.name}
                                style={{ height: "440px", width: "100%" }}
                            />
                        </Carousel.Item>

                    ))}

                </Carousel>
            </div>

            <div className="coming-soon-container">
            <h2>Coming Soon</h2>
            <div className="movies-container">
                {comingsoon.map((comingsoon, index) => (
                <div key={index} className="movie-item">
                    <img src={comingsoon.image} alt={comingsoon.title} />
                    <h3>{comingsoon.title}</h3>
                </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default HomePage;