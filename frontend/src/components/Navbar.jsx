import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Youtube, Home, Mail, Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                        <Youtube className="h-6 w-6 text-red-600" />
                    </div>
                    <span className="font-bold text-xl text-slate-900 tracking-tight">
                        YT<span className="text-blue-600">Summarizer</span>
                    </span>
                </Link>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {!isHome && (
                        <Link to="/">
                            <Button variant="ghost" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                                <Home className="mr-2 h-4 w-4" />
                                Home
                            </Button>
                        </Link>
                    )}

                    <a href="https://www.vhatti.online">
                        <Button variant="outline" className="border-slate-200 hover:bg-slate-50 hover:text-blue-600">
                            <Mail className="mr-2 h-4 w-4" />
                            Contact
                        </Button>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-5">
                    {!isHome && (
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                                <Home className="mr-2 h-4 w-4" />
                                Home
                            </Button>
                        </Link>
                    )}
                    <a href="https://www.vhatti.online" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start border-slate-200 hover:bg-slate-50 hover:text-blue-600">
                            <Mail className="mr-2 h-4 w-4" />
                            Contact
                        </Button>
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
