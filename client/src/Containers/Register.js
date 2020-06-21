import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

function Register() {

    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (url) {
                fetch("http://localhost:5000/register",{
                method : "post",
                headers : { "Content-Type" : "application/json"},
                credentials : "include",
                body : JSON.stringify({
                    name : name,
                    email : email,
                    password : password,
                    url : url
                })
            }).then(response => response.json())
            .then(data =>{
                if (data.error){
                    alert(data.error)
                }else{
                    history.push("/login")
                }
            })
        }
    },[url])

    const submitHandler = ()=>{
        console.log("hello")
        const formData = new FormData();
        formData.append("file",image);
        formData.append("upload_preset","letsmingle");
        formData.append("cloud_name","dvezzidsw");
        fetch("https://api.cloudinary.com/v1_1/dvezzidsw/image/upload",{
            method : "post",
            body : formData
        })
            .then(response =>response.json())
            .then(data =>{
                console.log(data)
                setUrl(data.url);
            })
    }


    return (
        <div className="my-card">
            <div className="card auth-card">
                <h2>Let's Mingle</h2>
                <input type="text" 
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
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
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload image</span>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
                <button className="waves-effect waves-light btn" onClick={submitHandler}>
                Register
                </button>
            </div>
        </div>
    )
}

export default Register;
