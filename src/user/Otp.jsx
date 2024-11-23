import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Otp() {
  const { referralId } = useParams();
  const [referral, setReferral] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    otp: '',
    email: localStorage.getItem('email') || ''  // Get email from local storage if available
  });

  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ open: false, message: '', type: '' });
  
  // Timer states
  const [timer, setTimer] = useState(300);  // Timer starting from 5 minutes (300 seconds)
  const [canResend, setCanResend] = useState(false);  // To track if OTP can be resent

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.otp) {
      setPopup({ open: true, message: 'Please provide both OTP.', type: 'error' });
      return;
    }

    try {
      // If OTP is empty, request OTP first
      const response = await axios.post(`http://localhost:5000/api/referral/register`, formData);
      setPopup({ open: true, message: response.data.message, type: response.data.success ? 'success' : 'error' });
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      setPopup({ open: true, message: error.message, type: 'error' });
    }
  };

  // Function to request a new OTP
  const resendOTP = async () => {
    try {
      // Request new OTP from the server
      const response = await axios.post(`http://localhost:5000/api/referral/send-otp/${referralId}`, { email: formData.email });
      setPopup({ open: true, message: response.data.message, type: 'success' });
      setTimer(300);  // Reset timer to 5 minutes after resending OTP
    } catch (error) {
      console.error('Error requesting OTP:', error);
      setPopup({ open: true, message: 'Failed to resend OTP.', type: 'error' });
    }
  };

  // Timer effect
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
    } else {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format time into MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Container className="p-3 p-md-5 user-register" fluid>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-3 p-md-4 border-0">
            <h1 className="fs-4">Verify OTP</h1>
            <p className="fs-6 text-secondary">6-digit OTP has been sent to your registered email.</p>
            <hr />
            {/* Optionally, display referred info */}
            <p>Referred by: <strong>{referral?.fullname}</strong> for the <strong>{referral?.course}</strong> course</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="otp">
                <Form.Label>6-Digit OTP</Form.Label>
                <Form.Control
                  type="text"
                  name="otp"
                  className="p-3"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Button type="submit" className="mt-4 w-100 btn-main p-3">{loading ? 'Please wait' : 'Verify OTP'}</Button>
            </Form>

            {/* Timer */}
            <div className="mt-3">
              {timer > 0 ? (
                <p className="text-center">Time remaining: {formatTime(timer)}</p>
              ) : (
                <Button 
                  variant="link" 
                  onClick={resendOTP} 
                  disabled={!canResend}
                  className="w-100"
                >
                  Resend OTP
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Popup Snackbar for messages */}
      <Snackbar 
        open={popup.open} 
        autoHideDuration={6000} 
        onClose={() => setPopup({ ...popup, open: false })}
      >
        <Alert severity={popup.type}>{popup.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default Otp;
