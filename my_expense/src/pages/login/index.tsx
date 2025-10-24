import { useState } from "react";
import { login } from "../../services/user";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!email && !pwd){
      alert('Please Add Email & Password')
      return;
    }
    login(email, pwd)
    .then(resp => {
      if(resp === "Logged In"){
        navigate('/dashboard')
      }
    })
  }
    return (
        <>
            <div className="d-flex align-items-center justify-content-center w-100" style={{minHeight: "85vh"}}>
                <form onSubmit={submitForm}>
                <div className="form-group">
                  <input type="email" className="form-control mt-3" placeholder="Enter Email Address" 
                  value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control mt-3" placeholder="Enter Password"
                  value={pwd} onChange={(e) => setPwd(e.target.value)}/>
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
              </form>
            </div>
          
        </>
    )
}

export default Login;