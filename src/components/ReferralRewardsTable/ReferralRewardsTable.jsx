import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import rewardImage from './reward.png'
import './style.css'
import ReferralCalculatorPopup from '../ReferralCalculatorPopup/ReferralCalculatorPopup';

const ReferralRewardsTable = () => {
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

  const [calculator, setCalculator] = useState(false);

  const showCalculator = () =>setCalculator(true)
  const hideCalculator = () =>setCalculator(false)

  return (
    <section className=' referal-rewards py-3'>
        <div className="container mt-4">
    <div className="row align-items-center">
        <div className="col-md-8">
        <h3 className="fw-bold mb-4">Rewards you get for successful Shares</h3>
        </div>
        <div className="col-md-4 d-flex justify-content-end btn-100">
            <button className="btn btn-outline-primary btn-100" onClick={showCalculator}><i class="bi bi-calculator"></i> Rewards Calculator</button>
        </div>
    </div>
      <div className="row">
        <div className="col-md-12 mb-4 m-auto">
        <h5 className='fs-5 text-primary mt-3'>For learners whom you shared invitation for just Registration</h5>
          <div className="reward-table">
         
            <div className="bg-white p-3">
            <table className="table table-bordered mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Shares</th>
                  <th>Cash</th>
                  <th>Coins</th>
                  <th>E-Vouchers</th>
                  {/* <th>Min Course fee</th> */}
                </tr>
              </thead>
              <tbody>
                {referralRewards.map((row, index) => (
                  <tr key={index}>
                    <td>{row.shares} shares</td>
                    <td>{row.cashReward}</td>
                    <td>{row.coins}</td>
                    <td>
                      <img src={rewardImage} alt="E-Voucher" />
                       {row.vouchers} Worth E-Vouchers
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
        
        {/* <div className="col-md-6 mb-4">
          <div className="reward-table p-4">
            <h5>For learners whom you referred Post-SET</h5>
            <table className="table table-bordered mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Referrals</th>
                  <th>Cash</th>
                  <th>Coins</th>
                  <th>E-Vouchers</th>
                </tr>
              </thead>
              <tbody>
                {postSetData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.referrals}</td>
                    <td>{row.cash}</td>
                    <td>{row.coins}</td>
                    <td>
                      <img src="https://via.placeholder.com/30" alt="E-Voucher" /> {row.vouchers} Worth E-Vouchers
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
    <ReferralCalculatorPopup open={calculator} onClose={hideCalculator}/>
    </section>
  );
};

export default ReferralRewardsTable;
