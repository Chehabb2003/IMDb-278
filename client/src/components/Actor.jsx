import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Actor = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    fetchActorDetails();
  }, [id]);

  const fetchActorDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/actorsdetails/${id}`);
      if (response.ok) {
        const actorData = await response.json();
        setActor(actorData);
      } else {
        console.error('Failed to fetch actor details');
      }
    } catch (error) {
      console.error('Error fetching actor details', error);
    }
  };
  return (
    <div className="actor-page">
      {actor && (
        <>
          <div className="actor-details">
            <img src={actor.image} alt={actor.name} />
            <h2>{actor.name}</h2>
            <p>Date of Birth: {actor.dob}</p>
            <p>Bio: {actor.bio}</p>
          </div>

          <div className="known-for-movies">
            <h3>Known For</h3>
            <div className="movies-list">
              {actor.movies.map((movie) => (
                <div key={movie.id} className="movie-item">
                  <img src={movie.image} alt={movie.name} />
                  <p>{movie.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Actor;