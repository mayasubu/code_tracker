const problemService = require('../services/problemService');

exports.getAllProblems = async (req, res) => {
    try {
        const diff = req.query.difficulty;
        const filter = diff && diff !== 'All Difficulties' ? { difficulty: diff } : {};
        const problems = await problemService.getAllProblems(filter);
        res.json({ success: true, problems });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProblem = async (req, res) => {
    try {
        const problem = await problemService.getProblemById(req.params.id);
        res.json({ success: true, problem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createProblem = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== 'Admin') return res.status(403).json({ success: false, message: 'Unauthorized' });
        const data = { ...req.body };
        if (typeof data.tags === 'string') {
            data.tags = data.tags.split(',').map(tag => tag.trim());
        }
        const problem = await problemService.createProblem(data);
        res.json({ success: true, problem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProblem = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== 'Admin') return res.status(403).json({ success: false, message: 'Unauthorized' });
        const problem = await problemService.updateProblem(req.params.id, req.body);
        res.json({ success: true, problem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteProblem = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.role !== 'Admin') return res.status(403).json({ success: false, message: 'Unauthorized' });
        await problemService.deleteProblem(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
