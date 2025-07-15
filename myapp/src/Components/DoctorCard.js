// src/components/DoctorCard.js

// Import React to define a React component
import React from 'react';

// Define the DoctorCard component
// It receives 3 props:
// - doctor: an object with doctor info (name, specialty, _id, etc.)
// - onEdit: a function to call when Edit is clicked
// - onDelete: a function to call when Delete is clicked
const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  return (
    <div className="doctor-card">
      {/* Display doctor's name and specialty on one line */}
      <p>
        {doctor.name} - {doctor.specialty}
      </p>

      {/* Container for the Edit and Delete buttons */}
      <div className="btn-container">
        {/* Edit button calls onEdit with the whole doctor object */}
        <button onClick={() => onEdit(doctor)}>Edit</button>

        {/* Delete button calls onDelete with the doctor's unique _id */}
        <button onClick={() => onDelete(doctor._id)}>Delete</button>
      </div>
    </div>
  );
};

// Export DoctorCard so it can be used in Doctors.js
export default DoctorCard;
