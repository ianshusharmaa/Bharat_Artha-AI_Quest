export interface StoryNode {
  id: number;
  text: string;
  choices: { text: string; nextId: number }[];
  isEnding: boolean;
}

export const story: StoryNode[] = [
  {
    id: 1,
    text: 'You are a college student with a part-time job. You have just received your first paycheck of 1000. What do you do?',
    choices: [
      { text: 'Save it all in your bank account.', nextId: 2 },
      { text: 'Spend half on fun and save half.', nextId: 3 },
      { text: 'Spend it all on a new gadget.', nextId: 4 },
    ],
    isEnding: false,
  },
  {
    id: 2,
    text: 'You saved all your money. A few weeks later, your laptop breaks down. Luckily, you have enough money to repair it. You learned the importance of having an emergency fund.',
    choices: [
      { text: 'Continue saving regularly.', nextId: 5 },
      { text: 'Start spending more.', nextId: 6 },
    ],
    isEnding: false,
  },
  {
    id: 3,
    text: 'You enjoyed a fun weekend with your friends. You also have some savings. A surprise expense comes up, and you can only cover part of it. You learn a lesson about balancing wants and needs.',
    choices: [
      { text: 'Try to save more next time.', nextId: 5 },
      { text: 'Ignore savings.', nextId: 6 },
    ],
    isEnding: false,
  },
  {
    id: 4,
    text: 'You bought a cool new gadget, but now you have no money left. An unexpected bill arrives, and you have to borrow money from a friend. This makes you realize the danger of impulsive spending.',
    choices: [
      { text: 'Make a plan to repay your friend.', nextId: 5 },
      { text: 'Ignore the debt.', nextId: 6 },
    ],
    isEnding: false,
  },
  {
    id: 5,
    text: 'You are building good financial habits! Over time, you feel more secure and less stressed about money.',
    choices: [],
    isEnding: true,
  },
  {
    id: 6,
    text: 'You struggle with unexpected expenses and debt. You realize the importance of planning and saving.',
    choices: [],
    isEnding: true,
  },
];
