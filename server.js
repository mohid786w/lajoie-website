const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from all directories
app.use(express.static(path.join(__dirname)));
app.use('/Homepage', express.static(path.join(__dirname, 'Homepage')));
app.use('/About Us page', express.static(path.join(__dirname, 'About Us page')));
app.use('/Contact Us page', express.static(path.join(__dirname, 'Contact Us page')));
app.use('/Career Page', express.static(path.join(__dirname, 'Career Page')));
app.use('/Admin', express.static(path.join(__dirname, 'Admin')));
app.use('/Communities', express.static(path.join(__dirname, 'Communities')));
app.use('/Properties', express.static(path.join(__dirname, 'Properties')));
app.use('/Gallery', express.static(path.join(__dirname, 'Gallery')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✓ MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Schemas
const contactFormSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    homeAddress: String,
    inquiryType: { type: String, required: true },
    message: String,
    notifications: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'processing', 'responded'], default: 'new' },
    response: String,
    responseDate: Date
});

const jobApplicationSchema = new mongoose.Schema({
    position: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    experience: { type: Number, required: true },
    coverLetter: { type: String, required: true },
    resumeUrl: String,
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'processing', 'responded'], default: 'new' },
    response: String,
    responseDate: Date
});

// Models
const ContactForm = mongoose.model('ContactForm', contactFormSchema);
const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

// ==================== CONTACT FORM ROUTES ====================

// Get all contact form submissions
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await ContactForm.find().sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
});

// Create new contact form submission
app.post('/api/contacts', async (req, res) => {
    try {
        const newContact = new ContactForm(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: 'Error creating contact', error: error.message });
    }
});

// Update contact form submission
app.put('/api/contacts/:id', async (req, res) => {
    try {
        const updatedContact = await ContactForm.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: 'Error updating contact', error: error.message });
    }
});

// Delete contact form submission
app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const deletedContact = await ContactForm.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting contact', error: error.message });
    }
});

// ==================== JOB APPLICATION ROUTES ====================

// Get all job applications
app.get('/api/applications', async (req, res) => {
    try {
        const applications = await JobApplication.find().sort({ date: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error: error.message });
    }
});

// Create new job application
app.post('/api/applications', async (req, res) => {
    try {
        const newApplication = new JobApplication(req.body);
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(400).json({ message: 'Error creating application', error: error.message });
    }
});

// Update job application
app.put('/api/applications/:id', async (req, res) => {
    try {
        const updatedApplication = await JobApplication.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(updatedApplication);
    } catch (error) {
        res.status(400).json({ message: 'Error updating application', error: error.message });
    }
});

// Delete job application
app.delete('/api/applications/:id', async (req, res) => {
    try {
        const deletedApplication = await JobApplication.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting application', error: error.message });
    }
});

// ==================== ADMIN AUTHENTICATION ====================

// Simple admin login (in production, use proper authentication with hashing)
const ADMIN_CREDENTIALS = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'lajoie2025'
};

app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// ==================== SERVE STATIC FILES ====================

// Root route - redirect to homepage
app.get('/', (req, res) => {
    res.redirect('/Homepage/homepage.html');
});

// Catch all other routes and serve 404 or redirect to home
app.get('*', (req, res) => {
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Homepage available at http://localhost:${PORT}`);
});