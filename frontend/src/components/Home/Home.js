import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobModal from '../Modal/JobModal';
import './Home.css';

function Home() {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [formData, setFormData] = useState({
    client_name: '',
    assessment_type: '',
    start_date: '',
    end_date: '',
    budget: ''
  });

  useEffect(() => {
    fetchAssessments();
  }, []);

  const openModal = () => {
    setFormData({
      client_name: '',
      assessment_type: '',
      start_date: '',
      end_date: '',
      budget: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchAssessments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/assessments');
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/assessments', formData);
      setAssessments([...assessments, response.data]);
      closeModal();
    } catch (error) {
      console.error('Error creating assessment:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className={`App`}>
      <div className="sidebar"></div>
      <div className={`main-content ${isModalOpen ? 'blurred' : ''}`}>
        <div className="header">
          <div className="header-content">
            <h1 className="dashboard-heading">Admin Panel Dashboard</h1>
            <p className="date">{formattedDate}</p>
          </div>
          <button className="create-job" onClick={openModal}>Create Job</button>
        </div>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-icon" role="img" aria-label="Jobs Icon">&#128276;</span>
            <div>
              <p className="stat-title">Jobs Posted</p>
              <p className="stat-value">{assessments.length} jobs posted</p>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="card clients">
            <h2>Clients</h2>
            <p className="time-period">This month</p>
            <div className="client-info">
              {assessments.map(assessment => (
                <div key={assessment.id}>
                  <p className="client-name">{assessment.client_name} | {assessment.assessment_type}</p>
                  <p className="client-detail">{formatDate(assessment.start_date)} - {formatDate(assessment.end_date)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card expenses">
            <h2>Revenue</h2>
            <p className="time-period">This month</p>
            <div className="expense-info">
              {assessments.map(assessment => (
                <div key={assessment.id}>
                  <p className="job-name">{assessment.client_name} - {assessment.assessment_type} | ${assessment.budget}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <JobModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={handleSubmit} 
        formData={formData} 
        handleChange={handleChange} 
      />
    </div>
  );
}

export default Home;
