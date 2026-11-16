const inhale = 'Įkvėpk';
const exhale = 'Iškvėpk';
const hold = 'Sulaikyk';
const yogaSource = 'https://yoga.ayush.gov.in/YAP/PDF/Common%20Yoga%20Protocol%20Book-English.pdf';
const movementSource = 'https://www.asthmaandlung.org.uk/living-with/keeping-active/keep-active-programme/managing-breathlessness';
const practices = [
  { name: 'Tolygus kvėpavimas', label: 'Coherent breathing · 5–5', category: 'Ramybė',
    description: 'Vienodos trukmės įkvėpimas ir iškvėpimas sudaro lėtą, pastovų ritmą.',
    phases: [[inhale, 5, 1.14], [exhale, 5, .87]],
    instruction: 'Kvėpuok ramiai ir skirk tiek pat laiko įkvėpimui ir iškvėpimui.' },
  { name: 'Kvėpavimas kvadratu', label: 'Box breathing · 4–4–4–4', category: 'Dėmesys',
    description: 'Įkvėpimas, pauzė, iškvėpimas ir dar viena pauzė trunka vienodai.',
    phases: [[inhale, 4, 1.14], [hold, 4, 1.14], [exhale, 4, .87], [hold, 4, .87]],
    instruction: 'Laikyk pauzes tik tiek, kiek patogu. Jei jos kelia įtampą, rinkis tolygų kvėpavimą.' },
  { name: 'Ilgesnis iškvėpimas', label: 'Lengvas ritmas · 3–5', category: 'Ramybė',
    description: 'Iškvėpimui skiriama daugiau laiko, o tarp fazių kvėpavimas nesulaikomas.',
    phases: [[inhale, 3, 1.14], [exhale, 5, .87]],
    instruction: 'Įkvėpk švelniai ir leisk iškvėpimui užtrukti truputį ilgiau.' },
  { name: 'Diafragminis kvėpavimas', label: 'Belly breathing · 3–4', category: 'Atsigavimas',
    description: 'Dėmesys skiriamas švelniam pilvo judesiui kvėpuojant.',
    phases: [[inhale, 3, 1.14], [exhale, 4, .87]],
    instruction: 'Atpalaiduok pečius. Įkvepiant leisk pilvui švelniai pakilti, o iškvepiant – nusileisti.' },
  { name: 'Ciklinis atodūsis', label: 'Cyclic sighing · 2–1–5', category: 'Ramybė',
    description: 'Vieną atodūsį sudaro du švelnūs įkvėpimai ir vienas ilgesnis iškvėpimas.',
    phases: [[inhale, 2, 1.06], ['Trumpai įkvėpk', 1, 1.14], [exhale, 5, .87]],
    instruction: 'Po pirmo įkvėpimo švelniai įkvėpk dar truputį, tada lėtai iškvėpk.' },
  { name: 'Iškvėpimas pro sučiauptas lūpas', label: 'Pursed-lip breathing · 2–4', category: 'Atsigavimas',
    description: 'Lengvai sučiauptos lūpos padeda iškvėpti lėčiau.',
    phases: [[inhale, 2, 1.14], [exhale, 4, .87]],
    instruction: 'Įkvėpk pro nosį. Lėtai iškvėpk pro lengvai sučiauptas lūpas.' },
  { name: 'Kvėpavimas 4–7–8', label: 'Ritmas su pauze · 4–7–8', category: 'Ramybė', minutes: 1,
    description: 'Skaičiuojama iki keturių įkvepiant, iki septynių per pauzę ir iki aštuonių iškvepiant.',
    phases: [[inhale, 4, 1.14], [hold, 7, 1.14], [exhale, 8, .87]],
    instruction: 'Švelniai įkvėpk, patogiai išlaikyk pauzę ir lėtai iškvėpk. Jei pauzė per ilga, sustok.' },
  { name: 'Kvėpavimo stebėjimas', label: 'Meditacija · natūralus ritmas', category: 'Dėmesys',
    description: 'Meditacija, kurios metu pastebi natūralų kvėpavimą ir prie jo grąžini dėmesį.',
    phases: [['Stebėk kvėpavimą', 60, 1]],
    instruction: 'Pastebėk, kaip oras įteka ir išteka. Kai mintys nuklysta, švelniai grįžk prie kvėpavimo.' },
  { name: 'Nadi Shodhana', label: 'Pakaitinis kvėpavimas pro šnerves', category: 'Dėmesys', tradition: 'Pranajama',
    description: 'Įkvepiama per vieną šnervę, iškvepiama per kitą, tada kryptis apsukama.',
    phases: [['Įkvėpk kaire', 4, 1.14], ['Iškvėpk dešine', 4, .87],
      ['Įkvėpk dešine', 4, 1.14], ['Iškvėpk kaire', 4, .87]],
    instruction: 'Švelniai pridengk kitą šnervę. Keisk pusę pagal užrašą ir kvėpuok be pauzių.',
    source: 'https://health.clevelandclinic.org/alternate-nostril-breathing' },
  { name: 'Bhramari', label: 'Bitės dūzgimas', category: 'Ramybė', tradition: 'Pranajama',
    description: 'Iškvepiant užčiaupus burną tyliai dūzgiama.',
    phases: [[inhale, 3, 1.14], ['Iškvėpk dūgzdamas', 5, .87]],
    instruction: 'Įkvėpk pro nosį. Iškvėpdamas tyliai tęsk garsą „mmm“, kol patogu.',
    source: yogaSource },
  { name: 'Sitali', label: 'Vėsinantis kvėpavimas', category: 'Pranajama',
    description: 'Įkvepiama pro į vamzdelį susuktą liežuvį, o iškvepiama pro nosį.',
    phases: [['Įkvėpk pro burną', 3, 1.14], ['Iškvėpk pro nosį', 4, .87]],
    instruction: 'Jei gali patogiai susukti liežuvį, įkvėpk pro jį. Iškvėpdamas atpalaiduok liežuvį.',
    source: yogaSource },
  { name: 'Kvėpavimas pagal žingsnius', label: 'Ritmas judant', category: 'Atsigavimas',
    description: 'Kvėpavimas derinamas prie žingsnių einant ar lipant laiptais.',
    instruction: 'Derink kvėpavimą su patogiu ėjimo tempu. Pavyzdžiui, įkvėpk per vieną žingsnį ir iškvėpk per du, jei taip kvėpuoti patogu.',
    source: movementSource },
  { name: 'Iškvėpimas per pastangą', label: 'Blow as you go', category: 'Atsigavimas',
    description: 'Iškvepiama per sunkiausią judesio dalį, pavyzdžiui, stojantis nuo kėdės.',
    instruction: 'Įkvėpk prieš pradėdamas judesį. Atlikdamas sunkiausią jo dalį švelniai iškvėpk.',
    source: movementSource },
  { name: 'Kapalabhati', label: 'Tradicinė jogos technika', category: 'Pažengusiems', tradition: 'Pranajama',
    description: 'Aktyvūs, trumpi iškvėpimai kaitaliojami su savaiminiais įkvėpimais.',
    instruction: 'Technika dažnai mokoma kaip jogos valomoji praktika. Dėl staigių iškvėpimų ir intensyvumo ją mokykis su patyrusiu jogos instruktoriumi.',
    source: yogaSource },
  { name: 'Tummo', label: 'Tibeto meditacijos tradicija', category: 'Pažengusiems',
    description: 'Tibeto meditacijoje kvėpavimas derinamas su kūno technika ir vizualizacija.',
    instruction: 'Tibeto meditacijos praktika, jungianti kvėpavimą, kūno techniką ir vizualizaciją. Intensyvią techniką mokykis su patyrusiu mokytoju.',
    source: 'https://doi.org/10.1371/journal.pone.0058244' },
  { name: 'Wim Hof metodas', label: 'Intensyvi kvėpavimo praktika', category: 'Pažengusiems',
    description: 'Intensyvi praktika, kurioje greitesnis kvėpavimas kaitaliojamas su sulaikymu.',
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
  const text = [Math.floor(display / 60), display % 60]
    .map(part => String(part).padStart(2, '0')).join(':');
  if (clock.textContent !== text) clock.textContent = text;
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
  const visible = practices.filter(practice => category === 'Visi' || practice.category === category ||
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
    action.textContent = practice.phases ? 'Pasirinkti →' : 'Apie praktiką ↗';
    action.className = 'action';
    card.append(tag, name, label, description, action);
    card.addEventListener('click', () => showPractice(practice));
    return card;
  }));
}

for (const label of ['Visi', 'Ramybė', 'Dėmesys', 'Atsigavimas', 'Pranajama', 'Pažengusiems']) {
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
