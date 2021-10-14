import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Register = () => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const uploadFields = () => {
        // eslint-disable-next-line

        fetch("http://localhost:8081/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
            }).then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.error) {
                    M.toast({html: data.error, classes: "#c62828 red darken-3"})
                } else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    // console.log(data);
                    M.toast({html: data.username, classes: "#43a047 green darken-1"})
                    history.push('/login')
                }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="myCard">
            <div className="card auth-card">
                <h3>Test AIA</h3>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn waves-effect waves-light" onClick={() => uploadFields()}>
                    Register
                </button>
                <h5>
                    <Link to="/login">Already have an account</Link>
                </h5>

            </div>
        </div>
    )
}

export default Register