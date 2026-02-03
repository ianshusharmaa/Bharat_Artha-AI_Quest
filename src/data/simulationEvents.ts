export interface SimulationEvent {
  description: string;
  type: 'income' | 'expense' | 'choice';
  amount?: number;
  choices?: { text: string; effect: { money: number; message: string } }[];
}

export const simulationEvents: SimulationEvent[] = [
  {
    description: 'You received your monthly allowance.',
    type: 'income',
    amount: 500,
  },
  {
    description: 'Your phone bill is due.',
    type: 'expense',
    amount: -50,
  },
  {
    description: 'You found a wallet on the street with 100 inside. What do you do?',
    type: 'choice',
    choices: [
      { text: 'Keep the money', effect: { money: 100, message: 'You kept the money. Your balance increased by 100.' } },
      { text: 'Return it to the owner', effect: { money: 20, message: 'The owner was grateful and gave you a 20 reward.' } },
    ],
  },
  {
    description: 'Your friends invite you to a movie.',
    type: 'expense',
    amount: -15,
  },
  {
    description: 'You get an opportunity to invest in a new startup. It costs 200.',
    type: 'choice',
    choices: [
      { text: 'Invest', effect: { money: -200, message: 'You invested 200. It might pay off in the future!' } },
      { text: 'Decline', effect: { money: 0, message: 'You decided not to invest.' } },
    ],
  },
  {
    description: 'You get a part-time job offer. Accepting means less free time but more money.',
    type: 'choice',
    choices: [
      { text: 'Accept the job', effect: { money: 300, message: 'You accepted the job and earned 300.' } },
      { text: 'Decline', effect: { money: 0, message: 'You declined the job and kept your free time.' } },
    ],
  },
  {
    description: 'You forgot to pay your electricity bill on time.',
    type: 'expense',
    amount: -60,
  },
  {
    description: 'You won a small prize in a competition!',
    type: 'income',
    amount: 150,
  },
  {
    description: 'You are tempted to buy a new video game on sale.',
    type: 'choice',
    choices: [
      { text: 'Buy the game', effect: { money: -40, message: 'You bought the game and spent 40.' } },
      { text: 'Skip the sale', effect: { money: 0, message: 'You skipped the sale and saved money.' } },
    ],
  },
  {
    description: 'You receive a birthday gift from a relative.',
    type: 'income',
    amount: 200,
  },
];
