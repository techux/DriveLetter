import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const error = queryParams.get("error");

  const allowedParams = ["token", "error"];
  const hasInvalidParams = Array.from(queryParams.keys()).some(
    (key) => !allowedParams.includes(key)
  );

  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp > currentTime) {
          localStorage.setItem("accessToken", token);
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      } catch (err) {
        console.log(err);
        setIsValidToken(false);
      }
    }
  }, [token]);

  useEffect(() => {
    if (isValidToken) {
      navigate("/"); 
      // navigate("/dashboard"); 
    }
  }, [isValidToken, navigate]);

  if (error || hasInvalidParams) {
    return (
      <div>
        <h1>Login Page</h1>
        <p className="text-red-500">Login Failed: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Login Page</h1>
      {isValidToken ? (
        <p className="text-green-500">Login Success</p>
      ) : (
        <p className="text-yellow-500">Invalid or expired token</p>
      )}
    </div>
  );
};

export default Login;
