import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "../../store";
import { TextField, Button, Grid } from "@material-ui/core";

const initialFormCredentials = {
  email: '',
  password: ''
}

const initialHelperText = {
  ...initialFormCredentials,
  errorMessage: ''
}

export const Login = () => {
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
    
    const validEmail = credentials.email.trim().length > 0;
    const validPassword = credentials.password.trim().length > 0;
    
    if(validEmail && validPassword){
      dispatch(Auth.login({
        email: credentials.email.trim(),
        password: credentials.password.trim()
      }));
    } else {
      setHelperText({ 
        ...helperText,
        email: validEmail 
        ? ''
        : 'email is required',
        password: validPassword 
        ? ''
        : 'password is required',
      })
    }

    setTimeout(() => {
      if(!auth.status.loading && auth.status.error.message === ''){
        setCredentials(initialFormCredentials); 
      } else if(auth.status.error.message.length > 0){
        setHelperText({ ...helperText, errorMessage: auth.status.error.message })
      }
    }, 1000 * 5);
    
  }

  return (
    <form onSubmit={handleSubmit}>
      
      <h2>Login</h2>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          variant="outlined"
          type="email"
          name="email"
          label="email"
          value={credentials.email}
          onChange={handleChange}
          helperText={helperText.email}
        />
        <TextField
          variant="outlined"
          type="password"
          name="password"
          label="password"
          value={credentials.password}
          onChange={handleChange}
          helperText={helperText.password}
        />
      </Grid>
      
      <div>
        <Button type="submit">Login</Button>
      </div>
      
      <div>
        <p style={{color: 'red'}}>{helperText.errorMessage}</p>
      </div>
      
      <p>
        Don't have an account?{' '} 
        <a href="/register">
          Register a new account
        </a>
      </p>

    </form>
  )
}