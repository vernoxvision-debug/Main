import React, { useState } from 'react';

interface DayPlan {
  day: number;
  pillar: string;
  format: string;
  hook: string;
  unitCode?: string;
}

const SAMPLE_DAYS: DayPlan[] = [
  { day: 1, pillar: 'Curiosity Hook', format: '9:16 Video + Text Overlay', hook: 'Disrupt standard assumption with contrary data.', unitCode: 'VV—01' },
  { day: 2, pillar: 'Authority Quote', format: 'VV—02 Keynote Audio Cut', hook: 'Visceral mindset soundbite with bold kinetic captions.', unitCode: 'VV—02' },
  { day: 3, pillar: 'B-Roll Cutaway', format: 'VV—03 Luxury Atmosphere', hook: 'Ambient wealth visual behind voiceover tip.', unitCode: 'VV—03' },
  { day: 4, pillar: 'Reaction Cut', format: 'VV—04 Candid Street Reaction', hook: 'Human micro-expression before unexpected fact.', unitCode: 'VV—04' },
  { day: 5, pillar: 'Process Teardown', format: 'Fast 1-2s Timeline Cuts', hook: 'Step-by-step breakdown with zero filler frames.', unitCode: 'VV—01' },
  { day: 6, pillar: 'Looping Hook', format: 'Seamless 7-Second Video', hook: 'First sentence completes the final sentence for 200% watch-time.', unitCode: 'VV—01' },
  { day: 7, pillar: 'Weekly Synthesis', format: 'High-Energy Montage', hook: 'Compilation of top 3 principles with rapid cutaways.', unitCode: 'VV—01' },
  { day: 8, pillar: 'Counter-Intuitive Truth', format: 'Talking Head + B-roll', hook: 'Why the common advice fails 90% of beginners.', unitCode: 'VV—02' },
  { day: 9, pillar: 'Data Visualizer', format: 'Screen Graphic Overlay', hook: 'Concrete numbers paired with VV—01 motion plates.', unitCode: 'VV—01' },
  { day: 10, pillar: 'Podcast Snippet', format: 'VV—02 Masterclass Vox', hook: 'Unfiltered interview insight on focus and execution.', unitCode: 'VV—02' },
  { day: 11, pillar: 'Lifestyle Aesthetic', format: 'VV—03 Cinematic Travel', hook: 'Visual pause that creates aspiration and saves.', unitCode: 'VV—03' },
  { day: 12, pillar: 'Commentary Reaction', format: 'VV—04 Vlog Reaction Frame', hook: 'Candid human reaction to viral news.', unitCode: 'VV—04' },
  { day: 13, pillar: 'Hook Formula Drop', format: 'VV—06 Script Template', hook: 'Nobody tells you X until you experience Y.', unitCode: 'VV—06' },
  { day: 14, pillar: 'Rapid Fire Tips', format: '3 Cuts In 5 Seconds', hook: 'Three quick wins delivered without preamble.', unitCode: 'VV—01' },
  { day: 15, pillar: 'Mindset Realignment', format: 'VV—02 Cinematic Wisdom', hook: 'Direct truth on discipline vs motivation.', unitCode: 'VV—02' },
  { day: 16, pillar: 'Story Progression', format: '3-Part Timeline Arc', hook: 'A problem you faced, the inflection point, the rule.', unitCode: 'VV—04' },
  { day: 17, pillar: 'Visual Metaphor', format: 'VV—01 Motion Cutaway', hook: 'Abstract motion backing an abstract philosophy.', unitCode: 'VV—01' },
  { day: 18, pillar: 'Controversial Stance', format: 'Strong Opening Thesis', hook: 'Take a clear side on an industry debate.', unitCode: 'VV—02' },
  { day: 19, pillar: 'Behind-The-Scenes', format: 'VV—04 Natural Vlog Flow', hook: 'Unvarnished process reel.', unitCode: 'VV—04' },
  { day: 20, pillar: 'Luxury Ambience', format: 'VV—03 Horology & Motion', hook: 'High-status aesthetic backing financial rule.', unitCode: 'VV—03' },
  { day: 21, pillar: 'Framework Reveal', format: 'Diagram + Video Plate', hook: 'A simple 3-part framework you use daily.', unitCode: 'VV—05' },
  { day: 22, pillar: 'Mistake Callout', format: 'Disruption Cut', hook: 'The costly error you see everyone making.', unitCode: 'VV—01' },
  { day: 23, pillar: 'Short-Form Soundbite', format: 'Punchy 4-Second Clip', hook: 'Single memorable sentence that demands a re-watch.', unitCode: 'VV—02' },
  { day: 24, pillar: 'Tool / Resource Hook', format: 'Workflow Shortcut', hook: 'How you cut editing time from 3 hours to 15 minutes.', unitCode: 'VV—06' },
  { day: 25, pillar: 'Vocal Hook Drop', format: 'VV—02 Keynote Audio', hook: 'High-conviction statement from a known thinker.', unitCode: 'VV—02' },
  { day: 26, pillar: 'Fast Pacing Reel', format: 'VV—01 1-Second Cuts', hook: 'Rapid fire visual stimulation with minimal text.', unitCode: 'VV—01' },
  { day: 27, pillar: 'Case Example', format: 'Real-World Proof Frame', hook: 'Specific breakdown of why a particular format won.', unitCode: 'VV—04' },
  { day: 28, pillar: 'Audience Challenge', format: 'Call-To-Action Script', hook: 'Ask viewers a binary question to trigger comment war.', unitCode: 'VV—06' },
  { day: 29, pillar: 'Core Principle Recap', format: 'Multi-Clip Mashup', hook: 'The foundation rule that never changes.', unitCode: 'VV—01' },
  { day: 30, pillar: 'Monthly Sprint Review', format: 'Milestone Celebration', hook: 'Reflect on 30 consecutive days of publishing momentum.', unitCode: 'VV—05' },
];

export const CalendarPreview: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayPlan>(SAMPLE_DAYS[0]);
  const [weekFilter, setWeekFilter] = useState<'all' | 'w1' | 'w2' | 'w3' | 'w4' | 'w5'>('all');

  const filteredDays = SAMPLE_DAYS.filter((item) => {
    if (weekFilter === 'all') return true;
    if (weekFilter === 'w1') return item.day <= 7;
    if (weekFilter === 'w2') return item.day >= 8 && item.day <= 14;
    if (weekFilter === 'w3') return item.day >= 15 && item.day <= 21;
    if (weekFilter === 'w4') return item.day >= 22 && item.day <= 28;
    if (weekFilter === 'w5') return item.day >= 29;
    return true;
  });

  const handlePrevDay = () => {
    const currentIndex = SAMPLE_DAYS.findIndex((d) => d.day === selectedDay.day);
    if (currentIndex > 0) {
      setSelectedDay(SAMPLE_DAYS[currentIndex - 1]);
    }
  };

  const handleNextDay = () => {
    const currentIndex = SAMPLE_DAYS.findIndex((d) => d.day === selectedDay.day);
    if (currentIndex < SAMPLE_DAYS.length - 1) {
      setSelectedDay(SAMPLE_DAYS[currentIndex + 1]);
    }
  };

  return (
    <div className="border border-[var(--line)] bg-[var(--bg)] p-3 sm:p-6 rounded-[2px]" data-testid="calendar-interactive-grid">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-3 mb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">
            INTERACTIVE SYSTEM PREVIEW // VV—05
          </span>
          <h4 className="font-mono text-xs uppercase text-[var(--ink)] font-bold mt-0.5">
            30-DAY CONTENT CADENCE MATRIX
          </h4>
        </div>

        {/* Week Filter Tabs on Mobile & Desktop */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 sm:pb-0 font-mono text-[9px] uppercase">
          <button
            type="button"
            onClick={() => setWeekFilter('all')}
            className={`px-2 py-0.5 rounded-[1px] border cursor-pointer transition-colors ${
              weekFilter === 'all'
                ? 'bg-[#FF5A1F] text-black font-bold border-[#FF5A1F]'
                : 'border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            ALL (30)
          </button>
          <button
            type="button"
            onClick={() => setWeekFilter('w1')}
            className={`px-2 py-0.5 rounded-[1px] border cursor-pointer transition-colors ${
              weekFilter === 'w1'
                ? 'bg-[#D8A856] text-black font-bold border-[#D8A856]'
                : 'border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            W1
          </button>
          <button
            type="button"
            onClick={() => setWeekFilter('w2')}
            className={`px-2 py-0.5 rounded-[1px] border cursor-pointer transition-colors ${
              weekFilter === 'w2'
                ? 'bg-[#D8A856] text-black font-bold border-[#D8A856]'
                : 'border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            W2
          </button>
          <button
            type="button"
            onClick={() => setWeekFilter('w3')}
            className={`px-2 py-0.5 rounded-[1px] border cursor-pointer transition-colors ${
              weekFilter === 'w3'
                ? 'bg-[#D8A856] text-black font-bold border-[#D8A856]'
                : 'border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            W3
          </button>
          <button
            type="button"
            onClick={() => setWeekFilter('w4')}
            className={`px-2 py-0.5 rounded-[1px] border cursor-pointer transition-colors ${
              weekFilter === 'w4'
                ? 'bg-[#D8A856] text-black font-bold border-[#D8A856]'
                : 'border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            W4
          </button>
          <button
            type="button"
            onClick={() => setWeekFilter('w5')}
            className={`px-2 py-0.5 rounded-[1px] border cursor-pointer transition-colors ${
              weekFilter === 'w5'
                ? 'bg-[#D8A856] text-black font-bold border-[#D8A856]'
                : 'border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            W5
          </button>
        </div>
      </div>

      {/* 30 Days Step Pads: Responsive Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-1.5 sm:gap-2 mb-5">
        {filteredDays.map((item) => {
          const isSelected = selectedDay.day === item.day;
          return (
            <button
              key={item.day}
              type="button"
              onClick={() => setSelectedDay(item)}
              onMouseEnter={() => setSelectedDay(item)}
              className={`h-9 sm:h-10 rounded-[2px] font-mono text-xs flex flex-col items-center justify-center gap-0.5 border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D8A856] ${
                isSelected
                  ? 'bg-[#D8A856] text-black font-bold border-[#D8A856] shadow-sm'
                  : 'bg-[var(--bg)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]'
              }`}
              data-testid={`calendar-day-${item.day}`}
              aria-label={`Day ${item.day}: ${item.pillar}`}
            >
              {/* LED Pip Indicator */}
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? 'bg-black' : 'bg-[var(--line)] opacity-60'
                }`}
              />
              <span className="font-bold text-[11px] leading-none">
                {item.day.toString().padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Inspector Card (Teenage Engineering Hardware Look) */}
      <div className="bg-[var(--line)]/15 border border-[var(--line)] p-3 sm:p-4 rounded-[2px]">
        {/* Title & Tag Row: Mobile-Responsive Stack */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-[var(--line)]/50 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D8A856] shadow-[0_0_6px_#D8A856]" />
            <span className="font-mono text-xs font-bold text-[var(--ink)]">
              DAY {selectedDay.day.toString().padStart(2, '0')} // {selectedDay.pillar}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {selectedDay.unitCode && (
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-[1px] bg-black/40 text-[var(--ink)] border border-[var(--line)]">
                {selectedDay.unitCode}
              </span>
            )}
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">
              {selectedDay.format}
            </span>
          </div>
        </div>

        {/* Strategy Hook */}
        <p className="font-body text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
          <strong className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] block sm:inline sm:mr-2">
            STRATEGY / HOOK:
          </strong>
          {selectedDay.hook}
        </p>

        {/* Quick Stepper Buttons for Mobile Navigation */}
        <div className="mt-3 pt-2 border-t border-[var(--line)]/30 flex items-center justify-between font-mono text-[10px]">
          <button
            type="button"
            onClick={handlePrevDay}
            disabled={selectedDay.day === 1}
            className={`px-2 py-1 rounded-[1px] border flex items-center gap-1 cursor-pointer transition-colors ${
              selectedDay.day === 1
                ? 'opacity-40 cursor-not-allowed border-transparent text-[var(--ink-muted)]'
                : 'border-[var(--line)] hover:border-[#D8A856] text-[var(--ink)] hover:text-[#D8A856]'
            }`}
          >
            ◄ PREV DAY
          </button>

          <span className="text-[var(--ink-muted)] text-[9px]">
            STEP {selectedDay.day.toString().padStart(2, '0')} / 30
          </span>

          <button
            type="button"
            onClick={handleNextDay}
            disabled={selectedDay.day === 30}
            className={`px-2 py-1 rounded-[1px] border flex items-center gap-1 cursor-pointer transition-colors ${
              selectedDay.day === 30
                ? 'opacity-40 cursor-not-allowed border-transparent text-[var(--ink-muted)]'
                : 'border-[var(--line)] hover:border-[#D8A856] text-[var(--ink)] hover:text-[#D8A856]'
            }`}
          >
            NEXT DAY ►
          </button>
        </div>
      </div>

      <div className="mt-2.5 font-mono text-[8px] uppercase tracking-widest text-[var(--ink-muted)] text-right">
        * ILLUSTRATIVE PREVIEW · COMPLETE 30-DAY PRINTABLE PDF INCLUDED IN VAULT
      </div>
    </div>
  );
};
