import React, { useEffect, useContext, useReducer, createContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom"
import './App.css';
import Home from './Containers/Home';
import Profile from "./Containers/Profile";
import Login from "./Containers/Login";
import Register from "./Containers/Register";
import Nav from "./Containers/Nav";
import Createpost from "./Containers/Createpost";
import Userprofile from "./Containers/Userprofile";
import Sidebar from "./Containers/Sidebar";
import {reducer, initialState} from "./Reducer/Reducers";

export const UserContext = createContext();


const Routing = () =>{

  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();

  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("user"))
    //console.log(user)
    if (user) {
      dispatch({type : "USER",payload : user})
    }else{
      if (history.location.pathname === '/register') {
        history.push("/register");
      }else{
        history.push("/login")
      }
      
    }
  },[])
 
  return (
    <Switch>
        <Route path={"/home"} exact>
        <div className="home-body">
          <Home/>
          <Sidebar/>
        </div>
        </Route>
        <Route path={"/profile"}>
          <Profile/>
        </Route>
        <Route path={"/createpost"}>
          <Createpost/>
        </Route>
      <Route path={"/login"}>
        <Login/>
      </Route>
      <Route path={"/register"}>
        <Register/>
      </Route>
      <Route path={"/userprofile/:id"}>
        <Userprofile />
      </Route>
    </Switch>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Nav/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
