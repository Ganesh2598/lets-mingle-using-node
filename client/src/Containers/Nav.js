import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App"


function Nav() {
    const history = useHistory();
    const { state, dispatch} = useContext(UserContext);
    console.log(state)
    const Render = () =>{
        if (state) {
            return [
                <li className="tab"><Link to={"/profile"}>PROFILE</Link></li>,
                <li className="tab"><Link to={"/createpost"}>CREATE POST</Link></li>,
                <li><button className="btn #c62828 red darken-3" onClick={logoutHandler}>Logout</button></li>
            ]
        }else{
            return [
                <li className="tab"><Link to={"/login"}>LOGIN</Link></li>,
                <li className="tab"><Link to={"/register"}>REGISTER</Link></li>
            ]
        }
    }
    const logoutHandler = ()=> {
        localStorage.clear();
        dispatch({type : "CLEAR"})
        history.push("/login")
    }
    return (
        <>
        <nav className="nav-extended">
            <div className="nav-wrapper blue">
                <Link to={state?"/home":"/login"} className="brand-logo left">Let's Mingle</Link>
                <ul id="nav-mobile" className="right">
                    {Render()}
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Nav;
