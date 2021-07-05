import React, { useEffect, useRef, useState } from "react";
import axios from "../axios";
import { useParams, useHistory } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise(props) {
    const [username, setusername] = useState("");
    const [description, setdescription] = useState("");
    const [duration, setduration] = useState(0);
    const [date, setdate] = useState(new Date());
    const [users, setusers] = useState([]);
    const params = useParams();
    const history = useHistory();
    useEffect(() => {
        const axi = require("axios");
        const source = axi.CancelToken.source();
        const fetchExercises = async () => {
            try {
                const response1 = await axios.get("/exercises/" + params.id);
                setusername(response1.data.username);
                setdescription(response1.data.description);
                setduration(response1.data.duration);
                setdate(new Date(response1.data.date));
            } catch (err) {
                console.log(err);
            }

            const response = await axios.get("/users/");
            if (response.data.length > 0) {
                setusers(response.data.map((user) => user.username));
            }
        };
        fetchExercises();
        return () => {
            source.cancel();
        };
    }, [params.id]);
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
            .post("/exercises/update/" + params.id, exercise)
            .then((res) => console.log(res.data));

        history.push("/");
    };
    const userInput = useRef();
    return (
        <div>
            <h3 style={{ margin: "20px 0" }}>Edit Exercise Log</h3>
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
                        {users.map(function (user) {
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
                        value="Edit Exercise Log"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default EditExercise;
