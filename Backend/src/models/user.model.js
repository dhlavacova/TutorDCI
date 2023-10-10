import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
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
        profileImage: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
