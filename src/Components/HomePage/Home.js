import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { templateImagesPaths } from '../Data/Data'; // templateImagesPaths is imported from Data.js which is used to display static images of various templates on the Home page.
import { useDispatch } from 'react-redux';
import { updateState } from '../../ReduxManager/dataStoreSlice';
const shortid = require('shortid');

function Home() {
    const [isMouseOver, setIsMouseOver] = useState('MouseIsNotOver'); // state to display 'useTemplate' button on hover
    const [page, setPage] = useState('promo'); // state to toggle between promo and template selection
    const dispatch = useDispatch();

    return (
        <div className="App" style={{ minWidth: '300px' }}>
            {page === 'promo' ? (
                // Promo Section
                <div className="promo-container">
                    <div className="promo-image">
                        <img src="https://resume.io/assets/landing/builder/promo/resume/visual-6074098d8e832e57ead0cb6f735d68ebdabf9790b82bf957fc812d382d3d0fbe.svg" alt="Resume Illustration" />
                    </div>
                    <div className="promo-text">
                        <h1>Create a resume to land your next job</h1>
                        <p>Building a resume is a crucial step in your job search process. A well-crafted resume serves as your personal marketing tool, highlighting your skills, experiences, and accomplishments to potential employers.</p>
                        <p>
                            We have developed a <b>Resume Builder</b> based on the preferences of thousands of users. The goal is simple: help you land that dream job interview! Get an advantage in the modern professional environment.
                        </p>
                        <button
                            className="build-resume-btn"
                            onClick={() => setPage('templates')} // Switch to template selection page when button is clicked
                        >
                            Build Your Resume
                        </button>
                    </div>
                </div>
            ) : (
                // Template Selection Section
                <div>
                    <div className="d-flex justify-content-center mt-5">
                        <h3 className="p-2 rounded" style={{ backgroundColor: 'aliceblue' }}>Select a Template to get started!</h3>
                    </div>
                    <div className="container" style={{ color: '#1f4287' }}>
                        <div className="row">
                            {templateImagesPaths.map((currentTemplate) => {
                                return (
                                    <div className="col col-lg-3 col-md-6 col-12 mt-5" key={shortid.generate()}>
                                        <div
                                            style={{ position: 'relative' }}
                                            onMouseOver={() => setIsMouseOver(currentTemplate.name)}
                                            onMouseOut={() => setIsMouseOver('MouseIsNotOver')}
                                        >
                                            <div className="w-100 d-flex justify-content-center"><h3>{currentTemplate.name}</h3></div>
                                            <img className="w-100 image-aspect-ratio" src={currentTemplate.imageSource} alt="template" />
                                            {isMouseOver === currentTemplate.name ? (
                                                <Link to="/detailsfillingpage/personalinfo">
                                                    <button
                                                        className="btn btn-primary"
                                                        style={{ position: 'absolute', top: '50%', right: '30%' }}
                                                        onClick={() => {
                                                            dispatch(updateState({
                                                                key: 'selectedTemplate',
                                                                value: currentTemplate.name
                                                            }));
                                                        }}
                                                    >
                                                        Use Template
                                                    </button>
                                                </Link>
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
