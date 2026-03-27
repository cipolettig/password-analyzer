// Main JavaScript file for Password Analyzer
// Handles user interactions and updates the UI based on password analysis.

const passwordInput   = document.getElementById('passwordInput');
const strengthLabel   = document.getElementById('strengthLabel');
const feedbackList    = document.getElementById('feedbackList');
const strengthBarFill = document.getElementById('strengthBarFill');
const feedbackHeading = document.getElementById('feedbackHeading');

// Strip leading emoji/icon characters (✅ ❌ 💡 etc.)
function stripEmoji(text) {
    return text.replace(/^[\u{1F300}-\u{1FAFF}\u2600-\u27BF\u{1F000}-\u{1F9FF}✅❌💡⚠️]+\s*/u, '').trim();
}

// Classify feedback message into positive / negative / tip
function classifyFeedback(text) {
    if (text.startsWith('✅')) return 'positive';
    if (text.startsWith('❌')) return 'negative';
    return 'tip'; // 💡 and anything else
}

// Map strength string to bar width %
const barWidths = { bad: '28%', okay: '62%', great: '100%' };
const barColors = { bad: '#d94f3d', okay: '#e0a020', great: '#3a9e68' };

// Block spaces from being entered in the input
passwordInput.addEventListener('keydown', (e) => {
    if (e.key === ' ') e.preventDefault();
});

// Hold-to-reveal password button
const revealBtn = document.getElementById('revealBtn');

function showPassword() {
    passwordInput.type = 'text';
    revealBtn.classList.add('active');
}

function hidePassword() {
    passwordInput.type = 'password';
    revealBtn.classList.remove('active');
}

revealBtn.addEventListener('mousedown', showPassword);
revealBtn.addEventListener('touchstart', (e) => { e.preventDefault(); showPassword(); });
document.addEventListener('mouseup', hidePassword);
document.addEventListener('touchend', hidePassword);

// Prevent the button from stealing focus from the input
revealBtn.addEventListener('mousedown', (e) => e.preventDefault());

passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    const result = analyzePassword(val);

    if (val.length === 0) {
        strengthLabel.textContent = '';
        strengthLabel.className = '';
        feedbackList.innerHTML = '';
        feedbackHeading.style.display = 'none';
        strengthBarFill.style.width = '0%';
        return;
    }

    // Strength label
    strengthLabel.textContent = `Strength: ${result.strength}`;
    strengthLabel.className = result.strength.toLowerCase();

    // Strength bar
    const key = result.strength.toLowerCase();
    strengthBarFill.style.width = barWidths[key] || '0%';
    strengthBarFill.style.backgroundColor = barColors[key] || '#ccc';

    // Feedback heading
    feedbackHeading.style.display = 'block';

    // Feedback list
    feedbackList.innerHTML = '';
    result.feedback.forEach(f => {
        const type = classifyFeedback(f);
        const li = document.createElement('li');
        li.className = type;
        li.textContent = stripEmoji(f);
        feedbackList.appendChild(li);
    });
});
