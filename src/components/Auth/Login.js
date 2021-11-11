import { useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "../../store";

const initialFormCredentials = {
  email: '',
  password: ''
}

export const Login = () => {
  const [credentials, setCredentials] = useState(initialFormCredentials);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({...credentials, [name]: value });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(credentials.email.trim().length > 0 && credentials.password.trim().length > 0){
      dispatch(Auth.login({
        email: credentials.email.trim(),
        password: credentials.password.trim()
      }));
      setCredentials(initialFormCredentials);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          name="email"
          placeholder={"email"}
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder={"password"}
          value={credentials.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <p>
        Don't have an account? 
        <a href="/register">
          Register a new account
        </a>
      </p>
    
    </form>
  )
}