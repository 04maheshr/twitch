import React, { useEffect } from "react";

const Login = () => {
    const CLIENT_ID = "5yo6ymvaacda7679fed23c153eomoe";
    const REDIRECT_URI = "http://localhost:5173/homepage"; 
    const SCOPES = encodeURIComponent("user:read:email");
    const STATE = "c3ab8aa609ea11e793ae92361f002671";

    
    const auth = () => {
        const authUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}&state=${STATE}`;
        window.location.href = authUrl;
    };

    
    const logout = () => {
        localStorage.removeItem("access_token"); 


        window.location.href = REDIRECT_URI;
    };

    
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");
        const error = queryParams.get("error");

        if (code) {
            
            fetchAccessToken(code);
        }

        if (error) {
            console.error("Error during authorization:", error);
        }
    }, []);

   
    const fetchAccessToken = async (code) => {
        const tokenUrl = `https://id.twitch.tv/oauth2/token`;
        const body = new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: "YOUR_CLIENT_SECRET", 
            code,
            grant_type: "authorization_code",
            redirect_uri: REDIRECT_URI,
        });

        try {
            const response = await fetch(tokenUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body.toString(),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch access token");
            }

            const data = await response.json();
            console.log("Access Token:", data.access_token);
            localStorage.setItem("access_token", data.access_token);
        } catch (error) {
            console.error("Error fetching access token:", error);
        }
    };

    return (
        <div>
            <button onClick={auth} className="active:bg-red-500">
                Authorize
            </button>
            <button onClick={logout} className="active:bg-red-500">
                Logout
            </button>
        </div>
    );
};

export default Login;
