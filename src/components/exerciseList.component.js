import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

function Exercise(props) {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link
                    className="btn btn-primary"
                    to={"/edit/" + props.exercise._id}
                >
                    edit
                </Link>
                {"   "}
                <Link
                    className="btn btn-danger"
                    to={"/"}
                    onClick={() => deleteExercise(props.exercise._id)}
                >
                    delete
                </Link>
            </td>
        </tr>
    );
}
const deleteExercise = (id) => {
    axios.delete("/exercises/" + id).then((res) => {
        console.log(res.data);
    });
};
function ExerciseList() {
    const [exercises, setexercises] = useState([]);
    useEffect(() => {
        const axi = require("axios");
        const source = axi.CancelToken.source();
        const fetchExercises = async () => {
            try {
                const response = await axios.get("/exercises");
                setexercises(response.data);
            } catch (err) {
                console.log("Error getting data ", err);
            }
        };
        fetchExercises();
        return () => {
            source.cancel();
        };
    }, [exercises]);
    const exerciseList = () => {
        return exercises.map((currentexercise) => {
            return (
                <Exercise
                    exercise={currentexercise}
                    key={currentexercise._id}
                    deleteExercise={deleteExercise}
                />
            );
        });
    };
    return (
        <div>
            <h3 style={{ margin: "20px 0" }}>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{exerciseList()}</tbody>
            </table>
        </div>
    );
}

export default ExerciseList;
