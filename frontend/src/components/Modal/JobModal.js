import React, { useState } from 'react';
import './JobModal.css';

function JobModal({ isOpen, onClose, onSubmit, formData, handleChange }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Job</h2>
        <form onSubmit={onSubmit}>
          <label>
            Client Name:
            <input type="text" name="client_name" value={formData.client_name} onChange={handleChange} required />
          </label>
          <label>
            Assessment Type:
            <select name="assessment_type" value={formData.assessment_type} onChange={handleChange} required>
              <option value="">Select an Assessment Type</option>
              <option value="Web VAPT">Web VAPT</option>
              <option value="Network VAPT">Network VAPT</option>
              <option value="Red Teaming">Red Teaming</option>
              <option value="Incident Response">Incident Response</option>
              <option value="Malware Analysis">Malware Analysis</option>
            </select>
          </label>
          <label>
            Start Date:
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
          </label>
          <label>
            End Date:
            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
          </label>
          <label>
            Budget:
            <input type="number" name="budget" value={formData.budget} onChange={handleChange} required />
          </label>
          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobModal;
