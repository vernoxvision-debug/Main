import React, { useState } from 'react';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/data/site';

export const SupportPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Vault Access / General Inquiry');
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${SITE_CONFIG.supportEmail}?subject=${encodeURIComponent(
      `[Vernox Vision] ${subject}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <div className="border-b border-[var(--line)] pb-8 mb-12">
          <div className="font-mono text-xs text-[var(--accent)] font-bold uppercase tracking-widest mb-2">
            SUPPORT DESK // OPERATOR RELAY
          </div>
          <h1 className="type-display text-4xl sm:text-6xl text-[var(--ink)]">
            CONTACT & SUPPORT.
          </h1>
          <p className="font-body text-base text-[var(--ink-muted)] mt-4 max-w-2xl leading-relaxed">
            Need help with your Google Drive invitation, license clarification, or order receipt?
            Contact human support directly via email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Direct Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="border border-[var(--line)] bg-[var(--line)]/10 p-6 rounded-[2px]">
              <div className="font-mono text-xs uppercase text-[var(--accent)] font-bold mb-2">
                DIRECT INBOX
              </div>
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="font-mono text-sm sm:text-base font-bold text-[var(--ink)] hover:underline break-all"
              >
                {SITE_CONFIG.supportEmail}
              </a>
              <p className="font-body text-xs text-[var(--ink-muted)] mt-3 leading-relaxed">
                We monitor this inbox daily. Expect an honest human response within 24 business hours.
              </p>
            </div>

            <div className="border border-[var(--line)] p-6 font-mono text-xs text-[var(--ink-muted)] space-y-2">
              <div className="font-bold text-[var(--ink)]">ORDER TROUBLESHOOTING:</div>
              <div>1. Check your Gumroad receipt email spam folder.</div>
              <div>2. Verify you accepted the Google Drive folder share.</div>
              <div>3. Include your Gumroad order number in your message.</div>
            </div>
          </div>

          {/* Clean Mailto Dispatch Form */}
          <div className="md:col-span-7">
            <form
              onSubmit={handleSend}
              className="border border-[var(--line)] bg-[var(--bg)] p-6 sm:p-8 rounded-[2px] space-y-4 shadow-sm"
              data-testid="support-form"
            >
              <div className="font-mono text-xs uppercase text-[var(--ink)] font-bold mb-2 pb-2 border-b border-[var(--line)]">
                DISPATCH SUPPORT RELAY
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[var(--ink-muted)] mb-1">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3 py-2 bg-[var(--line)]/10 border border-[var(--line)] font-body text-sm rounded-[1px] focus-visible:outline-2 focus-visible:outline-[#FF5A1F]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[var(--ink-muted)] mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-3 py-2 bg-[var(--line)]/10 border border-[var(--line)] font-body text-sm rounded-[1px] focus-visible:outline-2 focus-visible:outline-[#FF5A1F]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[var(--ink-muted)] mb-1">
                  SUBJECT
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--line)] font-mono text-xs rounded-[1px] focus-visible:outline-2 focus-visible:outline-[#FF5A1F]"
                >
                  <option value="Google Drive Vault Access Issue">Google Drive Vault Access Issue</option>
                  <option value="Gumroad Receipt / Order Lookup">Gumroad Receipt / Order Lookup</option>
                  <option value="Commercial License Inquiry">Commercial License Inquiry</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-[var(--ink-muted)] mb-1">
                  MESSAGE DETAILS
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide your Gumroad receipt email or explain your question..."
                  className="w-full px-3 py-2 bg-[var(--line)]/10 border border-[var(--line)] font-body text-sm rounded-[1px] focus-visible:outline-2 focus-visible:outline-[#FF5A1F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[var(--ink)] text-[var(--bg)] hover:bg-[#FF5A1F] hover:text-black font-mono text-xs uppercase tracking-wider font-bold rounded-[2px] transition-colors cursor-pointer"
              >
                OPEN EMAIL DISPATCH ↗
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
