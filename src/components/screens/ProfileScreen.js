import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import Cookie from 'js-cookie'
import { logOut } from '../../actions/userActions';

const Profile = () => {
    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo} = userSignIn;
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!userInfo) history.push("/profile");
    },[userInfo]);
    
    const handleRegister = () => {
          history.push('/register');
    }

    const handleLogOut = () => {
        Cookie.remove('userInfo');
        dispatch(logOut());
    }

    const handleLogin = () => {
        history.push('/signIn');
    }


    return (
       <div className="form-group" style={{ marginLeft: '40%'}}>
           <h1>WELCOME </h1> {userInfo ? <h1>{userInfo.name}</h1> : <h1>User</h1>}
        {userInfo ? <button type="button" onClick={handleLogOut} className="btn btn-danger">LOGOUT</button> :
        <div><button type="button" onClick={handleRegister} className="btn btn-warning">REGISTER</button>
        {"  "}
        <button type="button" onClick={handleLogin} className="btn btn-warning">LOGIN</button>
        </div>}
       </div>
    );
}

export default Profile;