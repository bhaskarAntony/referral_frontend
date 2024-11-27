import React, { useState } from "react";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";

const ReferralCalculatorPopup = ({ open, onClose }) => {
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [selectedShare, setSelectedShare] = useState(null);
  const [viewMode, setViewMode] = useState("referrals"); // 'referrals' or 'shares'

  // Reward data for each referral level
  const rewardData = {
    1: { cash: "₹1000", coins: 50, vouchers: "₹500 Worth E-Vouchers" },
    2: { cash: "₹2000", coins: 100, vouchers: "₹1000 Worth E-Vouchers" },
    3: { cash: "₹3000", coins: 150, vouchers: "₹1500 Worth E-Vouchers" },
    4: { cash: "₹4000", coins: 200, vouchers: "₹2000 Worth E-Vouchers" },
    5: { cash: "₹5000", coins: 250, vouchers: "₹2500 Worth E-Vouchers" },
    6: { cash: "₹6000", coins: 300, vouchers: "₹3000 Worth E-Vouchers" },
    7: { cash: "₹7000", coins: 350, vouchers: "₹3500 Worth E-Vouchers" },
    8: { cash: "₹8000", coins: 400, vouchers: "₹4000 Worth E-Vouchers" },
    9: { cash: "₹9000", coins: 450, vouchers: "₹4500 Worth E-Vouchers" },
    10: { cash: "₹10,000", coins: 500, vouchers: "₹5000 Worth E-Vouchers" },
  };

  const shareRewards = [
    { shares: 25, cashReward: "₹100", coins: 50, vouchers: "₹150" },
    { shares: 50, cashReward: "₹200", coins: 100, vouchers: "₹250" },
    { shares: 75, cashReward: "₹300", coins: 200, vouchers: "₹350" },
    { shares: 100, cashReward: "₹400", coins: 300, vouchers: "₹450" },
    { shares: 125, cashReward: "₹500", coins: 400, vouchers: "₹550" },
    { shares: 150, cashReward: "₹600", coins: 500, vouchers: "₹650" },
    { shares: 175, cashReward: "₹700", coins: 600, vouchers: "₹750" },
    { shares: 200, cashReward: "₹800", coins: 700, vouchers: "₹850" },
  ];

  // Handle referral selection change
  const handleReferralSelect = (referral) => {
    setSelectedReferral(referral);
    setSelectedShare(null); // Reset share selection
  };

  // Handle share selection change
  const handleShareSelect = (share) => {
    setSelectedShare(share);
    setSelectedReferral(null); // Reset referral selection
  };

  // Close the modal and reset state
  const handleClose = () => {
    onClose();
    setSelectedReferral(null);
    setSelectedShare(null);
    setViewMode("referrals");
  };

  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title>Referral and Share Rewards</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-around mb-4">
          <Button
            variant={viewMode === "referrals" ? "primary" : "outline-primary"}
            onClick={() => setViewMode("referrals")}
          >
            Calculate Referral Rewards
          </Button>
          <Button
            variant={viewMode === "shares" ? "primary" : "outline-primary"}
            onClick={() => setViewMode("shares")}
          >
            Calculate Share Rewards
          </Button>
        </div>

        {viewMode === "referrals" && (
          <div className="card p-3">
            <p className="fs-6">Select a referral number to view the rewards.</p>
            <DropdownButton
              id="referral-dropdown"
              title={
                selectedReferral
                  ? `Referrals: ${selectedReferral}`
                  : "Select Referrals"
              }
              onSelect={handleReferralSelect}
              className="mb-3 w-100"
              variant="dark"
            >
              {[...Array(10).keys()].map((num) => (
                <Dropdown.Item key={num + 1} eventKey={num + 1}>
                  {num + 1} Referral{num + 1 > 1 ? "s" : ""}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            {selectedReferral && (
              <div className="mt-4">
                <h6 className="text-primary fs-5">
                  Rewards for {selectedReferral} Referral
                  {selectedReferral > 1 ? "s" : ""}:
                </h6>
                <hr />
                <p className="fs-6">
                  <strong className="text-danger">
                    <i className="bi bi-cash"></i> Cash:
                  </strong>{" "}
                  {rewardData[selectedReferral].cash}
                </p>
                <p className="fs-6">
                  <strong className="text-danger">
                    <i className="bi bi-coin"></i> Coins:
                  </strong>{" "}
                  {rewardData[selectedReferral].coins}
                </p>
                <p className="fs-6">
                  <strong className="text-danger">
                    <i className="bi bi-wallet"></i> E-Vouchers:
                  </strong>{" "}
                  {rewardData[selectedReferral].vouchers}
                </p>
              </div>
            )}
          </div>
        )}

        {viewMode === "shares" && (
          <div className="card p-3">
            <p className="fs-6">Select a share count to view the rewards.</p>
            <DropdownButton
              id="share-dropdown"
              title={
                selectedShare
                  ? `Shares: ${selectedShare.shares}`
                  : "Select Shares"
              }
              onSelect={(e) =>
                handleShareSelect(shareRewards.find((s) => s.shares == e))
              }
              className="mb-3 w-100"
              variant="dark"
            >
              {shareRewards.map((reward) => (
                <Dropdown.Item key={reward.shares} eventKey={reward.shares}>
                  {reward.shares} Share{reward.shares > 1 ? "s" : ""}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            {selectedShare && (
              <div className="mt-4">
                <h6 className="text-primary fs-5">
                  Rewards for {selectedShare.shares} Share
                  {selectedShare.shares > 1 ? "s" : ""}:
                </h6>
                <hr />
                <p className="fs-6">
                  <strong className="text-danger">
                    <i className="bi bi-cash"></i> Cash:
                  </strong>{" "}
                  {selectedShare.cashReward}
                </p>
                <p className="fs-6">
                  <strong className="text-danger">
                    <i className="bi bi-coin"></i> Coins:
                  </strong>{" "}
                  {selectedShare.coins}
                </p>
                <p className="fs-6">
                  <strong className="text-danger">
                    <i className="bi bi-wallet"></i> E-Vouchers:
                  </strong>{" "}
                  {selectedShare.vouchers}
                </p>
              </div>
            )}
          </div>
        )}
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
