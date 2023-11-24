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
                    profile_pic: data.profile_pic
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
    return (

        <div className="user-profile">
            {isEditing ? (
                <form className='edit-profile' onSubmit={handleSave}>
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
                    <label>
                        Remove Profile Picture
                        <input type="checkbox" onChange={handleRemovePic} />
                    </label>
                    <label>
                        Date Joined:
                        <input type="date" name="dateJoined" onChange={handleChange} value={profiledata.dateJoined} readOnly />
                    </label>
                    <button>Save</button>
                </form>
            ) : (
                <div className="view-profile">
                    <div className="profile-pic-container">
                        <span className="profile-pic-label">Profile:</span>
                        <img src={profiledata.profile_pic} alt="Profile" />
                    </div>
                    <p>Username: {profiledata.username}</p>
                    <p>Gender: {profiledata.gender}</p>
                    <p>Date of Birth: {profiledata.dateOfBirth}</p>
                    <p>Country: {profiledata.country}</p>
                    <p>Joined: {profiledata.dateJoined}</p>
                    <button onClick={handleEditToggle}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default Profile;
