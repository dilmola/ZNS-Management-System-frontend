import ApiService from "../../API/ApiService.js";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();

  const handleRegister = async (
    e,
    username,
    fullname,
    email,
    password,
    setLoading,
    setUsernameError,
    setFullnameError,
    setEmailError,
    setPasswordError
  ) => {
    e.preventDefault();

    if (username && fullname && email && password) {
      await ApiService.post("register", {
        username,
        fullname,
        email,
        password,
      });

      setUsernameError("");
      setFullnameError("");
      setPasswordError("");
      setLoading(true);

      //console.log("Register Successfully");
      navigate("/login");
    } else {
      if (!username) {
        setUsernameError("Username is required");
      } else {
        setUsernameError("");
      }

      if (!fullname) {
        setFullnameError("Fullname is required");
      } else {
        setFullnameError("");
      }

      if (!email) {
        setEmailError("Email is required");
      } else {
        setEmailError("");
      }

      if (!password) {
        setPasswordError("Password is required");
      } else {
        setPasswordError("");
      }
    }
  };

  return { handleRegister };
};

export default RegisterComponent;
