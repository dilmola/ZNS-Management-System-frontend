import ApiService from "../../API/ApiService.js";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();

  const handleLogin = async (
    e,
    email,
    password,
    setInvalidError,
    setLoading,
    setEmailError,
    setPasswordError
  ) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await ApiService.post("login", { email, password });   
        console.log("Login Successfullyyyy", response.data);
              const userType = response.data.users_type_id;
        console.log(userType);

        const userId = response.data.id; 
        console.log(userId);

        setEmailError("");
        setPasswordError("");
        setInvalidError("");
        setLoading(true);

      
      
        if (userType === 1) {
          navigate(`/admin/${userId}`);
        } else if (userType === 2) {
          navigate(`/contractor/${userId}`);
        } else if (userType === 3) {
          navigate(`/client/${userId}`);
        } else {
          console.error("Unknown user type:", userType);
        }
      } catch (error) {
        setLoading(false);
        console.error(error.message);
        setEmailError("");
        setPasswordError("");
        setInvalidError("Invalid email or password");
      }
    } else {
      if (!email) {
        setEmailError("Email is required");
        setInvalidError("");
      } else {
        setEmailError("");
      }

      if (!password) {
        setPasswordError("Password is required");
        setInvalidError("");
      } else {
        setPasswordError("");
      }
    }
  };

  return { handleLogin };
};

export default LoginComponent;
