import { useMemo, useState } from 'react';

type Plan = { summary: string; steps: string[]; options: string[] };
const categories = ['Business & Income', 'Education & Skills', 'Agriculture & Food', 'Everyday Problems', 'Technology', 'Community & Environment'];

function makePlan(problem: string, category: string): Plan {
  const area = category || 'your situation';
  return {
    summary: `You are exploring ${area.toLowerCase()} and want a practical response to: “${problem.trim()}”. Start with a low-risk test, gather evidence, and improve the plan as you learn.`,
    steps: ['Define the result you want and when you need it.', 'List the people, skills, time, and money already available.', 'Choose the smallest useful experiment and do it today.', 'Review the result after 48 hours and change one thing.', 'Repeat the cycle for seven days and record your progress.'],
    options: ['Start with a small experiment before making a large commitment.', 'Ask one experienced person focused questions.', 'Compare cost, effort, risk, and likely benefit before choosing.'],
  };
}

export default function App() {
  const [problem, setProblem] = useState('');
  const [category, setCategory] = useState('');
  const [plan, setPlan] = useState<Plan | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  const progress = useMemo(() => plan ? Math.round(done.length / plan.steps.length * 100) : 0, [done, plan]);

  function solve() {
    if (problem.trim().length < 12) return;
    setPlan(makePlan(problem, category)); setDone([]); setSaved(false);
    window.setTimeout(() => document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }
  function save() {
    if (!plan) return;
    localStorage.setItem('solvana-plan', JSON.stringify({ problem, category, plan })); setSaved(true);
  }

  return <main className="app-shell">
    <header className="topbar"><div className="brand"><span className="mark">S</span><span>SOLVANA <b>AI</b></span></div><span className="pill">PROBLEM → ACTION</span></header>
    <section className="hero"><div className="eyebrow">YOUR NEXT STEP STARTS HERE</div><h1>Turn a difficult problem<br /><em>into a clear next step.</em></h1><p>Describe your challenge. Solvana turns it into a practical action map you can follow.</p>
      <div className="composer"><label htmlFor="problem">WHAT WOULD YOU LIKE TO SOLVE?</label><textarea id="problem" maxLength={2000} value={problem} onChange={e => setProblem(e.target.value)} placeholder="Describe your goal, challenge, resources, and deadline..." /><div className="composer-foot"><span>{problem.length}/2000</span><button onClick={solve} disabled={problem.trim().length < 12}>BUILD MY ACTION PLAN →</button></div></div>
      <div className="category-row">{categories.map(item => <button className={category === item ? 'category selected' : 'category'} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    </section>
    {plan && <section id="plan" className="plan-area"><div className="plan-header"><div><div className="eyebrow">YOUR PERSONAL ACTION MAP</div><h2>A practical path forward</h2></div><button className="secondary" onClick={save}>{saved ? 'SAVED ✓' : 'SAVE PLAN'}</button></div><div className="card"><b>Situation summary</b><p>{plan.summary}</p></div><div className="card progress"><div><b>7-day momentum</b><span>{progress}% complete</span></div><div className="bar"><i style={{ width: `${progress}%` }} /></div></div><div className="plan-grid"><div className="card"><div className="eyebrow">YOUR NEXT 5 MOVES</div>{plan.steps.map((step, i) => <label className="task" key={step}><input type="checkbox" checked={done.includes(i)} onChange={() => setDone(x => x.includes(i) ? x.filter(n => n !== i) : [...x, i])} /><span><b>0{i + 1}</b>{step}</span></label>)}</div><div className="card"><div className="eyebrow">OPTIONS TO CONSIDER</div>{plan.options.map(option => <p className="option" key={option}>→ {option}</p>)}<div className="warning"><b>Keep it safe</b><p>Do not share passwords or financial PINs. Seek qualified help for medical, legal, or emergency situations.</p></div></div></div></section>}
    <section className="how"><div className="eyebrow">SIMPLE. PRACTICAL. PERSONAL.</div><h2>Clarity is a process.</h2><div className="how-grid"><div><b>01 / Explain</b><p>Describe what is happening without perfect words.</p></div><div><b>02 / Explore</b><p>Compare options and trade-offs.</p></div><div><b>03 / Act</b><p>Turn advice into manageable tasks.</p></div></div></section>
    <footer><div className="brand"><span className="mark">S</span><span>SOLVANA <b>AI</b></span></div><p>Every problem has a next step.</p></footer>
  </main>;
}
