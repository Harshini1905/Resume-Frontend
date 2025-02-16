import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../ReduxManager/dataStoreSlice';

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.dataStore.personalInfo.email);
  const personalInfo = useSelector((state) => state.dataStore.personalInfo);
  const workEx = useSelector((state) => state.dataStore.workEx);
  const education = useSelector((state) => state.dataStore.education);
  const skills = useSelector((state) => state.dataStore.skills);

  useEffect(() => {
    if (email) {
      dispatch(fetchUserData(email));
    }
  }, [email, dispatch]);

  return (
    <form>
      <h2>Personal Information</h2>
      <input type="text" value={personalInfo.firstName} placeholder="First Name" />
      <input type="text" value={personalInfo.lastName} placeholder="Last Name" />
      <input type="email" value={personalInfo.email} placeholder="Email" />
      <input type="text" value={personalInfo.mobile} placeholder="Mobile" />
      <input type="text" value={personalInfo.profilePic} placeholder="Profile Picture URL" />
      <input type="text" value={personalInfo.address1} placeholder="Address 1" />
      <input type="text" value={personalInfo.address2} placeholder="Address 2" />
      <input type="text" value={personalInfo.city} placeholder="City" />
      <input type="text" value={personalInfo.state} placeholder="State" />
      <input type="text" value={personalInfo.pin} placeholder="PIN" />
      <textarea value={personalInfo.objective} placeholder="Objective"></textarea>

      <h2>Work Experience</h2>
      {workEx.map((work, index) => (
        <div key={index}>
          <input type="text" value={work.title} placeholder="Job Title" />
          <input type="text" value={work.orgName} placeholder="Organization Name" />
          <input type="text" value={work.startYear} placeholder="Start Year" />
          <input type="text" value={work.endYear} placeholder="End Year" />
          <textarea value={work.jobDescription} placeholder="Job Description"></textarea>
        </div>
      ))}

      <h2>Education</h2>
      {education.map((edu, index) => (
        <div key={index}>
          <input type="text" value={edu.type} placeholder="Education Type" />
          <input type="text" value={edu.university} placeholder="University" />
          <input type="text" value={edu.degree} placeholder="Degree" />
          <input type="text" value={edu.start} placeholder="Start Year" />
          <input type="text" value={edu.end} placeholder="End Year" />
        </div>
      ))}

      <h2>Skills</h2>
      {skills.map((skill, index) => (
        <div key={index}>
          <input type="text" value={skill.skillName} placeholder="Skill" />
        </div>
      ))}
    </form>
  );
};

export default UserProfileForm;