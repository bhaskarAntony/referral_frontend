import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { TelephoneFill, PersonPlus } from 'react-bootstrap-icons';
import axios from 'axios';
import './style.css';
import AuthContext from '../context/AuthContext';
import Loading from '../loading/Loading';
import { Alert, Snackbar } from '@mui/material';
import Callback from '../callback/Callback';
import WhatsappShare from '../whatsappPopup/WhatsappShare';
import { Link } from 'react-router-dom';

function ReferralPopup({ show, hide }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const {user} = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);
  const [popup, setPopup] = useState({ open: false, type: '', message: '' });
  const [friendData, setFriendData] = useState({
    friendname: '',
    phonenumber: '',
    email: '',
    referredby: ''  // Will remain empty
  });

  const [whatsAppPopupShare, setWhatsAppPopupShare] = useState(false);
  const handleShowWhatsappShare = () =>setWhatsAppPopupShare(true)
  const handleHideWhatsappShare = () =>setWhatsAppPopupShare(false)

  const handleCloseReferralModal = () => hide();
  
  const handleOpenFormModal = () => {
    hide();
    setShowFormModal(true);
  };
  const handleCloseFormModal = () => setShowFormModal(false);


  const [showCallback, setShowCallback] = useState(false);
  const handleShowCallback = () => {
    setShowCallback(true)
    hide();

  }
  const handleHideCallback = () => setShowCallback(false)

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFriendData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClosePopup = () => {
    setPopup({ ...popup, open: false });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true)
    try {
      await axios.post('https://referral-backend-myev.onrender.com/api/new/friend', {...friendData, referredby:user?._id});
      setPopup({ open: true, type: 'success', message: 'Friend details added successfully!' });
      setisLoading(false)
      handleCloseFormModal();
      setFriendData({ friendname: '', phonenumber: '', email: '', referredby: '' });
    } catch (error) {
      setisLoading(false);
      setPopup({ open: true, type: 'error', message: 'Failed to add friend details. Please try again.' });
      console.error(error);
    }
  };

  if(isLoading){
    return <Loading/>
  }




  return (
    <div className="text-center">
      {/* First Modal: Referral Options */}
      <Modal show={show} onHide={handleCloseReferralModal} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='fs-5'>2 Quick ways to Start Referring your Friends!</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" p-4 p-md-5">
          <div className="row align-items-center">
            <div className="col-md-6 mt-3">
              <div className="card p-3 py-4 h-100">
                <h5 className='fs-5 mt-3 d-flex justify-content-between align-items-center'>
                  <span>Request a call back </span> 
                  <TelephoneFill size={25} className='text-danger' />
                </h5>
                <p className='fs-6 text-secondary'>Your Referral Manager will call you within the next 12 hours.</p>
                <button className="btn-main" onClick={handleShowCallback}>I want a Call Back</button>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="card p-3 py-4 h-100">
                <h5 className='fs-5 mt-3 d-flex justify-content-between align-items-center'>
                  <span>Add Friend's Details</span>   
                  <PersonPlus size={32} className='text-danger' />
                </h5>
                <p className='fs-6 text-secondary'>You can share details of your friend directly with us.</p>
                <button className="btn-main" onClick={handleOpenFormModal}>
                  Add Friend's Details
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <div className="row w-100">
            <div className="col-md-7">
              <span className="text-secondary small">
                You can also share courses Inviation on Whatsapp
                <Link to=''  onClick={handleShowWhatsappShare} className='text-danger'> share now</Link>
              </span>
            </div>
            <div className="col-md-5 d-flex flex-wrap btn-100 justify-content-end align-items-center">
              <button className="btn btn-outline-primary btn-100 mt-3 mt-md-0" onClick={handleShowWhatsappShare}>Share on WhatsApp</button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Second Modal: Add Friend's Details Form */}
      <Modal show={showFormModal} onHide={handleCloseFormModal} centered className='friend-modal'>
        <Modal.Header closeButton>
          <div>
            <Modal.Title className='fs-5'>Add Friend's Details</Modal.Title>
            <span className="small text-secondary">We will contact them directly to help them join Be Practical</span>
          </div>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <div className="card p-3">
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="friendName">
                <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="friendname"
                  value={friendData.friendname}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="friendPhone">
                <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="phonenumber"
                  value={friendData.phonenumber}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="friendEmail">
                <Form.Label>Email (optional)</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={friendData.email}
                  onChange={handleInputChange}
                  placeholder="Enter friend's email"
                />
              </Form.Group>
              <div className="row">
                <div className="col-md-6">
                  <button type="button" className="mt-3 btn btn-outline-danger p-2 w-100" onClick={handleCloseFormModal}>
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

      <Callback show={showCallback} onClose={handleHideCallback}/>
      <WhatsappShare show={whatsAppPopupShare} onClose={handleHideWhatsappShare}/>
    </div>
  );
}

export default ReferralPopup;
