import React, { createContext, useContext, useEffect, useReducer } from 'react'
import NavBar from './components/Navbar'
import {BrowserRouter, Route, useHistory} from 'react-router-dom'
import './App.css';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import Profile from './components/screens/Profile';
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {

  const history = useHistory()
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext)
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({type:"USER", payload:user})
    } else {
      history.push('/login')
    }
  }, [dispatch, history])

  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact>
          <Home />
      </Route>
      <Route path="/login">
          <Login />
      </Route>
      <Route path="/register">
          <Register />
      </Route>
      <Route path="/profile">
          <Profile />
      </Route>
    </BrowserRouter>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routing />
        
      </BrowserRouter>
    </UserContext.Provider>
    );
}

export default App;
