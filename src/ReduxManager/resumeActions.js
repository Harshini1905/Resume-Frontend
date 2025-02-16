import axios from 'axios';
import { updateState } from './dataStoreSlice';

export const fetchResumeData = (email) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/get-resume?email=${email}`);
    dispatch(updateState({ key: 'personalInfo', value: response.data.personalInfo }));
    dispatch(updateState({ key: 'workEx', value: response.data.workEx }));
    dispatch(updateState({ key: 'education', value: response.data.education }));
    dispatch(updateState({ key: 'skills', value: response.data.skills }));
  } catch (error) {
    console.error('Error fetching resume data:', error.response?.data || error.message);
    dispatch(updateState({ key: 'errorMessages', value: { general: 'Error fetching resume data.' } }));
  }
};
