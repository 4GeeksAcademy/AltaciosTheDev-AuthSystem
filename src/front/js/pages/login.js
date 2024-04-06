import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const {store, actions} = useContext(Context)
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const sendUserCredentials = async (e) => {
        e.preventDefault()
        console.log("credentials sent :", user)

        const isLogged = await actions.login(user) //it is an async function, must return the promise.
        if(isLogged){
            navigate("/private")
        }

    }

    return(
        <div className= "text-center">
            <h1>Login form</h1>
            <form className="w-50 mx-auto" onSubmit={sendUserCredentials}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={user.email || ""} onChange={(e) => setUser({...user, email:e.target.value})}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={user.password || ""} onChange={(e) => setUser({...user, password:e.target.value})} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}