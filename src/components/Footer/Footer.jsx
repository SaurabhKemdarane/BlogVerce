import React from 'react';


function Footer() {
    return (
        <footer className="relative overflow-hidden py-10 bg-zinc-900  first-letter mt-5 border-t-2 border-gray-700 text-white">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <span className="text-xl font-bold ml-36">BCA Student Project</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    &copy; {new Date().getFullYear()}. Saurabh Kemdarane
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-7/12">
                        <div className="flex h-full justify-around">
                            <div>
                                <h3 className="tracking-px mb-6 text-sm font-semibold uppercase text-gray-300">
                                    Connect with me
                                </h3>
                                <ul className="flex flex-col space-y-4">
                                    <li className="text-base font-medium text-gray-200">
                                        Mobile Num: 8208994579
                                    </li>
                                    <li>
                                        <a
                                            className="text-base font-medium text-gray-200 hover:text-gray-100"
                                            href="https://www.linkedin.com/in/saurabh-kemdarane"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-base font-medium text-gray-200 hover:text-gray-100"
                                            href="https://github.com/SaurabhKemdarane"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <marquee className="text-lg font-bold text-gray-300">
                        Created by Saurabh Kemdarane
                    </marquee>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
