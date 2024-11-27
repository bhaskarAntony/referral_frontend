import React, { useContext, useState } from 'react'
import './style.css'
import ReferralPopup from '../ReferralPopup/ReferralPopup';
import ReferralCalculatorPopup from '../ReferralCalculatorPopup/ReferralCalculatorPopup';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate()
    const {user, isAuthenticated} = useContext(AuthContext)
    const data = [
        'Get ₹100, 50 Coins, and a ₹100 Voucher for every 25 shares using your unique referral code.',
        'When someone registers and enrolls using your code, earn ₹1,000, 50 Coins, and a ₹500 Voucher instantly!',
        'Help your friends grow while you earn exciting rewards'
    ]

    const [showModal, setShowModal] = useState(false);
    const handleShow = () =>{
        if(isAuthenticated){
            setShowModal(true)
          }else{
            navigate('/login')
          }
    }
    const handleHide = () =>{setShowModal(false)}


 

    const [calculator, setCalculator] = useState(false);

    const showCalculator = () =>setCalculator(true)
    const hideCalculator = () =>setCalculator(false)
  return (
    <section className="container p-md-2 p-3 hero">
        <div className="row align-items-center">
            <div className="col-md-7">
                <h4 className="fs-6 text-danger">Share, Earn, and Learn with Ease!</h4>
                <h1 className="fs-1 fw-bolder lh-base">Refer your friends and Earn up to <span className="text-primary">&#8377; 1000 Cash +</span> <span className="text-danger">  &#8377; 500 Worthable Voucher</span> +<span className="text-primary"> 50 Coins</span> on every enrolment!</h1>
                <ul className='mt-3'>
                   {
                    data.map((item, index)=>(
                        <li className=" mt-2 lh-base">{item}</li>
                    ))
                   }
                </ul>
                <small className="small text-secondary"><span className="text-danger">*</span>Terms and Conditions Apply</small> <br />
               <div className="d-flex flex-wrap gap-2">
               <button className="btn-main mt-3" onClick={handleShow}>Start Referring Now and Watch Your Rewards Grow!</button>
               <button className="btn btn-outline-primary mt-3 px-4 p-2" onClick={showCalculator}>Referral Calculator</button>
               </div>
               <small className="small text-secondary mt-2 d-block">So far, more Be Practicalites have successfully referred more learners!</small>
            </div>
            <div className="col-md-5 mt-md-0 mt-3">
                <img src="https://img.freepik.com/premium-vector/woman-talking-using-megaphone-refer-friends-exchange-rewards-referral-program-concept-flat-vector-illustration_923732-4937.jpg?w=740" alt="" className="w-100" />

                <p className=" text-center d-flex flex-wrap gap-3 align-items-center justify-content-center">
                    <small className="small text-dark">Your unique referral code</small>
                    <button className='btn border'>{user?.couponCode} <i class="bi bi-copy text-primary"></i></button>
                </p>
            </div>

        </div>
        <ReferralPopup show={showModal} hide={handleHide}/>
        <ReferralCalculatorPopup open={calculator} onClose={hideCalculator}/>
    </section>
  )
}

export default Hero