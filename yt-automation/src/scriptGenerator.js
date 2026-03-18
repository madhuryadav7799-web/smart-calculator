/**
 * Script Generator - Creates engaging tech stories in Hinglish
 * Mix of Hindi + English for tech-savvy Indian audience
 */

const fs = require('fs');
const path = require('path');
const config = require('../config/config');

// Hinglish tech story templates
const scriptTemplates = {
  'tech-innovation': [
    {
      title: 'AI ke Aasman Mein Neya Sitara',
      script: `Namaste friends! 🌟
      
Tum jaante ho na, artificial intelligence ab sirf sci-fi nahi hai.
Yeh humara daily life ka part ban gaya hai.

ChatGPT se lekar quantum computers tak, 
technology humari duniya ko completely change kar rahi hai.

Aaj jab hum kuch bhi search karte hain, 
AI hume exact answers dedeta hai milliseconds mein.

Lekin yeh journey shuru hua tha sirf basic algorithms se.
Ab hum GPT-4, Claude, aur Gemini use kar rahe hain.

Imagine karo: ek machine jo samajh sakta hai emotions,
Context catch kar sakta hai, aur responsive bana sakta hai.

Yeh na sirf code ka play hai, yeh intelligence ka revolution hai!

Toh aaj kalp maanate hain:
Technology humein forward le jahi hai.
Innovation mein India bhi back nahi hai!

Like karo, Subscribe karo, aur future banao!`
    },
    {
      title: 'Quantum Computing - Bhavishya Aaj',
      script: `Arre bhai, kya tum jaante ho Quantum Computing ke baare mein? 🚀

Normal computers 0 aur 1 se kaam karte hain.
Lekin quantum computers? Yeh kuch aur hi level pe hain!

Quantum bits, yaani qubits, ek saath 0 aur 1 dono ho sakta hai.
Isse calculations exponentially faster ban jati hain.

Google ne 2019 mein kaha tha "quantum supremacy" achieve kar diya.
Ab IBM, Microsoft, aur Amazon sab race mein hain.

India mein bhi IIT-Madras aur ISRO quantum research pe kaam kar rahe hain.

Toh imagine karo:
Jab quantum computers mainstream hoge,
Medicines develop hone mein months nahi, days lagenge!
Weather prediction 100% accurate hoga!
Encryption unbreakable hoga!

Yeh future hai jo ab aa raha hai.
Toh stay curious, stay updated!

Like, comment, subscribe - aur isko apne friends ko batao!`
    }
  ],

  'startup-wisdom': [
    {
      title: 'Dream Se Reality Tak',
      script: `Namaste dreamers! 💡

Tum jab koi startup idea sochte ho, pehli sochta ho ki "yeh mumkin hai?"
Lekin sab impossible ideas se hi start hote hain.

Paytm ek idea tha Vijay Shekhar ka.
OYO ek vision tha Ritesh Aggarwal ka.
Instagram Kevin Systrom ka passion tha.

Kya common tha sabmein?
Failure se dar nahi tha.
Feedback sun ne ka courage tha.

Pehla product kabhi perfect nahi hota.
Lekin iterate karte rahe, samajhte rahe, improve karte rahe.

Toh startup journey mein:
1. Idea ko validate karo
2. Fail hone se fear nikalo
3. Customer feedback suno
4. Pivot karo agar zaruri ho
5. Hustle karo, lekin smart tarike se

Kya tum apna startup shuru karna chahte ho?
Haan? Toh phir aaj se plan banao!

Subscribe karo aur motivation pao har din!`
    }
  ],

  'coding-tricks': [
    {
      title: 'JavaScript Superpowers',
      script: `Hey coders! 👨‍💻

JavaScript mein ek trick hai jo 90% developers nahi jaante!
Destructuring. Haan, destructuring!

Purana tarika:
const obj = { name: 'Abhishek', skill: 'coding' };
const name = obj.name;
const skill = obj.skill;

Naya tarika (destructuring):
const { name, skill } = obj;

Ek line mein sab extract!

Arrays ke liye bhi:
const [first, second, ...rest] = [1, 2, 3, 4, 5];

Spread operator se arrays merge:
const merged = [...arr1, ...arr2];

Object merging:
const newObj = { ...obj1, ...obj2 };

Isse code cleaner hota hai,
Readable hota hai,
Performance bhi better hota hai!

Toh yaad rakho ye tricks.
Apne projects mein implement karo.
Code likhne mein master ban jao!

Like if helpful, subscribe for more!`
    }
  ],

  'ai-insights': [
    {
      title: 'LLMs Kya Hote Hain Really?',
      script: `Yo friends! 🤖

Large Language Model - ek fancy naam hai ek simple concept ka.

LLM basically ek neural network hai jo:
Shodh karte hain patterns in text.
Jaante hain ki kaun sa word ke baad kaun sa word aata hai.
Isse predictive text generate karte hain.

Transformer architecture ne yeh possible banaya.
Attention mechanism se model samajhta hai context.

ChatGPT ka secret kya tha?
Reinforcement Learning from Human Feedback!

Training ke baad:
Humans ne model ko rate kiya - "yeh response sahi hai" ya "galat hai"
Model ne learn kiya yeh preferences se.

Toh LLM = Text pattern recognition + Context understanding + Preference learning

Lekin LLM ke limitations bhi hain:
- Hallucinate kar sakte hain (galat info dena)
- Reasoning weak hai abhi
- Real-time data nahi hota
- Bias reflect kar sakte hain training data se

Toh use karo LLMs smartly!
Writing, coding, brainstorming ke liye.
Critical decisions ke liye blind trust mat karo.

Like if you learned something, subscribe!`
    }
  ]
};

/**
 * Generate a random tech story script in Hinglish
 */
const generateScript = () => {
  const themes = Object.keys(scriptTemplates);
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const templates = scriptTemplates[randomTheme];
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

  return {
    theme: randomTheme,
    title: randomTemplate.title,
    content: randomTemplate.script,
    language: 'hinglish',
    estimatedDuration: calculateDuration(randomTemplate.script),
    timestamp: new Date().toISOString(),
  };
};

/**
 * Calculate approximate duration based on speech rate
 * Average speech rate: 150 words per minute
 */
const calculateDuration = (text) => {
  const words = text.split(/\s+/).length;
  const duration = (words / 150) * 60; // in seconds
  return Math.min(Math.max(duration, 25), 35); // Cap between 25-35 seconds
};

/**
 * Save script to file
 */
const saveScript = (script) => {
  const filename = `script_${Date.now()}.json`;
  const filepath = path.join(config.paths.media, filename);

  fs.writeFileSync(filepath, JSON.stringify(script, null, 2));
  console.log(`✅ Script saved: ${filepath}`);

  return filepath;
};

/**
 * Get all available scripts (for testing)
 */
const getAllScripts = () => {
  const allScripts = [];
  for (const theme in scriptTemplates) {
    scriptTemplates[theme].forEach(template => {
      allScripts.push({
        theme,
        title: template.title,
      });
    });
  }
  return allScripts;
};

module.exports = {
  generateScript,
  saveScript,
  getAllScripts,
  calculateDuration,
  scriptTemplates,
};
