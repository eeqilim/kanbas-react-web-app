import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });
    const navigate = useNavigate();
    const fetchProfile = async () => {
        try {
            const profile = await client.profile();
            setProfile(profile);
            console.log(profile);
        } catch (e) {
            console.log(e);
            navigate("/Kanbas/Account/Signin");
        }
    };
    const save = async () => {
        await client.updateUser(profile);
    };
    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <div>
            <h1>Profile</h1>
            {profile && (
                <div>
                    <input value={profile.username} className="form-control" placeholder="Username"
                        onChange={(e) =>
                            setProfile({ ...profile, username: e.target.value })} />
                    <input value={profile.password} className="form-control mt-1" placeholder="Password"
                        onChange={(e) =>
                            setProfile({ ...profile, password: e.target.value })} />
                    <input value={profile.firstName} className="form-control mt-1" placeholder="First Name"
                        onChange={(e) =>
                            setProfile({ ...profile, firstName: e.target.value })} />
                    <input value={profile.lastName} className="form-control mt-1" placeholder="Last Name"
                        onChange={(e) =>
                            setProfile({ ...profile, lastName: e.target.value })} />
                    <input value={profile.dob} type="date" className="form-control mt-1"
                        onChange={(e) =>
                            setProfile({ ...profile, dob: e.target.value })} />
                    <input value={profile.email} className="form-control mt-1" placeholder="Email"
                        onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })} />
                    <select value={profile.role} className="form-control mt-1" onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-100 mt-2">
                        Users
                    </Link>
                    <button className="btn btn-primary w-100 mt-1" onClick={save}>
                        Save
                    </button>
                    <button className="btn btn-danger w-100 mt-1" onClick={signout}>
                        Signout
                    </button>
                </div>
            )}
        </div>
    );
}