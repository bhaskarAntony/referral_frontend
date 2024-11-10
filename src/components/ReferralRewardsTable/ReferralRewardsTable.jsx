import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import rewardImage from './reward.png'
import './style.css'
import ReferralCalculatorPopup from '../ReferralCalculatorPopup/ReferralCalculatorPopup';

const ReferralRewardsTable = () => {
  const preSetData = [
    { referrals: 1, cash: '₹10,000', coins: 200, vouchers: '₹2,000' },
    { referrals: 2, cash: '₹20,000', coins: 400, vouchers: '₹4,000' },
    { referrals: 3, cash: '₹30,000', coins: 600, vouchers: '₹6,000' },
    { referrals: 4, cash: '₹40,000', coins: 800, vouchers: '₹8,000' },
    { referrals: 5, cash: '₹50,000', coins: 1000, vouchers: '₹10,000' },
  ];

  const postSetData = [
    { referrals: 1, cash: '₹5,000', coins: 200, vouchers: '₹1,000' },
    { referrals: 2, cash: '₹10,000', coins: 400, vouchers: '₹2,000' },
    { referrals: 3, cash: '₹15,000', coins: 600, vouchers: '₹3,000' },
    { referrals: 4, cash: '₹20,000', coins: 800, vouchers: '₹4,000' },
    { referrals: 5, cash: '₹25,000', coins: 1000, vouchers: '₹5,000' },
  ];

  const [calculator, setCalculator] = useState(false);

  const showCalculator = () =>setCalculator(true)
  const hideCalculator = () =>setCalculator(false)

  return (
    <section className=' referal-rewards py-3'>
        <div className="container mt-4">
    <div className="row align-items-center">
        <div className="col-md-8">
        <h3 className="fw-bold mb-4">Rewards you get for successful referrals</h3>
        </div>
        <div className="col-md-4 d-flex justify-content-end btn-100">
            <button className="btn btn-outline-primary btn-100" onClick={showCalculator}><i class="bi bi-calculator"></i> Rewards Calculator</button>
        </div>
    </div>
      <div className="row">
        <div className="col-md-12 mb-4 m-auto">
        <h5 className='fs-5 text-primary mt-3'>For learners whom you referred Pre-SET</h5>
          <div className="reward-table">
         
            <div className="bg-white p-3">
            <table className="table table-bordered mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Referrals</th>
                  <th>Cash</th>
                  <th>Coins</th>
                  <th>E-Vouchers</th>
                  {/* <th>Min Course fee</th> */}
                </tr>
              </thead>
              <tbody>
                {preSetData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.referrals}</td>
                    <td>{row.cash}</td>
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
