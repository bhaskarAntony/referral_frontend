import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Loading from '../loading/Loading';
import AuthContext from '../context/AuthContext';

function WhatsappShare({ show, onClose }) {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState({
    fullname: '',
    course: '',
    couponCode: user?.couponCode,
    friendphonenumber:''
  });
  const [popup, setPopup] = useState({ open: false, type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prevData) => ({ ...prevData, [name]: value }));
  };

  // Upload referral data and generate WhatsApp message link
  const handleShare = async () => {
    const { fullname, course, couponCode } = message;
    if (!fullname || !course || !couponCode) {
      setPopup({
        open: true,
        type: 'error',
        message: 'Please fill in all required fields',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Send data to the backend https://referral-backend-myev.onrender.com
      const response = await axios.post('https://referral-backend-myev.onrender.com/api/new/referral', {
        fullname,
        course,
        couponCode,
      });

      // Generate WhatsApp link with the unique referral URL
      const invitationMessage = `Hello! ${fullname} is inviting you to join the ${course} course. Use the coupon code "${couponCode}" for an exclusive discount! Enroll here: ${response.data.link}`;
      const whatsappURL = `https://wa.me/?text=${encodeURIComponent(invitationMessage)}`;

      // Open WhatsApp link
      window.open(whatsappURL, '_blank');
      setIsLoading(false);
      onClose();
    } catch (error) {
      setPopup({
        open: true,
        type: 'error',
        message: 'Failed to generate referral link',
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered className='friend-modal'>
        <Modal.Header closeButton>
          <div>
            <Modal.Title className='fs-5'>Refer your friends through WhatsApp</Modal.Title>
            <span className="small text-secondary">
              Fill in the necessary details to share an invitation
            </span>
          </div>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <div className="card p-3">
            <Form>
              <Form.Group controlId="friendName">
                <Form.Label>Friend's Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="fullname"
                  value={message.fullname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="friendName">
                <Form.Label>Friend's Phone Number<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="friendphonenumber"
                  value={message.friendphonenumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="selectCourse">
                <Form.Label>Select Course for your friend <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  as="select"
                  name="course"
                  value={message.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a course</option>
                  <option value="MERN">MERN</option>
                  <option value="MEAN">MEAN</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group controlId="couponCode">
                <Form.Label>Your Coupon Code <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="couponCode"
                  value={message.couponCode}
                  onChange={handleChange}
                  required
                  disabled
                />
              </Form.Group>
              <br />

              <div className="row">
                <div className="col-md-6">
                  <button type="button" className="mt-3 btn btn-outline-danger p-2 w-100" onClick={onClose}>
                    Cancel
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    type="button"
                    className="mt-3 btn-main w-100 p-2"
                    onClick={handleShare}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Share on WhatsApp'}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      <Snackbar open={popup.open} autoHideDuration={6000} onClose={() => setPopup({ ...popup, open: false })}>
        <Alert onClose={() => setPopup({ ...popup, open: false })} severity={popup.type}>
          {popup.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default WhatsappShare;
