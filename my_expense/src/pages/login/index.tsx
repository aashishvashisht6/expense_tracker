import LoginForm from "../../components/Login";

const Login = () => {  
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center w-100"
        style={{ minHeight: "85vh" }}
      >
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
