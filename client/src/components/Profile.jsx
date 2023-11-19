import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const user = JSON.parse(window.localStorage.getItem('token'));
    let email, username;
    if (user) {
        email = user.email;
        username = user.name;
    }
    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                navigate('/registration')
            }
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
                    dateJoined: data.createdAt
                })
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
    })
    const [isEditing, setIsEditing] = useState(false);



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

    const handleSave = async () => {
        try {
            const updatedData = {
                gender: profiledata.gender,
                dateOfBirth: profiledata.dateOfBirth,
                country: profiledata.country,
                email: profiledata.email,
                dateJoined: profiledata.dateJoined
            }
            const response = await fetch('http://localhost:5000/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            })
            const data = await response.json();
            if (data === 'saved') {
                setIsEditing(!isEditing);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (

        <div className="user-profile">
            {isEditing ? (
                <div>
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
                    {/* Image upload functionality can be added here */}
                    <label>
                        Date Joined:
                        <input type="date" name="dateJoined" onChange={handleChange} value={profiledata.dateJoined} readOnly />
                    </label>
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <p>Username: {profiledata.username}</p>
                    <p>Gender: {profiledata.gender}</p>
                    <p>Date of Birth: {profiledata.dateOfBirth}</p>
                    <p>Country: {profiledata.country}</p>
                    <p>Joined: {profiledata.joined}</p>
                    {/* {profile.image && <img src={profile.image} alt="Profile" />} */}
                    <button onClick={handleEditToggle}>Edit Profile</button>
                </div>
            )}
        </div>

    );
}

export default Profile;
