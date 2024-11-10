import React, { useContext, useState } from 'react'
import './style.css'
import coin from '../../images/coin.png'
import ReferralPopup from '../ReferralPopup/ReferralPopup';
import AuthContext from '../context/AuthContext';
import Support from '../support/Support';
import { Offcanvas } from 'react-bootstrap';

function Header() {
    const [showModal, setShowModal] = useState(false);
    const [showCanvas, setCanvas] = useState(false)
    const handleShow = () =>{setShowModal(true)}
    const handleHide = () =>{setShowModal(false)}
    const {user} = useContext(AuthContext)
    console.log(user);
    const [support, setSupport] = useState(false);
    const handleSupportShow = () =>{setSupport(true)}
    const handleSupportHide = () =>{setSupport(false)}


    const showCanvasHandler = () =>setCanvas(true)
    const hideCanvasHandler = () =>setCanvas(false)
    
  return (
    <header className=' p-md-2 p-3'>
        <nav class="navbar navbar-expand-lg container">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img src="https://bepractical.s3.us-east-2.amazonaws.com/brand-logo.cc6e3cf088a8fd3005b1.jpg" alt="logo" className="logo" /></a>
    
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
     
      <form class="d-flex align-items-center gap-2">
        <div className="coins m-0">
            <img src={coin} alt="" />
            <span className='small'>105</span>
        </div>
        <span className='fs-6 fst-normal' onClick={handleSupportShow}><i class="bi bi-headphones text-primary" ></i> Support</span>
        <button className="btn-main" type='button' onClick={handleShow}>Refer Your Friends</button>
       <span className="fs-6">{user?.name} <i class="bi bi-chevron-down"></i></span>
      </form>
    </div>

    <div class="d-flex align-items-center gap-2 d-md-none">
        <div className="coins m-0">
            <img src={coin} alt="" />
            <span className='small'>105</span>
        </div>

        <button class="navbar-toggler"  onClick={showCanvasHandler}>
      <span class="navbar-toggler-icon"></span>
    </button>
        {/* <span className='fs-6 fst-normal' onClick={handleSupportShow}><i class="bi bi-headphones text-primary" ></i> Support</span> */}
        {/* <button className="btn-main" type='button' onClick={handleShow}>Refer Your Friends</button> */}
       {/* <span className="fs-6">{user?.name} <i class="bi bi-chevron-down"></i></span> */}
      </div>
  </div>
</nav>
<ReferralPopup show={showModal} hide={handleHide}/>
<Support show={support} onClose={handleSupportHide}/>


<Offcanvas show={showCanvas} onHide={hideCanvasHandler}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          <a class="navbar-brand" href="#"><img src="https://bepractical.s3.us-east-2.amazonaws.com/brand-logo.cc6e3cf088a8fd3005b1.jpg" alt="logo" className="logo" /></a>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <ul className='mt-3 m-ul'>
              <li><a href="/">Home</a></li>
              <li><a href="/">About us</a></li>
              <li><a href="/">Contact us</a></li>
              <li>
                <button className="btn-main w-100 p-2 mt-3" onClick={handleShow}>Refer your Friends</button>
                <button className="btn mt-3 p-2 btn-outline-primary w-100" onClick={handleSupportShow}>Support</button>
              </li>
         </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  )
}

export default Header