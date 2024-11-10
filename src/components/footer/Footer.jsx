import React from 'react'
import './style.css'

function Footer() {
  return (
    <footer className="p-3 p-md-5">
        <div className="row">
            <div className="col-md-4">
            <img src="https://bepractical.s3.us-east-2.amazonaws.com/brand-logo.cc6e3cf088a8fd3005b1.jpg" alt="logo" className="logo" />
                <p className="fs-6 mt-4">
                Since its establishment in 2012, Be Practical Tech Solutions is training predominantly in IT courses. It has pioneered as a diversified entrepreneurship tapping into the necessities of the internet market in India, with its in-depth understanding of customers and companies
                </p>
            </div>
            <div className="col-md-2 col-6 mt-3">
                <h3 className="fs-4 fw-bold text-danger">Quick Links</h3>
                <hr />
                <ul>
                    <li><a href="">About us</a></li>
                    <li><a href="">Our Mission</a></li>
                    <li><a href="">Our Vission</a></li>
                    <li><a href="">Privacy Policy</a></li>
                </ul>
            </div>

            <div className="col-md-3 col-6 mt-3">
                <h3 className="fs-4 fw-bold text-danger">Our Courses</h3>
                <hr />
                <ul>
                    <li><a href="">Full Stack Development Courses</a></li>
                    <li><a href="">Data Science Courses</a></li>
                    <li><a href="">Digital Marketing Courses</a></li>
                    <li><a href="">Cloud Computing Courses</a></li>
                   
                </ul>
            </div>
            <div className="col-md-3 mt-3">
            <h3 className="fs-4 fw-bold text-danger">For Companies</h3>
            <hr />
                <ul>
                <li><a href="">Corporate Training</a></li>
                    <li><a href="">HR services</a></li>
                    <li><a href="">Hire trained graduates</a></li>
                 
                </ul>
            </div>
        </div>
        <hr />
        <p className="fs-6 text-center">
        &copy; 2024 <span className="text-primary">Be Practical tech solutions</span> Inc. All rights reserved.
        </p>
    </footer>
  )
}

export default Footer