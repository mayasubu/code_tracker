const Problem = require('../models/problemModel');

exports.getAllProblems = async (filter = {}) => {
    return await Problem.find(filter).sort({ createdAt: -1 });
};

exports.getProblemById = async (id) => {
    return await Problem.findById(id);
};

exports.createProblem = async (problemData) => {
    const problem = new Problem(problemData);
    return await problem.save();
};

exports.updateProblem = async (id, problemData) => {
    return await Problem.findByIdAndUpdate(id, problemData, { new: true });
};

exports.deleteProblem = async (id) => {
    return await Problem.findByIdAndDelete(id);
};
