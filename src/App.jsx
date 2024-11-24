import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


    const [user, setUser] =
        useState({username: "", password: ""});

    const handleUsername = (e) => {
        setUser({...user, username: e.target.value});
    }

    const handlePassword = (e) => {
        setUser({...user, password: e.target.value});
    }

    const handleButtonClick = async () => {
        console.log(user);
        // Get the query string from the current URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const state = urlParams.get('state');
        const clientId = urlParams.get('client_id');
        const grantType = urlParams.get('response_type');
        const codeChallenge = urlParams.get('code_challenge');
        const challengeMethod = urlParams.get('code_challenge_method');

        console.log(codeChallenge);

        // window.location.href = `http://localhost:8080/login?client_id=${clientId}&response_type=${grantType}&code_challenge=${codeChallenge}&code_challenge_method=${challengeMethod}&state=${state}`;
        const response = await fetch(`http://localhost:8080/login?client_id=${clientId}&response_type=${grantType}&code_challenge=${codeChallenge}&code_challenge_method=${challengeMethod}&state=${state}`, {
            method: "GET",
            headers: {
                "Authorization" : btoa(user.username + ":" + user.password)
            },
        });

        if (response.ok) {
            const json = await response.json();
            const redirectUrl = json.url;
            console.log(json.url);
            // Redirect the user to the provided URL
            window.location.href = redirectUrl;
        } else {
            console.error("Login failed");
        }
    }

    return (
      <>
          <form>
              Username:{" "} <input onChange={handleUsername}/>
          </form>

          <form>
              Password:{" "} <input onChange={handlePassword}/>
          </form>

          <div>
              <button onClick={handleButtonClick}>Login</button>
          </div>

      </>
    )
}

export default App
