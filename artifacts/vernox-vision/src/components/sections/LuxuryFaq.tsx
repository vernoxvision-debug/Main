import React, { useState } from 'react';

export const LuxuryFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqList = [
    {
      q: 'What is included in the bundle?',
      a: 'You receive instant lifetime access to the complete Vernox Vision private Google Drive vault containing all 15,000+ curated video assets across 4 video libraries (Viral TikTok Clips, Speaker & Motivation Vault, Luxury Lifestyle, and Rich Vlogs) plus 3 strategy PDF guides (30-Day Content Calendar, Caption Vault & Growth Codes, and Onboarding Quick-Start).',
    },
    {
      q: 'Is this a one-time payment?',
      a: 'Yes. It is a strictly one-time payment of $9.99 USD. There are zero subscriptions, zero hidden fees, and zero recurring charges. You gain lifetime access to the vault forever.',
    },
    {
      q: 'How will I receive the files?',
      a: 'Delivery is 100% automated and instant. Immediately upon completing checkout on Gumroad, you are redirected to the private Google Drive link and sent an automated confirmation email with your persistent access invitation. You can add the folder as a shortcut to your own Google Drive or download clips locally.',
    },
    {
      q: 'Can I use the assets for my own social media & commercial client work?',
      a: 'Yes. Commercial usage rights are included with every purchase. You can monetize finished videos on YouTube (AdSense), TikTok, Instagram Reels, client agency projects, and paid Meta/TikTok ad campaigns. Reselling or redistributing the raw unedited files is prohibited.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'Due to the immediate digital nature and irrevocable Google Drive delivery of over 15,000+ digital video files upon purchase, all sales are final. If you encounter any access or file corruption issues, our support team resolves them immediately.',
    },
    {
      q: 'What video editing software can I use with this library?',
      a: 'All clips are formatted in universal 1080p 9:16 MP4 format, making them natively compatible with CapCut (mobile & desktop), Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, InShot, VN, and any software that accepts standard MP4 video.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#070709] border-b border-white/[0.06]">
      <div className="max-w-5xl lg:max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-[#D8A856]/20 mb-4 backdrop-blur-sm">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#D8A856] font-semibold">
              FAQ
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FAF8F5] tracking-tight">
            Common <span className="text-gold-gradient italic">questions.</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.q} className="py-7 sm:py-8 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-6 font-serif text-xl sm:text-2xl text-[#FAF8F5] hover:text-[#D8A856] transition-colors cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span
                    className={`w-8 h-8 rounded-full border border-white/[0.12] flex items-center justify-center font-mono text-sm shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-45 bg-[#D8A856] text-black border-[#D8A856]'
                        : 'text-[#9A9893]'
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 sm:mt-5 pr-8 sm:pr-12 font-body text-sm sm:text-base text-[#9A9893] leading-relaxed animate-fadeIn font-light">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
