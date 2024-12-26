'use client'

import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true); // Set sending state to true
    // Code to send form data to your backend and handle email sending
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Log the response from the backend API
    console.log('Response from backend API:', response);

      if (response.ok) {
        setSent(true); // Set sent state to true upon successful submission
      } else {
        alert('Message failed to send. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Message failed to send. Please try again later.');
    } finally {
      setSending(false); // Reset sending state regardless of success or failure
    }
  };

  return (
    <div>
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
        <button type="submit" disabled={sending}>
          {sending ? 'Sending...' : sent ? 'Sent!' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;