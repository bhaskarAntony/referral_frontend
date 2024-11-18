import React, { useContext, useState } from 'react'
import './style.css'
import coin from '../../images/coin.png'
import ReferralPopup from '../ReferralPopup/ReferralPopup';
import AuthContext from '../context/AuthContext';
import Support from '../support/Support';
import { Offcanvas } from 'react-bootstrap';
import { deepPurple } from '@mui/material/colors';
import { Avatar, Menu, MenuItem, Typography  } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
    const [showModal, setShowModal] = useState(false);
    const [showCanvas, setCanvas] = useState(false)
    const handleShow = () =>{setShowModal(true)}
    const handleHide = () =>{setShowModal(false)}
    const {user, logout, isAuthenticated} = useContext(AuthContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
  
    // Open the dropdown menu
    const handleAvatarClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    // Close the dropdown menu
    const handleClose = () => {
      setAnchorEl(null);
    };
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
     
     {
      isAuthenticated?(
        <form class="d-flex align-items-center gap-2">
        <div className="coins m-0">
            <img src={coin} alt="" />
            <span className='small'>{user?.coins?(user?.coins):('00')}</span>
        </div>
        <span className='fs-6 fst-normal' onClick={handleSupportShow}><i class="bi bi-headphones text-primary" ></i> Support</span>
        <button className="btn-main" type='button' onClick={handleShow}>Refer Your Friends</button>
     
        <Avatar
        sx={{ bgcolor: deepPurple[500], cursor: 'pointer' }}
        onClick={handleAvatarClick}
      >
        {(user?.name).slice(0, 2).toUpperCase()}
      </Avatar>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleClose}><Link to='/profile'><span className="d-flex gap-2"><i class="bi bi-person"></i> Profile</span></Link></MenuItem>
        {/* <MenuItem onClick={handleClose}><span className="d-flex gap-2"><i class="bi bi-star"></i> My Referrals</span></MenuItem>
        <MenuItem onClick={handleClose}><span className="d-flex gap-2"><i class="bi bi-send"></i> Invitations Sent</span></MenuItem> */}
        <MenuItem onClick={logout}>
          <Typography color="error"><span className="d-flex gap-2"><i class="bi bi-box-arrow-right"></i> Logout</span></Typography>
        </MenuItem>
      </Menu>
      </form>
      ):( 
      <Link to='/login' className='btn-main btn-100' >
          Login
      </Link>
      )
     }
     
    </div>

    <div class="d-flex align-items-center gap-2 d-md-none">
        <div className="coins m-0">
            <img src={coin} alt="" />
            <span className='small'>{user?.coins?(user?.coins):('00')}</span>
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
       {
        isAuthenticated?(
          <ul className='mt-3 m-ul w-100'>
          <li><a href="/">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          
          <h1 className="fs-3">🎉🎊Share Rewards</h1>
          <div className="rewards mt-3">
            <div className="card p-3 mt-3">
              <p className="fs-6 fw-bold"> <img src="https://i.gifer.com/origin/9b/9be3cc63d40d8ea231322e87d6aab7ca_w200.gif" alt="" /> Earned Cash Rewards :</p>
              <h1 className="fs-1 fw-bold"> &#8377; {user?.sharesData?.filter((share) => share.isregistered).length * 4}</h1>
            </div>

            <div className="card p-3 mt-3">
              <p className="fs-6 fw-bold"><img src="https://cdn.pixabay.com/animation/2023/11/29/03/39/03-39-03-19_512.gif" alt="" /> Earned Worthable Vouchers </p>
              <h1 className="fs-1 fw-bold">&#8377; {user?.sharesData?.filter((share) => share.isregistered).length * 6}</h1>
            </div>

          <div className="card p-3 mt-3">
              <p className="fs-6 fw-bold"><img src="https://img1.picmix.com/output/stamp/thumb/0/1/1/6/1456110_56f42.gif" alt="" /> Earned Worthable coins</p>
            <h1 className="fs-1 fw-bold">&#8377;{user?.sharesData?.filter((share) => share.isregistered).length * 0.5}</h1>
          </div>
          
          </div>
          <li className='w-100 mt-3'>
            <button className="btn-main w-100 p-2 mt-3" onClick={handleShow}>Refer your Friends</button>
            <button className="btn mt-3 p-2 btn-outline-primary w-100" onClick={handleSupportShow}>Support</button>
          </li>
     </ul>
        ):(
          <Link to='/login' className='btn-main btn-100' >
          Login
      </Link>
        )
       }
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  )
}

export default Header