import { authService, dbService } from "fbase";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) =>{
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () =>{
        authService.signOut();
        history.push("/");
    };

   const onChange = (event) => {
    const {
        target: { value },
    } = event;
    setNewDisplayName(value);
   };

   const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName){
        await userObj.updateProfile({ displayName: newDisplayName });
        refreshUser();
    }
   };

    return (
        
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    type="text" 
                    placeholder="Display name" 
                    value={newDisplayName} 
                    autoFocus
                    className="formInput"
                />
                <input 
                    type="submit" 
                    value="Update Profile" 
                    className="formBth"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBth cancleBth logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};

export default Profile;