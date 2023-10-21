import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        profileImage: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        passwordCreatedAt: {
            type: Date,
            required: false,
        },

    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
