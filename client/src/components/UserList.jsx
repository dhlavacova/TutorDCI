import React, { useState, useEffect } from 'react';

function UserList() {
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        // Realiza una solicitud GET a tu backend para obtener la lista de tutores
        fetch('api/auth/tutors') // Cambia la ruta a '/tutors' para obtener solo tutores
            .then(response => response.json())
            .then(data => setTutors(data.tutors))
            .catch(error => console.error('Error fetching tutors:', error));
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-slate-100">
            <div className="w-200 p-20 ml-10 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">Tutors</h2>
                <ul className="space-y-4">
                    {tutors.map(tutor => (
                        <li
                            key={tutor._id}
                            className="flex items-center space-x-4 p-4 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-300"
                        >
                            <div className="w-12 h-12 flex items-center justify-center  bg-green-500 rounded-full text-white font-semibold text-xl">
                                {tutor.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-lg font-medium text-gray-800">{tutor.username}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserList;
