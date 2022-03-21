import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const Loading = () => (
  <div>
    <p>Loading Users...</p>
  </div>
);

const Users = (props) => {
  const { users } = props;
  return users.map((user) => {
    return (
      <div key={user.id}>
        <strong>{user.value.name}</strong>
        <span className={user.value.status}>{` ${user.value.status}`}</span>
      </div>
    );
  });
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchAndSetUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users");

      setUsers(response.data.users);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <img
        height={400}
        width={400}
        src={logo}
        className="App-logo"
        alt="logo"
        style={{ marginBottom: -50, marginTop: -50 }}
      />
      <h1>React.js on Serverless Cloud</h1>
      <p>
        For a guide and recipes on how to configure / customize this project,
        <br />
        check out the
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Documentation
        </a>
        .
      </p>
      <p>
        The information below is being fetched from your Serverless Cloud API:
      </p>
      {loading ? <Loading /> : <Users users={users} />}
      <h3>Edit this React.js app locally:</h3>
      <p>
        Open your terminal to the project directory and run <code>npm i</code>{" "}
        to install the React dependencies. Then run <code>cloud dev</code> to
        launch the local React dev server. You can access the API on your
        personal developer sandbox by appending <code>/api</code> to the local
        dev server's localhost address.
      </p>
    </div>
  );
};

export default App;
