export const hinglishQuotes = [
  {
    text: "Aaj ka hard work, kal ka success hai bhai!",
    author: "Legend"
  },
  {
    text: "Ek ek alag problem ko solve kar, zindagi bahar jaa jaati hai.",
    author: "Wisdom"
  },
  {
    text: "Jab tak tumhare tasks complete nahi honge, tab tak peace nahi milega.",
    author: "Truth"
  },
  {
    text: "Chhoti chhoti wins se hi bada success banana start hota hai.",
    author: "Builder"
  },
  {
    text: "Todo list maintain karoge toh chaos nahi hoga.",
    author: "Experience"
  },
  {
    text: "Aaj jo kroge aaj, kal wo regret nahi hoga.",
    author: "Smart Person"
  },
  {
    text: "Progress beats perfection, bas aage badhte raho.",
    author: "Reality"
  },
  {
    text: "Completed tasks ki high se acha kuch nahi.",
    author: "Satisfaction"
  },
  {
    text: "Aaj ke 10 tasks > kal ke 100 dreams.",
    author: "Action King"
  },
  {
    text: "Discipline hi ek maatra practice hai jisse sab kuch hota hai.",
    author: "Master"
  },
  {
    text: "Har task completion ek victory hai, celebrate karo!",
    author: "Winner"
  },
  {
    text: "Momentum banaao, consistency rakho, success pakka hai.",
    author: "Expert"
  },
  {
    text: "Small steps hote hain toh bade mountains bhi climb ho jaate hain.",
    author: "Climber"
  },
  {
    text: "Todo list tere bhishti ka map hai, follow karo.",
    author: "Guide"
  },
  {
    text: "Jab tak fail nahi hoge, jab tak try karo ge, tum fail hi nahi sakte.",
    author: "Fighter"
  }
];

export const getDailyQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return hinglishQuotes[dayOfYear % hinglishQuotes.length];
};
