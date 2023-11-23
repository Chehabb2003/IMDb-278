import { useEffect, useState } from "react";

const Watchlist = ({/* user */ }) => {
    const [watchList, setWatchList] = useState([]);
    useEffect(() => {
        const fetchWatchList = async () => {
            try {
                const response = await fetch('http://localhost:5000/watchlist', {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`
                    }
                })
                const data = await response.json();
                setWatchList(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchWatchList();
    }, [])

    return (
        <div className="watch-list">

        </div>
    );
}

export default Watchlist;