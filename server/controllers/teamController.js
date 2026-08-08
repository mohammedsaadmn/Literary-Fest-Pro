const Team = require("../models/Team");

const createTeam = async (req, res) => {
    try {
        const team = await Team.create(req.body);

        res.status(201).json({
            success: true,
            data: team,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    createTeam,
};