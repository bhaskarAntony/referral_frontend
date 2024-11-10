import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box, Typography, useMediaQuery, Paper, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import cashImage from './cash.png'
import coinsImage from './coins.png'
import vocherImage from './vocher.png'

const ReferralStepper = () => {
    const referralRewards = [
        { referrals: 1, cashReward: '₹1,000', scalerCoins: 50, vouchers: '₹500' },
        { referrals: 2, cashReward: '₹2,000', scalerCoins: 100, vouchers: '₹1,000' },
        { referrals: 3, cashReward: '₹10,000', scalerCoins: 200, vouchers: '₹2,000' },
        { referrals: 4, cashReward: '₹15,000', scalerCoins: 300, vouchers: '₹3,000' },
        { referrals: 5, cashReward: '₹20,000', scalerCoins: 400, vouchers: '₹4,000' },
        { referrals: 6, cashReward: '₹25,000', scalerCoins: 500, vouchers: '₹5,000' },
        { referrals: 7, cashReward: '₹30,000', scalerCoins: 600, vouchers: '₹6,000' },
        { referrals: 8, cashReward: '₹35,000', scalerCoins: 700, vouchers: '₹7,000' },
      ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedStep, setSelectedStep] = useState(1); // Set initial step to 1st referral

  const handleStepChange = (referrals) => {
    setSelectedStep(referrals);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }} className='mt-3 mt-md-5'>
      <Stepper 
        activeStep={selectedStep - 1} 
        orientation={isMobile ? 'vertical' : 'horizontal'}
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
        }}
      >
        {referralRewards?.map((reward) => (
          <Step key={reward.referrals}>
            <StepLabel
              onClick={() => handleStepChange(reward.referrals)}
              StepIconProps={{
                sx: {
                  fontSize: isMobile ? '2.5rem' : '2rem', // Adjust the icon size for mobile and desktop
                  color: selectedStep === reward.referrals ? 'primary.main' : 'text.secondary',
                },
              }}
              style={{cursor:'pointer'}}
              className={isMobile?'d-flex  flex-column align-items-start justify-content-center':'text-da=ngerd-flex  flex-column align-items-center gap-2 justify-content-center'}
            >
              {`${reward.referrals} Referral${reward.referrals > 1 ? 's' : ''}`}
            </StepLabel>

            {/* Show reward details only for the selected step on mobile */}
            {isMobile && selectedStep === reward.referrals && (
               <div className="row mt-4">
               <div className="col-md-6 mb-3">
                   <div className="card refer-card p-3 h-100">
                       <div className="row align-items-center">
                           <div className="col-8">
                           <p className="fs-5 fw-normal text-danger mb-0">In Cash Rewards</p>
                               <h1 className="fs-1 fw-bolder">{referralRewards[selectedStep - 1].cashReward}</h1>
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
                               <h1 className="fs-1 fw-bolder">{referralRewards[selectedStep - 1].scalerCoins}</h1>
                           </div>
                           <div className="col-4">
                               <img src={coinsImage} alt="" className="w-100" />
                           </div>
                       </div>
                   </div>
               </div>
       
               <div className="col-md-12 mb-3 ">
                   <div className="card refer-card p-3 h-100">
                   <div className="row align-items-center">
                           <div className="col-8">
                               <p className="fs-5 fw-normal text-danger mb-0">E vouchers</p>
                               <h1 className="fs-1 fw-bolder">{referralRewards[selectedStep - 1].vouchers} worth vouchers</h1>
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
      {!isMobile && (
    //     <Grid container spacing={2} mt={2}>
    //     <Grid item xs={12} sm={6}>
    //       <Paper elevation={3} sx={{ p: 2 }}>
    //         <Typography variant="h6">In Cash Reward</Typography>
    //         <Typography variant="h4" color="primary">{referralRewards[selectedStep - 1].cashReward}</Typography>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <Paper elevation={3} sx={{ p: 2 }}>
    //         <Typography variant="h6">Scaler Coins</Typography>
    //         <Typography variant="h4" color="primary">{referralRewards[selectedStep - 1].scalerCoins}</Typography>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Paper elevation={3} sx={{ p: 2 }}>
    //         <Typography variant="h6">E Vouchers</Typography>
    //         <Typography variant="h4" color="primary">{referralRewards[selectedStep - 1].vouchers} worth Vouchers</Typography>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //         <CardGiftcardIcon color="primary" fontSize="large" />
    //         <Typography variant="h6" ml={1}>Gift Card</Typography>
    //         <Box ml={2} display="flex" gap={2}>
    //           <img src="/amazon-logo.png" alt="Amazon" style={{ width: isMobile ? 40 : 60 }} />
    //           <img src="/flipkart-logo.png" alt="Flipkart" style={{ width: isMobile ? 40 : 60 }} />
    //           <img src="/myntra-logo.png" alt="Myntra" style={{ width: isMobile ? 40 : 60 }} />
    //         </Box>
    //       </Paper>
    //     </Grid>
    //   </Grid>
    <div className="row mt-4">
        <div className="col-md-6 mb-3">
            <div className="card refer-card p-3 h-100">
                <div className="row align-items-center">
                    <div className="col-md-7">
                    <p className="fs-5 fw-normal text-danger mb-0">In Cash Rewards</p>
                        <h1 className="fs-1 fw-bolder">{referralRewards[selectedStep - 1].cashReward}</h1>
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
                        <h1 className="fs-1 fw-bolder">{referralRewards[selectedStep - 1].scalerCoins}</h1>
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
                        <h1 className="fs-1 fw-bolder">{referralRewards[selectedStep - 1].vouchers} worth vouchers</h1>
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
  );
};

export default ReferralStepper;
