import axios from "axios";

const instance = axios.create({
    baseURL: "https://exer-docker.herokuapp.com/",
});

export default instance;
