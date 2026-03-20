## Password Strength Analyzer

This is a simple web-based password strength analyzer built with HTML, CSS, and JavaScript. It provides real-time feedback on password strength based on character types, patterns, and common dictionary words.

## Features

- **Real-time Analysis**: Updates strength and feedback as you type.
- **Scoring System**: Based on length, character diversity, and penalties for weak patterns.
- **Privacy-Focused**: All processing happens in the browser; no data is sent or stored.
- **Responsive Design**: Works on different screen sizes.

## Scoring Rules

- **Length**:
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

- `PasswordAnalyzer.html`: The main HTML page.
- `PasswordAnalyzer.css`: Styles for the page.
- `ScoringFunction.js`: Contains the `analyzePassword` function that calculates score and feedback.
- `Interactions.js`: Handles user input events and updates the UI.

## How to Run

1. Open `PasswordAnalyzer.html` in a web browser.
2. Type a password in the input field.
3. See the strength label and feedback list update in real-time.

For hosting online, you can use Node.js with Express or Apache Tomcat.

## Miscellaneous Notes

Inspired by the University of Illinois Password Meter (https://www.uic.edu/apps/strong-password/) and the zxcvbn library.

AI was used to develop bits and pieces of code, not entire pages. This was mostly done for algorithms that I had conceptual ideas for but no clue how to create them, and stack overflow could not provide applicable or related advice. E.g. I had no idea how to script the algorithm involving regex and penalizing/rewarding certain characters, nor how to add the zxcvbn library.


## Patch Notes

### v1.2 
- Added zxcvbn library via CDN for deeper password analysis (detects l33t speak, common names, dates, patterns, etc.)
- zxcvbn's 0-4 score is now blended into the overall score as a point adjustment
- Replaced overly personal zxcvbn date suggestion with a vaguer "Avoid using predictable numbers or patterns"
- Fixed feedback showing on empty input — no feedback is displayed until the user starts typing
- Fixed short passwords only showing positive feedback — missing character types now show 💡 tip messages regardless of length

### v1.1 
- Softened penalties: repeated chars -10 → -5, sequences -10 → -5 each (capped at -15), dictionary words -20 → -10 each (capped at -20)
- Character type bonuses now only apply if password is 8+ characters
- Multiple sequence and dictionary word penalties now stack (up to their caps) instead of only penalizing once
- Raised strength thresholds: Bad 0-24, Okay 25-44, Great 45+
- Replaced point numbers in feedback with ✅ / ❌ / 💡 icons

### v1.0 
- Basic scoring system with length, character type, sequence, and dictionary checks
- Real-time feedback via input event listener
- Barebones HTML and CSS created to start creation of score algorithm
- Barebones interactions coded

## TO DO LIST:

- after function is completed, finish css/html and make page look more intriguing and interactive
