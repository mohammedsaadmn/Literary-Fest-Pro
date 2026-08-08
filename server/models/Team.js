const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
    {
        teamName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        captain: {
            type: String,
            default: "", 
        },

        logo: {
            type: String
        },

        totalPoints: {
            type: Number,
            default: 1000,
        },

        remainingPoints: {
            type: Number,
            default: 1000,
        },

        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
