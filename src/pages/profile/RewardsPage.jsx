import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  CircularProgress,
  Grid,
} from "@mui/material";
import axios from "axios";
import AuthContext from "../../components/context/AuthContext";
import WhatsappShare from "../../components/whatsappPopup/WhatsappShare";

const RewardsPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  console.log(user);
  
  const [whatsAppPopupShare, setWhatsAppPopupShare] = useState(false);
  const handleShowWhatsappShare = () =>setWhatsAppPopupShare(true)
  const handleHideWhatsappShare = () =>setWhatsAppPopupShare(false)
  

  // Rewards Data
  const referralRewards = [
    { shares: 25, cashReward: "₹100", coins: 50, vouchers: "₹150" },
    { shares: 50, cashReward: "₹200", coins: 100, vouchers: "₹250" },
    { shares: 75, cashReward: "₹300", coins: 200, vouchers: "₹350" },
    { shares: 100, cashReward: "₹400", coins: 300, vouchers: "₹450" },
    { shares: 125, cashReward: "₹500", coins: 400, vouchers: "₹550" },
    { shares: 150, cashReward: "₹600", coins: 500, vouchers: "₹650" },
    { shares: 175, cashReward: "₹700", coins: 600, vouchers: "₹750" },
    { shares: 200, cashReward: "₹800", coins: 700, vouchers: "₹850" },
  ];

 

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h5">User data not found!</Typography>
      </Box>
    );
  }

  // Calculate Successful Shares
  const successfulShares = user?.sharesData?.filter((share) => share.isregistered).length; 
//   const successfulShares = 104;

  return (
    <Box>
     <h1 className="fs-4 my-3"> 🎉 Your Rewards Progress</h1>

     

      {/* Rewards Progress */}
      <div className="shares row">
  {referralRewards.map((reward, index) => (
   <div className="col-md-6 mb-3">
    {
       index > 0 ? (
        // If the current reward shares are greater than the previous reward shares
        successfulShares > referralRewards[index - 1].shares ? (
          // If the successful shares are greater than or equal to the current reward shares
          successfulShares >= reward.shares ? (
            // Reward Unlocked
            <div className="share-card p-3 border mb-3 completed h-100" key={index}>
              <div className="d-flex flex-wrap gap-3">
                <span className="fs-6"><img src="https://i.gifer.com/origin/9b/9be3cc63d40d8ea231322e87d6aab7ca_w200.gif" alt="" />Reward: {reward.cashReward}</span>
                <span className="fs-6"><img src="https://img1.picmix.com/output/stamp/thumb/0/1/1/6/1456110_56f42.gif" alt="" /> Coins: {reward.coins}</span>
                <span className="fs-6"><img src="https://cdn.pixabay.com/animation/2023/11/29/03/39/03-39-03-19_512.gif" alt="" />Vouchers: {reward.vouchers}</span>
              </div>
              <div>
                <h1 className="fs-1"><i class="bi bi-unlock-fill"></i> {reward.shares} shares 🎉 Reward Completed!</h1>
              </div>
            </div>
          ) : (
            // Shares Progress (current reward not unlocked yet)
            <div className="share-card p-3 border mb-3 in_progress h-100" key={index}>
              <div className="d-flex flex-wrap gap-3">
                <span className="fs-6"><img src="https://i.gifer.com/origin/9b/9be3cc63d40d8ea231322e87d6aab7ca_w200.gif" alt="" />Reward: {reward.cashReward}</span>
                <span className="fs-6"><img src="https://img1.picmix.com/output/stamp/thumb/0/1/1/6/1456110_56f42.gif" alt="" /> Coins: {reward.coins}</span>
                <span className="fs-6"><img src="https://cdn.pixabay.com/animation/2023/11/29/03/39/03-39-03-19_512.gif" alt="" />Vouchers: {reward.vouchers}</span>
              </div>
              <progress min='0' max='100' value={(successfulShares/ reward.shares)*100}></progress>
              <div>
              <p className="fs-5 mt-2">
                just Share <strong>{reward.shares - successfulShares} friends to get this Reward</strong>
              </p>
                <h1 className="fs-1">
                  Shares: {successfulShares} / {reward.shares}
                </h1>
              </div>
            </div>
          )
        ) : (
          // No progress (successfulShares are less than the previous reward's shares)
          <div className="share-card p-3 border mb-3 pending h-100" key={index}>
            <div className="d-flex flex-wrap gap-3">
              <span className="fs-6"><img src="https://i.gifer.com/origin/9b/9be3cc63d40d8ea231322e87d6aab7ca_w200.gif" alt="" />Reward: {reward.cashReward}</span>
              <span className="fs-6"><img src="https://img1.picmix.com/output/stamp/thumb/0/1/1/6/1456110_56f42.gif" alt="" /> Coins: {reward.coins}</span>
              <span className="fs-6"><img src="https://cdn.pixabay.com/animation/2023/11/29/03/39/03-39-03-19_512.gif" alt="" />Vouchers: {reward.vouchers}</span>
            </div>
            <div>
              <h1 className="fs-1"><i class="bi bi-lock-fill"></i> reward Locked</h1>
              <p className="fs-5 text-danger">Complte Previous Reward to Unlock this Rewards</p>
            </div>
          </div>
        )
      ) : (
        // Case for the first reward (index === 0)
        successfulShares >= reward.shares ? (
          <div className="share-card p-3 border mb-3 completed h-100" key={index}>
          <div className="d-flex flex-wrap gap-3">
            <span className="fs-6"><img src="https://i.gifer.com/origin/9b/9be3cc63d40d8ea231322e87d6aab7ca_w200.gif" alt="" />Reward: {reward.cashReward}</span>
            <span className="fs-6"><img src="https://img1.picmix.com/output/stamp/thumb/0/1/1/6/1456110_56f42.gif" alt="" /> Coins: {reward.coins}</span>
            <span className="fs-6"><img src="https://cdn.pixabay.com/animation/2023/11/29/03/39/03-39-03-19_512.gif" alt="" />Vouchers: {reward.vouchers}</span>
          </div>
          <div>
            <h1 className="fs-1"><i class="bi bi-unlock-fill"></i> {reward.shares} shares 🎉 Reward Completed!</h1>
          </div>
        </div>
        ) : (
          <div className="share-card p-3 border mb-3 in_progress h-100" key={index}>
            <div className="d-flex flex-wrap gap-3">
              <span className="fs-6"><img src="https://i.gifer.com/origin/9b/9be3cc63d40d8ea231322e87d6aab7ca_w200.gif" alt="" />Reward: {reward.cashReward}</span>
              <span className="fs-6"><img src="https://img1.picmix.com/output/stamp/thumb/0/1/1/6/1456110_56f42.gif" alt="" />Coins: {reward.coins}</span>
              <span className="fs-6"><img src="https://cdn.pixabay.com/animation/2023/11/29/03/39/03-39-03-19_512.gif" alt="" />Vouchers: {reward.vouchers}</span>
            </div>
            <hr />
            <div>
              <p className="fs-5 mt-2">
                just Share <strong>{reward.shares - successfulShares} friends to get this Reward</strong>
              </p>
              <progress min='0' max='100' value={(successfulShares/ reward.shares)*100}></progress>
              <h1 className="fs-1">
                Shares: {successfulShares} / {reward.shares}
              </h1>
            </div>
  
            <button className="btn-light btn p-2 px-4" onClick={handleShowWhatsappShare}><i class="bi bi-send"></i>  Share more</button>
          </div>
        )
      )
    }
   </div>
  ))}
</div>


{/*  
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          padding: 2,
          marginTop: 4,
          scrollSnapType: "x mandatory",
        }}
      >
        {user.sharesData.map((share, index) => (
          <Box key={index} sx={{ scrollSnapAlign: "start", minWidth: "300px" }}>
            <Card sx={{ boxShadow: 3, minWidth: 300 }}>
              <CardContent>
                <Typography variant="subtitle1">Referral ID: {share.referralId}</Typography>
                <Typography>Status: {share.isregistered ? "✅ Success" : "⏳ Pending"}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box> */}
        <WhatsappShare show={whatsAppPopupShare} onClose={handleHideWhatsappShare}/>
    </Box>
  );
};

export default RewardsPage;
