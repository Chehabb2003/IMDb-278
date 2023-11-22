import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTopMovies = async () => {
            try {
                const response = await fetch("http://localhost:5000/movies");
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error("Error fetching movies", error);
            }
        };
        fetchTopMovies();
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
        </div>
    );
};




export default HomePage;