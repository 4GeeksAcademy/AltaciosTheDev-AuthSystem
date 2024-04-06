import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if(!store.token){
            navigate("/login")
        }

    },[store.token])

    return(
        <div className= "text-center">
            {store.loggedUserData && <h1>Profile for: {store.loggedUserData.name}</h1>}
            {store.loggedUserData && <h1>email: {store.loggedUserData.email}</h1>}
        </div>
    )

}