const submissionService = require('../services/submissionService');

exports.createSubmission = async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).json({ success: false, message: 'Not logged in' });
        const userId = req.session.user.id;
        const { problemId, code } = req.body;
        const submission = await submissionService.createSubmission(userId, problemId, code);
        res.json({ success: true, submission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMySubmissions = async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).json({ success: false, message: 'Not logged in' });
        const userId = req.session.user.id;
        const submissions = await submissionService.getSubmissionsByUser(userId);
        res.json({ success: true, submissions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllSubmissions = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== 'Admin') return res.status(403).json({ success: false, message: 'Unauthorized' });
        const submissions = await submissionService.getAllSubmissions();
        res.json({ success: true, submissions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).json({ success: false, message: 'Not logged in' });
        const userId = req.session.user.id;
        const stats = await submissionService.getSubmissionStatsByUser(userId);
        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
