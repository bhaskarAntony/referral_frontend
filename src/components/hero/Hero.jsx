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
        'If you refer a friend Pre-SET - You get ₹10,000 cash + Vouchers worth ₹2000 + 200 Be Practical coins',
        'If you refer a friend Post-SET - You get ₹5000 cash + Vouchers worth ₹1000 + 200 Be Practical coins',
        'They get ₹10,000 off on the course.'
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
                <h1 className="fs-1 fw-bolder lh-base">Refer your friends and Earn up to <span className="text-primary">&#8377; 10,000</span> on every enrolment!</h1>
                <ul className='mt-3'>
                   {
                    data.map((item, index)=>(
                        <li className=" mt-2 lh-base">{item}</li>
                    ))
                   }
                </ul>
                <small className="small text-secondary"><span className="text-danger">*</span>Terms and Conditions Apply</small> <br />
               <div className="d-flex flex-wrap gap-2">
               <button className="btn-main mt-3" onClick={handleShow}>Start Referring Now</button>
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