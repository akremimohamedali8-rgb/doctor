const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // In a real application, you would:
        // 1. Save to database
        // 2. Send email notification
        // 3. Send confirmation email to user

        // Simulate email sending
        console.log('Contact form submission:', { name, email, phone, message });

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        res.json({
            success: true,
            message: 'Thank you for your message! We will get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while sending your message. Please try again.'
        });
    }
});

// API endpoint for appointment booking
app.post('/api/appointments', async (req, res) => {
    try {
        const { name, email, phone, service, date, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !service) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // Simulate appointment booking
        console.log('Appointment booking:', { name, email, phone, service, date, message });

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        res.json({
            success: true,
            message: 'Appointment booked successfully! We will confirm your appointment shortly.'
        });

    } catch (error) {
        console.error('Appointment booking error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while booking your appointment. Please try again.'
        });
    }
});

// API endpoint to get services
app.get('/api/services', (req, res) => {
    const services = [
        {
            id: 1,
            name: 'Cardiology',
            description: 'Comprehensive heart care with state-of-the-art diagnostic technology',
            icon: '❤️'
        },
        {
            id: 2,
            name: 'Neurology',
            description: 'Expert care for brain and nervous system disorders',
            icon: '🧠'
        },
        {
            id: 3,
            name: 'Orthopedics',
            description: 'Advanced treatments for bone and joint conditions',
            icon: '🦴'
        },
        {
            id: 4,
            name: 'Ophthalmology',
            description: 'Complete eye care and vision correction services',
            icon: '👁️'
        }
    ];

    res.json(services);
});

// API endpoint to get doctors
app.get('/api/doctors', (req, res) => {
    const doctors = [
        {
            id: 1,
            name: 'Dr. Sarah Chen',
            specialty: 'Cardiologist',
            experience: '15+ years',
            description: '15+ years of experience in cardiovascular medicine'
        },
        {
            id: 2,
            name: 'Dr. Michael Rodriguez',
            specialty: 'Neurologist',
            experience: '12+ years',
            description: 'Expert in neurological disorders and treatments'
        },
        {
            id: 3,
            name: 'Dr. Emily Watson',
            specialty: 'Orthopedic Surgeon',
            experience: '10+ years',
            description: 'Specialized in joint replacement and sports medicine'
        }
    ];

    res.json(doctors);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

app.listen(PORT, () => {
    console.log(`MedLife Clinic server is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});

module.exports = app;