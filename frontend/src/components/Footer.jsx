import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-muted/50 py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="text-muted-foreground mb-4">
                    Built with ❤️ by <span className="font-semibold text-foreground">Vishwanath Hatti</span>
                </p>
                <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                    <a href="mailto:vhatti14@gmail.com" className="hover:text-primary transition-colors">
                        vhatti14@gmail.com
                    </a>
                    <a href="https://www.vhatti.online" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        Portfolio
                    </a>
                    <a href="https://www.linkedin.com/in/vishwanath-hatti" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
