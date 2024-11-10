import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Loading from '../loading/Loading';

function Support({ show, onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    message: ''
  });
  const [popup, setPopup] = useState({ open: false, type: '', message: '' });
  const [isLoading, setisLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setisLoading(true)
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/new/support', formData);
      setisLoading(false)
      setPopup({ open: true, type: 'success', message: 'Support ticket submitted successfully!' });
      onClose();
      setFormData({ name: '', phone: '', message: '' }); // Clear form
    } catch (error) {
      setisLoading(false)
      setPopup({ open: true, type: 'error', message: 'Failed to submit support ticket.' });
      console.error(error);
    }
  };

  // Close the popup
  const handleClosePopup = () => {
    setPopup({ ...popup, open: false });
  };
  if(isLoading){
    return <Loading/>
  }

  return (
    <>
      <Modal show={show} onHide={onClose} centered className='friend-modal'>
        <Modal.Header closeButton>
          <div>
            <Modal.Title className='fs-5'>Submit a Support Ticket</Modal.Title>
            <span className="small text-secondary">
              Experiencing issues? Describe your problem below, and our support team will work with you to resolve it as soon as possible.
            </span>
          </div>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <div className="card p-3">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="supportName">
                <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="supportPhone">
                <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="supportMessage">
                <Form.Label>Message <span className="text-danger">*</span></Form.Label>
                <textarea
                  name="message"
                  className='form-control'
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <button type="button" className="mt-3 btn btn-outline-danger p-2 w-100" onClick={onClose}>
                    Cancel
                  </button>
                </div>
                <div className="col-md-6">
                  <button type="submit" className="mt-3 btn-main w-100 p-2">
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      {/* Snackbar for success or error message */}
      <Snackbar
        open={popup.open}
        autoHideDuration={6000}
        onClose={handleClosePopup}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClosePopup} severity={popup.type} variant="filled">
          <strong>{popup.type === 'success' ? 'Success' : 'Error'}</strong>: {popup.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Support;
