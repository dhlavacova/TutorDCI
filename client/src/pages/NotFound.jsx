import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <img src="/img/404-img.png" className="mx-auto mb-6" />

                    <p className="text-base font-semibold text-red-900">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                    <p className="mt-6 text-base leading-7 text-gray-800 font-mono">Sorry, we could not find the page you’re looking for.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/" className='rounded-md bg-slate-600 px-3.5 py-2.5 text-sm font-semibold font-mono text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotFound;
