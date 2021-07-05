import React, { useState } from "react";
import axios from "../axios";

function CreateUser() {
    const [username, setusername] = useState("");

    const onChangeUsername = (event) => {
        setusername(event.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
        };
        console.log(user);
        axios
            .post("/users/add", user)
            .then((res) => console.log(res.data))
            .catch((err) => console.log("Error getting data ", err));
        setusername("");
    };
    return (
        <div>
            <h3 style={{ margin: "20px 0" }}>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create User"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreateUser;
