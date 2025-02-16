import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';  //ok
import axios from 'axios';

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk('dataStore/fetchUserData', async (email) => {
  const response = await axios.get(`https://resume-backend-2-8p3o.onrender.com/api/get-resume/${email}`);

  return response.data;
});

const dataStoreSlice = createSlice({
  name: 'dataStore',
  initialState: {
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      profilePic: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      pin: "",
      objective: "",
    },
    workEx: [
      {
        title: "",
        orgName: "",
        startYear: "",
        endYear: "",
        jobDescription: "",
      }
    ],
    education: [
      {
        type: "Graduation",
        university: "",
        degree: "",
        start: "",
        end: "",
      }
    ],
    skills: [{ skillName: "" }],
    selectedTemplate: "",
    imageFile: null,
    errorMessages: {},
    showErrorMessages: false,
    email: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    updatePersonalInfo: (state, action) => {
      state.personalInfo[action.payload.key] = action.payload.value;
    },
    updateWorkEx: (state, action) => {
      state.workEx[action.payload.index][action.payload.key] = action.payload.value;
    },
    updateEducation: (state, action) => {
      state.education[action.payload.index][action.payload.key] = action.payload.value;
    },
    updateKeySkills: (state, action) => {
      state.skills[action.payload.index][action.payload.key] = action.payload.value;
    },
    updateState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    updateErrorMessages: (state, action) => {
      let key = action.payload.key;
      if (action.payload.index) {
        key += '_' + action.payload.index;
      }
      state.errorMessages[key] = action.payload.value;
    },
    addArrayElement: (state, action) => {
      state[action.payload.key].push(action.payload.element);
    },
    removeArrayElement: (state, action) => {
      state[action.payload.key].pop();
    },
    updateEmail: (state, action) => {
      state.personalInfo.email = action.payload;
      state.email = action.payload;
    },
    logout: (state) => {
      state.personalInfo = {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pin: "",
        objective: "",
      };
      state.workEx = [
        {
          title: "",
          orgName: "",
          startYear: "",
          endYear: "",
          jobDescription: "",
        }
      ];
      state.education = [
        {
          type: "Graduation",
          university: "",
          degree: "",
          start: "",
          end: "",
        }
      ];
      state.skills = [{ skillName: "" }];
      state.selectedTemplate = "";
      state.imageFile = null;
      state.errorMessages = {};
      state.showErrorMessages = false;
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.personalInfo = action.payload.personalInfo || state.personalInfo;
        state.workEx = action.payload.workEx?.length ? action.payload.workEx : state.workEx;
        state.education = action.payload.education?.length ? action.payload.education : state.education;
        state.skills = action.payload.skills?.length ? action.payload.skills : state.skills;
      })
      
    
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  updatePersonalInfo,
  updateWorkEx,
  updateEducation,
  updateKeySkills,
  updateErrorMessages,
  updateState,
  addArrayElement,
  removeArrayElement,
  updateEmail,
  logout,
} = dataStoreSlice.actions;

export default dataStoreSlice.reducer;