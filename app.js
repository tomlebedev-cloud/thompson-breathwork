const inhale = 'Įkvėpk';
const exhale = 'Iškvėpk';
const hold = 'Sulaikyk';
const practices = [
  { name: 'Tolygus kvėpavimas', label: 'Coherent breathing · 5–5', category: 'Ramybė',
    phases: [[inhale, 5, 1.14], [exhale, 5, .87]],
    instruction: 'Kvėpuok ramiai ir skirk tiek pat laiko įkvėpimui ir iškvėpimui.' },
  { name: 'Kvėpavimas kvadratu', label: 'Box breathing · 4–4–4–4', category: 'Dėmesys',
    phases: [[inhale, 4, 1.14], [hold, 4, 1.14], [exhale, 4, .87], [hold, 4, .87]],
    instruction: 'Laikyk pauzes tik tiek, kiek patogu. Jei jos kelia įtampą, rinkis tolygų kvėpavimą.' },
  { name: 'Ilgesnis iškvėpimas', label: 'Lengvas ritmas · 3–5', category: 'Ramybė',
    phases: [[inhale, 3, 1.14], [exhale, 5, .87]],
    instruction: 'Įkvėpk švelniai ir leisk iškvėpimui užtrukti truputį ilgiau.' },
  { name: 'Diafragminis kvėpavimas', label: 'Belly breathing · 3–4', category: 'Atsigavimas',
    phases: [[inhale, 3, 1.14], [exhale, 4, .87]],
    instruction: 'Atpalaiduok pečius. Įkvepiant leisk pilvui švelniai pakilti, o iškvepiant – nusileisti.' },
  { name: 'Ciklinis atodūsis', label: 'Cyclic sighing · 2–1–5', category: 'Ramybė',
    phases: [[inhale, 2, 1.06], ['Trumpai įkvėpk', 1, 1.14], [exhale, 5, .87]],
    instruction: 'Po pirmo įkvėpimo švelniai įkvėpk dar truputį, tada lėtai iškvėpk.' },
  { name: 'Iškvėpimas pro sučiauptas lūpas', label: 'Pursed-lip breathing · 2–4', category: 'Atsigavimas',
    phases: [[inhale, 2, 1.14], [exhale, 4, .87]],
    instruction: 'Įkvėpk pro nosį. Lėtai iškvėpk pro lengvai sučiauptas lūpas.' },
  { name: 'Kvėpavimas 4–7–8', label: 'Ritmas su pauze · 4–7–8', category: 'Ramybė', minutes: 1,
    phases: [[inhale, 4, 1.14], [hold, 7, 1.14], [exhale, 8, .87]],
    instruction: 'Švelniai įkvėpk, patogiai išlaikyk pauzę ir lėtai iškvėpk. Jei pauzė per ilga, sustok.' },
  { name: 'Kvėpavimo stebėjimas', label: 'Meditacija · natūralus ritmas', category: 'Dėmesys',
    phases: [['Stebėk kvėpavimą', 60, 1]],
    instruction: 'Pastebėk, kaip oras įteka ir išteka. Kai mintys nuklysta, švelniai grįžk prie kvėpavimo.' },
  { name: 'Tummo', label: 'Tibeto meditacijos tradicija', category: 'Pažengusiems',
    instruction: 'Tibeto meditacijos praktika, jungianti kvėpavimą, kūno techniką ir vizualizaciją. Intensyvią techniką mokykis su patyrusiu mokytoju.',
    source: 'https://doi.org/10.1371/journal.pone.0058244' },
  { name: 'Wim Hof metodas', label: 'Intensyvi kvėpavimo praktika', category: 'Pažengusiems',
    instruction: 'Metodo kvėpavimo dalis apima greitesnį kvėpavimą ir sulaikymą. Galimas galvos svaigimas ar sąmonės netekimas. Praktikos nedaryk vandenyje, šalia vandens ar vairuodamas.',
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
let category = 'Visi';
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
    sound.textContent = soundOn ? 'Garsas įjungtas' : 'Garsas išjungtas';
    tone();
  } catch {
    sound.textContent = 'Garsas nepasiekiamas';
  }
});

function updateClock(seconds) {
  const display = Math.ceil(Math.max(0, seconds));
  clock.textContent = [Math.floor(display / 60), display % 60]
    .map(part => String(part).padStart(2, '0')).join(':');
}

function reset() {
  cancelAnimationFrame(frame);
  state = 'idle';
  elapsed = 0;
  lastPhase = -1;
  phase.textContent = 'Pasiruošk';
  toggle.textContent = 'Pradėti seansą';
  duration.disabled = false;
  orb.style.removeProperty('--scale');
  updateClock(Number(duration.value) * 60);
}

function tick(now) {
  const total = Number(duration.value) * 60;
  const time = elapsed + (now - started) / 1000;
  const phases = current.phases;
  const lap = phases.reduce((sum, step) => sum + step[1], 0);
  // Finish each breathing cycle before ending the session.
  const end = Math.ceil(total / lap) * lap;
  updateClock(end - time);
  if (time >= end) {
    state = 'done';
    duration.disabled = false;
    phase.textContent = 'Seansas baigtas';
    toggle.textContent = 'Pradėti iš naujo';
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
  phase.textContent = 'Pauzė';
  toggle.textContent = 'Tęsti seansą';
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
  toggle.textContent = 'Pristabdyti';
  tick(started);
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) pause();
});

duration.addEventListener('change', reset);
byId('reset').addEventListener('click', reset);

function showPractice(practice) {
  if (practice.source) {
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
  reset();
  for (const card of cards.children) {
    card.dataset.active = card.querySelector('strong').textContent === current.name;
  }
  byId('seansas').scrollIntoView({ block: 'center' });
  toggle.focus({ preventScroll: true });
}

function renderCards() {
  const visible = practices.filter(practice => category === 'Visi' || practice.category === category);
  cards.replaceChildren(...visible.map(practice => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';
    card.dataset.active = practice === current;
    const tag = document.createElement('small');
    const name = document.createElement('strong');
    const label = document.createElement('span');
    const action = document.createElement('span');
    tag.textContent = practice.category;
    name.textContent = practice.name;
    label.textContent = practice.label;
    action.textContent = practice.source ? 'Apie praktiką ↗' : 'Pasirinkti →';
    action.className = 'action';
    card.append(tag, name, label, action);
    card.addEventListener('click', () => showPractice(practice));
    return card;
  }));
}

for (const label of ['Visi', 'Ramybė', 'Dėmesys', 'Atsigavimas', 'Pažengusiems']) {
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
