import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "../../store";
import { TextField, Button, Grid } from "@material-ui/core";

const initialFormCredentials = {
  username: '',
  email: '',
  password: '',
  role: 'user'
}

const initialHelperText = {
  errorMessage: ''
}

export const Register = () => {
  const [credentials, setCredentials] = useState(initialFormCredentials);
  const [helperText, setHelperText] = useState(initialHelperText);
  const auth = useSelector(s => s.auth);
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHelperText(initialHelperText);
    setCredentials({...credentials, [name]: value });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const valid = {
      email: credentials.email.trim().length > 0,
      username: credentials.username.trim().length > 0,
      password: credentials.password.trim().length > 0
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

      setTimeout(() => {
        if(auth.status.error.message){
          setHelperText({...helperText, errorMessage: auth.status.error.message });
        }

      }, 1000 * 5);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          type="text"
          variant="outlined"
          name="username"
          placeholder={"username"}
          value={credentials.username}
          onChange={handleChange}
        />
        <TextField
          type="email"
          variant="outlined"
          name="email"
          placeholder={"email"}
          value={credentials.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          variant="outlined"
          type="password"
          placeholder={"password"}
          value={credentials.password}
          onChange={handleChange}
        />
      </Grid>

      <div>
        <p>{helperText.errorMessage}</p>
      </div>

      <div>
        <Button type="submit">Register</Button>
      </div>
      
      <p>
        Already have an account?{' '}
        <a href="/login">
          Login
        </a>
      </p>
    
    </form>
  )
}