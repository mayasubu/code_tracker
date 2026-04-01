const Submission = require('../models/submissionModel');
const Problem = require('../models/problemModel');

exports.createSubmission = async (userId, problemId, code) => {
    // Basic mock evaluation logic for simulation purposes
    const statuses = ['Accepted', 'Wrong Answer', 'Pending'];
    // In a real app, this would route to a sandboxed execution engine.
    const simulatedStatus = statuses[Math.floor(Math.random() * 2)]; // Returns either Accepted or Wrong Answer randomly

    const submission = new Submission({
        userId,
        problemId,
        code,
        status: simulatedStatus
    });

    await submission.save();
    return submission;
};

exports.getSubmissionsByUser = async (userId) => {
    return await Submission.find({ userId })
        .populate('problemId', 'title difficulty')
        .sort({ createdAt: -1 });
};

exports.getAllSubmissions = async () => {
    return await Submission.find()
        .populate('userId', 'name registerNumber')
        .populate('problemId', 'title')
        .sort({ createdAt: -1 });
};

exports.getSubmissionStatsByUser = async (userId) => {
    const totalAttempted = await Submission.distinct('problemId', { userId });
    const acceptedSubmissions = await Submission.find({ userId, status: 'Accepted' }).distinct('problemId');
    
    // To get total problems for percentage
    const totalProblems = await Problem.countDocuments();
    
    return {
        attempted: totalAttempted.length,
        solved: acceptedSubmissions.length,
        totalProblems
    };
};
