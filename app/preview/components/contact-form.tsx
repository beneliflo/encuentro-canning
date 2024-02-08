'use client'

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Code to send form data to your backend and handle email sending
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Message failed to send. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Message failed to send. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Your Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;