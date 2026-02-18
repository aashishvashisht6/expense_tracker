import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/user";
import Logo from "../../assets/expense.svg";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [error, setError] = useState<string>("");

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email && !pwd) {
      alert("Please Add Email & Password");
      return;
    }
    login(email, pwd).then((resp) => {
      if (resp === "Logged In") {
        navigate("/dashboard");
      } else {
        setError(resp);
      }
    });
  };

  return (
    <div className="card" style={{ width: "30rem" }}>
      <div className="card-header text-center">
        <img
          src={Logo}
          className="card-img-top"
          alt="Expense Tracker Logo"
          height={"30px"}
        />
        <h3 className="mt-2">Expense Tracker</h3>
      </div>
      <div className="card-body">
        <h4 className="card-title text-center">Login</h4>

        <form onSubmit={submitForm}>
          <div className="form-group">
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control mt-3"
              placeholder="Enter Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required={true}
            />
          </div>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
