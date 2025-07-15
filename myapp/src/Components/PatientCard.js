// Import React to define a React component
import React from 'react';

// Define the PatientCard component
// It receives three props:
// - patient: the patient object with name, age, gender, _id, etc.
// - onEdit: function to call when the Edit button is clicked
// - onDelete: function to call when the Delete button is clicked
const PatientCard = ({ patient, onEdit, onDelete }) => {
  return (
    <div className="patient-card">
      {/* Display the patient's name */}
      <h4>{patient.name}</h4>

      {/* Display the patient's age */}
      <p>Age: {patient.age}</p>

      {/* Display the patient's gender */}
      <p>Gender: {patient.gender}</p>

      {/* Container for the Edit and Delete buttons */}
      <div className="btn-container" style={{ width: '100%' }}>
        {/* Edit button calls onEdit and passes the whole patient object */}
        <button onClick={() => onEdit(patient)}>Edit</button>

        {/* Delete button calls onDelete and passes the patient's unique _id */}
        <button onClick={() => onDelete(patient._id)}>Delete</button>
      </div>
    </div>
  );
};

// Export the PatientCard so it can be used in other components (like Patients.js)
export default PatientCard;
