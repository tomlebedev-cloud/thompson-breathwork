const inhale = 'Inhale';
const exhale = 'Exhale';
const hold = 'Hold';
const yogaSource = 'https://www.yogamdniy.nic.in/files/pdf/CYP-2023-English.pdf';
const movementSource = 'https://www.asthmaandlung.org.uk/living-with/keeping-active/keep-active-programme/managing-breathlessness';
const practices = [
  { name: 'Coherent Breathing', label: 'Equal breathing · 5–5', category: 'Calm',
    description: 'Equal-length inhales and exhales create a slow, steady rhythm.',
    phases: [[inhale, 5, 1.14], [exhale, 5, .87]],
    instruction: 'Breathe gently, taking the same amount of time to inhale and exhale.' },
  { name: 'Box Breathing', label: 'Four equal phases · 4–4–4–4', category: 'Focus',
    description: 'Inhale, hold, exhale, and hold again for the same amount of time.',
    phases: [[inhale, 4, 1.14], [hold, 4, 1.14], [exhale, 4, .87], [hold, 4, .87]],
    instruction: 'Hold only as long as feels comfortable. If the holds feel strained, try coherent breathing.' },
  { name: 'Extended Exhale', label: 'Gentle pace · 3–5', category: 'Calm',
    description: 'Exhale for longer than you inhale, with no holds between breaths.',
    phases: [[inhale, 3, 1.14], [exhale, 5, .87]],
    instruction: 'Inhale gently and let your exhale last a little longer.' },
  { name: 'Diaphragmatic Breathing', label: 'Belly breathing · 3–4', category: 'Recovery',
    description: 'Focus on the gentle movement of your belly as you breathe.',
    phases: [[inhale, 3, 1.14], [exhale, 4, .87]],
    instruction: 'Relax your shoulders. Let your belly gently rise as you inhale and fall as you exhale.' },
  { name: 'Cyclic Sighing', label: 'Double inhale · 2–1–5', category: 'Calm',
    description: 'Each sigh consists of two gentle inhales and one longer exhale.',
    phases: [[inhale, 2, 1.06], ['Inhale a little more', 1, 1.14], [exhale, 5, .87]],
    instruction: 'After your first inhale, gently breathe in a little more, then exhale slowly.' },
  { name: 'Pursed-Lip Breathing', label: 'Slow exhale · 2–4', category: 'Recovery',
    description: 'Breathing out through gently pursed lips slows the exhale.',
    phases: [[inhale, 2, 1.14], [exhale, 4, .87]],
    instruction: 'Inhale through your nose. Exhale slowly through gently pursed lips.' },
  { name: '4–7–8 Breathing', label: 'Breath-hold rhythm · 4–7–8', category: 'Calm', minutes: 1,
    description: 'Inhale for four counts, hold for seven, and exhale for eight.',
    phases: [[inhale, 4, 1.14], [hold, 7, 1.14], [exhale, 8, .87]],
    instruction: 'Inhale gently, hold comfortably, and exhale slowly. Stop if the hold feels too long.' },
  { name: 'Breath Awareness', label: 'Meditation · natural rhythm', category: 'Focus',
    description: 'A meditation that brings your attention back to your natural breath.',
    phases: [['Notice your breath', 60, 1]],
    instruction: 'Notice the air moving in and out. If your mind wanders, gently return your attention to your breath.' },
  { name: 'Nadi Shodhana', label: 'Alternate nostril breathing', category: 'Focus', tradition: 'Pranayama',
    description: 'Inhale through one nostril, exhale through the other, then reverse.',
    phases: [['Inhale left', 4, 1.14], ['Exhale right', 4, .87],
      ['Inhale right', 4, 1.14], ['Exhale left', 4, .87]],
    instruction: 'Gently close the opposite nostril. Switch sides as prompted and breathe without pauses.',
    source: 'https://health.clevelandclinic.org/alternate-nostril-breathing' },
  { name: 'Bhramari', label: 'Humming bee breath', category: 'Calm', tradition: 'Pranayama',
    description: 'Make a soft humming sound as you exhale with your mouth closed.',
    phases: [[inhale, 3, 1.14], ['Hum as you exhale', 5, .87]],
    instruction: 'Inhale through your nose, then softly hum “mmm” as you exhale for as long as feels comfortable.',
    source: yogaSource },
  { name: 'Sitali', label: 'Cooling breath', category: 'Pranayama',
    description: 'Inhale through your curled tongue and exhale through your nose.',
    phases: [['Inhale through mouth', 3, 1.14], ['Exhale through nose', 4, .87]],
    instruction: 'If you can comfortably curl your tongue, inhale through it. Relax your tongue as you exhale.',
    source: yogaSource },
  { name: 'Step-Paced Breathing', label: 'Breathing during movement', category: 'Recovery',
    description: 'Match your breathing to your steps as you walk or climb stairs.',
    instruction: 'Match your breathing to a comfortable walking pace. For example, inhale for one step and exhale for two if that feels comfortable.',
    source: movementSource },
  { name: 'Exhale on Effort', label: 'Blow as you go', category: 'Recovery',
    description: 'Breathe out during the hardest part of a movement, such as rising from a chair.',
    instruction: 'Inhale before you move. Gently exhale through the hardest part of the movement.',
    source: movementSource },
  { name: 'Kapalabhati', label: 'Traditional yoga technique', category: 'Advanced', tradition: 'Pranayama',
    description: 'Short, active exhales alternate with passive inhales.',
    instruction: 'Traditionally taught as a yogic cleansing practice. Learn with an experienced yoga instructor because of the sharp exhales and intensity.',
    source: yogaSource },
  { name: 'Tummo', label: 'Tibetan meditation tradition', category: 'Advanced',
    description: 'A Tibetan meditation that combines breath, physical techniques, and visualization.',
    instruction: 'This Tibetan meditation combines breath, physical techniques, and visualization. Learn the intensive technique with an experienced teacher.',
    source: 'https://doi.org/10.1371/journal.pone.0058244' },
  { name: 'Wim Hof Method', label: 'Intensive breathwork', category: 'Advanced',
    description: 'An intensive practice that alternates faster breathing with breath holds.',
    instruction: 'The breathing component involves faster breathing and breath holds. Dizziness or loss of consciousness can occur. Never practice in or near water or while driving.',
    source: 'https://www.wimhofmethod.com/faq' },
];

const byId = id => document.getElementById(id);
const duration = byId('duration');
const toggle = byId('toggle');
const phase = byId('phase');
const clock = byId('clock');
const orb = byId('orb');
const sound = byId('sound');
const cards = byId('cards');
const filters = byId('filters');
let current = practices[0];
let category = 'All';
let state = 'idle';
let elapsed = 0;
let started = 0;
let frame;
let lastPhase = -1;
let audio;
let soundOn = false;

function tone() {
  if (!soundOn || audio?.state !== 'running') return;
  const oscillator = audio.createOscillator();
  const volume = audio.createGain();
  oscillator.frequency.value = 440;
  volume.gain.setValueAtTime(.09, audio.currentTime);
  volume.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .33);
  oscillator.connect(volume).connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + .34);
}

sound.addEventListener('click', async () => {
  try {
    if (!soundOn) {
      audio ??= new AudioContext();
      await audio.resume();
    }
    soundOn = !soundOn;
    sound.setAttribute('aria-pressed', soundOn);
    sound.textContent = soundOn ? 'Sound on' : 'Sound off';
    tone();
  } catch {
    sound.textContent = 'Sound unavailable';
  }
});

function updateClock(seconds) {
  const display = Math.ceil(Math.max(0, seconds));
  const text = [Math.floor(display / 60), display % 60]
    .map(part => String(part).padStart(2, '0')).join(':');
  if (clock.textContent !== text) clock.textContent = text;
}

function reset() {
  cancelAnimationFrame(frame);
  state = 'idle';
  elapsed = 0;
  lastPhase = -1;
  phase.textContent = 'Get ready';
  toggle.textContent = 'Start session';
  duration.disabled = false;
  orb.style.removeProperty('--scale');
  updateClock(sessionLength());
}

function cycleLength() {
  return current.phases.reduce((sum, step) => sum + step[1], 0);
}

function sessionLength(lap = cycleLength()) {
  const target = Number(duration.value) * 60;
  // Choose the closest duration that ends on a full breathing cycle.
  return Math.round(target / lap) * lap;
}

function tick(now) {
  const time = elapsed + (now - started) / 1000;
  const phases = current.phases;
  const lap = cycleLength();
  const end = sessionLength(lap);
  updateClock(end - time);
  if (time >= end) {
    state = 'done';
    duration.disabled = false;
    phase.textContent = 'Session complete';
    toggle.textContent = 'Start again';
    orb.style.removeProperty('--scale');
    tone();
    return;
  }

  let progress = time % lap;
  let index = 0;
  while (progress >= phases[index][1]) {
    progress -= phases[index][1];
    index++;
  }
  const [label, seconds, target] = phases[index];
  const previous = phases.at(index - 1)[2];
  orb.style.setProperty('--scale', previous + (target - previous) * progress / seconds);
  if (index !== lastPhase) {
    phase.textContent = label;
    if (lastPhase !== -1) tone();
    lastPhase = index;
  }
  frame = requestAnimationFrame(tick);
}

function pause() {
  if (state !== 'running') return;
  elapsed += (performance.now() - started) / 1000;
  cancelAnimationFrame(frame);
  state = 'paused';
  phase.textContent = 'Paused';
  toggle.textContent = 'Resume session';
}

toggle.addEventListener('click', () => {
  if (state === 'running') {
    pause();
    return;
  }
  if (state === 'done') reset();
  state = 'running';
  lastPhase = -1;
  started = performance.now();
  duration.disabled = true;
  toggle.textContent = 'Pause';
  tick(started);
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) pause();
});

duration.addEventListener('change', reset);
byId('reset').addEventListener('click', reset);

function showPractice(practice) {
  if (!practice.phases) {
    pause();
    byId('detail-title').textContent = practice.name;
    byId('detail-text').textContent = practice.instruction;
    byId('detail-link').href = practice.source;
    byId('details').showModal();
    return;
  }
  current = practice;
  duration.value = practice.minutes ?? 3;
  byId('selection').textContent = practice.name;
  byId('instruction').textContent = practice.instruction;
  const source = byId('practice-source');
  source.hidden = !practice.source;
  if (practice.source) source.href = practice.source;
  reset();
  for (const card of cards.children) {
    card.dataset.active = card.querySelector('strong').textContent === current.name;
  }
  byId('seansas').scrollIntoView({ block: 'center' });
  toggle.focus({ preventScroll: true });
}

function renderCards() {
  const visible = practices.filter(practice => category === 'All' || practice.category === category ||
    practice.tradition === category);
  cards.replaceChildren(...visible.map(practice => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';
    card.dataset.active = practice === current;
    const tag = document.createElement('small');
    const name = document.createElement('strong');
    const label = document.createElement('span');
    const description = document.createElement('span');
    const action = document.createElement('span');
    tag.textContent = practice.category;
    name.textContent = practice.name;
    label.textContent = practice.label;
    description.textContent = practice.description;
    description.className = 'description';
    action.textContent = practice.phases ? 'Select →' : 'About this practice ↗';
    action.className = 'action';
    card.append(tag, name, label, description, action);
    card.addEventListener('click', () => showPractice(practice));
    return card;
  }));
}

for (const label of ['All', 'Calm', 'Focus', 'Recovery', 'Pranayama', 'Advanced']) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.setAttribute('aria-pressed', label === category);
  button.addEventListener('click', () => {
    category = label;
    for (const filter of filters.children) filter.setAttribute('aria-pressed', filter === button);
    renderCards();
  });
  filters.append(button);
}
byId('instruction').textContent = current.instruction;
renderCards();
reset();
