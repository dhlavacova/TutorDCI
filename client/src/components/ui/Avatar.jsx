// Avatar.js
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

function Avatar({ profileImage, handleImageChange }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <label
            htmlFor="profileImageInput"
            className="relative cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={profileImage ? URL.createObjectURL(profileImage) : "/img/avatar-default.jpeg"}
                alt=""
                className="w-60 h-60 rounded-full"
            />
            {isHovered && (
                <div className="absolute inset-0 bg-gray-300 bg-opacity-40 flex justify-center items-center rounded-full">
                    <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="profileImageInput"
                    />
                    <FaCamera className="text-3xl text-white" />
                </div>
            )}
        </label>
    );
}

export default Avatar;
