export interface FinancialTheme {
  id: string;
  title: string;
  description: string;
  icon: string;
  events: SimulationScenario[];
}

export interface SimulationScenario {
  id: string;
  scenario: string;
  theme: 'savings' | 'insurance' | 'investment';
  choices: DecisionChoice[];
  longTermConsequence?: {
    months: number;
    description: string;
    impact: number;
  };
}

export interface DecisionChoice {
  text: string;
  shortTerm: {
    money: number;
    message: string;
  };
  longTerm: {
    savings: number;
    risk: number; // 0-100: risk score
    wisdom: number; // 0-100: financial wisdom points
    message: string;
  };
}

// THEME 1: SAVINGS & BUDGETING
export const savingsScenarios: SimulationScenario[] = [
  {
    id: 'savings_1',
    theme: 'savings',
    scenario: 'आपको महीने के अंत में ₹500 मिले। आप क्या करेंगे? / You get ₹500 at month end. What do you do?',
    choices: [
      {
        text: '✓ सेविंग्स खाते में डालो / Save in account',
        shortTerm: { money: 0, message: 'आप ₹500 सेव करते हो / You saved ₹500' },
        longTerm: {
          savings: 500,
          risk: 5,
          wisdom: 100,
          message: '12 महीने में ₹6,000 बन जाएगा! / In 12 months: ₹6,000!'
        }
      },
      {
        text: '◐ आधा सेव करो, आधा खर्च करो / Split 50-50',
        shortTerm: { money: -250, message: 'आप ₹250 सेव करते हो, ₹250 खर्च करते हो / You saved ₹250, spent ₹250' },
        longTerm: {
          savings: 250,
          risk: 20,
          wisdom: 60,
          message: '12 महीने में ₹3,000 बचेगा / In 12 months: ₹3,000 saved'
        }
      },
      {
        text: '✗ सब खर्च कर दो / Spend all',
        shortTerm: { money: -500, message: 'आप पूरा खर्च कर देते हो / You spent it all' },
        longTerm: {
          savings: 0,
          risk: 80,
          wisdom: 10,
          message: 'कुछ नहीं बचेगा / Nothing saved'
        }
      }
    ],
    longTermConsequence: {
      months: 12,
      description: 'One year of consistent saving vs spending habits',
      impact: 6000
    }
  },
  {
    id: 'savings_2',
    theme: 'savings',
    scenario: 'आपकी किताबें और पेन हर महीने ₹100 खर्च होते हैं। क्या करेंगे? / Books & pens cost ₹100/month. Options?',
    choices: [
      {
        text: '✓ सस्ते विकल्प ढूंढो / Find cheaper alternatives',
        shortTerm: { money: -50, message: '₹50 में ही सब जरूरी चीजें मिल गईं / Got essentials for ₹50' },
        longTerm: {
          savings: 50,
          risk: 10,
          wisdom: 90,
          message: '12 महीने में ₹600 बचे / Save ₹600 annually'
        }
      },
      {
        text: '◐ कुछ प्रीमियम खरीद सकते हो / Buy some premium items',
        shortTerm: { money: -90, message: '₹90 खर्च / Spent ₹90' },
        longTerm: {
          savings: 10,
          risk: 35,
          wisdom: 50,
          message: 'थोड़ा सा बचेगा / Save a little'
        }
      },
      {
        text: '✗ सब कुछ महंगा खरीद लो / Buy everything premium',
        shortTerm: { money: -150, message: '₹150 खर्च / Spent ₹150' },
        longTerm: {
          savings: -50,
          risk: 90,
          wisdom: 5,
          message: 'नुकसान हो गया / You overspent'
        }
      }
    ]
  },
  {
    id: 'savings_3',
    theme: 'savings',
    scenario: 'आपको रोजमर्रा के लिए ₹2000 का बजट है। कैसे बांटेंगे? / ₹2000 monthly budget - how to allocate?',
    choices: [
      {
        text: '✓ स्मार्ट बजटिंग: 50-30-20 / Smart budgeting rule',
        shortTerm: { money: -1400, message: 'जरूरी काम: ₹1000, चाहत: ₹600, बचत: ₹400 / Essential: ₹1000, Wants: ₹600, Save: ₹400' },
        longTerm: {
          savings: 400,
          risk: 15,
          wisdom: 95,
          message: 'हर महीने ₹400 बचेगा, साल में ₹4,800 / Save ₹400/month'
        }
      },
      {
        text: '◐ आधा स्मार्ट / Semi-planned spending',
        shortTerm: { money: -1700, message: 'थोड़ी बचत, थोड़ी अधिक खर्च / Some planning' },
        longTerm: {
          savings: 300,
          risk: 40,
          wisdom: 55,
          message: 'हर महीने ₹300 बचेगा / Save ₹300/month'
        }
      },
      {
        text: '✗ बिना सोचे खर्च करो / No planning',
        shortTerm: { money: -2000, message: 'सब खर्च / All spent' },
        longTerm: {
          savings: 0,
          risk: 95,
          wisdom: 5,
          message: 'कुछ नहीं बचेगा / Nothing saved'
        }
      }
    ]
  }
];

// THEME 2: INSURANCE & PROTECTION (Risk Management)
export const insuranceScenarios: SimulationScenario[] = [
  {
    id: 'insurance_1',
    theme: 'insurance',
    scenario: 'आपके पास ₹5000 हैं। अचानक बीमारी आ गई - डॉक्टर फीस ₹2000! क्या करेंगे? / You have ₹5000, emergency medical cost ₹2000. What now?',
    choices: [
      {
        text: '✓ आपको पहले से हेल्थ इंश्योरेंस था / Had health insurance earlier',
        shortTerm: { money: -500, message: 'इंश्योरेंस से ₹1500 मिल गए, सिर्फ ₹500 अपने से / Insurance covered ₹1500' },
        longTerm: {
          savings: 3500,
          risk: 20,
          wisdom: 100,
          message: 'सुरक्षित रहे! / You were protected!'
        }
      },
      {
        text: '◐ कर्ज लेना पड़ा / Had to borrow',
        shortTerm: { money: -2500, message: 'कर्ज का बोझ बढ़ गया / Debt increased' },
        longTerm: {
          savings: 2500,
          risk: 70,
          wisdom: 30,
          message: 'कर्ज ब्याज सहित ₹3000 देना पड़ेगा / Debt with interest ₹3000'
        }
      },
      {
        text: '✗ सब पैसे खर्च हो गए, कर्ज भी / No insurance, huge debt',
        shortTerm: { money: -2000, message: 'आर्थिक संकट! / Financial crisis!' },
        longTerm: {
          savings: 3000,
          risk: 95,
          wisdom: 5,
          message: 'भविष्य में परेशानी होगी / Future will be hard'
        }
      }
    ],
    longTermConsequence: {
      months: 6,
      description: 'Impact of having vs not having insurance during emergencies',
      impact: 3000
    }
  },
  {
    id: 'insurance_2',
    theme: 'insurance',
    scenario: 'आपकी बाइक/स्कूटर को दुर्घटना हुई - ₹5000 की मरम्मत की जरूरत है। अब क्या? / Vehicle damaged - ₹5000 repair needed.',
    choices: [
      {
        text: '✓ आपके पास जनरल इंश्योरेंस था / Had vehicle insurance',
        shortTerm: { money: -1000, message: 'इंश्योरेंस से ₹4000 मिल गए / Insurance covered ₹4000' },
        longTerm: {
          savings: 4000,
          risk: 10,
          wisdom: 95,
          message: 'सड़क पर सुरक्षित रहे! / Road safety protected'
        }
      },
      {
        text: '◐ आंशिक बीमा था / Had partial coverage',
        shortTerm: { money: -2500, message: 'आधा खुद निकालना पड़ा / Paid half yourself' },
        longTerm: {
          savings: 2500,
          risk: 50,
          wisdom: 60,
          message: 'आंशिक सुरक्षा मिली / Partial protection'
        }
      },
      {
        text: '✗ कोई बीमा नहीं था / No insurance',
        shortTerm: { money: -5000, message: 'पूरा खुद भुगतना पड़ा! / You paid full amount' },
        longTerm: {
          savings: 0,
          risk: 95,
          wisdom: 5,
          message: 'भारी नुकसान! / Heavy financial loss'
        }
      }
    ]
  },
  {
    id: 'insurance_3',
    theme: 'insurance',
    scenario: 'आपके माता-पिता की बीमारी के इलाज में ₹50,000 लगेंगे। आप क्या करेंगे? / Parents need ₹50,000 medical treatment.',
    choices: [
      {
        text: '✓ जीवन बीमा + हेल्थ इंश्योरेंस है / Had life & health insurance',
        shortTerm: { money: -5000, message: 'बीमा से ₹45,000 मिल जाएंगे / Insurance covers ₹45,000' },
        longTerm: {
          savings: 45000,
          risk: 10,
          wisdom: 100,
          message: 'परिवार सुरक्षित रहा! / Family protected'
        }
      },
      {
        text: '◐ कुछ बचत + कर्ज / Some savings + loan',
        shortTerm: { money: -20000, message: 'कर्ज का बोझ बढ़ गया / Debt pressure' },
        longTerm: {
          savings: 30000,
          risk: 75,
          wisdom: 40,
          message: 'साल भर कर्ज की चिंता / Debt burden for months'
        }
      },
      {
        text: '✗ कोई सुरक्षा नहीं / No safety net',
        shortTerm: { money: -50000, message: 'परिवार का सर्वनाश! / Family disaster' },
        longTerm: {
          savings: 0,
          risk: 100,
          wisdom: 0,
          message: 'आर्थिक दिवालिया / Financial ruin'
        }
      }
    ]
  }
];

// THEME 3: INVESTMENTS & FINANCIAL GROWTH
export const investmentScenarios: SimulationScenario[] = [
  {
    id: 'investment_1',
    theme: 'investment',
    scenario: '₹10,000 आपके पास है। निवेश कहां करेंगे? / ₹10,000 available. Where to invest?',
    choices: [
      {
        text: '✓ पोस्ट ऑफिस सेविंग्स + म्यूचुअल फंड / Post Office + Mutual Fund (balanced)',
        shortTerm: { money: -10000, message: 'निवेश कर दिया / Invested ₹10,000' },
        longTerm: {
          savings: 12000,
          risk: 25,
          wisdom: 90,
          message: '2 साल में ₹12,000 हो जाएगा (15% वार्षिक रिटर्न) / Becomes ₹12,000 in 2 years (15% annual return)'
        }
      },
      {
        text: '◐ सब बैंक में जमा करो / All in bank savings',
        shortTerm: { money: -10000, message: 'बैंक में जमा / Saved in bank' },
        longTerm: {
          savings: 10600,
          risk: 5,
          wisdom: 50,
          message: '2 साल में सिर्फ ₹10,600 (6% ब्याज) / Only ₹10,600 in 2 years (6% interest)'
        }
      },
      {
        text: '✗ क्रिप्टो/उच्च जोखिम में सब लगाओ / All in crypto/high risk',
        shortTerm: { money: -10000, message: 'उच्च जोखिम लिया / High risk taken' },
        longTerm: {
          savings: 5000,
          risk: 95,
          wisdom: 10,
          message: '50% नुकसान हो गया! / Lost 50%'
        }
      }
    ],
    longTermConsequence: {
      months: 24,
      description: 'Long-term wealth building through smart investments',
      impact: 2000
    }
  },
  {
    id: 'investment_2',
    theme: 'investment',
    scenario: 'आपकी पत्नी को एक बिजनेस आइडिया है - ₹50,000 निवेश चाहिए। क्या करेंगे? / Wife has business idea needing ₹50,000.',
    choices: [
      {
        text: '✓ छोटी रकम से शुरू करो (₹10,000) / Start small (₹10,000)',
        shortTerm: { money: -10000, message: 'कम जोखिम के साथ शुरू / Low risk start' },
        longTerm: {
          savings: 50000,
          risk: 30,
          wisdom: 95,
          message: 'अगर सफल हुआ तो साल में ₹50,000 कमाई! / If successful: ₹50,000 annual profit'
        }
      },
      {
        text: '◐ आधा निवेश करो (₹25,000) / Invest ₹25,000',
        shortTerm: { money: -25000, message: 'मध्यम जोखिम / Medium risk' },
        longTerm: {
          savings: 35000,
          risk: 50,
          wisdom: 60,
          message: 'अगर सफल तो अच्छा रिटर्न / Good return if successful'
        }
      },
      {
        text: '✗ पूरा ₹50,000 लगा दो / Invest all ₹50,000',
        shortTerm: { money: -50000, message: 'सब पैसा जोखिम में / All at risk' },
        longTerm: {
          savings: 0,
          risk: 90,
          wisdom: 15,
          message: 'विफल होने पर दिवालिया! / Bankruptcy if it fails'
        }
      }
    ]
  },
  {
    id: 'investment_3',
    theme: 'investment',
    scenario: 'शेयर मार्केट में निवेश की सलाह दी गई। आप क्या करेंगे? / Stock market investment advice received.',
    choices: [
      {
        text: '✓ पहले सीखो, फिर निवेश करो / Learn first, then invest',
        shortTerm: { money: -1000, message: 'किताबें और कोर्स खरीदे / Bought educational materials' },
        longTerm: {
          savings: 20000,
          risk: 20,
          wisdom: 100,
          message: '5 साल में शेयर से ₹20,000 का लाभ! / ₹20,000 profit in 5 years'
        }
      },
      {
        text: '◐ दोस्त की सलाह पर निवेश करो / Follow friend\'s advice',
        shortTerm: { money: -5000, message: 'सीधा निवेश कर दिया / Invested blindly' },
        longTerm: {
          savings: 8000,
          risk: 60,
          wisdom: 40,
          message: 'कभी लाभ, कभी नुकसान / Hit or miss returns'
        }
      },
      {
        text: '✗ अफवाहों पर निवेश करो / Invest based on rumors',
        shortTerm: { money: -10000, message: 'जल्दबाजी में निवेश / Hasty investment' },
        longTerm: {
          savings: 2000,
          risk: 95,
          wisdom: 5,
          message: '₹8000 का नुकसान! / Lost ₹8000'
        }
      }
    ]
  }
];

// All scenarios combined with theme info
export const allFinancialScenarios = [
  {
    theme: 'savings',
    title: '💰 बचत और बजट / Savings & Budgeting',
    description: 'आज की बचत, कल की संपत्ति / Save today, wealth tomorrow',
    icon: '💎',
    scenarios: savingsScenarios
  },
  {
    theme: 'insurance',
    title: '🛡️ बीमा और सुरक्षा / Insurance & Protection',
    description: 'अप्रत्याशित परिस्थितियों से बचाव / Shield against surprises',
    icon: '🏥',
    scenarios: insuranceScenarios
  },
  {
    theme: 'investment',
    title: '📈 निवेश और विकास / Investments & Growth',
    description: 'पैसे को काम करने दो / Make your money work',
    icon: '🚀',
    scenarios: investmentScenarios
  }
];
