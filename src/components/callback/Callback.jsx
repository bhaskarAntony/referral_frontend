import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Loading from '../loading/Loading';

function Callback({ show, onClose }) {
  const [formData, setFormData] = useState({
    fullname: '',
    phonenumber: '',
  });
  const [popup, setPopup] = useState({ open: false, type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      await axios.post('https://referral-backend-myev.onrender.com/api/new/callback', formData);
      setIsLoading(false)
      setPopup({ open: true, type: 'success', message: 'callback request sent successfully!' });
      onClose();
      setFormData({ name: '', phone: '', message: '' }); // Clear form
    } catch (error) {
        setIsLoading(false);
      setPopup({ open: true, type: 'error', message: 'Failed to send callback request.' });
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
            <Modal.Title className='fs-5'>Submit a Callback Request</Modal.Title>
            <span className="small text-secondary">
              fiil the form and our team will contact you soon
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
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="supportPhone">
                <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
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

export default Callback;
