const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import your models
const Student = require('./models/Student');
const Company = require('./models/Company');
const Job = require('./models/Job');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error));

// Sample data
const companies = [
  {
    firstName: 'Google',
    lastName: 'Inc',
    email: 'hr@google.com',
    password: 'google123456',
    companyName: 'Google',
    companyEmail: 'contact@google.com',
    companyPhone: '1234567890'
  },
  {
    firstName: 'Microsoft',
    lastName: 'Corp',
    email: 'hr@microsoft.com',
    password: 'microsoft123456',
    companyName: 'Microsoft',
    companyEmail: 'contact@microsoft.com',
    companyPhone: '2345678901'
  },
  {
    firstName: 'Amazon',
    lastName: 'Inc',
    email: 'hr@amazon.com',
    password: 'amazon123456',
    companyName: 'Amazon',
    companyEmail: 'contact@amazon.com',
    companyPhone: '3456789012'
  },
  {
    firstName: 'Meta',
    lastName: 'Platforms',
    email: 'hr@meta.com',
    password: 'meta123456',
    companyName: 'Meta',
    companyEmail: 'contact@meta.com',
    companyPhone: '4567890123'
  },
  {
    firstName: 'Apple',
    lastName: 'Inc',
    email: 'hr@apple.com',
    password: 'apple123456',
    companyName: 'Apple',
    companyEmail: 'contact@apple.com',
    companyPhone: '5678901234'
  }
];

const students = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'student123456',
    phone: '6789012345'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'student123456',
    phone: '7890123456'
  },
  {
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    password: 'student123456',
    phone: '8901234567'
  },
  {
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah@example.com',
    password: 'student123456',
    phone: '9012345678'
  },
  {
    firstName: 'David',
    lastName: 'Brown',
    email: 'david@example.com',
    password: 'student123456',
    phone: '0123456789'
  }
];

const jobs = [
  {
    title: 'Software Engineer',
    description: 'Developing and maintaining web applications using React and Node.js'
  },
  {
    title: 'Data Scientist',
    description: 'Working on machine learning models and data analysis'
  },
  {
    title: 'Frontend Developer',
    description: 'Building responsive web interfaces using modern frameworks'
  },
  {
    title: 'DevOps Engineer',
    description: 'Managing cloud infrastructure and CI/CD pipelines'
  },
  {
    title: 'Mobile App Developer',
    description: 'Developing mobile applications for iOS and Android'
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    await Student.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});

    console.log('Cleared existing data');

    // Create companies
    const createdCompanies = await Promise.all(
      companies.map(async company => {
        const hashedPassword = await bcrypt.hash(company.password, 10);
        return Company.create({ ...company, password: hashedPassword });
      })
    );

    console.log('Companies created');

    // Create students
    const createdStudents = await Promise.all(
      students.map(async student => {
        const hashedPassword = await bcrypt.hash(student.password, 10);
        return Student.create({ ...student, password: hashedPassword });
      })
    );

    console.log('Students created');

    // Create jobs with company assignments
    await Promise.all(
      jobs.map(async (job, index) => {
        const company = createdCompanies[index % createdCompanies.length];
        return Job.create({ ...job, _companyId: company._id });
      })
    );

    console.log('Jobs created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase(); 