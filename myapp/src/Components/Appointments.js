// src/components/Appointments.js

// Import React and hooks for state management and side effects
import React, { useState, useEffect } from 'react';

// Import Axios to make HTTP requests to your backend API
import axios from 'axios';

// Import the AppointmentCard component to display each appointment
import AppointmentCard from './AppointmentCard';

// Import the CSS file for styling the Appointments component
import './Appointment.css';

// Define the Appointments component
const Appointments = () => {
  // State for storing the list of appointments fetched from the backend
  const [appointments, setAppointments] = useState([]);

  // State for the new appointment form input fields
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: '',
    date: '',
  });

  // State for the appointment currently selected for editing
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // State to toggle add mode or edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // useEffect runs when the component mounts to fetch appointments
  useEffect(() => {
    axios
      .get('http://localhost:5000/appointments') // GET request to get appointments
      .then(response => setAppointments(response.data)) // Store fetched appointments in state
      .catch(error => console.error('Error fetching appointments:', error)); // Log errors
  }, []); // Empty dependency array means run once when mounted

  // Function to handle adding a new appointment
  const handleAddAppointment = e => {
    e.preventDefault(); // Prevent default form submission

    axios
      .post('http://localhost:5000/appointments/add', newAppointment) // POST request to add
      .then(response => {
        setAppointments([...appointments, response.data]); // Add new appointment to state
        // Clear form inputs
        setNewAppointment({
          patientName: '',
          doctorName: '',
          date: '',
        });
      })
      .catch(error => console.error('Error adding appointment:', error)); // Log errors
  };

  // Function to handle updating an appointment
  const handleUpdateAppointment = (id, e) => {
    e.preventDefault(); // Prevent default form submission

    axios
      .post(`http://localhost:5000/appointments/update/${id}`, selectedAppointment) // POST request to update
      .then(response => {
        const updatedApp = { ...selectedAppointment, _id: id }; // Build updated appointment object
        // Replace old appointment with updated one in state
        setAppointments(
          appointments.map(app => (app._id === id ? updatedApp : app))
        );
        setSelectedAppointment(null); // Clear selection
        setIsEditMode(false); // Exit edit mode
      })
      .catch(error => console.error('Error updating appointment:', error)); // Log errors
  };

  // Function to handle deleting an appointment
  const handleDeleteAppointment = id => {
    axios
      .delete(`http://localhost:5000/appointments/delete/${id}`) // DELETE request
      .then(response => {
        // Remove deleted appointment from state
        setAppointments(appointments.filter(app => app._id !== id));
      })
      .catch(error => console.error('Error deleting appointment:', error)); // Log errors
  };

  // Function to select an appointment for editing
  const handleEditAppointment = appointment => {
    setSelectedAppointment(appointment); // Set the appointment to edit
    setIsEditMode(true); // Enable edit mode
  };

  // JSX to render the component UI
  return (
    <div className="flex-row" style={{ width: '100%', maxWidth: '900px' }}>
      {/* Form Section */}
      <div className="form-sections">
        <div className="add-form">
          <h4>{isEditMode ? 'Edit Appointment' : 'Add New Appointment'}</h4>
          <form
            className="appointment-form"
            onSubmit={
              isEditMode
                ? e => handleUpdateAppointment(selectedAppointment._id, e) // Update if editing
                : handleAddAppointment // Add if adding new
            }
          >
            {/* Patient Name input */}
            <label>Patient Name:</label>
            <input
              type="text"
              value={isEditMode ? selectedAppointment.patientName : newAppointment.patientName} // Value depends on mode
              onChange={e =>
                isEditMode
                  ? setSelectedAppointment({ ...selectedAppointment, patientName: e.target.value }) // Update selected
                  : setNewAppointment({ ...newAppointment, patientName: e.target.value }) // Update new
              }
            />

            {/* Doctor Name input */}
            <label>Doctor Name:</label>
            <input
              type="text"
              value={isEditMode ? selectedAppointment.doctorName : newAppointment.doctorName}
              onChange={e =>
                isEditMode
                  ? setSelectedAppointment({ ...selectedAppointment, doctorName: e.target.value })
                  : setNewAppointment({ ...newAppointment, doctorName: e.target.value })
              }
            />

            {/* Date input */}
            <label>Date:</label>
            <input
              type="date"
              value={isEditMode ? selectedAppointment.date : newAppointment.date}
              onChange={e =>
                isEditMode
                  ? setSelectedAppointment({ ...selectedAppointment, date: e.target.value })
                  : setNewAppointment({ ...newAppointment, date: e.target.value })
              }
            />

            {/* Submit button changes label depending on mode */}
            <button type="submit">{isEditMode ? 'Update Appointment' : 'Add Appointment'}</button>
          </form>
        </div>
      </div>

      {/* List Section */}
      <div className="appointments-section">
        <h3>Appointments ({appointments.length})</h3>
        <div className="appointment-list">
          {/* Render an AppointmentCard for each appointment */}
          {appointments.map(appointment => (
            <AppointmentCard
              key={appointment._id} // Unique key for React
              appointment={appointment} // Pass appointment data
              onEdit={handleEditAppointment} // Pass edit handler
              onDelete={handleDeleteAppointment} // Pass delete handler
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Export Appointments so you can use it elsewhere
export default Appointments;
