import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exerciseList.component";
import CreateUser from "./components/createUser.component";
import CreateExercise from "./components/createExercise.component";
import EditExercise from "./components/editExercise.component";

function App() {
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route path="/edit/:id">
                        <Navbar />
                        <EditExercise />
                    </Route>
                    <Route path="/create">
                        <Navbar />
                        <CreateExercise />
                    </Route>
                    <Route path="/user">
                        <Navbar />
                        <CreateUser />
                    </Route>
                    <Route path="/">
                        <Navbar />
                        <ExerciseList />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
