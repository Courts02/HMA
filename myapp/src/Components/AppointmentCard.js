// src/components/AppointmentCard.js

// Import React to create a functional component
import React from 'react';

// Define the AppointmentCard component
// It takes 3 props:
// - appointment: the appointment data object (patientName, doctorName, date, _id)
// - onEdit: function to call when the Edit button is clicked
// - onDelete: function to call when the Delete button is clicked
const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className="appointment-card">
      {/* Display patient name */}
      <p>
        <span>Patient: </span>
        {appointment.patientName}
      </p>

      {/* Display doctor name */}
      <p>
        <span>Doctor: </span>
        {appointment.doctorName}
      </p>

      {/* Display date, formatted to local date string */}
      <p>
        <span>Date: </span>
        {new Date(appointment.date).toLocaleDateString()}
      </p>

      {/* Container for Edit and Delete buttons */}
      <div className="btn-container">
        {/* Edit button calls onEdit and passes the whole appointment object */}
        <button onClick={() => onEdit(appointment)}>Edit</button>

        {/* Delete button calls onDelete and passes the appointment's _id */}
        <button onClick={() => onDelete(appointment._id)}>Delete</button>
      </div>
    </div>
  );
};

// Export AppointmentCard so it can be used in Appointments.js
export default AppointmentCard;
