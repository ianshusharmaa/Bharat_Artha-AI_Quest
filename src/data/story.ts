export interface StoryNode {
  id: number;
  text: string;
  choices: { text: string; nextId: number }[];
  isEnding: boolean;
  endingType?: 'good' | 'bad' | 'neutral';
}

export const story: StoryNode[] = [
  {
    id: 1,
    text: 'You are a college student with a part-time job. You have just received your first paycheck of ₹1000. What do you do?',
    choices: [
      { text: 'Save it all in your bank account.', nextId: 2 },
      { text: 'Spend half on fun and save half.', nextId: 3 },
      { text: 'Spend it all on a new gadget.', nextId: 4 },
    ],
    isEnding: false,
  },
  {
    id: 2,
    text: 'You saved all your money in a savings account. A few weeks later, your laptop breaks down. Luckily, you have enough money to repair it for ₹600. You learned the importance of having an emergency fund.',
    choices: [
      { text: 'Continue saving and create a budget.', nextId: 7 },
      { text: 'Start spending more on yourself.', nextId: 8 },
      { text: 'Look for ways to earn extra income.', nextId: 9 },
    ],
    isEnding: false,
  },
  {
    id: 3,
    text: 'You enjoyed a fun weekend with your friends, spending ₹500. You also saved ₹500. A surprise medical expense of ₹700 comes up, and you can only cover part of it. You learn a lesson about balancing wants and needs.',
    choices: [
      { text: 'Borrow money and make a repayment plan.', nextId: 10 },
      { text: 'Ask family for help and start an emergency fund.', nextId: 11 },
      { text: 'Use a credit card and worry about it later.', nextId: 12 },
    ],
    isEnding: false,
  },
  {
    id: 4,
    text: 'You bought a cool new gadget for ₹1000, but now you have no money left. An unexpected college fee of ₹400 arrives, and you have to borrow money from a friend. This makes you realize the danger of impulsive spending.',
    choices: [
      { text: 'Make a plan to repay your friend and budget better.', nextId: 13 },
      { text: 'Sell the gadget to repay the debt.', nextId: 14 },
      { text: 'Ignore the debt and hope it goes away.', nextId: 15 },
    ],
    isEnding: false,
  },
  {
    id: 7,
    text: 'You create a monthly budget using the 50/30/20 rule. Over 6 months, you save ₹3000. Your friend offers you an investment opportunity in their startup.',
    choices: [
      { text: 'Invest ₹2000 in the startup.', nextId: 16 },
      { text: 'Keep saving and invest in mutual funds instead.', nextId: 17 },
      { text: 'Use the money for a certification course.', nextId: 18 },
    ],
    isEnding: false,
  },
  {
    id: 8,
    text: 'You started spending more on entertainment and fashion. Your savings depleted quickly. When an opportunity for a paid internship abroad comes, you don\'t have enough for the visa fees.',
    choices: [
      { text: 'Take a loan and accept the internship.', nextId: 19 },
      { text: 'Miss the opportunity and restart your savings.', nextId: 20 },
    ],
    isEnding: false,
  },
  {
    id: 9,
    text: 'You started freelancing on weekends, earning an extra ₹800/month. You now have ₹5000 saved. Your parents need financial help with home repairs.',
    choices: [
      { text: 'Help them with ₹3000 from savings.', nextId: 21 },
      { text: 'Offer ₹1000 and keep the rest for yourself.', nextId: 22 },
      { text: 'Explain you need to save for your future.', nextId: 23 },
    ],
    isEnding: false,
  },
  {
    id: 10,
    text: 'You borrowed ₹300 and created a strict repayment plan. You learned to save 10% of every income. Six months later, you\'re debt-free with ₹2000 saved!',
    choices: [],
    isEnding: true,
    endingType: 'good',
  },
  {
    id: 11,
    text: 'Your family helped you, and you started an emergency fund. You now save ₹200/month consistently. You feel financially secure and stress-free.',
    choices: [],
    isEnding: true,
    endingType: 'good',
  },
  {
    id: 12,
    text: 'You used a credit card without understanding the 18% interest rate. The debt grew to ₹900. You\'re now struggling with monthly payments and credit score issues.',
    choices: [],
    isEnding: true,
    endingType: 'bad',
  },
  {
    id: 13,
    text: 'You repaid your friend in 3 months and learned valuable budgeting skills. You now track every expense and have ₹1500 saved. Your financial discipline improved significantly!',
    choices: [],
    isEnding: true,
    endingType: 'good',
  },
  {
    id: 14,
    text: 'You sold the gadget for ₹700, took a loss, but repaid your friend. You learned a hard lesson about impulsive purchases. You now think twice before buying non-essentials.',
    choices: [],
    isEnding: true,
    endingType: 'neutral',
  },
  {
    id: 15,
    text: 'You ignored the debt. Your friend is upset, and your reputation suffered. You lost a good friend and learned the importance of financial responsibility the hard way.',
    choices: [],
    isEnding: true,
    endingType: 'bad',
  },
  {
    id: 16,
    text: 'The startup succeeded! Your ₹2000 investment is now worth ₹8000. You learned about taking calculated risks and the power of investing early. Great job!',
    choices: [],
    isEnding: true,
    endingType: 'good',
  },
  {
    id: 17,
    text: 'You invested in a diversified mutual fund. After a year, your ₹3000 grew to ₹3600. You learned about compound interest and long-term wealth building. Wise choice!',
    choices: [],
    isEnding: true,
    endingType: 'good',
  },
  {
    id: 18,
    text: 'You completed a digital marketing certification. It helped you land a better job with ₹5000/month higher salary. Investing in yourself paid off massively!',
    choices: [],
    isEnding: true,
    endingType: 'good',
  },
  {
    id: 19,
    text: 'You took a loan and completed the internship. The experience was valuable, but you\'re now managing loan EMIs of ₹500/month. It\'s tough but you\'re building your career.',
    choices: [],
    isEnding: true,
    endingType: 'neutral',
  },
  {
    id: 20,
    text: 'You missed the opportunity but restarted saving aggressively. You now have ₹6000 saved and are ready for the next opportunity. Patience and discipline paid off!',
    choices: [],
    isEnding: true,
    endingType: 'good',
  },
  {
    id: 21,
    text: 'You helped your family with ₹3000. They were grateful. A month later, they surprised you with ₹5000 as a gift. Family support goes both ways. You learned about giving back!',
    choices: [],
    isEnding: true,
    endingType: 'good',
  },
  {
    id: 22,
    text: 'You gave ₹1000 and kept ₹4000. Your parents understood, but you feel you could have done more. You have savings, but you wonder about balancing family and personal goals.',
    choices: [],
    isEnding: true,
    endingType: 'neutral',
  },
  {
    id: 23,
    text: 'You explained your savings goals. They understood and were proud of your financial planning. You maintained your ₹5000 savings and your family respected your decision.',
    choices: [],
    isEnding: true,
    endingType: 'good',
  },
];
