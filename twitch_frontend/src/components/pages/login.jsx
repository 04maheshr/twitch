import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { setUserToken, setAccessToken } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const CLIENT_ID = "5yo6ymvaacda7679fed23c153eomoe";
  const CLIENT_SECRET = "d3byprdv4y0kvnzjzze76s9nasg47u";
  const REDIRECT_URI = "http://localhost:5173/";
  const STATE = "c3ab8aa609ea11e793ae92361f002671";

  const SCOPES = encodeURIComponent(
    "chat:edit chat:read channel:manage:broadcast channel:read:stream_key clips:edit channel:manage:videos"
  );

  // Exchange authorization code for an access token
  const exchangeCodeForToken = async (code) => {
    console.log("Attempting to exchange code for token:", code);

    try {
      const response = await fetch(`https://id.twitch.tv/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code.trim(), // Ensure code is clean
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URI,
        }),
      });

      console.log("Token exchange response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching access token:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Access token data received:", data);

      setUserToken(true);
      setAccessToken(data.access_token);
      

      
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // UseEffect to fetch the authorization code from URL query params
  useEffect(() => {
    console.log("Location object:", location); // Debugging the location object
    console.log("Window location:", window.location.href); // Check if URL is correct

    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      console.log(`Code from URL: ${code}`); // Debug code
      exchangeCodeForToken(code);
    } else {
      console.warn("No authorization code found in the URL");
    }
  }, [location.search]); // Dependency on location.search to re-run if the URL changes

  // Function to initiate Twitch OAuth flow
  const Auth = () => {
    const authUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${SCOPES}&state=${STATE}`;

    console.log("Redirecting to:", authUrl); // Debug: Authorization URL
    window.location.replace(authUrl); // Full page reload
  };

  return (
    <div>
      <button onClick={Auth} className="active:bg-red-500">
        Authorize
      </button>
    </div>
  );
};

export default Login;

