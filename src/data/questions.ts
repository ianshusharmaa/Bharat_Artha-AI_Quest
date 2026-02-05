export type LocalizedText = {
  en: string;
  hi: string;
};

export type LocalizedOptions = {
  en: string[];
  hi: string[];
};

export interface Question {
  question: LocalizedText;
  options: LocalizedOptions;
  correctAnswer: number;
  explanation: LocalizedText;
  category: LocalizedText;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  // Easy Questions - Budgeting
  {
    question: {
      en: 'What is a budget?',
      hi: 'बजट क्या है?'
    },
    options: {
      en: ['A type of candy', 'A plan for how to spend and save your money', 'A list of your favorite songs', 'A new dance move'],
      hi: ['एक प्रकार की मिठाई', 'अपने पैसे खर्च और बचाने की योजना', 'आपके पसंदीदा गानों की सूची', 'एक नया डांस मूव']
    },
    correctAnswer: 1,
    explanation: {
      en: 'A budget is a plan for how you will spend and save your money each month.',
      hi: 'बजट वह योजना है जिसमें आप हर महीने पैसे कैसे खर्च और बचाएंगे तय करते हैं।'
    },
    category: {
      en: 'Budgeting',
      hi: 'बजटिंग'
    },
    difficulty: 'easy'
  },
  {
    question: {
      en: 'Which of the following is a recurring expense?',
      hi: 'निम्न में से कौन सा नियमित (बार-बार) होने वाला खर्च है?'
    },
    options: {
      en: ['Buying a new phone', 'Monthly rent', 'Birthday gift', 'Lottery ticket'],
      hi: ['नया फोन खरीदना', 'मासिक किराया', 'जन्मदिन का उपहार', 'लॉटरी टिकट']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Monthly rent is a recurring expense because you pay it regularly.',
      hi: 'मासिक किराया नियमित खर्च है क्योंकि इसे बार-बार भुगतान करना पड़ता है।'
    },
    category: {
      en: 'Budgeting',
      hi: 'बजटिंग'
    },
    difficulty: 'easy'
  },
  {
    question: {
      en: 'What is the 50/30/20 budgeting rule?',
      hi: '50/30/20 बजटिंग नियम क्या है?'
    },
    options: {
      en: ['50% needs, 30% wants, 20% savings', '50% savings, 30% needs, 20% wants', '50% wants, 30% savings, 20% needs', '50% shopping, 30% food, 20% rent'],
      hi: ['50% जरूरतें, 30% इच्छाएँ, 20% बचत', '50% बचत, 30% जरूरतें, 20% इच्छाएँ', '50% इच्छाएँ, 30% बचत, 20% जरूरतें', '50% खरीदारी, 30% भोजन, 20% किराया']
    },
    correctAnswer: 0,
    explanation: {
      en: 'The 50/30/20 rule suggests spending 50% on needs, 30% on wants, and saving 20% of your income.',
      hi: 'इस नियम में आय का 50% जरूरतों पर, 30% इच्छाओं पर और 20% बचत पर खर्च करने की सलाह है।'
    },
    category: {
      en: 'Budgeting',
      hi: 'बजटिंग'
    },
    difficulty: 'easy'
  },

  // Easy Questions - Saving
  {
    question: {
      en: 'Why is it important to save money?',
      hi: 'पैसे बचाना क्यों जरूरी है?'
    },
    options: {
      en: ['To buy more video games', 'For emergencies and future goals', 'To impress your friends', 'It\'s not important'],
      hi: ['और ज्यादा वीडियो गेम खरीदने के लिए', 'आपात स्थितियों और भविष्य के लक्ष्यों के लिए', 'दोस्तों को प्रभावित करने के लिए', 'यह जरूरी नहीं है']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Saving money helps you handle emergencies and reach your future goals.',
      hi: 'बचत से आप आपात स्थितियों से निपटते हैं और भविष्य के लक्ष्य पूरे करते हैं।'
    },
    category: {
      en: 'Saving',
      hi: 'बचत'
    },
    difficulty: 'easy'
  },
  {
    question: {
      en: 'What is an emergency fund?',
      hi: 'आपातकालीन निधि (इमरजेंसी फंड) क्या है?'
    },
    options: {
      en: ['Money for shopping', 'Money saved for unexpected expenses', 'Money for parties', 'Money for gifts'],
      hi: ['खरीदारी के लिए पैसा', 'अचानक खर्चों के लिए बचाया गया पैसा', 'पार्टियों के लिए पैसा', 'उपहारों के लिए पैसा']
    },
    correctAnswer: 1,
    explanation: {
      en: 'An emergency fund is money you save for unexpected expenses like medical bills or urgent repairs.',
      hi: 'इमरजेंसी फंड वह पैसा है जो आप अचानक होने वाले खर्चों जैसे मेडिकल बिल या जरूरी मरम्मत के लिए बचाते हैं।'
    },
    category: {
      en: 'Saving',
      hi: 'बचत'
    },
    difficulty: 'easy'
  },
  {
    question: {
      en: 'What is the safest way to store large amounts of money?',
      hi: 'बड़ी रकम रखने का सबसे सुरक्षित तरीका क्या है?'
    },
    options: {
      en: ['In a bank account', 'Under your pillow', 'In your wallet', 'With a friend'],
      hi: ['बैंक खाते में', 'तकिए के नीचे', 'अपने बटुए में', 'किसी दोस्त के पास']
    },
    correctAnswer: 0,
    explanation: {
      en: 'A bank account is the safest place to keep large amounts of money.',
      hi: 'बड़ी रकम सुरक्षित रखने के लिए बैंक खाता सबसे सुरक्षित जगह है।'
    },
    category: {
      en: 'Saving',
      hi: 'बचत'
    },
    difficulty: 'easy'
  },
  {
    question: {
      en: 'How many months of expenses should you save in an emergency fund?',
      hi: 'इमरजेंसी फंड में कितने महीनों के खर्च की बचत होनी चाहिए?'
    },
    options: {
      en: ['1 month', '3-6 months', '1 week', '10 years'],
      hi: ['1 महीना', '3-6 महीने', '1 सप्ताह', '10 साल']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Financial experts recommend saving 3-6 months of expenses in your emergency fund.',
      hi: 'वित्त विशेषज्ञ इमरजेंसी फंड में 3-6 महीनों के खर्च की बचत की सलाह देते हैं।'
    },
    category: {
      en: 'Saving',
      hi: 'बचत'
    },
    difficulty: 'easy'
  },

  // Easy Questions - Banking
  {
    question: {
      en: 'What does "APY" stand for in a savings account?',
      hi: 'सेविंग्स खाते में "APY" का मतलब क्या है?'
    },
    options: {
      en: ['Annual Percentage Yield', 'All Payments Yearly', 'Apple Pie Yesterday', 'Annual Percentage Youth'],
      hi: ['वार्षिक प्रतिशत उपज', 'सालाना सभी भुगतान', 'कल की सेब पाई', 'वार्षिक प्रतिशत युवा']
    },
    correctAnswer: 0,
    explanation: {
      en: 'APY means Annual Percentage Yield, which shows how much interest you earn on your savings in a year.',
      hi: 'APY का मतलब वार्षिक प्रतिशत उपज है, जो बताता है कि आपकी बचत पर साल में कितना ब्याज मिलता है।'
    },
    category: {
      en: 'Banking',
      hi: 'बैंकिंग'
    },
    difficulty: 'easy'
  },
  {
    question: {
      en: 'What is interest?',
      hi: 'ब्याज क्या है?'
    },
    options: {
      en: ['A hobby', 'Money you earn on savings or pay on loans', 'A type of bank', 'A credit card fee'],
      hi: ['एक शौक', 'वह पैसा जो आप बचत पर कमाते हैं या ऋण पर चुकाते हैं', 'बैंक का एक प्रकार', 'क्रेडिट कार्ड शुल्क']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Interest is money you earn when you save or money you pay when you borrow.',
      hi: 'ब्याज वह पैसा है जो आप बचत पर कमाते हैं या उधार लेने पर चुकाते हैं।'
    },
    category: {
      en: 'Banking',
      hi: 'बैंकिंग'
    },
    difficulty: 'easy'
  },

  // Medium Questions - Investing
  {
    question: {
      en: 'What is the best way to grow your money over time?',
      hi: 'समय के साथ पैसा बढ़ाने का सबसे अच्छा तरीका क्या है?'
    },
    options: {
      en: ['Keep it in a piggy bank', 'Invest in the stock market', 'Spend it all immediately', 'Hide it under your mattress'],
      hi: ['इसे गुल्लक में रखना', 'शेयर बाजार में निवेश करना', 'तुरंत सब खर्च कर देना', 'गद्दे के नीचे छिपाना']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Investing in the stock market can help your money grow faster than just saving it in a piggy bank or under your mattress.',
      hi: 'शेयर बाजार में निवेश करने से पैसा गुल्लक या गद्दे के नीचे रखने की तुलना में तेजी से बढ़ सकता है।'
    },
    category: {
      en: 'Investing',
      hi: 'निवेश'
    },
    difficulty: 'medium'
  },
  {
    question: {
      en: 'What does it mean to invest?',
      hi: 'निवेश करने का मतलब क्या है?'
    },
    options: {
      en: ['Spend money on shopping', 'Put money into something to earn more later', 'Hide money', 'Give money away'],
      hi: ['खरीदारी में पैसा खर्च करना', 'आगे चलकर ज्यादा कमाने के लिए किसी चीज़ में पैसा लगाना', 'पैसा छिपाना', 'पैसा दे देना']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Investing means putting your money into something (like stocks or business) to earn more in the future.',
      hi: 'निवेश का मतलब है भविष्य में अधिक कमाने के लिए अपने पैसे को किसी चीज़ (जैसे शेयर या व्यवसाय) में लगाना।'
    },
    category: {
      en: 'Investing',
      hi: 'निवेश'
    },
    difficulty: 'medium'
  },
  {
    question: {
      en: 'What is a stock?',
      hi: 'स्टॉक क्या है?'
    },
    options: {
      en: ['A type of soup', 'Ownership share in a company', 'A savings account', 'A loan'],
      hi: ['एक प्रकार का सूप', 'किसी कंपनी में हिस्सेदारी', 'एक बचत खाता', 'एक ऋण']
    },
    correctAnswer: 1,
    explanation: {
      en: 'A stock represents a small ownership share in a company.',
      hi: 'स्टॉक किसी कंपनी में छोटी हिस्सेदारी को दर्शाता है।'
    },
    category: {
      en: 'Investing',
      hi: 'निवेश'
    },
    difficulty: 'medium'
  },
  {
    question: {
      en: 'What does diversification mean in investing?',
      hi: 'निवेश में विविधीकरण का क्या मतलब है?'
    },
    options: {
      en: ['Putting all money in one stock', 'Spreading investments across different assets', 'Only investing in banks', 'Spending money'],
      hi: ['सारा पैसा एक ही स्टॉक में लगाना', 'निवेश को अलग-अलग परिसंपत्तियों में फैलाना', 'सिर्फ बैंकों में निवेश करना', 'पैसा खर्च करना']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Diversification means spreading your investments across different types to reduce risk.',
      hi: 'विविधीकरण का मतलब जोखिम कम करने के लिए निवेश को अलग-अलग प्रकारों में फैलाना है।'
    },
    category: {
      en: 'Investing',
      hi: 'निवेश'
    },
    difficulty: 'medium'
  },
  {
    question: {
      en: 'What is compound interest?',
      hi: 'चक्रवृद्धि ब्याज क्या है?'
    },
    options: {
      en: ['Simple interest', 'Interest earned on both principal and accumulated interest', 'Bank fees', 'Tax on savings'],
      hi: ['साधारण ब्याज', 'मूलधन और जमा हुए ब्याज दोनों पर मिलने वाला ब्याज', 'बैंक शुल्क', 'बचत पर कर']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Compound interest means you earn interest on your original amount plus any interest already earned.',
      hi: 'चक्रवृद्धि ब्याज में मूलधन के साथ पहले से मिले ब्याज पर भी ब्याज मिलता है।'
    },
    category: {
      en: 'Investing',
      hi: 'निवेश'
    },
    difficulty: 'medium'
  },

  // Medium Questions - Credit
  {
    question: {
      en: 'What is a credit score?',
      hi: 'क्रेडिट स्कोर क्या है?'
    },
    options: {
      en: ['Your score in a video game', 'A number that represents how likely you are to repay debt', 'The number of friends you have', 'Your grade in math class'],
      hi: ['वीडियो गेम में आपका स्कोर', 'एक संख्या जो बताती है कि आप कर्ज चुकाने की कितनी संभावना रखते हैं', 'आपके दोस्तों की संख्या', 'गणित में आपका ग्रेड']
    },
    correctAnswer: 1,
    explanation: {
      en: 'A credit score is a number that shows how likely you are to pay back borrowed money.',
      hi: 'क्रेडिट स्कोर एक संख्या है जो बताती है कि आप उधार लिया पैसा चुकाने की कितनी संभावना रखते हैं।'
    },
    category: {
      en: 'Credit',
      hi: 'क्रेडिट'
    },
    difficulty: 'medium'
  },
  {
    question: {
      en: 'What is the best credit card practice?',
      hi: 'क्रेडिट कार्ड का सबसे अच्छा उपयोग क्या है?'
    },
    options: {
      en: ['Pay only minimum amount', 'Pay full balance every month', 'Max out your card', 'Never check your statement'],
      hi: ['केवल न्यूनतम राशि चुकाना', 'हर महीने पूरा बकाया चुकाना', 'कार्ड की पूरी सीमा तक खर्च करना', 'कभी स्टेटमेंट न देखना']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Paying your full balance every month helps avoid interest charges and builds good credit.',
      hi: 'हर महीने पूरा बकाया चुकाने से ब्याज से बचते हैं और अच्छा क्रेडिट बनता है।'
    },
    category: {
      en: 'Credit',
      hi: 'क्रेडिट'
    },
    difficulty: 'medium'
  },
  {
    question: {
      en: 'What is APR on a credit card?',
      hi: 'क्रेडिट कार्ड पर APR क्या होता है?'
    },
    options: {
      en: ['Annual Percentage Rate', 'Account Payment Record', 'Approved Payment Rate', 'Annual Payment Return'],
      hi: ['वार्षिक प्रतिशत दर', 'खाता भुगतान रिकॉर्ड', 'स्वीकृत भुगतान दर', 'वार्षिक भुगतान रिटर्न']
    },
    correctAnswer: 0,
    explanation: {
      en: 'APR is the Annual Percentage Rate - the yearly interest rate charged on borrowed money.',
      hi: 'APR का मतलब वार्षिक प्रतिशत दर है - उधार लिए पैसे पर सालाना ब्याज दर।'
    },
    category: {
      en: 'Credit',
      hi: 'क्रेडिट'
    },
    difficulty: 'medium'
  },
  {
    question: {
      en: 'What can hurt your credit score?',
      hi: 'क्या चीज़ आपका क्रेडिट स्कोर खराब कर सकती है?'
    },
    options: {
      en: ['Paying bills on time', 'Missing payment deadlines', 'Keeping low balances', 'Checking your score'],
      hi: ['समय पर बिल भरना', 'भुगतान की अंतिम तारीख चूकना', 'कम बकाया रखना', 'अपना स्कोर देखना']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Missing payment deadlines can significantly hurt your credit score.',
      hi: 'भुगतान की अंतिम तारीख चूकने से क्रेडिट स्कोर काफी खराब हो सकता है।'
    },
    category: {
      en: 'Credit',
      hi: 'क्रेडिट'
    },
    difficulty: 'medium'
  },

  // Medium Questions - General
  {
    question: {
      en: 'Which is a good financial habit?',
      hi: 'कौन सी अच्छी वित्तीय आदत है?'
    },
    options: {
      en: ['Spending all your money', 'Saving a part of your income', 'Ignoring bills', 'Borrowing often'],
      hi: ['सारा पैसा खर्च कर देना', 'अपनी आय का कुछ हिस्सा बचाना', 'बिलों को नज़रअंदाज़ करना', 'बार-बार उधार लेना']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Saving a part of your income regularly is a good financial habit.',
      hi: 'नियमित रूप से अपनी आय का कुछ हिस्सा बचाना एक अच्छी वित्तीय आदत है।'
    },
    category: {
      en: 'Budgeting',
      hi: 'बजटिंग'
    },
    difficulty: 'medium'
  },
  {
    question: {
      en: 'What is inflation?',
      hi: 'महंगाई क्या है?'
    },
    options: {
      en: ['Prices going down', 'Prices going up over time', 'Interest rate', 'Stock market crash'],
      hi: ['कीमतों का कम होना', 'समय के साथ कीमतों का बढ़ना', 'ब्याज दर', 'शेयर बाजार में गिरावट']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Inflation is when the general price of goods and services increases over time.',
      hi: 'महंगाई वह स्थिति है जब वस्तुओं और सेवाओं की सामान्य कीमतें समय के साथ बढ़ती हैं।'
    },
    category: {
      en: 'Economics',
      hi: 'अर्थशास्त्र'
    },
    difficulty: 'medium'
  },

  // Hard Questions
  {
    question: {
      en: 'What is a 401(k)?',
      hi: '401(k) क्या है?'
    },
    options: {
      en: ['A running race', 'A retirement savings plan', 'A type of loan', 'A credit card'],
      hi: ['एक दौड़', 'रिटायरमेंट बचत योजना', 'एक प्रकार का ऋण', 'एक क्रेडिट कार्ड']
    },
    correctAnswer: 1,
    explanation: {
      en: 'A 401(k) is an employer-sponsored retirement savings plan with tax benefits.',
      hi: '401(k) नियोक्ता द्वारा दी जाने वाली रिटायरमेंट बचत योजना है जिसमें कर लाभ होते हैं।'
    },
    category: {
      en: 'Retirement',
      hi: 'रिटायरमेंट'
    },
    difficulty: 'hard'
  },
  {
    question: {
      en: 'What is the purpose of insurance?',
      hi: 'बीमा का उद्देश्य क्या है?'
    },
    options: {
      en: ['To make money', 'To protect against financial loss', 'To invest in stocks', 'To save for vacation'],
      hi: ['पैसा कमाने के लिए', 'आर्थिक नुकसान से सुरक्षा के लिए', 'शेयर में निवेश करने के लिए', 'छुट्टी के लिए बचत करने के लिए']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Insurance protects you from large financial losses in case of accidents, illness, or other problems.',
      hi: 'बीमा दुर्घटना, बीमारी या अन्य समस्याओं में बड़े आर्थिक नुकसान से बचाता है।'
    },
    category: {
      en: 'Insurance',
      hi: 'बीमा'
    },
    difficulty: 'hard'
  },
  {
    question: {
      en: 'What is liquidity in finance?',
      hi: 'वित्त में तरलता (लिक्विडिटी) का मतलब क्या है?'
    },
    options: {
      en: ['How wet money is', 'How easily an asset can be converted to cash', 'Interest rate', 'Stock price'],
      hi: ['पैसा कितना गीला है', 'किसी संपत्ति को कितनी आसानी से नकद में बदला जा सकता है', 'ब्याज दर', 'शेयर की कीमत']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Liquidity refers to how quickly and easily you can convert an asset into cash.',
      hi: 'तरलता का मतलब है किसी संपत्ति को कितनी जल्दी और आसानी से नकद में बदला जा सकता है।'
    },
    category: {
      en: 'Investing',
      hi: 'निवेश'
    },
    difficulty: 'hard'
  },
  {
    question: {
      en: 'What is a mutual fund?',
      hi: 'म्यूचुअल फंड क्या है?'
    },
    options: {
      en: ['A bank account', 'A pool of money from many investors', 'A type of loan', 'A credit card'],
      hi: ['एक बैंक खाता', 'कई निवेशकों से जुटाई गई धनराशि का पूल', 'एक प्रकार का ऋण', 'एक क्रेडिट कार्ड']
    },
    correctAnswer: 1,
    explanation: {
      en: 'A mutual fund pools money from many investors to invest in stocks, bonds, and other assets.',
      hi: 'म्यूचुअल फंड कई निवेशकों के पैसे को एक साथ जोड़कर शेयर, बॉन्ड और अन्य परिसंपत्तियों में निवेश करता है।'
    },
    category: {
      en: 'Investing',
      hi: 'निवेश'
    },
    difficulty: 'hard'
  },
  {
    question: {
      en: 'What is the difference between a debit and credit card?',
      hi: 'डेबिट और क्रेडिट कार्ड में क्या अंतर है?'
    },
    options: {
      en: ['No difference', 'Debit uses your money, credit borrows money', 'Credit is free', 'Debit has no fees'],
      hi: ['कोई अंतर नहीं', 'डेबिट आपके पैसे का उपयोग करता है, क्रेडिट पैसा उधार लेता है', 'क्रेडिट मुफ्त है', 'डेबिट में कोई शुल्क नहीं']
    },
    correctAnswer: 1,
    explanation: {
      en: 'A debit card uses money from your bank account, while a credit card borrows money you must pay back.',
      hi: 'डेबिट कार्ड आपके बैंक खाते के पैसे का उपयोग करता है, जबकि क्रेडिट कार्ड उधार पैसा होता है जिसे वापस चुकाना पड़ता है।'
    },
    category: {
      en: 'Banking',
      hi: 'बैंकिंग'
    },
    difficulty: 'hard'
  },
  {
    question: {
      en: 'What does "net worth" mean?',
      hi: 'नेट वर्थ का मतलब क्या है?'
    },
    options: {
      en: ['Your salary', 'Assets minus liabilities', 'Your savings', 'Your credit score'],
      hi: ['आपका वेतन', 'संपत्तियाँ माइनस देनदारियाँ', 'आपकी बचत', 'आपका क्रेडिट स्कोर']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Net worth is the total value of what you own (assets) minus what you owe (liabilities).',
      hi: 'नेट वर्थ वह कुल मूल्य है जो आपकी संपत्तियाँ (एसेट्स) से आपकी देनदारियाँ (लायबिलिटीज़) घटाने पर मिलता है।'
    },
    category: {
      en: 'Finance Basics',
      hi: 'वित्त की मूल बातें'
    },
    difficulty: 'hard'
  },
  {
    question: {
      en: 'What is dollar-cost averaging?',
      hi: 'डॉलर-कॉस्ट एवरेजिंग क्या है?'
    },
    options: {
      en: ['Buying expensive items', 'Investing fixed amounts regularly', 'Spending all at once', 'Saving in a jar'],
      hi: ['महंगी चीजें खरीदना', 'नियमित रूप से तय रकम निवेश करना', 'सब पैसा एक साथ खर्च करना', 'जार में बचत करना']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Dollar-cost averaging is investing a fixed amount at regular intervals, which can reduce investment risk.',
      hi: 'डॉलर-कॉस्ट एवरेजिंग में नियमित अंतराल पर तय राशि निवेश की जाती है, जिससे जोखिम कम हो सकता है।'
    },
    category: {
      en: 'Investing',
      hi: 'निवेश'
    },
    difficulty: 'hard'
  },
  {
    question: {
      en: 'What is the purpose of a tax deduction?',
      hi: 'टैक्स डिडक्शन का उद्देश्य क्या है?'
    },
    options: {
      en: ['To increase your taxes', 'To reduce taxable income', 'To pay more fees', 'To avoid saving'],
      hi: ['आपके टैक्स बढ़ाने के लिए', 'कर योग्य आय कम करने के लिए', 'अधिक शुल्क देने के लिए', 'बचत से बचने के लिए']
    },
    correctAnswer: 1,
    explanation: {
      en: 'Tax deductions reduce your taxable income, which can lower the amount of tax you owe.',
      hi: 'टैक्स डिडक्शन से आपकी कर योग्य आय कम होती है, जिससे देय टैक्स की राशि घट सकती है।'
    },
    category: {
      en: 'Taxes',
      hi: 'कर'
    },
    difficulty: 'hard'
  },
  {
    question: {
      en: 'What is passive income?',
      hi: 'निष्क्रिय आय (पैसिव इनकम) क्या है?'
    },
    options: {
      en: ['Money earned without active work', 'Your regular salary', 'Money you spend', 'Bank fees'],
      hi: ['बिना सक्रिय काम के कमाई गई आय', 'आपका नियमित वेतन', 'आपके द्वारा खर्च किया गया पैसा', 'बैंक शुल्क']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Passive income is money earned with minimal ongoing effort, like rental income or dividends.',
      hi: 'पैसिव इनकम वह आय है जो कम प्रयास से मिलती है, जैसे किराया या डिविडेंड।'
    },
    category: {
      en: 'Income',
      hi: 'आय'
    },
    difficulty: 'hard'
  },
  {
    question: {
      en: 'What is an index fund?',
      hi: 'इंडेक्स फंड क्या है?'
    },
    options: {
      en: ['A type of loan', 'A fund that tracks a market index', 'A savings account', 'A credit card'],
      hi: ['एक प्रकार का ऋण', 'एक फंड जो किसी बाजार सूचकांक को ट्रैक करता है', 'एक बचत खाता', 'एक क्रेडिट कार्ड']
    },
    correctAnswer: 1,
    explanation: {
      en: 'An index fund is an investment fund that tracks a specific market index like the S&P 500.',
      hi: 'इंडेक्स फंड एक निवेश फंड है जो किसी खास बाजार सूचकांक (जैसे S&P 500) को ट्रैक करता है।'
    },
    category: {
      en: 'Investing',
      hi: 'निवेश'
    },
    difficulty: 'hard'
  },
  {
    question: {
      en: 'What is UPI used for?',
      hi: 'UPI किस लिए उपयोग होता है?'
    },
    options: {
      en: ['Instant bank transfers', 'Buying stocks only', 'Printing cash', 'Paying taxes only'],
      hi: ['तुरंत बैंक ट्रांसफर', 'सिर्फ शेयर खरीदना', 'नकद छापना', 'सिर्फ कर भुगतान']
    },
    correctAnswer: 0,
    explanation: {
      en: 'UPI enables instant money transfers between bank accounts.',
      hi: 'UPI से बैंक खातों के बीच तुरंत पैसे ट्रांसफर होते हैं।'
    },
    category: {
      en: 'Banking',
      hi: 'बैंकिंग'
    },
    difficulty: 'easy'
  },
  {
    question: {
      en: 'What does credit utilization mean?',
      hi: 'क्रेडिट यूटिलाइजेशन का मतलब क्या है?'
    },
    options: {
      en: ['How much of your credit limit you use', 'Your monthly salary', 'A bank fee', 'Loan interest rate'],
      hi: ['आप अपनी क्रेडिट लिमिट का कितना उपयोग करते हैं', 'आपका मासिक वेतन', 'एक बैंक शुल्क', 'ऋण की ब्याज दर']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Credit utilization is the percentage of your available credit you are using.',
      hi: 'क्रेडिट यूटिलाइजेशन आपकी उपलब्ध क्रेडिट लिमिट का उपयोग प्रतिशत है।'
    },
    category: {
      en: 'Credit',
      hi: 'क्रेडिट'
    },
    difficulty: 'medium'
  },
  {
    question: {
      en: 'What is a common effect of inflation?',
      hi: 'महंगाई (इन्फ्लेशन) का सामान्य असर क्या होता है?'
    },
    options: {
      en: ['Prices rise and purchasing power falls', 'Prices fall quickly', 'Money value increases', 'Savings grow automatically'],
      hi: ['कीमतें बढ़ती हैं और क्रय शक्ति घटती है', 'कीमतें तेजी से गिरती हैं', 'पैसे की कीमत बढ़ती है', 'बचत अपने आप बढ़ती है']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Inflation reduces purchasing power as prices increase over time.',
      hi: 'महंगाई से समय के साथ कीमतें बढ़ती हैं और क्रय शक्ति घटती है।'
    },
    category: {
      en: 'Economics',
      hi: 'अर्थशास्त्र'
    },
    difficulty: 'hard'
  },
];
