import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

function Login() {

    const {state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = ()=>{
        fetch("http://localhost:5000/login",{
            method : "post",
            headers : { "Content-Type" : "application/json"},
            credentials : "include",
            body : JSON.stringify({
                email : email,
                password : password
            })
        }).then(response => response.json())
        .then(data =>{
            if(!data.error){
                console.log(data)
                localStorage.setItem("token",data.token)
                localStorage.setItem("user",JSON.stringify(data.data))
                dispatch({type : "USER",payload : data.user})
                console.log(state)
                history.push("/home")
            }else{
                console.log(data.error)
            }
        })
    }

    return (
        <div className="my-card">
            <div className="card auth-card">
                <h2>Let's Mingle</h2>
                <input type="email" 
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="waves-effect waves-light btn" onClick={submitHandler}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;
