// app/api/quotes/route.ts

const quotes = [
  {
    q: "Success is the sum of small efforts repeated day in and day out.",
    a: "Robert Collier",
  },
  {
    q: "The secret of getting ahead is getting started.",
    a: "Mark Twain",
  },
  {
    q: "Discipline is choosing between what you want now and what you want most.",
    a: "Abraham Lincoln",
  },
  {
    q: "Small progress is still progress.",
    a: "Unknown",
  },
  {
    q: "Focus on being productive instead of busy.",
    a: "Tim Ferriss",
  },
  {
    q: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
    a: "Stephen King",
  },
  {
    q: "It is not that I am so smart, it is just that I stay with problems longer.",
    a: "Albert Einstein",
  },
  {
    q: "You do not rise to the level of your goals. You fall to the level of your systems.",
    a: "James Clear",
  },
  {
    q: "The best way to predict the future is to create it.",
    a: "Peter Drucker",
  },
  {
    q: "Great things are done by a series of small things brought together.",
    a: "Vincent Van Gogh",
  },
  {
    q: "Done is better than perfect.",
    a: "Sheryl Sandberg",
  },
  {
    q: "If you spend too much time thinking about a thing, you will never get it done.",
    a: "Bruce Lee",
  },
  {
    q: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.",
    a: "Alexander Graham Bell",
  },
  {
    q: "Action is the foundational key to all success.",
    a: "Pablo Picasso",
  },
  {
    q: "Your mind is for having ideas, not holding them.",
    a: "David Allen",
  },
  {
    q: "The only way to do great work is to love what you do.",
    a: "Steve Jobs",
  },
  {
    q: "Simplicity is the ultimate sophistication.",
    a: "Leonardo da Vinci",
  },
  {
    q: "It always seems impossible until it is done.",
    a: "Nelson Mandela",
  },
  {
    q: "Do what you can, with what you have, where you are.",
    a: "Theodore Roosevelt",
  },
  {
    q: "The master has failed more times than the beginner has even tried.",
    a: "Stephen McCranie",
  },
  {
    q: "You miss 100% of the shots you don't take.",
    a: "Wayne Gretzky",
  },
  {
    q: "Yesterday you said tomorrow. Just do it.",
    a: "Nike",
  },
  {
    q: "Consistency beats intensity every single time.",
    a: "Unknown",
  },
  {
    q: "The cost of missing your focus is the life you could have lived.",
    a: "Unknown",
  },
  {
    q: "Don't count the days, make the days count.",
    a: "Muhammad Ali",
  },
];

export async function GET() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return Response.json(randomQuote);
}
