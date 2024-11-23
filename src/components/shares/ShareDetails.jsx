import React, { useContext, useState } from 'react';
import { Stepper, Step, StepLabel, Box, useMediaQuery, Paper, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import cashImage from './cash.png';
import coinsImage from './coins.png';
import vocherImage from './vocher.png';
import ReferralPopup from '../ReferralPopup/ReferralPopup';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ShareDetails = () => {
    const [showModal, setShowModal] = useState(false);
  const referralRewards = [
    { shares: 25, cashReward: '₹100', coins: 50, vouchers: '₹150' },
    { shares: 50, cashReward: '₹200', coins: 100, vouchers: '₹250' },
    { shares: 75, cashReward: '₹300', coins: 200, vouchers: '₹350' },
    { shares: 100, cashReward: '₹400', coins: 300, vouchers: '₹450' },
    { shares: 125, cashReward: '₹500', coins: 400, vouchers: '₹550' },
    { shares: 150, cashReward: '₹600', coins: 500, vouchers: '₹650' },
    { shares: 175, cashReward: '₹700', coins: 600, vouchers: '₹750' },
    { shares: 200, cashReward: '₹800', coins: 700, vouchers: '₹850' },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedStep, setSelectedStep] = useState(); // Set initial step to 1st referral

  // Ensure that selectedStep is valid
  const handleStepChange = (shares) => {
    if (shares >= 25 && shares <= 200) {
      setSelectedStep(shares);
    }
  };

  const {isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleShow = () =>{
      if(isAuthenticated){
          setShowModal(true)
        }else{
          navigate('/login')
        }
  }
  const handleHide = () =>{setShowModal(false)}

  // Get the selected reward data based on selectedStep
  const selectedReward = referralRewards.find((reward) => reward.shares === selectedStep);
  
  // Add debugging log
  console.log("Selected Step: ", selectedStep);
  console.log("Selected Reward: ", selectedReward);

  return (
    <div className="container-fluid p-3 p-md-5">
      <div className="container">
      <div className="text-left mt-3 mt-md-5">
          {/* Title and description for referral program */}
          <h4 className="fw-bold mb-4 fs-3 text-center">Just Share & Earn More</h4>
          <p className=" mb-4">
            Invite your friends to join Be Practical and earn exciting rewards! The more friends you refer, the more rewards you earn. Share your unique referral link and watch the rewards grow with each successful registration.
          </p>
          <p className=" mb-4">
            Your friend needs to register on our website. Each friend can only register once. Once they register, and their account is verified as genuine, you will earn rewards according to the shares they complete.
          </p>
          <h1 className="fs-4 fw-bold">👇 Just click below number of shares and check details</h1>
        </div>
        <Box sx={{ width: '100%', padding: 2 }} className="mt-3 mt-md-5">
          <Stepper
            activeStep={selectedStep / 25 - 1} // Adjusted activeStep logic based on shares
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{
              flexDirection: isMobile ? 'column' : 'row',
              width: '100%',
            }}
          >
            {referralRewards?.map((reward) => (
              <Step key={reward.shares}>
                <StepLabel
                  onClick={() => handleStepChange(reward.shares)}
                  StepIconProps={{
                    sx: {
                      fontSize: isMobile ? '2.5rem' : '2rem',
                      color: selectedStep === reward.shares ? 'primary.main' : 'text.secondary',
                    },
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {`${reward.shares} Share${reward.shares > 1 ? 's' : ''}`}
                </StepLabel>

                {/* Show reward details only for the selected step on mobile */}
                {isMobile && selectedStep === reward.shares && selectedReward && (
                  <div className="row mt-4">
                    <div className="col-md-6 mb-3">
                      <div className="card refer-card p-3 h-100">
                        <div className="row align-items-center">
                          <div className="col-8">
                            <p className="fs-5 fw-normal text-danger mb-0">In Cash Rewards</p>
                            <h1 className="fs-1 fw-bolder">{selectedReward.cashReward}</h1>
                          </div>
                          <div className="col-4">
                            <img src={cashImage} alt="" className="w-100" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="card refer-card p-3 h-100">
                        <div className="row align-items-center">
                          <div className="col-8">
                            <p className="fs-5 fw-normal text-danger mb-0">Be Practical Coins</p>
                            <h1 className="fs-1 fw-bolder">{selectedReward.coins}</h1>
                          </div>
                          <div className="col-4">
                            <img src={coinsImage} alt="" className="w-100" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 mb-3">
                      <div className="card refer-card p-3 h-100">
                        <div className="row align-items-center">
                          <div className="col-8">
                            <p className="fs-5 fw-normal text-danger mb-0">E vouchers</p>
                            <h1 className="fs-1 fw-bolder">{selectedReward.vouchers} worth vouchers</h1>
                          </div>
                          <div className="col-4">
                            <img src={vocherImage} alt="" className="w-100" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Step>
            ))}
          </Stepper>

          {/* Show reward details on larger screens below the Stepper */}
          {!isMobile && selectedReward && (
            <div className="row mt-4">
              <div className="col-md-6 mb-3">
                <div className="card refer-card p-3 h-100">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <p className="fs-5 fw-normal text-danger mb-0">In Cash Rewards</p>
                      <h1 className="fs-1 fw-bolder">{selectedReward.cashReward}</h1>
                    </div>
                    <div className="col-md-5">
                      <img src={cashImage} alt="" className="w-100" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="card refer-card p-3 h-100">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <p className="fs-5 fw-normal text-danger mb-0">Be Practical Coins</p>
                      <h1 className="fs-1 fw-bolder">{selectedReward.coins}</h1>
                    </div>
                    <div className="col-md-5">
                      <img src={coinsImage} alt="" className="w-100" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <div className="card refer-card p-3 h-100">
                  <div className="row align-items-center">
                    <div className="col-md-9">
                      <p className="fs-5 fw-normal text-danger mb-0">E vouchers</p>
                      <h1 className="fs-1 fw-bolder">{selectedReward.vouchers} worth vouchers</h1>
                    </div>
                    <div className="col-md-3">
                      <img src={vocherImage} alt="" className="w-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </div>
      <div className="text-center">
      <button className="btn-main mt-3" onClick={handleShow}>Start Referring Now</button>
      </div>
      <ReferralPopup show={showModal} hide={handleHide}/>

    </div>
  );
};

export default ShareDetails;
