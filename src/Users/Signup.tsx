import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
    const [error, setError] = useState("");
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(user);
            navigate("/Kanbas/Account/Profile");
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <h1>Sign up</h1>
            {error && <div>{error}</div>}
            <input value={user.username} className="form-control" placeholder="Username"
                onChange={(e) => setUser({
                    ...user, username: e.target.value
                })} />
            <input value={user.password} className="form-control mt-1" placeholder="Password" type={"password"}
                onChange={(e) => setUser({
                    ...user, password: e.target.value
                })} />
            <button onClick={signup} className="btn btn-primary mt-2"> Sign up </button>
            <Link to="/Kanbas/Account/Signin" className="btn btn-link">
                Login
            </Link>
        </div>
    );
}