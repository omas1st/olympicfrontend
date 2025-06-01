import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import './VerifyPin.css';

export default function VerifyPin() {
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/users/verify-pin', { pin });
      nav('/select-plan');
    } catch (e) {
      setErr(e.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="verifypin-page">
      <form onSubmit={handleSubmit}>
        <h2>Application Registration PIN</h2>
        
        <div className="instruction-section">
          <h3>Registration Process</h3>
          <p>
            To access the winning numbers, you'll need to register and obtain a 5-digit PIN.
            Here's how:
          </p>
          <ol>
            <li><strong>Registration Fee:</strong> Pay R300 to complete your registration</li>
            <li><strong>PIN Delivery:</strong> A 5-digit PIN will be sent via WhatsApp and email after registration</li>
            <li><strong>Enter Your PIN:</strong> Input the 5-digit PIN below and click "Enter" to proceed</li>
          </ol>
        </div>

        <div className="banking-section">
          <h3>Olympic Platform Banking Details</h3>
          <ul>
            <li><strong>Beneficiary Name:</strong> MAMA PTY</li>
            <li><strong>Account Number:</strong> 62509963139</li>
            <li><strong>Reference:</strong> 0603805757</li>
            <li><strong>Bank:</strong> FNB (250655)</li>
          </ul>
          <p className="note">
            <strong>Note:</strong> Always include "0603805757" as reference. 
            Payments without this reference won't be processed.
          </p>
          <p className="note">
            Send payment receipt via WhatsApp to:<br/>
            +1 405 926 0437 or +44 739 887 1333
          </p>
        </div>

        <div className="pin-input-section">
          <input
            placeholder="Enter 5-digit PIN"
            value={pin}
            onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 5))}
            maxLength={5}
            required
          />
          {err && <p className="error">{err}</p>}
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}
