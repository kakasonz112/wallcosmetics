"use client";

import { useState, useRef } from "react";
import { TbArrowUpRight, TbPhone, TbMail, TbMapPin, TbClock, TbPaperclip, TbX, TbCheck, TbLoader2 } from "react-icons/tb";

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED = ".jpg,.jpeg,.png,.pdf";

export default function Contact() {
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [fileName, setFileName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const fileInputRef = useRef(null);
    const formRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return setFileName("");
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setErrorMsg(`File must be under ${MAX_FILE_SIZE_MB} MB.`);
            e.target.value = "";
            return setFileName("");
        }
        setErrorMsg("");
        setFileName(file.name);
    };

    const clearFile = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
        setFileName("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");
        const data = new FormData(e.target);
        try {
            const res = await fetch("/api/contact", { method: "POST", body: data });
            const json = await res.json();
            if (json.success) {
                setStatus("success");
                formRef.current?.reset();
                setFileName("");
            } else {
                setStatus("error");
                setErrorMsg(json.error || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please check your connection and try again.");
        }
    };

    return (
        <div className="bg-zinc-50 min-h-screen">

            {/* Hero banner */}
            <div className="bg-gray-950 text-white">
                <div className="container py-20 text-center">
                    <p className="tracking-widest text-sm text-gray-400 uppercase mb-3">Wall Cosmetics</p>
                    <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-4">Get In Touch</h1>
                    <p className="max-w-xl mx-auto text-gray-400 leading-relaxed">
                        Have a question about our interior films or need a quote? We'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className="container py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* ── Contact info ── */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Information</h2>
                            <p className="text-gray-500 leading-relaxed">
                                Visit our showroom, call us, or drop an email — our team is ready to help you find the perfect interior film solution.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-950 text-white flex items-center justify-center">
                                    <TbPhone className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-0.5">Phone</p>
                                    <a href="tel:+6596497929" className="text-gray-800 font-medium hover:text-gray-500 transition-colors">
                                        +65 9649 7929
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-950 text-white flex items-center justify-center">
                                    <TbMail className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-0.5">Email</p>
                                    <a href="mailto:enquiry@wallcosmetics.com.sg" className="text-gray-800 font-medium hover:text-gray-500 transition-colors">
                                        enquiry@wallcosmetics.com.sg
                                    </a>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-950 text-white flex items-center justify-center">
                                    <TbMapPin className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-0.5">Showroom</p>
                                    <p className="text-gray-800 font-medium leading-snug">
                                        133 Canberra View<br />Canberra Plaza #02-19, Singapore
                                    </p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-950 text-white flex items-center justify-center">
                                    <TbClock className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-0.5">Opening Hours</p>
                                    <p className="text-gray-800 font-medium leading-snug">
                                        Mon – Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 4:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Contact form ── */}
                    <div className="bg-white rounded-2xl shadow-md p-8 lg:p-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

                        {status === "success" && (
                            <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm">
                                <TbCheck className="text-xl flex-shrink-0" />
                                <span>Message sent! We'll get back to you soon.</span>
                            </div>
                        )}

                        {status === "error" && errorMsg && (
                            <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                                <TbX className="text-xl flex-shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs tracking-widest uppercase text-gray-400 mb-1.5" htmlFor="firstName">First Name</label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-widest uppercase text-gray-400 mb-1.5" htmlFor="lastName">Last Name</label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-1.5" htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-1.5" htmlFor="phone">Phone Number</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                                    placeholder="+60 12-345 6789"
                                />
                            </div>

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-1.5" htmlFor="subject">Subject</label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                                    placeholder="Product inquiry / Quote request…"
                                />
                            </div>

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-1.5" htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm resize-none"
                                    placeholder="Tell us about your project or ask us anything…"
                                />
                            </div>

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-gray-400 mb-1.5">
                                    Floor Plan / Attachment <span className="normal-case">(optional · jpg, png, pdf · max 10 MB)</span>
                                </label>
                                <input
                                    ref={fileInputRef}
                                    id="attachment"
                                    name="attachment"
                                    type="file"
                                    accept={ACCEPTED}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                {fileName ? (
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700">
                                        <TbPaperclip className="flex-shrink-0 text-gray-500" />
                                        <span className="truncate flex-1">{fileName}</span>
                                        <button
                                            type="button"
                                            onClick={clearFile}
                                            className="flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors"
                                            aria-label="Remove attachment"
                                        >
                                            <TbX />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 text-gray-500 text-sm hover:border-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        <TbPaperclip className="text-lg" />
                                        Attach floor plan or reference image
                                    </button>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="inline-flex items-center gap-1 w-full justify-center px-6 py-3 bg-gray-950 text-white text-sm rounded-full hover:bg-gray-700 hover:ring-2 hover:ring-gray-950 ring-offset-2 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <>
                                        <TbLoader2 className="text-xl animate-spin" /> Sending…
                                    </>
                                ) : (
                                    <>
                                        Send Message <TbArrowUpRight className="text-xl" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-zinc-100 border-t border-zinc-200">
                <div className="container py-12 text-center">
                    <p className="tracking-widest text-xs text-gray-400 uppercase mb-2">Find Us</p>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Location</h2>
                    <div className="w-full rounded-2xl overflow-hidden shadow-md" style={{ height: 320 }}>
                        <iframe
                            title="Wall Cosmetics Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127481.30400997634!2d101.6468788!3d3.1385302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49c701efeae7%3A0xf4d98e5b2f1c287d!2sKuala%20Lumpur%2C%20Federal%20Territory%20of%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1699999999999!5m2!1sen!2smy"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}