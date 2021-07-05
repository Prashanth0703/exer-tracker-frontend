import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router";
import axios from "../axios";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {
    const [username, setusername] = useState("");
    const [description, setdescription] = useState("");
    const [duration, setduration] = useState(0);
    const [date, setdate] = useState(new Date());
    const [users, setusers] = useState([]);
    const history = useHistory();
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get("/users");
            if (response.data.length > 0) {
                setusers(response.data.map((user) => user.username));
                setusername(response.data[0].username);
            }
        };

        fetchUsers();
    }, []);

    const onChangeUsername = (event) => {
        setusername(event.target.value);
    };
    const onChangeDescription = (event) => {
        setdescription(event.target.value);
    };
    const onChangeDuration = (event) => {
        setduration(event.target.value);
    };
    const onChangeDate = (date) => setdate(date);

    const onSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        };
        console.log(exercise);
        axios
            .post("/exercises/add", exercise)
            .then((res) => console.log(res.data));
        history.push("/");
    };
    const userInput = useRef();
    return (
        <div>
            <h3 style={{ margin: "20px 0" }}>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        ref={userInput}
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
                    >
                        {users.map((user) => {
                            return (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker selected={date} onChange={onChangeDate} />
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Exercise Log"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreateExercise;
