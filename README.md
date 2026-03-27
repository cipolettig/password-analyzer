# Password Strength Analyzer

A simple web-based password strength analyzer built with HTML, CSS, and JavaScript. Provides real-time feedback on password strength based on character types, patterns, and common dictionary words.

## Live Demo

Hosted on GitHub Pages: https://cipolettig.github.io/password-analyzer/

## Features

- **Real-time Analysis**: Updates strength and feedback as you type.
- **Scoring System**: Based on length, character diversity, and penalties for weak patterns.
- **Privacy-Focused**: All processing happens in the browser; no data is sent or stored.
- **Responsive Design**: Works on different screen sizes.
- **Hold-to-Reveal**: Click and hold the eye icon to temporarily view your password.

## Scoring Rules

- **Spaces**: Not allowed or counted — the input blocks them entirely.

- **Length** (spaces excluded):
  - <8 characters: 0 points
  - 8-11 characters: +10 points
  - 12-15 characters: +20 points
  - 16+ characters: +25 points

- **Character Types** (only awarded if password is 8+ characters):
  - Lowercase: +5
  - Uppercase: +5
  - Numbers: +5
  - Symbols: +10

- **Penalties**:
  - Repeated characters: -5
  - Common sequences (e.g., abc, 123, qwerty): -5 each, capped at -15 total
  - Dictionary words: -10 each, capped at -20 total
  - zxcvbn score blended in: 0 = -15, 1 = -5, 2 = 0, 3 = +10, 4 = +20

- **Strength Thresholds**:
  - 0-24: Bad
  - 25-44: Okay
  - 45+: Great

## Files

- `index.html`: The main HTML page.
- `PasswordAnalyzer.css`: Styles for the page.
- `ScoringFunction.js`: Contains the `analyzePassword` function that calculates score and feedback.
- `Interactions.js`: Handles user input events and updates the UI.

## How to Run

### Locally
1. Download or clone the repository.
2. Open `index.html` in a web browser.
3. Type a password in the input field.
4. See the strength label and feedback list update in real-time.

### Hosted
Visit the live demo link (https://cipolettig.github.io/password-analyzer/). No installation needed.

## Miscellaneous Notes

Inspired by the University of Illinois Password Meter (https://www.uic.edu/apps/strong-password/) and the zxcvbn library (loaded via CDN).

AI was used to develop bits and pieces of code, not entire pages. This was mostly done for algorithms that I had conceptual ideas for but no clue how to create them, and Stack Overflow could not provide applicable or related advice. E.g. I had no idea how to script the algorithm involving regex and penalizing/rewarding certain characters, nor how to add the zxcvbn library.

## Patch Notes

### v1.4
- Spaces are now blocked from being typed into the input entirely
- ScoringFunction also strips any spaces before analysis as a safeguard
- Scoring rules updated to reflect that length is measured without spaces

### v1.3
- Redesigned UI: warm light gray background, card layout, DM Sans + DM Mono fonts
- Feedback items now color-coded with green/red/amber pill styling instead of emojis
- Added animated strength progress bar
- Added hold-to-reveal eye icon button on the password input
- Hosted on GitHub Pages
- Renamed `PasswordAnalyzer.html` to `index.html` for GitHub Pages compatibility

### v1.2
- Added zxcvbn library via CDN for deeper password analysis (detects l33t speak, common names, dates, patterns, etc.)
- zxcvbn's 0-4 score is now blended into the overall score as a point adjustment
- Replaced overly personal zxcvbn date suggestion with a vaguer "Avoid using predictable numbers or patterns"
- Fixed feedback showing on empty input — no feedback is displayed until the user starts typing
- Fixed short passwords only showing positive feedback — missing character types now show tip messages regardless of length

### v1.1
- Softened penalties: repeated chars -10 → -5, sequences -10 → -5 each (capped at -15), dictionary words -20 → -10 each (capped at -20)
- Character type bonuses now only apply if password is 8+ characters
- Multiple sequence and dictionary word penalties now stack (up to their caps) instead of only penalizing once
- Raised strength thresholds: Bad 0-24, Okay 25-44, Great 45+
- Replaced point numbers in feedback with icons

### v1.0
- Basic scoring system with length, character type, sequence, and dictionary checks
- Real-time feedback via input event listener
- Barebones HTML and CSS created to start creation of score algorithm
- Barebones interactions coded
