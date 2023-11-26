import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';// import fetchToken from "../utils/tokenapi";
const Profile = ({ user, setUser }) => {
    let email, username;
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/token', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (data === 'token expired') {
                alert("Session expired. Please log in again.");
                window.localStorage.removeItem('token');
                setUser(null);
                navigate('/registration');
            }
            const user = data;
            // const user = await fetchToken();
            if (!user) {
                navigate('/registration')
            }
            username = user.name;
            email = user.email;
            try {
                const response = await fetch('http://localhost:5000/profile', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email })
                })
                const data = await response.json();
                setProfileData({
                    username: data.name,
                    email: data.email,
                    gender: data.gender,
                    dateOfBirth: data.dateOfBirth,
                    country: data.country,
                    dateJoined: data.createdAt,
                    profile_pic: data.profile_pic,
                    topPicks: data.topPicks,
                    reviews: data.reviews,
                })

                // console.log(profiledata);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();
    const [profiledata, setProfileData] = useState({
        username,
        email,
        gender: '',
        dateOfBirth: '',
        country: '',
        dateJoined: '',
        profile_pic: '',
        topPicks: [],
        reviews: [],
    })
    const [isEditing, setIsEditing] = useState(false);
    const [profileFile, setProfileFile] = useState({});
    const [removePic, setRemovePic] = useState(false);
    const [inputKey, setInputKey] = useState(Date.now());
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            [name]: value
        }));
    };

    const handleImageChange = async (e) => {
        if (e.target.files[0]) {
            console.log(e);
            setProfileFile(e.target.files[0]);
        }
    }

    const handleRemovePic = async (e) => {
        setProfileFile({});
        setInputKey(Date.now());
        setRemovePic(e.target.checked);
        console.log(e.target.checked)
    }
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('gender', profiledata.gender);
            formData.append('dateOfBirth', profiledata.dateOfBirth);
            formData.append('country', profiledata.country);
            formData.append('email', profiledata.email);
            formData.append('dateJoined', profiledata.dateJoined);
            formData.append('profile_pic', profileFile);
            formData.append('removePic', removePic);
            const response = await fetch('http://localhost:5000/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                },
                body: formData
            })
            const data = await response.json();
            if (data === 'token expired') {
                alert("Session expired. Please log in again.");
                window.localStorage.removeItem('token');
                setUser(null);
                navigate('/registration');
            }
            if (data === 'saved') {
                setProfileFile({});
                window.location.reload();
                setIsEditing(!isEditing);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    return (
        <div className="page">
            {isEditing ? (
                <form onSubmit={handleSave}>
                    <div className="First-user-profile">
                        <div>{<img src={profiledata.profile_pic} alt="Profile" />}</div>
                        <label>
                            Username:
                            <input type="text" name="username" value={profiledata.username} onChange={handleChange} readOnly />
                        </label>
                        <label>
                            Gender:
                            {/* <input type="text" name="gender" value={profiledata.gender} onChange={handleChange} /> */}
                            <select name="gender" value={profiledata.gender} onChange={handleChange}>
                                <option value="" disabled hidden> </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label>
                            Date of Birth:
                            <input type="date" name="dateOfBirth" value={profiledata.dateOfBirth} onChange={handleChange} />
                        </label>
                        <label>
                            Country:
                            <input type="text" name="country" value={profiledata.country} onChange={handleChange} />
                        </label>
                        <label>
                            Profile Pic:
                            <input type="file" accept="image/*" key={inputKey} onChange={handleImageChange} />
                        </label>
                        <div className="remove-profile-picture">
                            <label>
                                Remove Profile Picture:
                            </label>
                            <input type="checkbox" className="checkbox" onChange={handleRemovePic} />

                        </div>
                        <label>
                            Date Joined:
                            <input type="date" name="dateJoined" onChange={handleChange} value={profiledata.dateJoined} readOnly />
                        </label>
                        <div className="save-button">
                            <button>Save</button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="Second-user-profile">
                    <div className="card profile-pic" style={{ width: "20%", height: "70%", backgroundColor: "#f3ce13", marginRight: "5%" }}>
                        <img className="card-img-top " src={profiledata.profile_pic} />
                        <div className="card-body text-center">
                            <p className="card-text">{profiledata.username}</p>
                        </div>
                    </div>
                    <div className="card profile-info" style={{ width: "60%", height: "10%", backgroundColor: "#f3ce13" }}>
                        <div className="card-body info">
                            <p>Username: {profiledata.username} </p>
                            <hr />
                            <p>Gender: {profiledata.gender}</p>
                            <hr />
                            <p>Date of Birth: {profiledata.dateOfBirth}</p>
                            <hr />
                            <p>Country: {profiledata.country}</p>
                            <hr />
                            <p>Joined: {profiledata.dateJoined}</p>
                            <hr />
                            <button className="edit-profile" onClick={handleEditToggle}>Edit Profile</button>
                            <div className='All-reviews'>
                                {profiledata.reviews.length !== 0 && profiledata.reviews.map((review) => (
                                    <div className='review-item'>
                                        <h4>{review.title}</h4>
                                        <p>Created at: {formatDate(review.created_at)}</p>
                                        <p>Reviewed by: {review.added_by}</p>
                                        <p>Rating: {review.rating}</p>
                                        <p>Body: {review.reviewBody}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="Top Picks"></div>
                            {profiledata.topPicks.length !== 0 && profiledata.topPicks.map((review) => (
                                <div className='review-item'>
                                    <h4>Top Picks</h4>
                                    <p>{review.movie_name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
