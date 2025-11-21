import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Loader2, Youtube, Languages, Sparkles, Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from "@/lib/utils"
import languages from '@/assets/languages.json';

const Home = () => {
    const [url, setUrl] = useState('');
    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(false);

    // Custom Dropdown State
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/summarize`, {
                youtubeUrl: url,
                language,
            });
            navigate('/result', { state: { data: response.data, url } });
        } catch (error) {
            console.error('Error fetching summary:', error);
            // Ideally show a toast notification here
            alert('Failed to get summary. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background selection:bg-blue-100 selection:text-blue-900">
            <Helmet>
                <title>YT Summarizer - AI YouTube Video Summaries</title>
                <meta name="description" content="Get concise AI-powered summaries of YouTube videos in seconds. Save time and learn faster with our free tool." />
                <meta name="keywords" content="YouTube summarizer, AI summary, video transcript, learn faster, study tool" />
                <link rel="canonical" href="https://vhatti.online/yt-summarizer/" />
            </Helmet>
            {/* Hero Section */}
            <section className="relative flex-1 flex flex-col justify-center items-center py-20 md:py-32 overflow-hidden">
                {/* Modern Background with Grid and Gradient Orbs */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-4 text-center z-10">
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-8">

                        {/* Badge */}
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-50 text-blue-700 hover:bg-blue-100 mb-4">
                            ✨ AI-Powered Summaries
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
                            YouTube Summaries, <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                                Simplified.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Turn long videos into concise insights in seconds.
                            <br className="hidden md:block" />
                            Supported in <span className="font-semibold text-slate-800">6+ languages</span>.
                        </p>

                        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
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
                                    <div className="w-[220px] relative" ref={dropdownRef}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsOpen(!isOpen);
                                                if (!isOpen) setSearchTerm(''); // Reset search when opening
                                            }}
                                            className="flex h-14 w-full items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        >
                                            <span className="truncate">
                                                {language
                                                    ? languages.find((lang) => lang.code === language)?.label
                                                    : "Select language..."}
                                            </span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </button>

                                        {isOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
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

                        <p className="text-sm text-slate-400 mt-4">
                            No credit card required • Free for public videos
                        </p>
                    </div>
                </div>
            </section>

            {/* Process Section - Floating Cards */}
            <section className="py-24 bg-slate-50/50 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">How it works</h2>
                        <p className="text-slate-500">Three simple steps to save hours of watching.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { title: "Paste URL", icon: Youtube, color: "text-red-500", bg: "bg-red-50", desc: "Copy the link of any YouTube video you want to summarize." },
                            { title: "Select Language", icon: Languages, color: "text-blue-500", bg: "bg-blue-50", desc: "Choose your preferred language for the summary output." },
                            { title: "Get Insights", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50", desc: "Receive a comprehensive AI-generated summary instantly." }
                        ].map((step, index) => (
                            <Card key={index} className="border-0 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl overflow-hidden group">
                                <CardHeader className="text-center pb-2">
                                    <div className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <step.icon size={32} className={step.color} />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-slate-800">{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-slate-500 leading-relaxed px-8 pb-8">
                                    {step.desc}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section - Clean & Centered */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {[
                            {
                                q: "How does this work?",
                                a: "We use advanced AI to analyze the closed captions (transcripts) of YouTube videos. The AI processes this text to extract key points, important insights, and creates a concise summary for you."
                            },
                            {
                                q: "Is it free to use?",
                                a: "Yes! Our basic summarization tool is completely free for public YouTube videos. We aim to help you learn faster without any cost."
                            },
                            {
                                q: "What if a video doesn't have captions?",
                                a: "Currently, our tool relies on YouTube's closed captions. If a video doesn't have captions (auto-generated or manual), we might not be able to summarize it. We're working on audio-transcription features for the future!"
                            },
                            {
                                q: "Can I download the summary?",
                                a: "Absolutely. Once your summary is generated, you can copy it to your clipboard or download it as a text file directly from the results page."
                            },
                            {
                                q: "Which languages are supported?",
                                a: "We support summarization in English, Hindi, Marathi, Spanish, French, and German. You can select your preferred output language before summarizing."
                            },
                            {
                                q: "Does it work for long videos?",
                                a: "Yes, it works great for long podcasts, lectures, and tutorials. However, extremely long videos (over 4 hours) might take a bit longer to process."
                            }
                        ].map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-4 shadow-sm hover:shadow-md transition-shadow bg-slate-50/50 data-[state=open]:bg-white data-[state=open]:border-blue-100">
                                <AccordionTrigger className="text-lg font-medium text-slate-700 hover:text-blue-600 hover:no-underline py-6">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-500 pb-6 text-base leading-relaxed">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </div>
    );
};

export default Home;
