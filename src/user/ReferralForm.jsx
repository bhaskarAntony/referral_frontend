import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Alert, Snackbar, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/loading/Loading';

function ReferralForm() {
  const { referralId } = useParams();
  const [referral, setReferral] = useState(null);
  const [formData, setFormData] = useState({ fullname: '', email: '', phoneNumber: '', course: '', couponCode:'' });
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ open: false, message: '', type: '' });
  const navigate = useNavigate()
  // Fetch referral details
  useEffect(() => {
    axios.get(`https://referral-backend-myev.onrender.com/api/referral/${referralId}`)
      .then(response => {
        setReferral(response.data.referral);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [referralId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://referral-backend-myev.onrender.com/api/send/otp/${referralId}`, formData);
      localStorage.setItem('email', formData.email);
      navigate('/verify/otp')
      setPopup({ open: true, message: 'Details submitted successfully!', type: 'success' });
    } catch {
      setPopup({ open: true, message: 'Error submitting details', type: 'error' });
    }
  };

  if (loading) return <Loading />;

  return (
    <Container className="p-3 p-md-5  user-register" fluid>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className='p-3 p-md-4 border-0'>
            <h1 className="fs-4">Complete Your Registration</h1>
            <hr />
         
              {/* <p>Referred by: <strong>{referral?.fullname}</strong> for the <strong>{referral?.course}</strong> course</p> */}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="fullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    className='p-3'
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    className='p-3'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="phoneNumber" className="mt-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    className='p-3'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="phoneNumber" className="mt-3">
                  <Form.Label>Coupon code</Form.Label>
                  <Form.Control
                    type="tel"
                    name="couponCode"
                    className='p-3'
                    value={formData.couponCode}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="interestedCourse" className="mt-3">
                  <Form.Label>Interested Course</Form.Label>
                  <Form.Control
                    as="select"
                    name="course"
                    className='p-3'
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a course</option>
                    <option value="MERN">MERN</option>
                    <option value="MEAN">MEAN</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                  </Form.Control>
                </Form.Group>
                <button  className="mt-4 w-100 btn-main w-100 p-3">Submit</button>
              </Form>
          
          </Card>
        </Col>
      </Row>
      <Snackbar open={popup.open} autoHideDuration={6000} onClose={() => setPopup({ ...popup, open: false })}>
        <Alert severity={popup.type}>{popup.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default ReferralForm;
