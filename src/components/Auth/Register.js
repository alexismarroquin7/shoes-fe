import { useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "../../store";

const initialFormCredentials = {
  username: '',
  email: '',
  password: '',
  role: 'user'
}

export const Register = () => {
  const [credentials, setCredentials] = useState(initialFormCredentials);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({...credentials, [name]: value });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = {
      email: Boolean(credentials.email.trim().length > 0),
      username: Boolean(credentials.username.trim().length > 0),
      password: Boolean(credentials.password.trim().length > 0)
    };

    if(
      valid.email &&
      valid.username &&
      valid.password
    ){
      dispatch(Auth.register({
        email: credentials.email.trim(),
        password: credentials.password.trim(),
        username: credentials.username.trim(),
        role: credentials.role
      }));
      setCredentials(initialFormCredentials);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <input
          type="username"
          name="username"
          placeholder={"username"}
          value={credentials.username}
          onChange={handleChange}
        />
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
        <button type="submit">Register</button>
      </div>
      <p>
        Already have an account? 
        <a href="/register">
          Login
        </a>
      </p>
    
    </form>
  )
}