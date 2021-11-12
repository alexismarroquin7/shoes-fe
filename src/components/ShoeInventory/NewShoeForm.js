import { Button, Grid, TextField, Typography } from "@material-ui/core"
import { useState } from "react";
import { useNavigate } from "react-router"

const initialFormValues = {
  name: ''
};

export const NewShoeForm = () => {
  const [values, setValues] = useState(initialFormValues);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  
  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Typography variant="h4">New Shoe</Typography>
      
      <TextField 
        variant="outlined"
        label="name"
        onChange={handleChange}
      />

      <Button>+ Colors</Button>
      <Button>+ Images</Button>
      <Button>+ Images</Button>
      

      <Grid>  
        <Button onClick={() => navigate('/admin/shoe_inventory')}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </Grid>

    </form>
  )
}