// Doctors.js

// Import React and hooks: useState for state, useEffect for side effects
import React, { useState, useEffect } from 'react';

// Import Axios for HTTP requests to your backend
import axios from 'axios';

// Import the DoctorCard component that shows individual doctor info
import DoctorCard from './DoctorCard';

// Import the CSS file for styling the Doctors component
import './Doctors.css';

// Define the Doctors component
const Doctors = () => {
  // State to store the list of doctors fetched from the backend
  const [doctors, setDoctors] = useState([]);

  // State for the new doctor form input fields
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
  });

  // State for the doctor currently being edited
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // State to toggle add mode / edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // useEffect runs once when the component mounts to fetch doctors
  useEffect(() => {
    axios
      .get('http://localhost:5000/doctors') // GET request to fetch doctors
      .then(response => setDoctors(response.data)) // Store fetched doctors in state
      .catch(error => console.error('Error fetching doctors:', error)); // Log any errors
  }, []); // Empty dependency array = run only once when mounted

  // Function to handle adding a new doctor
  const handleAddDoctor = e => {
    e.preventDefault(); // Prevent form from refreshing page

    axios
      .post('http://localhost:5000/doctors/add', newDoctor) // POST request to add new doctor
      .then(response => {
        console.log('Doctor added:', response.data);
        setDoctors([...doctors, response.data]); // Add new doctor to state list
        setNewDoctor({ name: '', specialty: '' }); // Clear form
      })
      .catch(error => console.error('Error adding doctor:', error)); // Log any errors
  };

  // Function to handle updating an existing doctor
  const handleUpdateDoctor = (id, e) => {
    e.preventDefault(); // Prevent form default behavior

    axios
      .post(`http://localhost:5000/doctors/update/${id}`, selectedDoctor) // POST request to update
      .then(response => {
        const updatedDoctor = { ...selectedDoctor, _id: id }; // Build updated doctor object
        console.log('Updated doctor:', updatedDoctor);

        // Replace the old doctor with updated one in state
        setDoctors(
          doctors.map(doctor =>
            doctor._id === id ? updatedDoctor : doctor
          )
        );

        setSelectedDoctor(null); // Clear selected doctor
        setIsEditMode(false); // Exit edit mode
      })
      .catch(error => console.error('Error updating doctor:', error)); // Log any errors
  };

  // Function to handle deleting a doctor
  const handleDeleteDoctor = id => {
    axios
      .delete(`http://localhost:5000/doctors/delete/${id}`) // DELETE request
      .then(response => {
        console.log(response.data);
        // Remove deleted doctor from state
        setDoctors(doctors.filter(doctor => doctor._id !== id));
      })
      .catch(error => console.error('Error deleting doctor:', error)); // Log any errors
  };

  // Function to set a doctor for editing
  const handleEditDoctor = doctor => {
    setSelectedDoctor(doctor); // Set selected doctor for editing
    setIsEditMode(true); // Enable edit mode
  };

  // JSX for rendering the component
  return (
    <div className='main-doc-container'>
      {/* Form Section */}
      <div className='form-sections'>
        <h4>{isEditMode ? 'Edit Doctor' : 'Add New Doctor'}</h4>
        <form
          onSubmit={
            isEditMode
              ? e => handleUpdateDoctor(selectedDoctor._id, e) // If editing, update doctor
              : handleAddDoctor // If adding, add new doctor
          }
        >
          {/* Name input */}
          <label>Name: </label>
          <input
            type='text'
            value={isEditMode ? selectedDoctor.name : newDoctor.name} // Value depends on mode
            onChange={e =>
              isEditMode
                ? setSelectedDoctor({
                    ...selectedDoctor,
                    name: e.target.value,
                  })
                : setNewDoctor({
                    ...newDoctor,
                    name: e.target.value,
                  })
            }
          />
          <br />

          {/* Specialty input */}
          <label>Specialty: </label>
          <input
            type='text'
            value={isEditMode ? selectedDoctor.specialty : newDoctor.specialty}
            onChange={e =>
              isEditMode
                ? setSelectedDoctor({
                    ...selectedDoctor,
                    specialty: e.target.value,
                  })
                : setNewDoctor({
                    ...newDoctor,
                    specialty: e.target.value,
                  })
            }
          />
          <br />

          {/* Submit button text depends on mode */}
          <button type='submit'>
            {isEditMode ? 'Update Doctor' : 'Add Doctor'}
          </button>
        </form>
      </div>

      {/* Doctors List Section */}
      <div className='doctors-section'>
        <h3>Doctors ({doctors.length})</h3>
        <div className='doctor-list'>
          {/* Render a DoctorCard for each doctor */}
          {doctors.map(doctor => (
            <DoctorCard
              key={doctor._id} // Unique key for React
              doctor={doctor} // Pass doctor data
              onEdit={handleEditDoctor} // Pass edit handler
              onDelete={handleDeleteDoctor} // Pass delete handler
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Export Doctors so you can use it in other parts of your app
export default Doctors;
