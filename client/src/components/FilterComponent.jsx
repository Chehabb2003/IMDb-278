import React, { useState } from 'react';

const FilterComponent = ({ onFilterChange }) => {
    const [ratingFilter, setRatingFilter] = useState('highestToLowest');
    const [dateFilter, setDateFilter] = useState('recent');

    const handleRatingChange = (e) => {
        setRatingFilter(e.target.value);
        onFilterChange(e.target.value, dateFilter);
    };

    const handleDateChange = (e) => {
        setDateFilter(e.target.value);
        onFilterChange(ratingFilter, e.target.value);
    };

    return (
        <div>
            <div>
                <label >Sort by Rating:</label>
                <select name="rating" value={ratingFilter} onChange={handleRatingChange}>
                    <option value="highestToLowest">Highest to Lowest</option>
                    <option value="lowestToHighest">Lowest to Highest</option>
                </select>
            </div>

            <div>
                <label >Sort by Date:</label>
                <select name="date" value={dateFilter} onChange={handleDateChange}>
                    <option value="recent">Most Recent</option>
                    <option value="old">Oldest</option>
                </select>
            </div>
        </div>
    );
};

export default FilterComponent;
