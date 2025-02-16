import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import PersonalInfo from './PersonalInfo';
import WorkEx from './WorkEx';
import Education from './Education';
import KeySkills from './KeySkills';
import Preview from './Preview';
import { updateState, fetchUserData } from '../../ReduxManager/dataStoreSlice';

function DetailsFillingPage() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.dataStore.personalInfo.email);
  const personalInfo = useSelector((state) => state.dataStore.personalInfo);
  const workEx = useSelector((state) => state.dataStore.workEx);
  const education = useSelector((state) => state.dataStore.education);
  const skills = useSelector((state) => state.dataStore.skills);
  const errorMessages = useSelector((state) => state.dataStore.errorMessages);
  const status = useSelector((state) => state.dataStore.status);

  useEffect(() => {
    if (email && status === 'idle') {
      dispatch(fetchUserData(email));
    }
  }, [email, status, dispatch]);

  const isFormValid = Object.values(errorMessages).every((msg) => msg === "");

  const onSideNavLinkClick = () => {
    if (!isFormValid) {
      alert('Please fill all the necessary details correctly!');
      dispatch(updateState({ key: 'showErrorMessages', value: true }));
    } else {
      dispatch(updateState({ key: 'showErrorMessages', value: false }));
    }
  };

  return (
    <div>
      <div className="container text-center" style={{ maxWidth: "1920px", marginTop: "12px", backgroundColor: "#fafafa" }}>
        <div className='row' style={{ minHeight: '100vh' }}>
          <div className="col-lg-3 col-sm-12 col-12 sidebar">
            {["personalinfo", "workex", "education", "keyskills", "preview"].map((item, index) => (
              <li className="list-item" onClick={onSideNavLinkClick} key={index}>
                <Link to={isFormValid ? `/detailsfillingpage/${item}` : '#'} className='no-text-decoration'>
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('info', ' Info').replace('ex', ' Experience')}
                </Link>
              </li>
            ))}
          </div>

          <div className="content col-lg-9 col-sm-12 col-12" style={{ border: "solid grey 2px", boxShadow: "5px 5px 8px 10px #888888" }}>
            <Routes>
              <Route path="/personalinfo" element={<PersonalInfo isFormValid={isFormValid} />} />
              <Route path="/workex" element={<WorkEx isFormValid={isFormValid} />} />
              <Route path="/education" element={<Education isFormValid={isFormValid} />} />
              <Route path="/keyskills" element={<KeySkills isFormValid={isFormValid} />} />
              <Route path="/preview" element={<Preview />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsFillingPage;
