// Import React and hooks: useState to manage state, useEffect to handle side effects
import React, { useState, useEffect } from 'react';

// Import Axios for making HTTP requests to your backend API
import axios from 'axios';

// Import the CSS file for styling the Patients component
import './Patients.css';

// Import the PatientCard component which displays individual patient info
import PatientCard from './PatientCard';

// Define the Patients component
const Patients = () => {
  // State to store the list of patients fetched from the server
  const [patients, setPatients] = useState([]);

  // State to store a new patient’s form input values
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });

  // State to store the patient currently selected for editing
  const [selectedPatient, setSelectedPatient] = useState(null);

  // State to toggle between add mode and edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // useEffect runs once when the component mounts to fetch patients from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/patients') // Make GET request to fetch patients
      .then(response => setPatients(response.data)) // Store fetched patients in state
      .catch(error => console.error('Error fetching patients:', error)); // Log any errors
  }, []); // Empty dependency array means this runs only once on mount

  // Function to handle adding a new patient
  const handleAddPatient = e => {
    e.preventDefault(); // Prevent the form from refreshing the page

    axios
      .post('http://localhost:5000/patients/add', newPatient) // Send POST request with new patient data
      .then(response => {
        // If successful, add the new patient to the patients state array
        setPatients([...patients, response.data]);
        // Reset the form input fields
        setNewPatient({ name: '', age: '', gender: '' });
      })
      .catch(error => console.error('Error adding patient:', error)); // Log any errors
  };

  // Function to handle updating an existing patient
  const handleUpdatePatient = (id, e) => {
    e.preventDefault(); // Prevent form default behavior

    axios
      .post(`http://localhost:5000/patients/update/${id}`, selectedPatient) // Send POST request to update
      .then(() => {
        // Create an updated patient object
        const updatedPatient = { ...selectedPatient, _id: id };
        // Replace the old patient with the updated one in the patients state array
        setPatients(
          patients.map(patient => (patient._id === id ? updatedPatient : patient))
        );
        // Clear the selected patient and exit edit mode
        setSelectedPatient(null);
        setIsEditMode(false);
      })
      .catch(error => console.error('Error updating patient:', error)); // Log any errors
  };

  // Function to handle deleting a patient
  const handleDeletePatient = id => {
    axios
      .delete(`http://localhost:5000/patients/delete/${id}`) // Send DELETE request
      .then(() => {
        // Clear selected patient if it’s the one being deleted
        setSelectedPatient(null);
        // Remove deleted patient from the patients state array
        setPatients(patients.filter(patient => patient._id !== id));
      })
      .catch(error => console.error('Error deleting patient:', error)); // Log any errors
  };

  // Function to handle setting a patient for editing
  const handleEditPatient = patient => {
    setSelectedPatient(patient); // Set selected patient
    setIsEditMode(true); // Enable edit mode
  };

  // JSX to render the component UI
  return (
    <div className="patient-main">
      {/* Form Section: Add or Edit Patient */}
      <div className="form-sections">
        {/* Heading changes depending on mode */}
        <h4>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h4>

        {/* Form for adding or updating patient */}
        <form
          onSubmit={
            isEditMode
              ? e => handleUpdatePatient(selectedPatient._id, e) // If editing, update
              : handleAddPatient // If adding, add
          }
          className="patient-form"
        >
          {/* Name input */}
          <label>Name: </label>
          <input
            type="text"
            value={isEditMode ? selectedPatient.name : newPatient.name} // Use selected or new
            onChange={e =>
              isEditMode
                ? setSelectedPatient({ ...selectedPatient, name: e.target.value }) // Update selectedPatient
                : setNewPatient({ ...newPatient, name: e.target.value }) // Update newPatient
            }
          />
          <br />

          {/* Age input */}
          <label>Age: </label>
          <input
            type="text"
            value={isEditMode ? selectedPatient.age : newPatient.age}
            onChange={e =>
              isEditMode
                ? setSelectedPatient({ ...selectedPatient, age: e.target.value })
                : setNewPatient({ ...newPatient, age: e.target.value })
            }
          />
          <br />

          {/* Gender input */}
          <label>Gender: </label>
          <input
            type="text"
            value={isEditMode ? selectedPatient.gender : newPatient.gender}
            onChange={e =>
              isEditMode
                ? setSelectedPatient({ ...selectedPatient, gender: e.target.value })
                : setNewPatient({ ...newPatient, gender: e.target.value })
            }
          />
          <br />

          {/* Submit button changes text depending on mode */}
          <button type="submit">
            {isEditMode ? 'Update Patient' : 'Add Patient'}
          </button>
        </form>
      </div>

      {/* Patients List Section */}
      <div className="patients-section">
        <h3 style={{ textAlign: 'center' }}>
          Patients ({patients.length}) {/* Show number of patients */}
        </h3>
        <div className="patient-list">
          {/* Render a PatientCard for each patient */}
          {patients.map(patient => (
            <PatientCard
              key={patient._id} // Unique key for React
              patient={patient} // Pass patient data
              onEdit={handleEditPatient} // Pass edit handler
              onDelete={handleDeletePatient} // Pass delete handler
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Export the Patients component so it can be used in other parts of the app
export default Patients;
