export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  // Easy Questions - Budgeting
  {
    question: 'What is a budget?',
    options: ['A type of candy', 'A plan for how to spend and save your money', 'A list of your favorite songs', 'A new dance move'],
    correctAnswer: 1,
    explanation: 'A budget is a plan for how you will spend and save your money each month.',
    category: 'Budgeting',
    difficulty: 'easy'
  },
  {
    question: 'Which of the following is a recurring expense?',
    options: ['Buying a new phone', 'Monthly rent', 'Birthday gift', 'Lottery ticket'],
    correctAnswer: 1,
    explanation: 'Monthly rent is a recurring expense because you pay it regularly.',
    category: 'Budgeting',
    difficulty: 'easy'
  },
  {
    question: 'What is the 50/30/20 budgeting rule?',
    options: ['50% needs, 30% wants, 20% savings', '50% savings, 30% needs, 20% wants', '50% wants, 30% savings, 20% needs', '50% shopping, 30% food, 20% rent'],
    correctAnswer: 0,
    explanation: 'The 50/30/20 rule suggests spending 50% on needs, 30% on wants, and saving 20% of your income.',
    category: 'Budgeting',
    difficulty: 'easy'
  },
  
  // Easy Questions - Saving
  {
    question: 'Why is it important to save money?',
    options: ['To buy more video games', 'For emergencies and future goals', 'To impress your friends', 'It\'s not important'],
    correctAnswer: 1,
    explanation: 'Saving money helps you handle emergencies and reach your future goals.',
    category: 'Saving',
    difficulty: 'easy'
  },
  {
    question: 'What is an emergency fund?',
    options: ['Money for shopping', 'Money saved for unexpected expenses', 'Money for parties', 'Money for gifts'],
    correctAnswer: 1,
    explanation: 'An emergency fund is money you save for unexpected expenses like medical bills or urgent repairs.',
    category: 'Saving',
    difficulty: 'easy'
  },
  {
    question: 'What is the safest way to store large amounts of money?',
    options: ['In a bank account', 'Under your pillow', 'In your wallet', 'With a friend'],
    correctAnswer: 0,
    explanation: 'A bank account is the safest place to keep large amounts of money.',
    category: 'Saving',
    difficulty: 'easy'
  },
  {
    question: 'How many months of expenses should you save in an emergency fund?',
    options: ['1 month', '3-6 months', '1 week', '10 years'],
    correctAnswer: 1,
    explanation: 'Financial experts recommend saving 3-6 months of expenses in your emergency fund.',
    category: 'Saving',
    difficulty: 'easy'
  },
  
  // Easy Questions - Banking
  {
    question: 'What does "APY" stand for in a savings account?',
    options: ['Annual Percentage Yield', 'All Payments Yearly', 'Apple Pie Yesterday', 'Annual Percentage Youth'],
    correctAnswer: 0,
    explanation: 'APY means Annual Percentage Yield, which shows how much interest you earn on your savings in a year.',
    category: 'Banking',
    difficulty: 'easy'
  },
  {
    question: 'What is interest?',
    options: ['A hobby', 'Money you earn on savings or pay on loans', 'A type of bank', 'A credit card fee'],
    correctAnswer: 1,
    explanation: 'Interest is money you earn when you save or money you pay when you borrow.',
    category: 'Banking',
    difficulty: 'easy'
  },
  
  // Medium Questions - Investing
  {
    question: 'What is the best way to grow your money over time?',
    options: ['Keep it in a piggy bank', 'Invest in the stock market', 'Spend it all immediately', 'Hide it under your mattress'],
    correctAnswer: 1,
    explanation: 'Investing in the stock market can help your money grow faster than just saving it in a piggy bank or under your mattress.',
    category: 'Investing',
    difficulty: 'medium'
  },
  {
    question: 'What does it mean to invest?',
    options: ['Spend money on shopping', 'Put money into something to earn more later', 'Hide money', 'Give money away'],
    correctAnswer: 1,
    explanation: 'Investing means putting your money into something (like stocks or business) to earn more in the future.',
    category: 'Investing',
    difficulty: 'medium'
  },
  {
    question: 'What is a stock?',
    options: ['A type of soup', 'Ownership share in a company', 'A savings account', 'A loan'],
    correctAnswer: 1,
    explanation: 'A stock represents a small ownership share in a company.',
    category: 'Investing',
    difficulty: 'medium'
  },
  {
    question: 'What does diversification mean in investing?',
    options: ['Putting all money in one stock', 'Spreading investments across different assets', 'Only investing in banks', 'Spending money'],
    correctAnswer: 1,
    explanation: 'Diversification means spreading your investments across different types to reduce risk.',
    category: 'Investing',
    difficulty: 'medium'
  },
  {
    question: 'What is compound interest?',
    options: ['Simple interest', 'Interest earned on both principal and accumulated interest', 'Bank fees', 'Tax on savings'],
    correctAnswer: 1,
    explanation: 'Compound interest means you earn interest on your original amount plus any interest already earned.',
    category: 'Investing',
    difficulty: 'medium'
  },
  
  // Medium Questions - Credit
  {
    question: 'What is a credit score?',
    options: ['Your score in a video game', 'A number that represents how likely you are to repay debt', 'The number of friends you have', 'Your grade in math class'],
    correctAnswer: 1,
    explanation: 'A credit score is a number that shows how likely you are to pay back borrowed money.',
    category: 'Credit',
    difficulty: 'medium'
  },
  {
    question: 'What is the best credit card practice?',
    options: ['Pay only minimum amount', 'Pay full balance every month', 'Max out your card', 'Never check your statement'],
    correctAnswer: 1,
    explanation: 'Paying your full balance every month helps avoid interest charges and builds good credit.',
    category: 'Credit',
    difficulty: 'medium'
  },
  {
    question: 'What is APR on a credit card?',
    options: ['Annual Percentage Rate', 'Account Payment Record', 'Approved Payment Rate', 'Annual Payment Return'],
    correctAnswer: 0,
    explanation: 'APR is the Annual Percentage Rate - the yearly interest rate charged on borrowed money.',
    category: 'Credit',
    difficulty: 'medium'
  },
  {
    question: 'What can hurt your credit score?',
    options: ['Paying bills on time', 'Missing payment deadlines', 'Keeping low balances', 'Checking your score'],
    correctAnswer: 1,
    explanation: 'Missing payment deadlines can significantly hurt your credit score.',
    category: 'Credit',
    difficulty: 'medium'
  },
  
  // Medium Questions - General
  {
    question: 'Which is a good financial habit?',
    options: ['Spending all your money', 'Saving a part of your income', 'Ignoring bills', 'Borrowing often'],
    correctAnswer: 1,
    explanation: 'Saving a part of your income regularly is a good financial habit.',
    category: 'Budgeting',
    difficulty: 'medium'
  },
  {
    question: 'What is inflation?',
    options: ['Prices going down', 'Prices going up over time', 'Interest rate', 'Stock market crash'],
    correctAnswer: 1,
    explanation: 'Inflation is when the general price of goods and services increases over time.',
    category: 'Economics',
    difficulty: 'medium'
  },
  
  // Hard Questions
  {
    question: 'What is a 401(k)?',
    options: ['A running race', 'A retirement savings plan', 'A type of loan', 'A credit card'],
    correctAnswer: 1,
    explanation: 'A 401(k) is an employer-sponsored retirement savings plan with tax benefits.',
    category: 'Retirement',
    difficulty: 'hard'
  },
  {
    question: 'What is the purpose of insurance?',
    options: ['To make money', 'To protect against financial loss', 'To invest in stocks', 'To save for vacation'],
    correctAnswer: 1,
    explanation: 'Insurance protects you from large financial losses in case of accidents, illness, or other problems.',
    category: 'Insurance',
    difficulty: 'hard'
  },
  {
    question: 'What is liquidity in finance?',
    options: ['How wet money is', 'How easily an asset can be converted to cash', 'Interest rate', 'Stock price'],
    correctAnswer: 1,
    explanation: 'Liquidity refers to how quickly and easily you can convert an asset into cash.',
    category: 'Investing',
    difficulty: 'hard'
  },
  {
    question: 'What is a mutual fund?',
    options: ['A bank account', 'A pool of money from many investors', 'A type of loan', 'A credit card'],
    correctAnswer: 1,
    explanation: 'A mutual fund pools money from many investors to invest in stocks, bonds, and other assets.',
    category: 'Investing',
    difficulty: 'hard'
  },
  {
    question: 'What is the difference between a debit and credit card?',
    options: ['No difference', 'Debit uses your money, credit borrows money', 'Credit is free', 'Debit has no fees'],
    correctAnswer: 1,
    explanation: 'A debit card uses money from your bank account, while a credit card borrows money you must pay back.',
    category: 'Banking',
    difficulty: 'hard'
  },
  {
    question: 'What does "net worth" mean?',
    options: ['Your salary', 'Assets minus liabilities', 'Your savings', 'Your credit score'],
    correctAnswer: 1,
    explanation: 'Net worth is the total value of what you own (assets) minus what you owe (liabilities).',
    category: 'Finance Basics',
    difficulty: 'hard'
  },
  {
    question: 'What is dollar-cost averaging?',
    options: ['Buying expensive items', 'Investing fixed amounts regularly', 'Spending all at once', 'Saving in a jar'],
    correctAnswer: 1,
    explanation: 'Dollar-cost averaging is investing a fixed amount at regular intervals, which can reduce investment risk.',
    category: 'Investing',
    difficulty: 'hard'
  },
  {
    question: 'What is the purpose of a tax deduction?',
    options: ['To increase your taxes', 'To reduce taxable income', 'To pay more fees', 'To avoid saving'],
    correctAnswer: 1,
    explanation: 'Tax deductions reduce your taxable income, which can lower the amount of tax you owe.',
    category: 'Taxes',
    difficulty: 'hard'
  },
  {
    question: 'What is passive income?',
    options: ['Money earned without active work', 'Your regular salary', 'Money you spend', 'Bank fees'],
    correctAnswer: 0,
    explanation: 'Passive income is money earned with minimal ongoing effort, like rental income or dividends.',
    category: 'Income',
    difficulty: 'hard'
  },
  {
    question: 'What is an index fund?',
    options: ['A type of loan', 'A fund that tracks a market index', 'A savings account', 'A credit card'],
    correctAnswer: 1,
    explanation: 'An index fund is an investment fund that tracks a specific market index like the S&P 500.',
    category: 'Investing',
    difficulty: 'hard'
  },
];
