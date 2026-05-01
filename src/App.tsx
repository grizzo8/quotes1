/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  PlusCircle, 
  Save, 
  Phone, 
  Settings, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Shield,
  Briefcase,
  Zap,
  Star,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClientData, AppView, BrandColor, ServiceNiche } from './types';

// Color Mapping for Dynamic Branding
const colorMap: Record<BrandColor, { primary: string; hover: string; text: string; ring: string; lightBg: string; border: string }> = {
  Blue: { primary: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', ring: 'focus:ring-blue-500', lightBg: 'bg-blue-50', border: 'border-blue-600' },
  Red: { primary: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600', ring: 'focus:ring-red-500', lightBg: 'bg-red-50', border: 'border-red-600' },
  Green: { primary: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-green-600', ring: 'focus:ring-green-500', lightBg: 'bg-green-50', border: 'border-green-600' },
  Orange: { primary: 'bg-orange-600', hover: 'hover:bg-orange-700', text: 'text-orange-600', ring: 'focus:ring-orange-500', lightBg: 'bg-orange-50', border: 'border-orange-600' },
  Black: { primary: 'bg-black', hover: 'hover:bg-zinc-800', text: 'text-black', ring: 'focus:ring-zinc-500', lightBg: 'bg-zinc-100', border: 'border-black' },
};

export default function App() {
  const [view, setView] = useState<AppView>('admin');
  const [clientData, setClientData] = useState<ClientData>({
    businessName: 'Apex Landscaping',
    niche: 'Landscaping',
    brandColor: 'Blue',
    phoneNumber: '555-0123',
  });

  const [formData, setFormData] = useState<ClientData>({ ...clientData });

  const handleSave = () => {
    setClientData({ ...formData });
    setView('live');
  };

  const currentColors = colorMap[clientData.brandColor];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              QuoteFlow<span className="text-blue-600">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1">
            <button
              id="admin-toggle"
              onClick={() => setView('admin')}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                view === 'admin'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin Dashboard
            </button>
            <button
              id="live-toggle"
              onClick={() => setView('live')}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                view === 'live'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="h-4 w-4" />
              Live Client Website
            </button>
          </div>

          <div className="hidden sm:flex sm:items-center">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">WaaS Platform v1.0</span>
          </div>
        </div>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          {view === 'admin' ? (
            <AdminDashboard 
              key="admin"
              formData={formData} 
              setFormData={setFormData} 
              onSave={handleSave} 
            />
          ) : (
            <ClientWebsite 
              key="live"
              data={clientData} 
              colors={currentColors} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- ADMIN DASHBOARD COMPONENT ---
function AdminDashboard({ 
  formData, 
  setFormData, 
  onSave 
}: { 
  formData: ClientData; 
  setFormData: React.Dispatch<React.SetStateAction<ClientData>>;
  onSave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-20"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sales Dashboard</h1>
          <p className="mt-2 text-slate-600">Onboard new clients and generate their AI-powered service sites.</p>
        </div>
        <div className="hidden sm:block">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <PlusCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
        <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
          <h2 className="flex items-center gap-2 font-semibold text-slate-800">
            <Settings className="h-4 w-4 text-slate-400" />
            New Client Onboarding
          </h2>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-full">
              <label htmlFor="businessName" className="mb-1.5 block text-sm font-medium text-slate-700">
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. Apex Landscaping"
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label htmlFor="niche" className="mb-1.5 block text-sm font-medium text-slate-700">
                Main Service Niche
              </label>
              <select
                id="niche"
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value as ServiceNiche })}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="Landscaping">Landscaping</option>
                <option value="Plumbing">Plumbing</option>
                <option value="House Cleaning">House Cleaning</option>
                <option value="Interior Painting">Interior Painting</option>
              </select>
            </div>

            <div>
              <label htmlFor="brandColor" className="mb-1.5 block text-sm font-medium text-slate-700">
                Brand Color Theme
              </label>
              <select
                id="brandColor"
                value={formData.brandColor}
                onChange={(e) => setFormData({ ...formData, brandColor: e.target.value as BrandColor })}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Green">Green</option>
                <option value="Orange">Orange</option>
                <option value="Black">Black</option>
              </select>
            </div>

            <div className="col-span-full">
              <label htmlFor="phoneNumber" className="mb-1.5 block text-sm font-medium text-slate-700">
                Client Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="e.g. 555-0199"
                  className="w-full rounded-lg border border-slate-200 pl-11 pr-4 py-2.5 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>
          </div>

          <button
            id="generate-btn"
            onClick={onSave}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 active:scale-[0.98]"
          >
            <Save className="h-5 w-5" />
            Save & Generate Website
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { icon: Zap, label: 'Instant Generation', desc: 'Sites live in <1s' },
          { icon: Globe, label: 'Custom Domain', desc: 'Trade-specific URLs' },
          { icon: Shield, label: 'Secure Hosting', desc: 'Enterprise-grade' },
        ].map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-100 shadow-sm text-blue-600">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">{feature.label}</h3>
            <p className="text-xs text-slate-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --- CLIENT WEBSITE COMPONENT ---
function ClientWebsite({ 
  data, 
  colors 
}: { 
  data: ClientData; 
  colors: { primary: string; hover: string; text: string; ring: string; lightBg: string; border: string } 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white"
    >
      {/* Client Header */}
      <header className="border-b border-slate-100 bg-white sticky top-16 z-40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.primary} text-white`}>
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
              {data.businessName}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
              <a href="#" className={`hover:${colors.text}`}>Services</a>
              <a href="#" className={`hover:${colors.text}`}>Reviews</a>
              <a href="#" className={`hover:${colors.text}`}>Contact</a>
            </nav>
            <a 
              href={`tel:${data.phoneNumber}`}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white ${colors.primary} ${colors.hover} transition-all`}
            >
              <Phone className="h-4 w-4" />
              {data.phoneNumber}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-white pb-20 pt-16 sm:pb-32 sm:pt-24 lg:pt-32">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-0 right-0 h-96 w-96 rounded-full blur-[120px] opacity-20 ${colors.primary}`}></div>
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full blur-[100px] opacity-10 bg-slate-300"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${colors.text} ${colors.lightBg} border ${colors.border}/20 mb-6`}
            >
              <Star className="h-3 w-3 fill-current" />
              #1 Rated in your area
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
            >
              Premium <span className={colors.text}>{data.niche}</span> Services by <span className="block italic mt-2">{data.businessName}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl"
            >
              Providing top-tier service with guaranteed satisfaction. Our expert team handles every job with precision and care.
            </motion.p>
          </div>

          {/* AI Quote Widget */}
          <div className="mt-16 flex justify-center">
            <QuoteWidget colors={colors} niche={data.niche} />
          </div>

          {/* Social Proof */}
          <div className="mt-20 border-t border-slate-100 pt-12">
            <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
              {[
                { label: '5.0 Rating', icon: Star },
                { label: 'Licensed & Insured', icon: Shield },
                { label: 'Fast Turnaround', icon: Clock },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`${colors.text}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 tracking-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl uppercase">Expertise you can trust</h2>
            <p className="mt-4 text-slate-600">The most reliable {data.niche.toLowerCase()} experts in the region.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md border border-slate-100">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.lightBg} ${colors.text}`}>
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">{data.niche} Plan {i}</h3>
                <p className="text-slate-600">Tailored solutions for your specific {data.niche.toLowerCase()} needs with professional oversight.</p>
                <div className={`mt-6 inline-flex items-center gap-1 text-sm font-bold ${colors.text} opacity-0 group-hover:opacity-100 transition-all`}>
                  Learn more <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>© 2026 {data.businessName}. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Powered by <Zap className="h-3 w-3 text-blue-600" /> <span className="font-bold text-slate-800">QuoteFlow AI</span>
          </p>
        </div>
      </footer>
    </motion.div>
  );
}

// --- AI QUOTE WIDGET COMPONENT ---
function QuoteWidget({ 
  colors, 
  niche 
}: { 
  colors: { primary: string; hover: string; text: string; ring: string; lightBg: string; border: string };
  niche: string;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !phone) return;
    
    setState('loading');
    setTimeout(() => {
      setState('success');
    }, 2000);
  };

  return (
    <motion.div 
      id="quote-widget"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: 'spring', damping: 20 }}
      className="w-full max-w-lg overflow-hidden rounded-3xl bg-white p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100"
    >
      <div className="bg-slate-50/50 rounded-[1.25rem] p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Get an Instant Estimate</h2>
          <p className="mt-2 text-slate-500">Describe your project, and our AI will calculate a quote.</p>
        </div>

        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.form 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">What do you need done?</label>
                <textarea
                  id="job-desc"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`e.g., I have a 3-bedroom house that needs ${niche.toLowerCase()}...`}
                  className="h-32 w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">Your Cell Phone Number</label>
                <div className="relative">
                  <Phone className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="555-0100"
                    className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-4 text-slate-900 transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <button
                id="calculate-quote-btn"
                type="submit"
                className={`flex w-full items-center justify-center gap-2 rounded-2xl ${colors.primary} px-6 py-5 text-lg font-black text-white shadow-lg transition-all ${colors.hover} active:scale-[0.98] mt-4`}
              >
                Calculate AI Quote
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.form>
          )}

          {state === 'loading' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="relative flex h-20 w-20 items-center justify-center">
                <div className={`absolute inset-0 animate-ping rounded-full opacity-20 ${colors.primary}`}></div>
                <div className={`h-12 w-12 animate-spin rounded-full border-4 border-slate-100 border-t-current ${colors.text}`}></div>
              </div>
              <h3 className="mt-8 text-xl font-bold text-slate-900">Analysing your project...</h3>
              <p className="mt-2 text-slate-500">Our AI is calculating local material & labor costs.</p>
            </motion.div>
          )}

          {state === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${colors.lightBg} ${colors.text}`}>
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Success!</h3>
              <div className={`my-6 rounded-2xl ${colors.lightBg} border ${colors.border}/10 p-6 w-full`}>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">Your Estimate</span>
                <span className={`text-4xl font-black ${colors.text}`}>$150 - $250</span>
              </div>
              <p className="text-slate-600 font-medium">
                We will text you shortly at <span className="font-bold text-slate-900">{phone}</span> to finalize your appointment!
              </p>
              <button
                onClick={() => setState('idle')}
                className={`mt-8 text-sm font-bold ${colors.text} hover:underline`}
              >
                Start New Request
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
