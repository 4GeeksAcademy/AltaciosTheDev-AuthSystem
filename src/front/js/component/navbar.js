import { Link } from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store, actions} = useContext(Context)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">


					{store.token ? 
						<button onClick={actions.logout}className="btn btn-primary me-3">Logout</button>
						:
						<Link to="/login">
							<button className="btn btn-primary me-3">Login</button>
						</Link>
					}
					<Link to="/signup">
						<button className="btn btn-primary me-3">Signup</button>
					</Link>

					{store.token &&
					<Link to="/private">
						<button className="btn btn-primary">Profile</button>
					</Link>
					}
				</div>
			</div>
		</nav>
	);
};
