
import React, { useState } from 'react';

const categories = [
{ icon: '💼', name: 'Business & Income', color: '#DCEBFF' },
{ icon: '🎓', name: 'Education & Skills', color: '#E7E0FF' },
{ icon: '🌱', name: 'Agriculture & Food', color: '#DDF5E5' },
{ icon: '🏠', name: 'Everyday Problems', color: '#FFE9D6' },
{ icon: '📱', name: 'Technology', color: '#DDF4F5' },
{ icon: '🌍', name: 'Community & Environment', color: '#FCE1EC' },
];

export default function App() {
const [problem, setProblem] = useState('');
const [selectedCategory, setSelectedCategory] = useState('');
const [message, setMessage] = useState('');

function handleSolve() {
if (!problem.trim()) {
setMessage('Please describe the problem you want to solve.');
return;
}

setMessage(
  'Your problem has been entered. AI problem-solving will be connected in the next development stage.'
);

}

return (
<main style={styles.page}>
<header style={styles.header}>
<div style={styles.logo}>
<span style={styles.logoIcon}>S</span>
<span>SOLVANA <span style={{ color: '#49D6C5' }}>AI</span></span>
</div>
<span style={styles.badge}>PROBLEM SOLVER</span>
</header>

  <section style={styles.hero}>
    <div style={styles.eyebrow}>
      YOUR NEXT STEP STARTS HERE
    </div>

    <h1 style={styles.title}>
      Big problem?<br />
      <span style={styles.highlight}>Let's solve it together.</span>
    </h1>

    <p style={styles.subtitle}>
      Describe what's challenging you. Discover practical options
      and turn your next step into a clear action plan.
    </p>

    <div style={styles.inputCard}>
      <label htmlFor="problem" style={styles.label}>
        WHAT WOULD YOU LIKE HELP WITH?
      </label>

      <textarea
        id="problem"
        value={problem}
        onChange={(event) => {
          setProblem(event.target.value);
          setMessage('');
        }}
        placeholder="Describe your problem, your goal, and what resources you have..."
        style={styles.textarea}
        rows={5}
      />

      <div style={styles.inputFooter}>
        <span style={styles.hint}>Your next step begins with a question.</span>
        <span style={styles.counter}>{problem.length}/2000</span>
      </div>

      <button onClick={handleSolve} style={styles.solveButton}>
        SOLVE MY PROBLEM <span aria-hidden="true">→</span>
      </button>

      {message && (
        <p role="status" style={styles.message}>
          {message}
        </p>
      )}
    </div>
  </section>

  <section style={styles.categorySection}>
    <div style={styles.sectionHeading}>
      <div>
        <div style={styles.eyebrow}>LET'S GET STARTED</div>
        <h2 style={styles.sectionTitle}>What area do you need help with?</h2>
      </div>
    </div>

    <div style={styles.categoryGrid}>
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => {
            setSelectedCategory(category.name);
            setMessage('');
          }}
          style={{
            ...styles.categoryCard,
            borderColor:
              selectedCategory === category.name ? '#49D6C5' : '#26384D',
            background:
              selectedCategory === category.name ? '#1A3545' : '#101E30',
          }}
        >
          <span
            style={{
              ...styles.categoryIcon,
              background: category.color,
            }}
          >
            {category.icon}
          </span>
          <span style={styles.categoryName}>{category.name}</span>
          <span style={styles.categoryArrow}>↗</span>
        </button>
      ))}
    </div>

    {selectedCategory && (
      <p style={styles.selectedText}>
        Selected: {selectedCategory}. Describe your problem above to continue.
      </p>
    )}
  </section>

  <section style={styles.stepsSection}>
    <div style={styles.eyebrow}>SIMPLE. PRACTICAL. PERSONAL.</div>
    <h2 style={styles.sectionTitle}>A clearer path forward.</h2>

    <div style={styles.stepsGrid}>
      <article style={styles.stepCard}>
        <span style={styles.stepNumber}>01</span>
        <h3 style={styles.stepTitle}>Explain</h3>
        <p style={styles.stepText}>
          Tell us what's happening and what you want to achieve.
        </p>
      </article>

      <article style={styles.stepCard}>
        <span style={styles.stepNumber}>02</span>
        <h3 style={styles.stepTitle}>Explore</h3>
        <p style={styles.stepText}>
          Compare possible solutions, their costs, and their trade-offs.
        </p>
      </article>

      <article style={styles.stepCard}>
        <span style={styles.stepNumber}>03</span>
        <h3 style={styles.stepTitle}>Take action</h3>
        <p style={styles.stepText}>
          Follow manageable steps and adjust your plan when needed.
        </p>
      </article>
    </div>
  </section>

  <footer style={styles.footer}>
    <div style={styles.logo}>
      <span style={styles.logoIcon}>S</span>
      <span>SOLVANA <span style={{ color: '#49D6C5' }}>AI</span></span>
    </div>
    <p>Every problem has a next step.</p>
    <small>Building practical paths to progress.</small>
  </footer>
</main>

);
}

const styles: Record<string, React.CSSProperties> = {
page: {
minHeight: '100vh',
background: '#091321',
color: '#F4F7FB',
fontFamily: 'Inter, Arial, sans-serif',
padding: '0 20px',
boxSizing: 'border-box',
},
header: {
maxWidth: '1000px',
margin: '0 auto',
padding: '24px 0',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
gap: '12px',
borderBottom: '1px solid #203047',
},
logo: {
display: 'flex',
alignItems: 'center',
gap: '10px',
fontSize: '18px',
fontWeight: 800,
letterSpacing: '1px',
},
logoIcon: {
width: '34px',
height: '34px',
borderRadius: '11px',
display: 'inline-flex',
justifyContent: 'center',
alignItems: 'center',
background: '#49D6C5',
color: '#091321',
fontWeight: 900,
fontSize: '21px',
},
badge: {
color: '#49D6C5',
border: '1px solid #285B5C',
background: '#102C35',
padding: '7px 10px',
borderRadius: '20px',
fontSize: '9px',
letterSpacing: '1px',
fontWeight: 700,
},
hero: {
maxWidth: '800px',
margin: '0 auto',
padding: '60px 0 48px',
},
eyebrow: {
color: '#49D6C5',
fontSize: '11px',
letterSpacing: '2px',
fontWeight: 800,
lineHeight: 1.6,
},
title: {
fontSize: 'clamp(32px, 7vw, 54px)',
lineHeight: 1.15,
letterSpacing: '-1.8px',
margin: '18px 0',
},
highlight: {
color: '#49D6C5',
},
subtitle: {
color: '#A9B7C9',
fontSize: '16px',
lineHeight: 1.8,
maxWidth: '600px',
marginBottom: '30px',
},
inputCard: {
background: '#101E30',
border: '1px solid #26384D',
borderRadius: '20px',
padding: '22px',
boxShadow: '0 18px 50px rgba(0,0,0,0.16)',
},
label: {
display: 'block',
fontSize: '10px',
letterSpacing: '1.4px',
fontWeight: 800,
color: '#D4DEEA',
marginBottom: '14px',
},
textarea: {
display: 'block',
width: '100%',
boxSizing: 'border-box',
minHeight: '125px',
resize: 'vertical',
border: '1px solid #34465D',
borderRadius: '12px',
padding: '15px',
background: '#0A1626',
color: '#F4F7FB',
fontSize: '15px',
lineHeight: 1.7,
outlineColor: '#49D6C5',
},
inputFooter: {
display: 'flex',
justifyContent: 'space-between',
gap: '8px',
margin: '10px 0 18px',
flexWrap: 'wrap',
},
hint: {
fontSize: '11px',
color: '#8798AD',
},
counter: {
fontSize: '11px',
color: '#8798AD',
},
solveButton: {
width: '100%',
border: 'none',
borderRadius: '12px',
padding: '16px',
background: '#49D6C5',
color: '#071721',
fontWeight: 900,
fontSize: '13px',
letterSpacing: '1px',
cursor: 'pointer',
},
message: {
margin: '14px 0 0',
color: '#8CE9DB',
fontSize: '13px',
lineHeight: 1.6,
},
categorySection: {
maxWidth: '1000px',
margin: '0 auto',
padding: '24px 0 55px',
},
sectionHeading: {
marginBottom: '22px',
},
sectionTitle: {
fontSize: 'clamp(22px, 5vw, 30px)',
lineHeight: 1.35,
margin: '10px 0 0',
letterSpacing: '-0.6px',
},
categoryGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
gap: '12px',
marginTop: '24px',
},
categoryCard: {
minHeight: '86px',
border: '1px solid #26384D',
borderRadius: '15px',
padding: '15px',
display: 'flex',
alignItems: 'center',
gap: '12px',
color: '#F4F7FB',
textAlign: 'left',
cursor: 'pointer',
},
categoryIcon: {
width: '42px',
height: '42px',
borderRadius: '12px',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: '21px',
flexShrink: 0,
},
categoryName: {
flex: 1,
fontSize: '13px',
fontWeight: 700,
lineHeight: 1.5,
},
categoryArrow: {
color: '#49D6C5',
fontSize: '18px',
},
selectedText: {
marginTop: '16px',
color: '#8CE9DB',
fontSize: '13px',
},
stepsSection: {
maxWidth: '1000px',
margin: '0 auto',
padding: '35px 0 65px',
borderTop: '1px solid #203047',
},
stepsGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
gap: '15px',
marginTop: '25px',
},
stepCard: {
border: '1px solid #26384D',
background: '#101E30',
borderRadius: '16px',
padding: '22px',
},
stepNumber: {
color: '#49D6C5',
fontSize: '12px',
fontWeight: 900,
letterSpacing: '1px',
},
stepTitle: {
fontSize: '18px',
margin: '14px 0 8px',
},
stepText: {
color: '#A9B7C9',
fontSize: '13px',
lineHeight: 1.8,
margin: 0,
},
footer: {
maxWidth: '1000px',
margin: '0 auto',
borderTop: '1px solid #203047',
padding: '28px 0 38px',
color: '#A9B7C9',
fontSize: '13px',
},
};
