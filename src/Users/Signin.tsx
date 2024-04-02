import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
    const [credentials, setCredentials] = useState<User>({
        _id: "",
        username: "", password: "", firstName: "", lastName: "", role: "USER"
    });
    const navigate = useNavigate();
    const signin = async () => {
        await client.signin(credentials);
        navigate("/Kanbas/Account/Profile");
    };
    return (
        <div>
            <h1>Sign in</h1>
            <input value={credentials.username} className="form-control" placeholder="Username"
                onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })} />
            <input value={credentials.password} className="form-control mt-1" placeholder="Password" type={"password"}
                onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })} />
            <button onClick={signin} className="btn btn-primary mt-2"> Sign in </button>
            <Link to="/Kanbas/Account/Signup" className="btn btn-link">
                Register
            </Link>
        </div>
    );
}