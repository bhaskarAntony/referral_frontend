import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const WhoCanRefer = () => {
  const referData = [
    { 
      icon: 'https://img.freepik.com/free-vector/people-talking-isometric-ai-robot_74855-1741.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid', 
      text: 'Anybody looking for work' 
    },
    { 
      icon: 'https://img.freepik.com/free-vector/moving-concept-illustration_114360-5559.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid', 
      text: 'Wishing to move careers' 
    },
    { 
      icon: 'https://img.freepik.com/free-vector/innovation-concept-illustration_114360-5768.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid', 
      text: 'Want to upgrade skills' 
    },
    { 
      icon: 'https://img.freepik.com/free-vector/programmer-concept-illustration_114360-2417.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid', 
      text: 'Beginning a career in programming' 
    },
    { 
      icon: 'https://img.freepik.com/free-vector/translator-concept-illustration_114360-6614.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid', 
      text: 'Learning a new coding language' 
    },
    { 
      icon: 'https://img.freepik.com/free-vector/code-typing-concept-illustration_114360-2937.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid', 
      text: 'Seeking a degree in programming' 
    },
  ];

  return (
    <div className="container text-center mt-4 p-3 p-md-2">
      <h3 className="mb-4">Who can <span className="text-primary">Refer?  or<span className="text-danger"> Share invitaion</span></span></h3>
      <div className="row justify-content-center">
        {referData.map((item, index) => (
          <div key={index} className="col-6 col-md-2 text-center mb-4 d-flex flex-column justify-content-between align-items-center">
            <img src={item.icon} alt="icon" className="mb-2 w-75" />
            <p className='fs-6 fw-bold'>{item.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-3">
        Your friend will save <strong className='text-primary'>Rs 10,000</strong> when they sign up for the course on Be Practical
      </p>
    </div>
  );
};

export default WhoCanRefer;
