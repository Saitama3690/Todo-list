import React,{ useContext } from 'react';
import todoContext from '../context/todo/todoContext';


const About = () => {
  const a = useContext(todoContext);
  return (
        <div className="container my-5 ">
          <h1 className="text-center mb-5 text-border" style={{ fontSize: '3rem', marginTop: '2rem' }}>
            About This Project
          </h1>
          <div className="row">
            <div className="col-md-6">
              <h2 className="text-border" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Project Overview
              </h2>
              <p className="" style={{ fontSize: '1.2rem' }}>
                <b>
                Welcome to our task management application. This project allows users to add their daily tasks and review them efficiently. 
                It's designed to help you stay organized and keep track of your tasks effectively.

                </b>
              </p>
              <p className="" style={{ fontSize: '1.2rem' }}>
                <b>
                  This site is still in progress, and we are continuously working to enhance its features. The developers are committed to adding new 
                components and functionalities based on user feedback and needs.
                  </b>
                  
              </p>
            </div>
            <div className="col-md-6">
              <h2 className="text-border" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                About the Developer
              </h2>
              <p className="font-weight-bolder" style={{ fontSize: '1.2rem' }}>
                <b>My name is Akshil Rajput, and this project is developed under the guidance of Miss Siva Gayatri during my internship at Main Flow 
                Technologies and Services. </b>
              </p>
              <p className="" style={{ fontSize: '1.2rem' }}>
                <b>I have enjoyed working on this project and look forward to incorporating additional features and improvements. If you have any 
                suggestions or feedback, feel free to reach out!</b>
              </p>
            </div>
          </div>
          <div className="text-center mt-5">
            <p className="font-italic " style={{ fontSize: '1.2rem' }}>
              <b>Thank you for visiting our project page!</b>
            </p>
          </div>
        </div>
      );
    }
    

export default About
