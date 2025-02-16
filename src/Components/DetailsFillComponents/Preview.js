import React, { useState } from 'react';  //ok
import { useSelector } from 'react-redux';  
import axios from 'axios';  

const Preview = ({ handleSave }) => {  
  const email = useSelector((state) => state.dataStore.personalInfo?.email);  
  const personalInfo = useSelector((state) => state.dataStore.personalInfo);  
  const workEx = useSelector((state) => state.dataStore.workEx);  
  const education = useSelector((state) => state.dataStore.education);  
  const skills = useSelector((state) => state.dataStore.skills);  

  const [isLoading, setIsLoading] = useState(false);  
  const [error, setError] = useState(null);  

  // Handle Save logic (including additional validation)
  const handleSaveWithValidation = async () => {  
    // Check if email exists
    if (!email) {  
      alert("Email is required to save the resume. Please log in first.");  
      return;  
    }  

    // Check if all sections are filled out
    if (!personalInfo || !workEx || !education || !skills) {  
      alert("Please fill in all sections before saving the resume.");  
      return;  
    }  

    const resumeData = { email, personalInfo, workEx, education, skills };  

    try {  
      setIsLoading(true);  
      const response = await axios.post('http://localhost:5000/api/save-resume', resumeData);  
      if (response.status === 200) {  
        alert('Resume saved successfully!');  
      } else {  
        alert('Failed to save resume.');  
      }  
    } catch (error) {  
      console.error('Error saving resume:', error.response ? error.response.data.error : error.message);  
      alert('Failed to save resume: ' + (error.response ? error.response.data.error : 'Unknown error'));  
    } finally {  
      setIsLoading(false);  
    }  
  };  

  return (  
    <div>  
      <h2>Preview Your Resume</h2>  
      <div>  
        <h3>Personal Info</h3>  
        <p>{personalInfo.firstName} {personalInfo.lastName}</p>  
        <p>{personalInfo.email}</p>  
        <p>{personalInfo.mobile}</p>  
      </div>

      <div>  
        <h3>Work Experience</h3>  
        {workEx.map((job, index) => (  
          <div key={index}>  
            <p>{job.title} at {job.orgName}</p>  
            <p>{job.startYear} - {job.endYear}</p>  
          </div>  
        ))}  
      </div>

      <div>  
        <h3>Education</h3>  
        {education.map((school, index) => (  
          <div key={index}>  
            <p>{school.degree} from {school.university}</p>  
            <p>{school.start} - {school.end}</p>  
          </div>  
        ))}  
      </div>

      <div>  
        <h3>Key Skills</h3>  
        <ul>  
          {skills.map((skill, index) => (  
            <li key={index}>{skill.skillName}</li>  
          ))}  
        </ul>  
      </div>

      {/* Save Button */}
      <button onClick={handleSaveWithValidation} className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Resume'}
      </button>
    </div>  
  );  
};

export default Preview;
