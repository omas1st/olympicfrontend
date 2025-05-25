import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import './VerifyPin.css';

export default function VerifyPin() {
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handle = async e => {
    e.preventDefault();
    try {
      await API.post('/users/verify-pin', { pin });
      nav('/select-plan');
    } catch (e) {
      setErr(e.response.data.message);
    }
  };

  return (
    <div className="verifypin-page">
      <form onSubmit={handle}>
        <h2>Application Registration PIN</h2>
        <p>
          Apply for a 5-digit registration PIN at a cost of R300. <br/>
          OLYMPIC PLATFORM BANKING DETAILS:<br/>
          Beneficiary Name: MAMA PTY<br/>
          Account Number: 62509963139<br/>
          Reference: 0736262222<br/>
          Bank: FNB (250655)<br/>
          Note: Always include "0736262222" as the reference number when making payment, 
          your payment won't be processed, if you fail to add the reference number.<br/>
          Send receipt via WhatsApp to +1 405 926 0437 or +44 739 887 1333.
        </p>
        <input
          placeholder="Enter 5-digit PIN"
          value={pin}
          onChange={e=>setPin(e.target.value)}
          maxLength={5}
          required
        />
        {err && <p className="error">{err}</p>}
        <button type="submit">Next</button>
      </form>
    </div>
  );
}
