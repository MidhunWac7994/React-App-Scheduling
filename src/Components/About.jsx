import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };
  
  const slideUp = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const imageHover = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section
      <motion.section 
        className="bg-gray-900 text-white py-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            About Wacavce
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Innovating solutions and transforming ideas into reality since 2025.
          </motion.p>
        </div>
      </motion.section> */}

      {/* Mission Section */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial="rest"
              whileHover="hover"
              variants={imageHover}
            >
              <img src="/public/wac.png" alt="Our Mission" className="rounded-lg shadow-lg transition-all duration-300"/>
            </motion.div>
            <motion.div 
              className="md:w-1/2 md:pl-12"
              variants={slideUp}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6">At Wacavce, we're dedicated to pushing the boundaries of innovation while staying true to our core values of excellence, integrity, and customer satisfaction.</p>
              <p className="text-gray-700">We strive to create solutions that not only meet the current needs of our clients but anticipate future challenges in an ever-evolving landscape.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-16 bg-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-12"
            variants={slideUp}
          >
            Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
              variants={fadeIn}
            >
              <img src="/public/A.png" alt="Team Member" className="rounded-full mx-auto mb-4"/>
              <h3 className="text-xl font-semibold">Abhin Jose</h3>
              <p className="text-gray-600 mb-2">Founder</p>
              <p className="text-gray-700 text-sm">With over 15 years of industry experience, Abhin leads our vision with passion and insight.</p>
            </motion.div>
            
            {/* Team Member 2 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
              variants={fadeIn}
            >
              <img src="/public/J.png" alt="Team Member" className="rounded-full mx-auto mb-4"/>
              <h3 className="text-xl font-semibold">Jilu Jospeh</h3>
              <p className="text-gray-600 mb-2">CEO</p>
              <p className="text-gray-700 text-sm">The transformational and inspiring journey of Jilu Joseph, from Vice President to CEO of Webandcrafts, has been an inspiration to the organisation while taking newer steps towards the global digital revolution.</p>
            </motion.div>
            
     
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
              variants={fadeIn}
            >
              <img src="/public/V.png" alt="Team Member" className="rounded-full mx-auto mb-4"/>
              <h3 className="text-xl font-semibold">Vinoth Kumar</h3>
              <p className="text-gray-600 mb-2">CTO</p>
              <p className="text-gray-700 text-sm">John brings technological expertise and innovative thinking to every project we undertake.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            variants={slideUp}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <motion.div 
              className="text-center"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gray-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <motion.svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </motion.svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-700">We continuously seek new and better ways to solve problems.</p>
            </motion.div>
            
            {/* Value 2 */}
            <motion.div 
              className="text-center"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gray-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <motion.svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </motion.svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-700">We believe great ideas come from diverse perspectives working together.</p>
            </motion.div>
            
            {/* Value 3 */}
            <motion.div 
              className="text-center"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gray-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <motion.svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </motion.svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-700">We maintain the highest ethical standards in all our dealings.</p>
            </motion.div>
            
            {/* Value 4 */}
            <motion.div 
              className="text-center"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gray-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <motion.svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </motion.svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-700">We strive for the highest quality in everything we create.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* History Section */}
      <motion.section 
        className="py-16 bg-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 md:pr-12 mb-8 md:mb-0 order-2 md:order-1"
              variants={slideUp}
            >
              <h2 className="text-3xl font-bold mb-6">Our History</h2>
              <p className="text-gray-700 mb-6">Founded in 2025, Wacavce began with a simple vision: to bridge the gap between technological innovation and practical application. What started as a small team of passionate innovators has grown into a respected industry leader.</p>
              <p className="text-gray-700">Throughout our journey, we've remained committed to our founding principles while embracing change and evolution in our approach to meeting client needs.</p>
            </motion.div>
            <motion.div 
              className="md:w-1/2 order-1 md:order-2"
              initial="rest"
              whileHover="hover"
              variants={imageHover}
            >
              <img src="/public/W.png" alt="Our History" className="rounded-lg shadow-lg transition-all duration-300"/>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section 
        className="py-16 bg-gray-900 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            variants={slideUp}
          >
            Ready to Work With Us?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            variants={slideUp}
          >
            We're excited to learn about your project and explore how we can help bring your vision to life.
          </motion.p>
          <motion.a 
            href="#" 
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </div>
      </motion.section>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Wacavce</h3>
              <p className="text-gray-400">Innovating for a better tomorrow.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Portfolio</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Innovation Way</li>
                <li>Tech City, TC 10101</li>
                <li>info@wacavce.com</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.23 15.23c-.399.4-.94.621-1.505.621a2.116 2.116 0 01-1.505-.621l-1.72-1.72v4.783a.707.707 0 01-.708.707H8.708A.707.707 0 018 20.293V11.41l-.854.854a2.13 2.13 0 01-3.01 0 2.129 2.129 0 010-3.01l6.541-6.54c.14-.142.307-.253.489-.33a2.119 2.119 0 012.022 0c.182.077.35.188.49.33l6.541 6.54a2.13 2.13 0 01-3.01 3.01l-.98-.98v4.783c0 .39-.317.707-.708.707h-3.075a.707.707 0 01-.707-.707v-4.783l-1.72 1.72z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-2 15H8v-6h2v6zm-1-6.9c-.66 0-1.2-.54-1.2-1.2 0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2 0 .66-.54 1.2-1.2 1.2zM15 17h-2v-3c0-.66-.54-1.2-1.2-1.2-.66 0-1.2.54-1.2 1.2v3h-1V11h1v.7c.44-.55 1.11-.9 1.8-.9 1.4 0 2.6 1.1 2.6 2.5v3.7z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Wacavce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;