// ===== Verse of the Day =====
const VERSES = [
    { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
    { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to Him, and He will make your paths straight.", ref: "Proverbs 3:5-6" },
    { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
    { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
    { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", ref: "Isaiah 40:31" },
    { text: "Commit to the Lord whatever you do, and He will establish your plans.", ref: "Proverbs 16:3" },
    { text: "And we know that in all things God works for the good of those who love Him, who have been called according to His purpose.", ref: "Romans 8:28" },
    { text: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in His love He will no longer rebuke you, but will rejoice over you with singing.", ref: "Zephaniah 3:17" },
    { text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref: "Philippians 4:6" },
    { text: "The Lord is my light and my salvation — whom shall I fear? The Lord is the stronghold of my life — of whom shall I be afraid?", ref: "Psalm 27:1" },
    { text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", ref: "Colossians 3:23" },
    { text: "Come to me, all you who are weary and burdened, and I will give you rest.", ref: "Matthew 11:28" },
    { text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.", ref: "Proverbs 9:10" },
    { text: "Delight yourself in the Lord, and He will give you the desires of your heart.", ref: "Psalm 37:4" },
    { text: "God is our refuge and strength, an ever-present help in trouble.", ref: "Psalm 46:1" },
    { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
    { text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.", ref: "James 1:5" },
    { text: "No weapon forged against you will prevail, and you will refute every tongue that accuses you.", ref: "Isaiah 54:17" },
    { text: "He gives strength to the weary and increases the power of the weak.", ref: "Isaiah 40:29" },
    { text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.", ref: "Proverbs 18:10" },
    { text: "Cast all your anxiety on Him because He cares for you.", ref: "1 Peter 5:7" },
    { text: "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you.", ref: "Psalm 32:8" },
    { text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.", ref: "2 Timothy 1:7" },
    { text: "The Lord will fight for you; you need only to be still.", ref: "Exodus 14:14" },
    { text: "Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life.", ref: "James 1:12" },
    { text: "Being confident of this, that He who began a good work in you will carry it on to completion until the day of Christ Jesus.", ref: "Philippians 1:6" },
    { text: "The Lord bless you and keep you; the Lord make His face shine on you and be gracious to you.", ref: "Numbers 6:24-25" },
    { text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", ref: "Galatians 5:22-23" },
    { text: "With God all things are possible.", ref: "Matthew 19:26" },
];

function getDailyVerse() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % VERSES.length;
    return VERSES[index];
}

function renderVerse() {
    const verse = getDailyVerse();
    document.getElementById('verseText').textContent = verse.text;
    document.getElementById('verseRef').textContent = '— ' + verse.ref;
}

// ===== SQE 2 Data =====
const SKILLS = [
    'Client Interviewing',
    'Advocacy',
    'Case & Matter Analysis',
    'Legal Research',
    'Legal Writing',
    'Legal Drafting'
];

const PRACTICE_AREAS = [
    'Criminal Litigation',
    'Dispute Resolution',
    'Property Practice',
    'Wills & Probate',
    'Business Organisations'
];

const ACTIVITY_LABELS = {
    reading: 'Reading / Theory',
    practice: 'Practice Questions',
    mock: 'Mock Exam',
    revision: 'Revision',
    roleplay: 'Role-play',
    research: 'Legal Research',
    drafting: 'Drafting Practice'
};

const LEVEL_LABELS = ['Not Started', 'In Progress', 'Confident', 'Mastered'];

// ===== State =====
function loadState() {
    const defaults = { sessions: [], notes: [], matrix: {}, weeklyGoal: 0 };
    try {
        const saved = localStorage.getItem('sqe2-tracker');
        return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch {
        return defaults;
    }
}

let state = loadState();

function saveState() {
    localStorage.setItem('sqe2-tracker', JSON.stringify(state));
}

// ===== Tabs =====
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// ===== Populate Selects =====
function populateSelects() {
    const skillSelects = ['sessionSkill', 'filterSkill', 'noteSkill', 'filterNoteSkill'];
    const areaSelects = ['sessionArea', 'filterArea', 'noteArea', 'filterNoteArea'];

    skillSelects.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const placeholder = el.options[0] ? el.options[0].textContent : 'Select skill...';
        el.length = 0;
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = placeholder;
        el.add(defaultOpt);
        SKILLS.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s;
            opt.textContent = s;
            el.add(opt);
        });
    });

    areaSelects.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const placeholder = el.options[0] ? el.options[0].textContent : 'Select area...';
        el.length = 0;
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = placeholder;
        el.add(defaultOpt);
        PRACTICE_AREAS.forEach(a => {
            const opt = document.createElement('option');
            opt.value = a;
            opt.textContent = a;
            el.add(opt);
        });
    });
}

// ===== Toast =====
function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Dashboard =====
function updateDashboard() {
    const sessions = state.sessions;
    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalHours = (totalMinutes / 60).toFixed(1);

    document.getElementById('totalHours').textContent = totalHours;
    document.getElementById('totalSessions').textContent = sessions.length;

    // Streak
    const streak = calculateStreak(sessions);
    document.getElementById('currentStreak').textContent = streak + (streak === 1 ? ' day' : ' days');

    // Topics covered (cells with level > 0)
    const covered = Object.values(state.matrix).filter(v => v > 0).length;
    document.getElementById('topicsCovered').textContent = `${covered}/30`;

    // Overall progress
    const totalLevel = Object.values(state.matrix).reduce((s, v) => s + v, 0);
    const maxLevel = 30 * 3;
    const pct = Math.round((totalLevel / maxLevel) * 100);
    document.getElementById('overallProgress').style.width = pct + '%';
    document.getElementById('overallProgressText').textContent = pct + '%';

    // Skill progress bars
    const skillBars = document.getElementById('skillProgressBars');
    skillBars.innerHTML = '';
    SKILLS.forEach(skill => {
        const total = PRACTICE_AREAS.reduce((s, area) => {
            const key = `${skill}|${area}`;
            return s + (state.matrix[key] || 0);
        }, 0);
        const max = PRACTICE_AREAS.length * 3;
        const p = Math.round((total / max) * 100);
        skillBars.innerHTML += progressItemHTML(skill, p);
    });

    // Area progress bars
    const areaBars = document.getElementById('areaProgressBars');
    areaBars.innerHTML = '';
    PRACTICE_AREAS.forEach(area => {
        const total = SKILLS.reduce((s, skill) => {
            const key = `${skill}|${area}`;
            return s + (state.matrix[key] || 0);
        }, 0);
        const max = SKILLS.length * 3;
        const p = Math.round((total / max) * 100);
        areaBars.innerHTML += progressItemHTML(area, p);
    });

    // Time by skill breakdown
    const timeBySkill = document.getElementById('timeBySkill');
    const skillMinutes = {};
    SKILLS.forEach(s => { skillMinutes[s] = 0; });
    sessions.forEach(s => { skillMinutes[s.skill] = (skillMinutes[s.skill] || 0) + s.duration; });
    const maxSkillMin = Math.max(...Object.values(skillMinutes), 1);
    timeBySkill.innerHTML = SKILLS.map(skill => {
        const mins = skillMinutes[skill];
        const pct = Math.round((mins / maxSkillMin) * 100);
        const hrs = (mins / 60).toFixed(1);
        return `
            <div class="progress-item">
                <div class="progress-item-header">
                    <span class="progress-item-label">${skill}</span>
                    <span class="progress-item-value">${hrs}h (${mins} min)</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    }).join('');

    // Weekly goal
    updateWeeklyGoal();

    // Recent activity
    const recent = document.getElementById('recentActivity');
    if (sessions.length === 0) {
        recent.innerHTML = '<p class="empty-state">No study sessions yet. Start tracking!</p>';
    } else {
        const last5 = [...sessions].reverse().slice(0, 5);
        recent.innerHTML = last5.map(s => `
            <div class="recent-item">
                <span class="recent-item-text">${skillTag(s.skill)} ${areaTag(s.area)}</span>
                <span class="recent-item-date">${formatDate(s.date)} &middot; ${s.duration}min</span>
            </div>
        `).join('');
    }
}

// ===== Weekly Goal =====
function getWeekStart() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday start
    const monday = new Date(now);
    monday.setDate(diff);
    return monday.toISOString().split('T')[0];
}

function updateWeeklyGoal() {
    const goal = state.weeklyGoal;
    const display = document.getElementById('weeklyGoalDisplay');
    const input = document.getElementById('weeklyGoalInput');

    if (goal > 0) {
        input.value = goal;
        display.style.display = 'block';

        // Calculate minutes studied this week
        const weekStart = getWeekStart();
        const weekMinutes = state.sessions
            .filter(s => s.date >= weekStart)
            .reduce((sum, s) => sum + s.duration, 0);

        const pct = Math.min(Math.round((weekMinutes / goal) * 100), 100);
        document.getElementById('weeklyGoalLabel').textContent = `${weekMinutes} / ${goal} min this week`;
        document.getElementById('weeklyGoalPct').textContent = pct + '%';
        document.getElementById('weeklyGoalBar').style.width = pct + '%';

        const remaining = goal - weekMinutes;
        if (remaining > 0) {
            document.getElementById('weeklyGoalRemaining').textContent = `${remaining} min remaining`;
        } else {
            document.getElementById('weeklyGoalRemaining').textContent = 'Goal reached! Well done!';
        }
    } else {
        display.style.display = 'none';
    }
}

function progressItemHTML(label, pct) {
    return `
        <div class="progress-item">
            <div class="progress-item-header">
                <span class="progress-item-label">${label}</span>
                <span class="progress-item-value">${pct}%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${pct}%"></div>
            </div>
        </div>
    `;
}

function calculateStreak(sessions) {
    if (sessions.length === 0) return 0;
    const dates = [...new Set(sessions.map(s => s.date))].sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (dates[0] !== today && dates[0] !== yesterday) return 0;

    let streak = 1;
    for (let i = 1; i < dates.length; i++) {
        const curr = new Date(dates[i - 1]);
        const prev = new Date(dates[i]);
        const diff = (curr - prev) / 86400000;
        if (diff === 1) streak++;
        else break;
    }
    return streak;
}

function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ===== Matrix =====
function renderMatrix() {
    const table = document.getElementById('matrixTable');
    let html = '<thead><tr><th></th>';
    PRACTICE_AREAS.forEach(a => {
        html += `<th>${a}</th>`;
    });
    html += '</tr></thead><tbody>';

    SKILLS.forEach(skill => {
        html += `<tr><th>${skill}</th>`;
        PRACTICE_AREAS.forEach(area => {
            const key = `${skill}|${area}`;
            const level = state.matrix[key] || 0;
            html += `<td>
                <div class="matrix-cell" data-level="${level}" data-key="${key}" title="${skill} × ${area}: ${LEVEL_LABELS[level]}">
                    ${LEVEL_LABELS[level]}
                </div>
            </td>`;
        });
        html += '</tr>';
    });

    html += '</tbody>';
    table.innerHTML = html;

    // Click handlers
    table.querySelectorAll('.matrix-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            const key = cell.dataset.key;
            const current = state.matrix[key] || 0;
            const next = (current + 1) % 4;
            state.matrix[key] = next;
            saveState();
            cell.dataset.level = next;
            cell.textContent = LEVEL_LABELS[next];
            cell.title = key.replace('|', ' × ') + ': ' + LEVEL_LABELS[next];
            updateDashboard();
        });
    });
}

// ===== Sessions =====
document.getElementById('sessionForm').addEventListener('submit', e => {
    e.preventDefault();
    const session = {
        id: Date.now(),
        date: document.getElementById('sessionDate').value,
        duration: parseInt(document.getElementById('sessionDuration').value),
        skill: document.getElementById('sessionSkill').value,
        area: document.getElementById('sessionArea').value,
        type: document.getElementById('sessionType').value,
        notes: document.getElementById('sessionNotes').value.trim()
    };

    state.sessions.push(session);
    saveState();
    e.target.reset();
    document.getElementById('sessionDate').value = new Date().toISOString().split('T')[0];
    renderSessions();
    updateDashboard();
    showToast('Session logged!');
});

function renderSessions() {
    const filterSkill = document.getElementById('filterSkill').value;
    const filterArea = document.getElementById('filterArea').value;
    const search = document.getElementById('searchSessions').value.toLowerCase();
    const container = document.getElementById('sessionList');

    let filtered = [...state.sessions].reverse();
    if (filterSkill) filtered = filtered.filter(s => s.skill === filterSkill);
    if (filterArea) filtered = filtered.filter(s => s.area === filterArea);
    if (search) filtered = filtered.filter(s =>
        s.skill.toLowerCase().includes(search) ||
        s.area.toLowerCase().includes(search) ||
        (s.notes && s.notes.toLowerCase().includes(search)) ||
        (ACTIVITY_LABELS[s.type] || s.type).toLowerCase().includes(search)
    );

    // Show/hide Clear All button
    const clearWrapper = document.getElementById('clearAllWrapper');
    clearWrapper.style.display = state.sessions.length > 0 ? 'block' : 'none';

    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-state">No sessions found.</p>';
        return;
    }

    container.innerHTML = filtered.map(s => `
        <div class="session-item" data-id="${s.id}">
            <div class="session-item-summary" onclick="toggleSession(this)">
                <div class="session-item-summary-left">
                    ${skillTag(s.skill)}
                    ${areaTag(s.area)}
                </div>
                <div class="session-item-summary-right">
                    <span class="meta-tag duration">${s.duration} min</span>
                    <span class="session-date">${formatDate(s.date)}</span>
                    <span class="expand-icon">&#9654;</span>
                </div>
            </div>
            <div class="session-item-details">
                <div class="session-item-meta" style="margin:10px 0">
                    <span class="meta-tag type">${ACTIVITY_LABELS[s.type] || s.type}</span>
                </div>
                ${s.notes ? `<div class="session-item-notes">${escapeHTML(s.notes)}</div>` : ''}
                <div style="margin-top:10px;text-align:right">
                    <button class="btn btn-danger" onclick="deleteSession(${s.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.toggleSession = function(el) {
    el.closest('.session-item').classList.toggle('expanded');
};

window.deleteSession = function(id) {
    state.sessions = state.sessions.filter(s => s.id !== id);
    saveState();
    renderSessions();
    updateDashboard();
    showToast('Session deleted');
};

document.getElementById('filterSkill').addEventListener('change', renderSessions);
document.getElementById('filterArea').addEventListener('change', renderSessions);
document.getElementById('searchSessions').addEventListener('input', renderSessions);

// Clear All Sessions
document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete ALL study sessions? This cannot be undone.')) {
        state.sessions = [];
        saveState();
        renderSessions();
        updateDashboard();
        showToast('All sessions cleared');
    }
});

// Weekly Goal
document.getElementById('setGoalBtn').addEventListener('click', () => {
    const input = document.getElementById('weeklyGoalInput');
    const val = parseInt(input.value);
    if (!val || val < 1) {
        showToast('Enter a valid goal in minutes');
        return;
    }
    state.weeklyGoal = val;
    saveState();
    updateWeeklyGoal();
    showToast('Weekly goal set to ' + val + ' minutes');
});

// ===== Notes =====
document.getElementById('noteForm').addEventListener('submit', e => {
    e.preventDefault();
    const note = {
        id: Date.now(),
        skill: document.getElementById('noteSkill').value,
        area: document.getElementById('noteArea').value,
        title: document.getElementById('noteTitle').value.trim(),
        content: document.getElementById('noteContent').value.trim(),
        date: new Date().toISOString().split('T')[0]
    };

    state.notes.push(note);
    saveState();
    e.target.reset();
    renderNotes();
    showToast('Note saved!');
});

function renderNotes() {
    const filterSkill = document.getElementById('filterNoteSkill').value;
    const filterArea = document.getElementById('filterNoteArea').value;
    const search = document.getElementById('searchNotes').value.toLowerCase();
    const container = document.getElementById('notesList');

    let filtered = [...state.notes].reverse();
    if (filterSkill) filtered = filtered.filter(n => n.skill === filterSkill);
    if (filterArea) filtered = filtered.filter(n => n.area === filterArea);
    if (search) filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(search) || n.content.toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-state">No notes found.</p>';
        return;
    }

    container.innerHTML = filtered.map(n => `
        <div class="note-item" data-id="${n.id}">
            <div class="note-item-summary" onclick="toggleNote(this)">
                <div class="session-item-summary-left">
                    <span class="note-item-title">${escapeHTML(n.title)}</span>
                    ${n.skill ? skillTag(n.skill) : ''}
                    ${n.area ? areaTag(n.area) : ''}
                </div>
                <div class="session-item-summary-right">
                    <span class="note-date">${formatDate(n.date)}</span>
                    <span class="expand-icon">&#9654;</span>
                </div>
            </div>
            <div class="note-item-details">
                <div class="note-item-content">${escapeHTML(n.content)}</div>
                <div style="margin-top:10px;text-align:right">
                    <button class="btn btn-danger" onclick="deleteNote(${n.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.toggleNote = function(el) {
    el.closest('.note-item').classList.toggle('expanded');
};

window.deleteNote = function(id) {
    state.notes = state.notes.filter(n => n.id !== id);
    saveState();
    renderNotes();
    showToast('Note deleted');
};

document.getElementById('filterNoteSkill').addEventListener('change', renderNotes);
document.getElementById('filterNoteArea').addEventListener('change', renderNotes);
document.getElementById('searchNotes').addEventListener('input', renderNotes);

// ===== Helpers =====
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Convert name to CSS class slug (e.g. "Client Interviewing" -> "client-interviewing")
function toSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Generate a skill meta tag with color class
function skillTag(name) {
    return `<span class="meta-tag skill-${toSlug(name)}">${name}</span>`;
}

// Generate an area meta tag with color class
function areaTag(name) {
    return `<span class="meta-tag area-${toSlug(name)}">${name}</span>`;
}

// ===== Init =====
function init() {
    renderVerse();
    populateSelects();
    document.getElementById('sessionDate').value = new Date().toISOString().split('T')[0];
    renderMatrix();
    renderSessions();
    renderNotes();
    updateDashboard();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
