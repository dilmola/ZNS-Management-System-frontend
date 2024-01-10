import LoginForm from "../../components/Login/Login_Component";
import myImage from "../../img/background.png";
import ImageSection from "../../components/common/ImageForLoginAndRegister";

const Login = () => {
  return (
    <div className="h-screen grid grid-cols-2 bg-primary ">
      <div className="col-span-1 flex items-center justify-center p-4 bg-primary">
        <LoginForm />
      </div>
      <div className="col-span-1 lg:block w-full h-screen ">
        <ImageSection imageUrl={myImage} />
      </div>
    </div>
  );
};

export default Login;
