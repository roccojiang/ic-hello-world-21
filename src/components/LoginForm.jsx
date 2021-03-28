import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Asynchronous
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default behaviour of browser refresh

    const authObject = {
      "Project-ID": "44c4f1ff-6048-4e0e-ad28-16790737836c",
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      // Make request from Chat Engine API
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });

      // Logged in, save username and password to local storage
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
    } catch (error) {
      // Error - try with new username
      setError("Incorrect credentials, please try again");
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Welcome!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Log in</span>
            </button>
          </div>
          <h3 className="error">{error}</h3>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
