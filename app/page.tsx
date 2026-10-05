'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Shuffle, Sparkles, X } from 'lucide-react';

type Card = { name: string; numeral: string; upright: string; reversed: string; reflection: string; art: number };

const cards: Card[] = [
  { name: 'The Fool', numeral: '0', upright: 'Beginnings, trust & a leap of faith', reversed: 'Hesitation, recklessness & a needed pause', reflection: 'Where are you being invited to begin before you feel fully ready?', art: 0 },
  { name: 'The Magician', numeral: 'I', upright: 'Will, skill & focused creation', reversed: 'Scattered energy, illusion & unused gifts', reflection: 'What is already in your hands that you have not fully claimed?', art: 1 },
  { name: 'The High Priestess', numeral: 'II', upright: 'Intuition, mystery & inner knowing', reversed: 'Disconnection, secrets & ignored instinct', reflection: 'What becomes clear when you stop asking the room and listen inward?', art: 2 },
  { name: 'The Empress', numeral: 'III', upright: 'Abundance, nurture & creative growth', reversed: 'Depletion, dependence & creative blocks', reflection: 'What wants your patient care rather than your control?', art: 3 },
  { name: 'The Emperor', numeral: 'IV', upright: 'Structure, authority & steady leadership', reversed: 'Rigidity, domination & lack of discipline', reflection: 'Where would a clear boundary create more freedom?', art: 4 },
  { name: 'The Hierophant', numeral: 'V', upright: 'Tradition, teaching & shared belief', reversed: 'Convention challenged & a personal path', reflection: 'Which inherited rule still serves you—and which does not?', art: 5 },
  { name: 'The Lovers', numeral: 'VI', upright: 'Union, choice & aligned values', reversed: 'Disharmony, imbalance & misaligned values', reflection: 'What choice would bring your actions closer to your values?', art: 6 },
  { name: 'The Chariot', numeral: 'VII', upright: 'Direction, resolve & forward motion', reversed: 'Force, drift & loss of direction', reflection: 'What can move when your competing desires face the same way?', art: 7 },
  { name: 'Strength', numeral: 'VIII', upright: 'Courage, compassion & quiet influence', reversed: 'Self-doubt, raw emotion & fragile confidence', reflection: 'What could tenderness accomplish that force cannot?', art: 8 },
  { name: 'The Hermit', numeral: 'IX', upright: 'Solitude, insight & inner guidance', reversed: 'Isolation, withdrawal & avoiding wisdom', reflection: 'What truth can only be heard in a little more quiet?', art: 9 },
  { name: 'Wheel of Fortune', numeral: 'X', upright: 'Cycles, change & turning fortune', reversed: 'Resistance, setbacks & repeating patterns', reflection: 'What cycle are you ready to meet differently this time?', art: 10 },
  { name: 'Justice', numeral: 'XI', upright: 'Truth, balance & accountability', reversed: 'Avoidance, unfairness & blurred truth', reflection: 'What becomes possible when you name the situation plainly?', art: 11 },
  { name: 'The Hanged One', numeral: 'XII', upright: 'Surrender, pause & a new perspective', reversed: 'Stalling, resistance & needless sacrifice', reflection: 'What changes when you stop pushing and turn the question around?', art: 2 },
  { name: 'Death', numeral: 'XIII', upright: 'Ending, release & transformation', reversed: 'Clinging, stagnation & fear of change', reflection: 'What has ended in spirit, even if you have not released it in form?', art: 9 },
  { name: 'Temperance', numeral: 'XIV', upright: 'Harmony, patience & integration', reversed: 'Excess, friction & competing extremes', reflection: 'Which two parts of your life are asking to be blended?', art: 1 },
  { name: 'The Devil', numeral: 'XV', upright: 'Attachment, appetite & the material shadow', reversed: 'Release, awareness & reclaimed agency', reflection: 'What has power over you only while it remains unnamed?', art: 4 },
  { name: 'The Tower', numeral: 'XVI', upright: 'Revelation, rupture & sudden truth', reversed: 'Averted change, private upheaval & fear', reflection: 'What false structure is becoming too costly to maintain?', art: 7 },
  { name: 'The Star', numeral: 'XVII', upright: 'Hope, renewal & quiet inspiration', reversed: 'Discouragement, disconnection & doubt', reflection: 'What small sign of renewal deserves your attention?', art: 10 },
  { name: 'The Moon', numeral: 'XVIII', upright: 'Dreams, uncertainty & the unseen', reversed: 'Confusion lifting & hidden fear revealed', reflection: 'Can you stay curious while the whole path is not yet visible?', art: 0 },
  { name: 'The Sun', numeral: 'XIX', upright: 'Joy, vitality & clear success', reversed: 'Delayed joy, dimmed confidence & excess', reflection: 'Where can you let yourself be seen without apology?', art: 3 },
  { name: 'Judgement', numeral: 'XX', upright: 'Awakening, reckoning & a true calling', reversed: 'Self-doubt, avoidance & refusing the call', reflection: 'What old verdict about yourself are you ready to reconsider?', art: 11 },
  { name: 'The World', numeral: 'XXI', upright: 'Completion, belonging & wholeness', reversed: 'Loose ends, delay & an unfinished lesson', reflection: 'What deserves to be completed and celebrated before you move on?', art: 10 },
];

type Selected = Card & { reversed: boolean };

const suitThemes = {
  Wands: ['energy', 'purpose', 'creative fire'],
  Cups: ['feeling', 'connection', 'intuition'],
  Swords: ['thought', 'truth', 'decision'],
  Pentacles: ['work', 'resources', 'the material world'],
} as const;
const ranks = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];
const rankNotes = [
  ['a beginning', 'blocked potential'], ['balance', 'a difficult choice'], ['growth', 'scattered effort'], ['stability', 'stagnation'],
  ['challenge', 'recovery'], ['harmony', 'unfinished business'], ['assessment', 'avoidance'], ['movement', 'frustrated momentum'],
  ['attainment', 'self-doubt'], ['completion', 'carrying too much'], ['curiosity', 'inexperience'], ['action', 'impulsiveness'],
  ['inner mastery', 'insecurity'], ['leadership', 'misused authority'],
];
const minorCards: Card[] = Object.entries(suitThemes).flatMap(([suit, themes], suitIndex) => ranks.map((rank, rankIndex) => ({
  name: `${rank} of ${suit}`,
  numeral: rank === 'Ace' ? 'A' : rankIndex < 10 ? String(rankIndex + 1) : rank[0],
  upright: `${rankNotes[rankIndex][0]} in ${themes[0]}, ${themes[1]} & ${themes[2]}`,
  reversed: `${rankNotes[rankIndex][1]} around ${themes[0]}, ${themes[1]} or ${themes[2]}`,
  reflection: `What is the ${suit.toLowerCase()} energy in this moment asking you to notice?`,
  art: (suitIndex * 3 + rankIndex) % 12,
})));
const fullDeck = [...cards, ...minorCards];

export default function Home() {
  const [deck, setDeck] = useState<Card[]>(fullDeck);
  const [targetCount, setTargetCount] = useState(8);
  const [selected, setSelected] = useState<Selected[]>([]);
  const [focused, setFocused] = useState<Selected | null>(null);
  const shuffleDeck = () => {
    setDeck([...fullDeck].sort(() => Math.random() - 0.5));
  };
  const clearSpread = () => {
    setSelected([]);
    setFocused(null);
  };
  const chooseCount = (count: number) => {
    setTargetCount(count);
    setSelected([]);
    setFocused(null);
  };
  const choose = (card: Card) => {
    if (selected.length >= targetCount || selected.some((item) => item.name === card.name)) return;
    const choice = { ...card, reversed: Math.random() < 0.5 };
    setSelected((items) => [...items, choice]);
    setFocused(choice);
  };

  useEffect(() => { shuffleDeck(); }, []);

  useEffect(() => {
    const modelContext = (document as Document & { modelContext?: { registerTool: (tool: unknown, options?: { signal: AbortSignal }) => void | Promise<void> } }).modelContext;
    if (!modelContext?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(modelContext.registerTool({
        name: 'choose_tarot_card',
        title: 'Choose a tarot card',
        description: 'Choose one Major Arcana card in its upright or reversed orientation and show its reading in the visible page.',
        inputSchema: { type: 'object', properties: { name: { type: 'string' }, orientation: { type: 'string', enum: ['upright', 'reversed'] } }, required: ['name', 'orientation'], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input: unknown) {
          const { name, orientation } = input as { name?: string; orientation?: string };
          const card = fullDeck.find((item) => item.name.toLowerCase() === name?.toLowerCase());
          if (!card || (orientation !== 'upright' && orientation !== 'reversed')) throw new Error('Choose a valid card name and orientation.');
          const choice = { ...card, reversed: orientation === 'reversed' };
          setSelected((items) => items.length < targetCount && !items.some((item) => item.name === card.name) ? [...items, choice] : items);
          setFocused(choice);
          return { name: card.name, orientation };
        },
      }, { signal: lifecycle.signal })).catch(() => undefined);
    } catch { /* WebMCP is optional in unsupported browsers. */ }
    return () => lifecycle.abort();
  }, [targetCount]);

  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Arcana home"><Sparkles size={16} strokeWidth={1.5} /> ARCANA</a>
        <div className="nav-note">A quiet space for reflection</div>
        <a className="about-link" href="#about">About the deck <ArrowRight size={14} /></a>
      </nav>
      <section id="top" className="picker-intro"><p className="eyebrow">A complete 78-card tarot deck</p><h1>Choose by instinct.<br /><em>Reveal by chance.</em></h1><p className="intro">Pick a card, then reveal your destiny...</p><div className="count-picker" aria-label="Choose number of tarot cards"><span>How many cards?</span><div>{Array.from({ length: 10 }, (_, index) => index + 1).map((count) => <button key={count} className={targetCount === count ? 'active' : ''} onClick={() => chooseCount(count)} aria-pressed={targetCount === count}>{count}</button>)}</div></div></section>
      <section className="spread-board" aria-label={`Your ${targetCount}-card spread`}><div className="browser-heading"><p>Your spread · {selected.length} of {targetCount} chosen</p><button onClick={clearSpread} disabled={selected.length === 0}><X /> Clear spread</button></div><div className="spread-grid" data-count={targetCount} style={{ gridTemplateColumns: `repeat(${targetCount === 8 ? 4 : targetCount > 5 ? 5 : targetCount}, minmax(0, 1fr))` }}>{Array.from({ length: targetCount }, (_, index) => { const card = selected[index]; return card ? <button className="spread-card" key={card.name} onClick={() => setFocused(card)}><span className={`spread-art ${card.reversed ? 'is-reversed' : ''}`} style={{ backgroundPosition: `${(card.art % 4) * 33.333}% ${Math.floor(card.art / 4) * 50}%` }} /><small>{card.name}<i>{card.reversed ? 'Reversed' : 'Upright'}</i></small></button> : <div className="spread-slot" key={index}><span>{index + 1}</span></div>; })}</div></section>
      {focused && <section className="quick-reading" aria-live="polite"><p><span>{focused.reversed ? 'Reversed' : 'Upright'}</span>{focused.name}</p><h2>{focused.reversed ? focused.reversed : focused.upright}</h2><blockquote>{focused.reflection}</blockquote></section>}
      <section className="deck-browser" aria-label="Shuffled 78-card tarot deck"><div className="browser-heading"><p>Pick from the deck</p><button onClick={shuffleDeck}><Shuffle /> Shuffle</button></div><div className="full-deck-grid">{deck.map((card, index) => { const picked = selected.some((item) => item.name === card.name); return <button className={`deck-pick ${picked ? 'picked' : ''}`} disabled={picked || selected.length >= targetCount} key={card.name} onClick={() => choose(card)} aria-label={picked ? `Card ${index + 1}, chosen` : `Choose hidden card ${index + 1}`}><span>☾</span><small>{index + 1}</small></button>; })}</div></section>
      <section id="about" className="about-compact"><strong>About this deck</strong><span>78 cards · 22 Major Arcana · 56 Minor Arcana · upright & reversed</span><em>Symbols, not answers.</em></section>
      <footer><span>ARCANA</span><p>Made for moments of reflection.</p><span>XXI · MMXXVI</span></footer>
    </main>
  );
}
