import React from 'react';
import API from '../api';
import './CompleteIDCard.css';

export default function CompleteIDCard() {
  const handleClick = async () => {
    try {
      const { data } = await API.get('/users/profile');
      const status = data.user.status;

      if (status === 'completed') {
        window.location.href = 'https://sites.google.com/view/olympic-vip/home';
      } else if (status === 'step3') {
        await API.post('/users/complete-idcard');
        alert('ID card payment receipt sent to admin. Await approval before proceeding.');
      } else {
        alert('Please complete and pay for your plan, send receipt to admin, and await approval before submitting your ID card.');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching status. Try again.');
    }
  };

  return (
    <div className="completeid-page">
      <h2>VIP Membership ID Card</h2>
      <p>
        Apply for VIP Membership ID card at a cost of R900.<br/>
        OLYMPIC PLATFORM BANKING DETAILS:<br/>
        Beneficiary: MAMA PTY<br/>
        Account: 62509963139<br/>
        Reference: 0736262222<br/>
        FNB (250655)<br/>
        Note: Always include "0736262222" as the reference number when making payment,
        your payment won't be processed if you fail to add the reference number.<br/>
        Send receipt via WhatsApp to +1 405 926 0437 or +44 739 887 1333.<br/>
        Immediate Payment.
      </p>
      <button onClick={handleClick}>Complete Registration</button>
    </div>
  );
}
