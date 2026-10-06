import React, { useState } from 'react';

interface DayPlan {
  day: number;
  pillar: string;
  format: string;
  hook: string;
}

const SAMPLE_DAYS: DayPlan[] = [
  { day: 1, pillar: 'Curiosity Hook', format: '9:16 Video + Text Overlay', hook: 'Disrupt standard assumption with contrary data.' },
  { day: 2, pillar: 'Authority Quote', format: 'VV—02 Keynote Audio Cut', hook: 'Visceral mindset soundbite with bold kinetic captions.' },
  { day: 3, pillar: 'B-Roll Cutaway', format: 'VV—03 Luxury Atmosphere', hook: 'Ambient wealth visual behind voiceover tip.' },
  { day: 4, pillar: 'Reaction Cut', format: 'VV—04 Candid Street Reaction', hook: 'Human micro-expression before unexpected fact.' },
  { day: 5, pillar: 'Process Teardown', format: 'Fast 1-2s Timeline Cuts', hook: 'Step-by-step breakdown with zero filler frames.' },
  { day: 6, pillar: 'Looping Hook', format: 'Seamless 7-Second Video', hook: 'First sentence completes the final sentence for 200% watch-time.' },
  { day: 7, pillar: 'Weekly Synthesis', format: 'High-Energy Montage', hook: 'Compilation of top 3 principles with rapid cutaways.' },
  { day: 8, pillar: 'Counter-Intuitive Truth', format: 'Talking Head + B-roll', hook: 'Why the common advice fails 90% of beginners.' },
  { day: 9, pillar: 'Data Visualizer', format: 'Screen Graphic Overlay', hook: 'Concrete numbers paired with VV—01 motion plates.' },
  { day: 10, pillar: 'Podcast Snippet', format: 'VV—02 Masterclass Vox', hook: 'Unfiltered interview insight on focus and execution.' },
  { day: 11, pillar: 'Lifestyle Aesthetic', format: 'VV—03 Cinematic Travel', hook: 'Visual pause that creates aspiration and saves.' },
  { day: 12, pillar: 'Commentary Reaction', format: 'VV—04 Vlog Reaction Frame', hook: 'Candid human reaction to viral news.' },
  { day: 13, pillar: 'Hook Formula Drop', format: 'VV—06 Script Template', hook: 'Nobody tells you X until you experience Y.' },
  { day: 14, pillar: 'Rapid Fire Tips', format: '3 Cuts In 5 Seconds', hook: 'Three quick wins delivered without preamble.' },
  { day: 15, pillar: 'Mindset Realignment', format: 'VV—02 Cinematic Wisdom', hook: 'Direct truth on discipline vs motivation.' },
  { day: 16, pillar: 'Story Progression', format: '3-Part Timeline Arc', hook: 'A problem you faced, the inflection point, the rule.' },
  { day: 17, pillar: 'Visual Metaphor', format: 'VV—01 Motion Cutaway', hook: 'Abstract motion backing an abstract philosophy.' },
  { day: 18, pillar: 'Controversial Stance', format: 'Strong Opening Thesis', hook: 'Take a clear side on an industry debate.' },
  { day: 19, pillar: 'Behind-The-Scenes', format: 'VV—04 Natural Vlog Flow', hook: 'Unvarnished process reel.' },
  { day: 20, pillar: 'Luxury Ambience', format: 'VV—03 Horology & Motion', hook: 'High-status aesthetic backing financial rule.' },
  { day: 21, pillar: 'Framework Reveal', format: 'Diagram + Video Plate', hook: 'A simple 3-part framework you use daily.' },
  { day: 22, pillar: 'Mistake Callout', format: 'Disruption Cut', hook: 'The costly error you see everyone making.' },
  { day: 23, pillar: 'Short-Form Soundbite', format: 'Punchy 4-Second Clip', hook: 'Single memorable sentence that demands a re-watch.' },
  { day: 24, pillar: 'Tool / Resource Hook', format: 'Workflow Shortcut', hook: 'How you cut editing time from 3 hours to 15 minutes.' },
  { day: 25, pillar: 'Vocal Hook Drop', format: 'VV—02 Keynote Audio', hook: 'High-conviction statement from a known thinker.' },
  { day: 26, pillar: 'Fast Pacing Reel', format: 'VV—01 1-Second Cuts', hook: 'Rapid fire visual stimulation with minimal text.' },
  { day: 27, pillar: 'Case Example', format: 'Real-World Proof Frame', hook: 'Specific breakdown of why a particular format won.' },
  { day: 28, pillar: 'Audience Challenge', format: 'Call-To-Action Script', hook: 'Ask viewers a binary question to trigger comment war.' },
  { day: 29, pillar: 'Core Principle Recap', format: 'Multi-Clip Mashup', hook: 'The foundation rule that never changes.' },
  { day: 30, pillar: 'Monthly Sprint Review', format: 'Milestone Celebration', hook: 'Reflect on 30 consecutive days of publishing momentum.' },
];

export const CalendarPreview: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayPlan>(SAMPLE_DAYS[0]);

  return (
    <div className="border border-[var(--line)] bg-[var(--bg)] p-4 sm:p-6 rounded-[2px]" data-testid="calendar-interactive-grid">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-3 mb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">
            INTERACTIVE SYSTEM PREVIEW // VV—05
          </span>
          <h4 className="font-mono text-xs uppercase text-[var(--ink)] font-bold mt-0.5">
            30-DAY CONTENT CADENCE MATRIX
          </h4>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
          HOVER OR TAP A DAY TO INSPECT PILLAR
        </span>
      </div>

      {/* 30 Days Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 sm:gap-2 mb-6">
        {SAMPLE_DAYS.map((item) => {
          const isSelected = selectedDay.day === item.day;
          return (
            <button
              key={item.day}
              type="button"
              onClick={() => setSelectedDay(item)}
              onMouseEnter={() => setSelectedDay(item)}
              className={`h-9 sm:h-11 rounded-[2px] font-mono text-xs flex flex-col items-center justify-center border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF5A1F] ${
                isSelected
                  ? 'bg-[#FF5A1F] text-black font-bold border-[#FF5A1F] shadow-sm'
                  : 'bg-[var(--bg)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]'
              }`}
              data-testid={`calendar-day-${item.day}`}
              aria-label={`Day ${item.day}: ${item.pillar}`}
            >
              <span className="text-[10px] opacity-75">D</span>
              <span className="font-bold leading-none">{item.day}</span>
            </button>
          );
        })}
      </div>

      {/* Detail Inspector Card */}
      <div className="bg-[var(--line)]/20 border border-[var(--line)] p-4 rounded-[2px]">
        <div className="flex items-center justify-between border-b border-[var(--line)]/50 pb-2 mb-2">
          <span className="font-mono text-xs font-bold text-[var(--ink)]">
            DAY {selectedDay.day.toString().padStart(2, '0')} // {selectedDay.pillar}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
            {selectedDay.format}
          </span>
        </div>
        <p className="font-body text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
          <strong className="font-mono text-[11px] uppercase text-[var(--ink-muted)] block sm:inline sm:mr-2">
            STRATEGY / HOOK:
          </strong>
          {selectedDay.hook}
        </p>
      </div>

      <div className="mt-3 font-mono text-[8px] uppercase tracking-widest text-[var(--ink-muted)] text-right">
        * ILLUSTRATIVE PREVIEW · COMPLETE 30-DAY PRINTABLE PDF INCLUDED IN VAULT
      </div>
    </div>
  );
};
