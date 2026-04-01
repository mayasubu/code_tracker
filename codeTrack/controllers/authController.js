const authService = require('../services/authService');

exports.getSession = (req, res) => {
    if (req.session.user) res.json({ success: true, user: req.session.user });
    else res.status(401).json({ success: false, message: 'Not logged in' });
};

exports.postRegister = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        req.session.user = { id: user._id, name: user.name, role: user.role, department: user.department };
        res.json({ success: true, user: req.session.user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);
        req.session.user = { id: user._id, name: user.name, role: user.role, department: user.department };
        res.json({ success: true, user: req.session.user });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out successfully' });
};
