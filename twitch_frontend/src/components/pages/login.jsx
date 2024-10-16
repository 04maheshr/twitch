import React from "react";

const Login = () => {
    const CLIENT_ID = "5yo6ymvaacda7679fed23c153eomoe"; // Your actual client ID
    const REDIRECT_URI = "http://localhost:5173/homepage"; // Must match registered URI
    const SCOPES = encodeURIComponent("user:read:email");
    const STATE = "c3ab8aa609ea11e793ae92361f002671";

    // This function initiates the login process
    const auth = () => {
        // Clear any existing access tokens or user data
        localStorage.setItem("userToken","hi") // Or however you're storing it

        // Construct the authorization URL
        const authUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}&state=${STATE}`;

        // Redirect the user to Twitch's authorization page
        window.location.href = authUrl;
    };

    return (
        <div>
            <button onClick={auth} className="active:bg-red-500">
                Authorize
            </button>
        </div>
    );
};

export default Login;
