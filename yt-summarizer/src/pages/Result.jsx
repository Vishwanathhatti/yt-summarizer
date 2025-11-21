import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy, Download, Loader2, Youtube, Languages, Sparkles, Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from "@/lib/utils"
import languages from '@/assets/languages.json';
import ReactMarkdown from 'react-markdown';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data, url: initialUrl } = location.state || {};

    const [url, setUrl] = useState('');
    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(false);

    // Custom Dropdown State
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredLanguages = languages.filter(lang =>
        lang.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // If no data, redirect home
    if (!data) {
        React.useEffect(() => {
            navigate('/');
        }, [navigate]);
        return null;
    }

    const { summary, videoId } = data;

    // Helper to extract video ID if not provided directly
    const getVideoId = (link) => {
        if (videoId) return videoId;
        try {
            const urlObj = new URL(link);
            return urlObj.searchParams.get('v') || link.split('/').pop();
        } catch (e) {
            return '';
        }
    };

    const currentVideoId = getVideoId(initialUrl);

    const handleCopy = () => {
        navigator.clipboard.writeText(summary);
        // Ideally show a toast here
    };

    const handleDownload = () => {
        const blob = new Blob([summary], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `summary-${currentVideoId}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/summarize`, {
                youtubeUrl: url,
                language,
            });
            navigate('/result', { state: { data: response.data, url }, replace: true });
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error fetching summary:', error);
            alert('Failed to get summary.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background selection:bg-blue-100 selection:text-blue-900">
            <Helmet>
                <title>Summary Ready - YT Summarizer</title>
                <meta name="description" content="Your AI-generated video summary is ready. Read key insights and takeaways from the YouTube video." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
                <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
                            Your Summary <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Is Ready!</span>
                        </h1>
                        <p className="text-slate-500 text-lg">Here are the key insights from your video.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => navigate('/')} className="h-11 px-6 rounded-xl border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                        <Button
                            onClick={() => document.getElementById('new-summary').scrollIntoView({ behavior: 'smooth' })}
                            className="h-11 px-6 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                        >
                            Summarize Another
                        </Button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                    {/* Left: Video Embed */}
                    <div className="space-y-6">
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 ring-1 ring-black/5 bg-slate-900 group">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${currentVideoId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        </div>
                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-blue-700 text-sm flex items-start gap-3">
                            <Sparkles className="h-5 w-5 shrink-0 mt-0.5 text-blue-500" />
                            <p>This summary was generated by AI. While usually accurate, it may miss some nuances. Always verify important details from the original video.</p>
                        </div>
                    </div>

                    {/* Right: Summary Card */}
                    <Card className="h-full flex flex-col shadow-xl shadow-slate-200/50 border-0 bg-white/80 backdrop-blur-xl ring-1 ring-black/5 rounded-2xl overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100 bg-white/50">
                            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                Key Insights
                            </CardTitle>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-9 px-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Copy to clipboard">
                                    <Copy className="h-4 w-4 mr-2" /> Copy
                                </Button>
                                <Button variant="ghost" size="sm" onClick={handleDownload} className="h-9 px-3 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Download as text file">
                                    <Download className="h-4 w-4 mr-2" /> Save
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-900 prose-ul:list-disc prose-ul:pl-4">
                                <ReactMarkdown>
                                    {summary}
                                </ReactMarkdown>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Summarize Another Section */}
                <div id="new-summary" className="max-w-4xl mx-auto pt-12 border-t border-slate-200/60">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">Ready for the next one?</h2>
                        <p className="text-slate-500 text-lg">Paste another video link below to get started.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="transform hover:scale-[1.01] transition-transform duration-300">
                        <div className="flex flex-col md:flex-row gap-3 p-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl ring-1 ring-black/5">
                            <div className="flex-1 relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                    <Youtube className="h-5 w-5" />
                                </div>
                                <Input
                                    type="url"
                                    placeholder="Paste YouTube URL (e.g., https://youtube.com/...)"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="h-14 pl-10 text-lg border-transparent bg-transparent focus-visible:ring-0 placeholder:text-slate-400 text-slate-800"
                                    required
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="w-[200px] relative" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsOpen(!isOpen);
                                            if (!isOpen) setSearchTerm('');
                                        }}
                                        className="flex h-14 w-full items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                                    >
                                        <span className="truncate">
                                            {language
                                                ? languages.find((lang) => lang.code === language)?.label
                                                : "Select language..."}
                                        </span>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </button>

                                    {isOpen && (
                                        <div className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                            <div className="flex items-center border-b px-3 py-2">
                                                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                                <input
                                                    type="text"
                                                    placeholder="Search language..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                                    autoFocus
                                                />
                                            </div>
                                            <div className="max-h-[240px] overflow-y-auto p-1">
                                                {filteredLanguages.length === 0 ? (
                                                    <div className="py-6 text-center text-sm text-slate-500">No language found.</div>
                                                ) : (
                                                    filteredLanguages.map((lang) => (
                                                        <div
                                                            key={lang.code}
                                                            onClick={() => {
                                                                setLanguage(lang.code);
                                                                setIsOpen(false);
                                                            }}
                                                            className={cn(
                                                                "relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2.5 text-sm outline-none hover:bg-slate-100 transition-colors",
                                                                language === lang.code && "bg-blue-50 text-blue-700"
                                                            )}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    language === lang.code ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {lang.label}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Button size="lg" type="submit" className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 rounded-xl transition-all hover:shadow-blue-500/50" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Summarize <Sparkles className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Result;
