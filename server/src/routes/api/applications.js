const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/authorization');
const Job = require('../../models/Job');
const { COMPANY, STUDENT, ADMIN } = require('../../constants/roles');

// Get all applications
router.get('/', authorization, async (req, res) => {
  try {
    const { _id, role } = req.user;

    let jobs;
    switch (role) {
      case COMPANY:
        // Companies see applications for their jobs
        jobs = await Job.find({ _companyId: _id });
        break;
      case STUDENT:
        // Students see their own applications
        jobs = await Job.find({ 'applicants.studentId': _id });
        break;
      case ADMIN:
        // Admins see all applications
        jobs = await Job.find({});
        break;
      default:
        return res.status(401).send({ message: 'Access denied.' });
    }

    // Extract applications from jobs
    const applications = jobs.reduce((acc, job) => {
      const jobApplications = job.applicants.map(applicant => ({
        _id: applicant._id,
        jobId: job._id,
        jobTitle: job.title,
        companyId: job._companyId,
        studentId: applicant.studentId,
        status: applicant.status,
        appliedAt: applicant.appliedAt,
        updatedAt: applicant.updatedAt
      }));
      return [...acc, ...jobApplications];
    }, []);

    res.status(200).send(applications);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router; 