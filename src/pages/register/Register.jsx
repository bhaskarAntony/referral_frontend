import React, { useState, useContext } from 'react';
import { Alert, Form, Button, Container } from 'react-bootstrap';
import AuthContext from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-bootstrap-icons';

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const { name, email, password, phoneNumber } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    clearErrors();

    if (name === '' || email === '' || password === '' || phoneNumber === '') {
      alert('Please enter all fields');
    } else {
      const isSuccess = await register({
        name,
        email,
        password,
        phoneNumber,
      });

      if (isSuccess) {
        setLoading(false);
        setSuccessMessage('Registration successful!');
        navigate('/login')
        setUser({ name: '', email: '', password: '', phoneNumber: '' });
      }
    }
  };

  return (
  <section className="p-3 py-4 bg-light">
  <Container className="mt-5">
     
      {error && (
        <Alert variant="danger" onClose={() => clearErrors()} dismissible>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}
    <div className="row">
        <div className="col-md-6 m-auto">
      <div className="card p-3 p-md-5">
        <h1 className="fs-3 fw-bold">Create Account</h1>
        <br />
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
           
            name="name"
            className='p-3'
            value={name}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
              className='p-3'
           
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            className='p-3'
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
             className='p-3'
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </Form.Group>

        <p className="fs-6 mt-2">Do have an already account? <Link to='/login'>Sign in</Link></p>

        <button  type="submit" className="w-100 btn-main w-100 p-3">
          Register
        </button>
      </Form>
      </div>
        </div>
    </div>
    </Container>
  </section>
  );
};

export default Register;
