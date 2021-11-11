import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Auth } from "../../store";

export const ConfirmEmail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(s => s.auth);
  useEffect(() => {
    dispatch(Auth.confirmEmail(params.token));
  },
  [
    dispatch,
    params.token
  ]);

  useEffect(() => {
    setTimeout(() => {
      if(
        !auth.status.loading &&
        auth.status.error.message === '' &&
        auth.user.email_confirmed
      ){
        navigate('/login');
      }
    }, 1000 * 5);
  }, [
    auth.status.loading,
    auth.status.error.message,
    auth.user.email_confirmed,
    navigate
  ]);
  
  return (
    <div>
      <h2>
        {auth.status.loading && auth.status.error.message === '' 
        ? 'Confirming email...' : ''}
        {!auth.status.loading && auth.status.error.message
        ? 'Oops there was an error...' : ''}
      </h2>
      <p style={{color: 'red'}}>
        {!auth.status.loading && auth.status.error.message 
        ? auth.status.error.message 
        : ''}
      </p>
    </div>
  )
}