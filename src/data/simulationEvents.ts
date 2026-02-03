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
    description: 'You found a wallet on the street with ₹100 inside. What do you do?',
    type: 'choice',
    choices: [
      { text: 'Keep the money', effect: { money: 100, message: 'You kept the money. Your balance increased by ₹100.' } },
      { text: 'Return it to the owner', effect: { money: 20, message: 'The owner was grateful and gave you a ₹20 reward for your honesty.' } },
    ],
  },
  {
    description: 'Your friends invite you to a movie and dinner.',
    type: 'choice',
    choices: [
      { text: 'Go with them (₹150)', effect: { money: -150, message: 'You had fun with friends but spent ₹150.' } },
      { text: 'Suggest a cheaper alternative (₹50)', effect: { money: -50, message: 'You suggested coffee instead and spent only ₹50. Smart choice!' } },
      { text: 'Decline politely', effect: { money: 0, message: 'You stayed home and saved your money.' } },
    ],
  },
  {
    description: 'You get an opportunity to invest in a friend\'s new startup. It costs ₹200.',
    type: 'choice',
    choices: [
      { text: 'Invest (high risk, high reward)', effect: { money: -200, message: 'You invested ₹200. The startup might succeed!' } },
      { text: 'Decline politely', effect: { money: 0, message: 'You decided not to invest and kept your money safe.' } },
    ],
  },
  {
    description: 'You get a part-time job offer. Accepting means less free time but more money.',
    type: 'choice',
    choices: [
      { text: 'Accept the job (₹300)', effect: { money: 300, message: 'You accepted the job and earned ₹300. Great work!' } },
      { text: 'Decline', effect: { money: 0, message: 'You declined the job and kept your free time for studies.' } },
    ],
  },
  {
    description: 'You forgot to pay your electricity bill on time. Late fee charged!',
    type: 'expense',
    amount: -60,
  },
  {
    description: 'You won a small prize in a college competition!',
    type: 'income',
    amount: 150,
  },
  {
    description: 'Steam sale! Your favorite game is 50% off at ₹400.',
    type: 'choice',
    choices: [
      { text: 'Buy the game now', effect: { money: -400, message: 'You bought the game for ₹400. Enjoy, but was it worth it?' } },
      { text: 'Wait for a bigger sale', effect: { money: 0, message: 'You waited. Patience saves money!' } },
      { text: 'Skip it completely', effect: { money: 0, message: 'You decided you don\'t need it. Great self-control!' } },
    ],
  },
  {
    description: 'You receive birthday money from relatives.',
    type: 'income',
    amount: 200,
  },
  {
    description: 'Your bike needs maintenance and repairs.',
    type: 'choice',
    choices: [
      { text: 'Get it fixed now (₹300)', effect: { money: -300, message: 'You fixed your bike. Good maintenance prevents bigger issues!' } },
      { text: 'Delay repairs', effect: { money: 0, message: 'You delayed repairs. Hope it doesn\'t break down!' } },
    ],
  },
  {
    description: 'A friend asks to borrow ₹200.',
    type: 'choice',
    choices: [
      { text: 'Lend the money', effect: { money: -200, message: 'You lent ₹200. Hope they repay you soon!' } },
      { text: 'Politely decline', effect: { money: 0, message: 'You said no. Sometimes it\'s okay to prioritize your finances.' } },
    ],
  },
  {
    description: 'Your scholarship amount arrived early!',
    type: 'income',
    amount: 600,
  },
  {
    description: 'Grocery shopping day. Smart shopping can save money!',
    type: 'choice',
    choices: [
      { text: 'Buy branded items (₹250)', effect: { money: -250, message: 'You bought branded groceries for ₹250.' } },
      { text: 'Buy generic brands (₹150)', effect: { money: -150, message: 'You saved ₹100 by choosing generic brands. Smart!' } },
    ],
  },
  {
    description: 'Online course sale! Learn a new skill for ₹300.',
    type: 'choice',
    choices: [
      { text: 'Invest in learning', effect: { money: -300, message: 'You invested ₹300 in yourself. Education is the best investment!' } },
      { text: 'Use free resources instead', effect: { money: 0, message: 'You found free alternatives. Smart use of resources!' } },
    ],
  },
  {
    description: 'You found a freelance gig opportunity online.',
    type: 'choice',
    choices: [
      { text: 'Take the gig (earn ₹400)', effect: { money: 400, message: 'You completed the gig and earned ₹400. Well done!' } },
      { text: 'Focus on studies', effect: { money: 0, message: 'You prioritized studies over extra income.' } },
    ],
  },
  {
    description: 'Gym membership renewal: ₹150/month.',
    type: 'choice',
    choices: [
      { text: 'Renew membership', effect: { money: -150, message: 'You renewed for ₹150. Health is wealth!' } },
      { text: 'Switch to home workouts', effect: { money: 0, message: 'You saved money with free home workouts!' } },
    ],
  },
  {
    description: 'Credit card company offers you a card with cashback.',
    type: 'choice',
    choices: [
      { text: 'Accept and use responsibly', effect: { money: 50, message: 'You used it wisely and earned ₹50 cashback!' } },
      { text: 'Decline (avoid debt risk)', effect: { money: 0, message: 'You avoided potential debt. Good judgment!' } },
    ],
  },
  {
    description: 'Your sibling needs ₹100 for a school project.',
    type: 'choice',
    choices: [
      { text: 'Help them out', effect: { money: -100, message: 'You helped your sibling. Family comes first!' } },
      { text: 'Suggest they ask parents', effect: { money: 0, message: 'You redirected them to parents. Setting boundaries is okay.' } },
    ],
  },
  {
    description: 'Unexpected medical expense for a check-up.',
    type: 'expense',
    amount: -120,
  },
  {
    description: 'You received a cashback refund from a previous purchase!',
    type: 'income',
    amount: 80,
  },
];
