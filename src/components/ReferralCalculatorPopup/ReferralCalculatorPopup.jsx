import React, { useState } from 'react';
import { Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';

const ReferralCalculatorPopup = ({ open, onClose }) => {
  const [selectedReferral, setSelectedReferral] = useState(null);

  // Reward data for each referral level
  const rewardData = {
    1: { cash: '₹10,000', coins: 200, vouchers: '₹2,000 Worth E-Vouchers' },
    2: { cash: '₹20,000', coins: 400, vouchers: '₹4,000 Worth E-Vouchers' },
    3: { cash: '₹30,000', coins: 600, vouchers: '₹6,000 Worth E-Vouchers' },
    4: { cash: '₹40,000', coins: 800, vouchers: '₹8,000 Worth E-Vouchers' },
    5: { cash: '₹50,000', coins: 1000, vouchers: '₹10,000 Worth E-Vouchers' },
    6: { cash: '₹60,000', coins: 1200, vouchers: '₹12,000 Worth E-Vouchers' },
    7: { cash: '₹70,000', coins: 1400, vouchers: '₹14,000 Worth E-Vouchers' },
    8: { cash: '₹80,000', coins: 1600, vouchers: '₹16,000 Worth E-Vouchers' },
    9: { cash: '₹90,000', coins: 1800, vouchers: '₹18,000 Worth E-Vouchers' },
    10: { cash: '₹100,000', coins: 2000, vouchers: '₹20,000 Worth E-Vouchers' },
  };

  // Handle referral selection change
  const handleReferralSelect = (referral) => {
    setSelectedReferral(referral);
  };

  // Close the modal and reset state
  const handleClose = () => {
    onClose();
    setSelectedReferral(null);
  };

  return (
    <Modal show={open} onHide={onclose} centered>
      <Modal.Header>
        <Modal.Title>Referral Rewards</Modal.Title>
      </Modal.Header>
      <Modal.Body>
   
       <div className="card p-3">
      
       <p className='fs-6'>Select a referral number to view the rewards.</p>
        <DropdownButton
          id="referral-dropdown"
          title={selectedReferral ? `Referrals: ${selectedReferral}` : "Select Referrals"}
          onSelect={handleReferralSelect}
          className="mb-3 w-100"
          variant="dark"
        >
          {[...Array(10).keys()].map((num) => (
            <Dropdown.Item key={num + 1} eventKey={num + 1} className='w-100'>
              {num + 1} Referral{num + 1 > 1 ? 's' : ''}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        {selectedReferral && (
          <div className="mt-4">
            <h6 className='text-primary fs-5'>Rewards for {selectedReferral} Referral{selectedReferral > 1 ? 's' : ''}:</h6>
            <hr />
            <p className='fs-6'><strong className='text-danger'><i class="bi bi-cash"></i> Cash:</strong> {rewardData[selectedReferral].cash}</p>
            <hr />
            <p className='fs-6'><strong className='text-danger'><i class="bi bi-coin"></i> Coins:</strong> {rewardData[selectedReferral].coins}</p>
            <hr />
            <p className='fs-6'><strong className='text-danger'><i class="bi bi-wallet"></i> E-Vouchers:</strong> {rewardData[selectedReferral].vouchers}</p>
          </div>
        )}
       </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReferralCalculatorPopup;
