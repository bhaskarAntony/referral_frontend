import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AuthContext from '../../components/context/AuthContext';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ title: '', content: '' });
  const { login, error, clearErrors, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Responsive dialog settings
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (isAuthenticated) {
      
      setLoading(false);  // Stop loading when authenticated
    }

    if (error) {
      setDialogInfo({ title: 'Login Error', content: error });
      setOpen(true);
      clearErrors();
      setLoading(false);  // Stop loading on error
    }
  }, [error, isAuthenticated, clearErrors]);

  const [user, setUser] = useState({ email: '', password: '' });
  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading on form submission
    login({ email, password });
  };

  const handleClose = () => {
    setOpen(false);
    console.log(isAuthenticated);
    
    if (isAuthenticated) {
      navigate('/');  // Redirect after closing dialog if authenticated
    }
  };

  useEffect(()=>{
    if (isAuthenticated) {
        navigate('/');  // Redirect after closing dialog if authenticated
      }
  })

  return (
    <div className='container-container p-3 bg-light1'>
      <div className='row align-items-center login-container'>
        <div className='col-md-4 m-auto'>
          <div className='card p-3 p-md-4'>
            <h1 className="fs-4">Hi, Welcome back, <span className="text-danger">Sign in</span></h1>
            <form onSubmit={onSubmit}>
              <div className='form-group mt-3'>
                <label htmlFor="email" className='form-label'>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className='form-control p-3'
                />
              </div>
              <div className='form-group mt-3'>
                <label htmlFor="password" className='form-label'>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  className='form-control p-3'
                />
              </div>
              <p className="fs-6 mt-2">Don't have an account? <Link to='/register'>Create account</Link></p>
              <button type="submit" className='btn-main w-100 mt-3 p-3' disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogInfo.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogInfo.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
