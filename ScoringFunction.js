// Password Strength Analyzer Scoring Function
// This function evaluates a password's strength based on length, character types, patterns, and dictionary words.
// It returns an object with score, feedback array, and strength level.


function analyzePassword(password)
{
    let score = 0; // Total score starts at 0
    let feedback = []; // Array to hold feedback messages

    // Length checks: Reward longer passwords
    const len = password.length;

    // Return early if input is empty — no feedback until the user starts typing
    if (len === 0) {
        return { score: 0, feedback: [], strength: "" };
    }

    if (len < 8) {
        score += 0;
        feedback.push("❌ Password is too short (less than 8 characters)");
    } else if (len <= 11) {
        score += 10;
        feedback.push("✅ Good length (8-11 characters)");
    } else if (len <= 15) {
        score += 20;
        feedback.push("✅ Great length (12-15 characters)");
    } else {
        score += 25;
        feedback.push("✅ Excellent length (16+ characters)");
    }

    // Character type checks: Reward diversity, but only if password meets minimum length
    // Uses regex to check for presence of lowercase, uppercase, numbers, symbols
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^a-zA-Z\d]/.test(password); // Anything not letter or digit

    if (len >= 8) {
        // Only reward character variety if the password is long enough to matter
        if (hasLower) {
            score += 5;
            feedback.push("✅ Contains lowercase letters");
        } else {
            feedback.push("💡 Try adding lowercase letters");
        }
        if (hasUpper) {
            score += 5;
            feedback.push("✅ Contains uppercase letters");
        } else {
            feedback.push("💡 Try adding uppercase letters");
        }
        if (hasNumber) {
            score += 5;
            feedback.push("✅ Contains numbers");
        } else {
            feedback.push("💡 Try adding numbers");
        }
        if (hasSymbol) {
            score += 10;
            feedback.push("✅ Contains symbols");
        } else {
            feedback.push("💡 Try adding symbols");
        }
    } else {
        // Show what's present and what's missing, just don't award points yet
        if (hasLower) {
            feedback.push("✅ Contains lowercase letters");
        } else {
            feedback.push("💡 Try adding lowercase letters");
        }
        if (hasUpper) {
            feedback.push("✅ Contains uppercase letters");
        } else {
            feedback.push("💡 Try adding uppercase letters");
        }
        if (hasNumber) {
            feedback.push("✅ Contains numbers");
        } else {
            feedback.push("💡 Try adding numbers");
        }
        if (hasSymbol) {
            feedback.push("✅ Contains symbols");
        } else {
            feedback.push("💡 Try adding symbols");
        }
    }

    // Pattern checks: Penalize weak patterns
    // Repeat characters: e.g., "aa" in password
    if (/(.)\1/.test(password)) {
        score -= 5;
        feedback.push("❌ Contains repeated characters");
    }

    // Common sequences: Penalize for each found, up to a cap of -15 total
    const sequences = ['abc', '123', 'qwerty', 'qazwsx', 'asdf', 'zxcvbn', '098', 'mnbvcxz'];
    let sequencePenalty = 0;
    for (let seq of sequences) {
        if (password.toLowerCase().includes(seq)) {
            sequencePenalty += 5;
            feedback.push(`❌ Contains common sequence '${seq}'`);
            if (sequencePenalty >= 15) break; // Cap total sequence penalty at -15
        }
    }
    score -= sequencePenalty;

    // Dictionary words: Penalize for each found, up to a cap of -20 total
    const commonWords = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'password1', 'abc123', 'iloveyou', 'sunshine', 'princess', 'flower', 'superman'];
    let dictPenalty = 0;
    for (let word of commonWords) {
        if (password.toLowerCase().includes(word)) {
            dictPenalty += 10;
            feedback.push(`❌ Contains common word '${word}'`);
            if (dictPenalty >= 20) break; // Cap total dictionary penalty at -20
        }
    }
    score -= dictPenalty;

    // zxcvbn analysis: blend its 0-4 score into our scoring system
    // zxcvbn scores map to point adjustments: 0 = -15, 1 = -5, 2 = 0, 3 = +10, 4 = +20
    const zResult = zxcvbn(password);
    const zScoreMap = [-15, -5, 0, 10, 20];
    score += zScoreMap[zResult.score];

    // Add zxcvbn's warning if it has one (e.g. "This is a top-10 password")
    if (zResult.feedback.warning) {
        feedback.push(`❌ ${zResult.feedback.warning}`);
    }

    // Add zxcvbn's suggestions if it has any, replacing overly personal ones with vaguer alternatives
    const datePattern = /dates|years|associated with you/i;
    zResult.feedback.suggestions.forEach(s => {
        if (datePattern.test(s)) {
            feedback.push("💡 Avoid using predictable numbers or patterns");
        } else {
            feedback.push(`💡 ${s}`);
        }
    });

    // Determine strength based on total score
    let strength;
    if (score <= 24) {
        strength = "Bad";
    } else if (score <= 44) {
        strength = "Okay";
    } else {
        strength = "Great";
    }

    return { score, feedback, strength };
}
