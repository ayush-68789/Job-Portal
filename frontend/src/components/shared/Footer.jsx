import React from 'react'

const Footer = () => {
    return (
        <footer className="border-t border-t-gray-200 py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold">Job<span className="text-[#F83002]">Portal</span></h2>
                    <p className="text-sm text-gray-500">© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
                </div>
                <div className="flex space-x-6">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
                        GitHub
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
                        LinkedIn
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
                        Twitter
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
