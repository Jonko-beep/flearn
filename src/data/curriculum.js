// FLearn curriculum — categories, lessons, transcripts, and quizzes.
// Content lifted from finance-learn-prototype.jsx and interactive-lesson-demo.jsx.
// videoUrl stays null until a real video is recorded; the lesson page shows a
// mascot placeholder instead.

export const MASTERY_THRESHOLD = 70;

export const categories = [
  {
    id: "investing",
    title: "Investing",
    emoji: "📈",
    color: "#0D9488",
    description:
      "Learn how to grow your wealth through stocks, tangible assets, and smart strategies.",
    mascot: {
      name: "Warren the Walrus",
      emoji: "🦭",
      quote: "Price is what you pay. Value is what you get.",
    },
    lessons: [
      {
        id: "intro-investing",
        title: "What Is Investing?",
        subtitle: "Why your money should work for you",
        duration: "8 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `Investing is the act of putting your money into assets with the expectation that they'll grow in value over time. Unlike saving — where your money sits and slowly loses purchasing power to inflation — investing gives your money the chance to compound and build real wealth.\n\nThink of it this way: if you earned $5,000 during a summer job and put it in a regular checking account, in 10 years you'd still have $5,000 (minus whatever inflation ate away). But if you invested that same $5,000 and earned an average 8% annual return, you'd have roughly $10,795 — more than double — without lifting a finger.\n\nKey concepts:\n• Risk vs. Reward — higher potential returns usually come with higher risk\n• Time Horizon — the longer you invest, the more compounding works in your favor\n• Diversification — don't put all your eggs in one basket\n\nThe biggest advantage young investors have is TIME. Starting at 20 instead of 30 can mean hundreds of thousands of dollars more by retirement, thanks to compound interest.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "What is the primary difference between saving and investing?",
            options: [
              "Saving earns more money than investing",
              "Investing puts money into assets expected to grow, while saving preserves cash",
              "There is no difference",
              "Saving is riskier than investing",
            ],
            correct: 1,
            explanation:
              "Saving preserves cash (and slowly loses purchasing power to inflation), while investing puts money into assets expected to grow in value over time.",
          },
          {
            id: 2,
            question:
              "If you invest $5,000 at an average 8% annual return, approximately how much would you have after 10 years?",
            options: ["$5,500", "$8,000", "$10,795", "$15,000"],
            correct: 2,
            explanation:
              "At an 8% average annual return, compounding roughly doubles your money in 10 years — $5,000 grows to about $10,795 without you lifting a finger.",
          },
          {
            id: 3,
            question: "What does diversification mean?",
            options: [
              "Putting all your money in one stock",
              "Only investing in gold",
              "Spreading investments across different assets to reduce risk",
              "Investing only in safe assets",
            ],
            correct: 2,
            explanation:
              "Diversification means not putting all your eggs in one basket — spreading investments across different assets so no single loss can sink you.",
          },
          {
            id: 4,
            question: "What is the biggest advantage young investors have?",
            options: [
              "More money to invest",
              "Better stock picks",
              "Time for compound interest to work",
              "Access to better brokers",
            ],
            correct: 2,
            explanation:
              "Time is the young investor's superpower. Starting at 20 instead of 30 can mean hundreds of thousands of dollars more by retirement thanks to compounding.",
          },
          {
            id: 5,
            question: "Higher potential returns usually come with:",
            options: ["Lower risk", "No risk", "Higher risk", "Government guarantees"],
            correct: 2,
            explanation:
              "Risk and reward move together — investments with higher potential returns generally carry higher risk of losses.",
          },
        ],
      },
      {
        id: "tangible-assets",
        title: "Tangible Assets",
        subtitle: "Gold, silver, and physical investments",
        duration: "12 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `Tangible assets are physical items that hold value — things you can actually touch and hold. The most common examples are precious metals like gold and silver, but tangible assets also include real estate, collectibles, art, and even commodities like oil.\n\nWhy do people invest in tangible assets?\n• Inflation hedge — gold has historically maintained purchasing power over centuries\n• Portfolio diversification — tangible assets often move differently than stocks\n• Intrinsic value — unlike a stock certificate, gold has inherent worth\n\nGold: Often called a "safe haven" asset. When markets crash or uncertainty spikes, investors flock to gold. An ounce of gold in 1970 cost about $35. Today it's over $2,000. That's not just price appreciation — it reflects how the dollar has lost purchasing power.\n\nSilver: More volatile than gold but also more affordable to start with. Silver has industrial uses (electronics, solar panels) which adds demand beyond just investment.\n\nThe downsides? Tangible assets don't produce income like dividends from stocks or interest from bonds. Storage and insurance can cost money. And prices can be volatile in the short term.\n\nFor young investors, allocating a small portion (5-15%) of a portfolio to tangible assets can provide valuable diversification.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "Which of the following is a tangible asset?",
            options: [
              "A stock certificate",
              "A mutual fund",
              "An ounce of gold",
              "A savings account",
            ],
            correct: 2,
            explanation:
              "Tangible assets are physical items you can touch and hold — gold, silver, real estate, collectibles. Stocks, funds, and accounts are financial (intangible) assets.",
          },
          {
            id: 2,
            question: "Why is gold often called a 'safe haven' asset?",
            options: [
              "It earns dividends",
              "Investors flock to it during uncertainty and market crashes",
              "The government guarantees its price",
              "It always goes up in value",
            ],
            correct: 1,
            explanation:
              "When markets crash or uncertainty spikes, investors move money into gold because it has historically held value through turmoil.",
          },
          {
            id: 3,
            question: "What is a downside of tangible assets compared to stocks?",
            options: [
              "They have no intrinsic value",
              "They don't produce income like dividends",
              "They can't be sold",
              "They always lose value over time",
            ],
            correct: 1,
            explanation:
              "Gold and silver just sit there — they don't pay dividends or interest, and storage and insurance can actually cost you money.",
          },
          {
            id: 4,
            question:
              "What percentage of a portfolio do experts suggest allocating to tangible assets for young investors?",
            options: ["0%", "5-15%", "50-60%", "100%"],
            correct: 1,
            explanation:
              "A small 5-15% allocation provides valuable diversification without giving up the growth and income that stocks provide.",
          },
          {
            id: 5,
            question: "Silver has additional demand beyond investment because of its:",
            options: [
              "Rarity",
              "Government backing",
              "Industrial uses in electronics and solar panels",
              "Historical significance",
            ],
            correct: 2,
            explanation:
              "Silver is used in electronics, solar panels, and other industry, which adds real-world demand on top of its role as an investment.",
          },
        ],
      },
      {
        id: "stocks-101",
        title: "Stocks 101",
        subtitle: "Owning a piece of a company",
        duration: "10 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `When you buy a stock, you're buying a tiny piece of ownership in a company. If that company grows and becomes more profitable, your piece becomes more valuable.\n\nKey terms you need to know:\n• Share — a single unit of ownership in a company\n• Ticker Symbol — the shorthand code for a stock (AAPL = Apple, TSLA = Tesla)\n• Market Cap — the total value of all a company's shares combined\n• Dividend — a payment some companies make to shareholders from their profits\n\nHow do you actually make money from stocks?\n1. Capital Appreciation — you buy at $50, sell at $80, pocket the $30 difference\n2. Dividends — some companies pay you quarterly just for holding their stock\n\nThe stock market has historically returned about 10% per year on average (roughly 7% after inflation). That's better than almost any other asset class over long periods. But "on average" is doing heavy lifting there — individual years can swing wildly, from +30% to -40%.\n\nThe key lesson: investing in stocks is a long game. Day trading and trying to time the market is essentially gambling. Consistent, long-term investing in diversified holdings is how real wealth is built.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "When you buy a stock, you are buying:",
            options: [
              "A loan to a company",
              "A partial ownership stake in a company",
              "A government bond",
              "An insurance policy",
            ],
            correct: 1,
            explanation:
              "A stock is a tiny piece of ownership in a company — if the company grows more profitable, your piece becomes more valuable.",
          },
          {
            id: 2,
            question: "What is a ticker symbol?",
            options: [
              "A company's tax ID",
              "The shorthand code for a stock on the exchange",
              "A stock's price",
              "The CEO's signature",
            ],
            correct: 1,
            explanation:
              "The ticker is the exchange shorthand for a stock — AAPL for Apple, TSLA for Tesla.",
          },
          {
            id: 3,
            question: "What are the two main ways to make money from stocks?",
            options: [
              "Fees and penalties",
              "Capital appreciation and dividends",
              "Interest and insurance",
              "Taxes and rebates",
            ],
            correct: 1,
            explanation:
              "You profit by selling shares for more than you paid (capital appreciation) and by collecting dividends some companies pay just for holding their stock.",
          },
          {
            id: 4,
            question:
              "The stock market has historically returned about what percentage per year on average?",
            options: ["2%", "5%", "10%", "25%"],
            correct: 2,
            explanation:
              "Historically the market has averaged about 10% per year (roughly 7% after inflation) — though individual years can swing from +30% to -40%.",
          },
          {
            id: 5,
            question: "What does the lesson say about day trading?",
            options: [
              "It's the best way to build wealth",
              "It's essentially gambling compared to long-term investing",
              "It's recommended for beginners",
              "It guarantees returns",
            ],
            correct: 1,
            explanation:
              "Day trading and market timing are essentially gambling. Consistent, long-term investing in diversified holdings is how real wealth is built.",
          },
        ],
      },
      {
        id: "value-investing",
        title: "Value Investing",
        subtitle: "Finding undervalued opportunities",
        duration: "15 min",
        difficulty: "Intermediate",
        locked: true,
        videoUrl: null,
        content: null,
        transcript: null,
        quiz: null,
      },
      {
        id: "portfolio-building",
        title: "Building a Portfolio",
        subtitle: "Diversification and asset allocation",
        duration: "12 min",
        difficulty: "Intermediate",
        locked: true,
        videoUrl: null,
        content: null,
        transcript: null,
        quiz: null,
      },
    ],
  },
  {
    id: "saving-budgeting",
    title: "Saving & Budgeting",
    emoji: "💰",
    color: "#7C3AED",
    description:
      "Master the fundamentals of managing your money, building savings, and budgeting smart.",
    mascot: {
      name: "Benjamin the Bear",
      emoji: "🐻",
      quote: "A penny saved is a penny earned... but invested, it's a dollar.",
    },
    lessons: [
      {
        id: "budgeting-basics",
        title: "Budgeting Basics",
        subtitle: "Where is your money actually going?",
        duration: "8 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `A budget isn't a restriction — it's a plan that tells your money where to go instead of wondering where it went. Most people who say "I don't know where my money goes" simply don't have a budget.\n\nThe 50/30/20 Rule (a great starting point):\n• 50% Needs — rent, food, transportation, insurance, minimum debt payments\n• 30% Wants — dining out, entertainment, subscriptions, hobbies\n• 20% Savings & Investing — emergency fund, retirement accounts, investments\n\nFor college students, this might look different. If your needs are covered by scholarships or family, you might be able to push that savings rate much higher — and that's a huge advantage.\n\nHow to actually start:\n1. Track every dollar for one month — use an app, spreadsheet, or notebook\n2. Categorize your spending into needs, wants, and savings\n3. Identify leaks — subscriptions you forgot about, impulse purchases, convenience spending\n4. Set specific targets for each category\n5. Review and adjust monthly\n\nThe goal isn't perfection. It's awareness. Once you see where your money goes, you naturally start making better decisions.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "In the 50/30/20 rule, what does the '20%' represent?",
            options: ["Needs", "Wants", "Savings & Investing", "Taxes"],
            correct: 2,
            explanation:
              "The rule allocates 50% to needs, 30% to wants, and 20% to savings and investing — your emergency fund, retirement accounts, and investments.",
          },
          {
            id: 2,
            question: "What is the first step to creating a budget?",
            options: [
              "Open a savings account",
              "Track every dollar for one month",
              "Cut all spending",
              "Get a second job",
            ],
            correct: 1,
            explanation:
              "You can't plan what you can't see. Tracking every dollar for a month — in an app, spreadsheet, or notebook — reveals where your money actually goes.",
          },
          {
            id: 3,
            question: "What does the lesson say the goal of budgeting is?",
            options: ["Perfection", "Restriction", "Awareness", "Spending less than $100/month"],
            correct: 2,
            explanation:
              "The goal isn't perfection or restriction — it's awareness. Once you see where your money goes, you naturally make better decisions.",
          },
          {
            id: 4,
            question: "What are 'leaks' in a budget?",
            options: [
              "Bank errors",
              "Forgotten subscriptions, impulse purchases, convenience spending",
              "Tax deductions",
              "Investment losses",
            ],
            correct: 1,
            explanation:
              "Leaks are the small, easy-to-miss drains: subscriptions you forgot about, impulse buys, and convenience spending that quietly add up.",
          },
          {
            id: 5,
            question:
              "For college students with needs covered by scholarships, what advantage do they have?",
            options: [
              "They don't need a budget",
              "They can push their savings rate much higher",
              "They should spend more on wants",
              "They can skip the emergency fund",
            ],
            correct: 1,
            explanation:
              "If needs are covered by scholarships or family, the 50% needs slice shrinks — letting you push your savings rate far above 20%, a huge head start.",
          },
        ],
      },
      {
        id: "hysa",
        title: "High-Yield Savings Accounts",
        subtitle: "Make your savings actually earn something",
        duration: "10 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `If your money is sitting in a regular bank savings account earning 0.01% interest, you're essentially losing money to inflation every single day. A high-yield savings account (HYSA) is one of the simplest financial upgrades you can make.\n\nWhat is a HYSA?\nIt's a savings account — usually at an online bank — that pays significantly higher interest rates than traditional banks. While your local bank might offer 0.01-0.05% APY, HYSAs currently offer 4-5% APY.\n\nLet's do the math on $5,000:\n• Regular savings (0.05% APY): earns $2.50/year\n• High-yield savings (4.5% APY): earns $225/year\n\nThat's not life-changing money, but it's free money for doing basically nothing different.\n\nWhere to open one:\nOnline banks like Marcus (Goldman Sachs), Ally, or Capital One offer competitive HYSA rates. They're FDIC insured up to $250,000 — meaning your money is just as safe as at any traditional bank.\n\nWhat to keep in a HYSA:\n• Your emergency fund (3-6 months of expenses)\n• Short-term savings goals (car, vacation, moving costs)\n• Money you'll need within 1-2 years\n\nWhat NOT to keep there:\n• Long-term investments — over 2+ years, the stock market historically outperforms savings rates\n• Money you need daily — keep that in checking for easy access\n\nA HYSA is not an investment strategy. It's a foundation. Get your emergency fund set, then focus on investing for real growth.`,
        transcript: [
          {
            time: "0:00",
            text: "Welcome to this lesson on high-yield savings accounts, or HYSAs. If your money is sitting in a regular bank savings account earning 0.01% interest, you're essentially losing money to inflation every single day.",
          },
          {
            time: "0:18",
            text: "So what exactly is a HYSA? It's a savings account — usually at an online bank — that pays significantly higher interest rates than traditional banks. While your local bank might offer 0.01 to 0.05% APY, high-yield savings accounts currently offer around 4 to 5% APY.",
          },
          {
            time: "0:38",
            text: "Let's do the math. If you have $5,000 in a regular savings account at 0.05% APY, you earn just $2.50 per year. That same $5,000 in a HYSA at 4.5% APY earns you $225 per year. That's free money for doing basically nothing different.",
          },
          {
            time: "1:02",
            text: "Where can you open one? Online banks like Marcus by Goldman Sachs, Ally, or Capital One offer competitive HYSA rates. They're FDIC insured up to $250,000 — meaning your money is just as safe as at any traditional bank.",
          },
          {
            time: "1:22",
            text: "What should you keep in a HYSA? Your emergency fund — that's 3 to 6 months of expenses. Short-term savings goals like a car, vacation, or moving costs. And any money you'll need within 1 to 2 years.",
          },
          {
            time: "1:40",
            text: "What should you NOT keep there? Long-term investments. Over 2 or more years, the stock market historically outperforms savings rates. And money you need daily — keep that in checking for easy access.",
          },
          {
            time: "1:55",
            text: "Remember: a HYSA is not an investment strategy. It's a foundation. Get your emergency fund set, then focus on investing for real growth. That's the smart order of operations.",
          },
        ],
        quiz: [
          {
            id: 1,
            question: "What is the main advantage of a HYSA over a regular savings account?",
            options: [
              "It allows unlimited withdrawals",
              "It offers significantly higher interest rates",
              "It provides better physical branch access",
              "It has no minimum balance requirements",
            ],
            correct: 1,
            explanation:
              "HYSAs offer interest rates of 4-5% APY compared to 0.01-0.05% at traditional banks — that's the core advantage.",
          },
          {
            id: 2,
            question: "How much would $5,000 earn in one year in a HYSA at 4.5% APY?",
            options: ["$2.50", "$45", "$225", "$450"],
            correct: 2,
            explanation:
              "$5,000 × 4.5% = $225 per year. Compare that to just $2.50 at a traditional bank's 0.05% rate.",
          },
          {
            id: 3,
            question: "What does FDIC insurance protect?",
            options: [
              "Your investments against market losses",
              "Your deposits up to $250,000 if the bank fails",
              "Your interest rate from changing",
              "Your account from overdraft fees",
            ],
            correct: 1,
            explanation:
              "FDIC insurance guarantees your deposits up to $250,000 per depositor, per bank — so your money in a HYSA is just as safe as in a traditional bank.",
          },
          {
            id: 4,
            question: "Which of the following should you NOT keep in a HYSA?",
            options: [
              "Your emergency fund",
              "Money for a car you're buying next year",
              "Long-term retirement investments",
              "Savings for a move in 6 months",
            ],
            correct: 2,
            explanation:
              "Long-term investments (2+ years) should be in the stock market, which historically outperforms savings rates. HYSAs are for short-term needs and emergency funds.",
          },
          {
            id: 5,
            question: "What is a HYSA best described as?",
            options: [
              "An aggressive investment strategy",
              "A replacement for a checking account",
              "A financial foundation before investing",
              "A long-term wealth building tool",
            ],
            correct: 2,
            explanation:
              "A HYSA is a foundation — a safe place for your emergency fund and short-term savings. Once that's set, you focus on investing for real growth.",
          },
          {
            id: 6,
            question:
              "Why do online banks typically offer higher HYSA rates than traditional banks?",
            options: [
              "They're riskier and less regulated",
              "They have lower overhead costs without physical branches",
              "They aren't FDIC insured",
              "They require higher minimum deposits",
            ],
            correct: 1,
            explanation:
              "Online banks save money by not maintaining physical branch locations, and they pass those savings on to customers through higher interest rates. They're still FDIC insured and fully regulated.",
          },
          {
            id: 7,
            question:
              "If inflation is running at 3% and your regular savings account earns 0.05%, what's happening to your purchasing power?",
            options: [
              "It's growing slowly",
              "It's staying the same",
              "It's shrinking by roughly 2.95% per year",
              "Inflation doesn't affect savings accounts",
            ],
            correct: 2,
            explanation:
              "If inflation is 3% and you're earning 0.05%, your money loses about 2.95% of its purchasing power each year. A HYSA at 4.5% would actually beat inflation, preserving and slightly growing your real purchasing power.",
          },
        ],
      },
      {
        id: "emergency-fund",
        title: "Building an Emergency Fund",
        subtitle: "Your financial safety net",
        duration: "8 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `An emergency fund is money set aside specifically for unexpected expenses — car repairs, medical bills, job loss, or any surprise that would otherwise force you into debt.\n\nHow much do you need?\nThe standard advice is 3-6 months of essential expenses. For a college student, that might be $2,000-5,000. For someone with rent and bills, it could be $6,000-15,000.\n\nStart smaller if you need to:\n• Phase 1: $500 (covers most minor emergencies)\n• Phase 2: $1,000 (handles a car repair or medical copay)\n• Phase 3: 1 month of expenses\n• Phase 4: 3-6 months of expenses\n\nWhere to keep it: In a high-yield savings account. It needs to be accessible (not locked in investments) but earning something while it sits there.\n\nThe psychology matters: An emergency fund isn't just financial protection — it's mental freedom. Knowing you can handle a $1,000 surprise without panic changes how you move through life. It gives you the confidence to take calculated risks, like starting a business or switching careers, because you have a cushion.\n\nRule: Never invest money you can't afford to lose. Your emergency fund is NOT investment capital.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "What is the standard emergency fund recommendation?",
            options: ["$500", "$1,000", "3-6 months of essential expenses", "1 year of income"],
            correct: 2,
            explanation:
              "The standard advice is 3-6 months of essential expenses — enough to weather a job loss or major surprise without going into debt.",
          },
          {
            id: 2,
            question: "Where should you keep your emergency fund?",
            options: [
              "Under your mattress",
              "In stocks",
              "In a high-yield savings account",
              "In cryptocurrency",
            ],
            correct: 2,
            explanation:
              "A HYSA keeps the money accessible when you need it while still earning meaningful interest as it sits there.",
          },
          {
            id: 3,
            question: "What is Phase 1 of building an emergency fund?",
            options: ["$5,000", "$500", "$100", "3 months expenses"],
            correct: 1,
            explanation:
              "Start with $500 — enough to cover most minor emergencies — then build toward $1,000, one month of expenses, and finally 3-6 months.",
          },
          {
            id: 4,
            question: "Beyond financial protection, what does an emergency fund provide?",
            options: [
              "Tax benefits",
              "Mental freedom and confidence",
              "Investment returns",
              "Credit score improvement",
            ],
            correct: 1,
            explanation:
              "Knowing you can handle a $1,000 surprise without panic is mental freedom — it gives you confidence to take calculated risks like switching careers.",
          },
          {
            id: 5,
            question: "What rule does the lesson emphasize about emergency funds?",
            options: [
              "Invest it aggressively",
              "Never invest money you can't afford to lose",
              "Keep it in cash only",
              "Spend it on wants if needed",
            ],
            correct: 1,
            explanation:
              "Your emergency fund is NOT investment capital. Never invest money you can't afford to lose — the fund exists to be there when things go wrong.",
          },
        ],
      },
      {
        id: "debt-management",
        title: "Understanding Debt",
        subtitle: "Good debt vs. bad debt",
        duration: "11 min",
        difficulty: "Intermediate",
        locked: true,
        videoUrl: null,
        content: null,
        transcript: null,
        quiz: null,
      },
      {
        id: "credit-scores",
        title: "Credit Scores Explained",
        subtitle: "The number that follows you everywhere",
        duration: "10 min",
        difficulty: "Intermediate",
        locked: true,
        videoUrl: null,
        content: null,
        transcript: null,
        quiz: null,
      },
    ],
  },
  {
    id: "real-estate-loans",
    title: "Real Estate & Loans",
    emoji: "🏠",
    color: "#D97706",
    description:
      "Understand the world of home buying, mortgages, and how loans actually work.",
    mascot: {
      name: "Charlie the Chipmunk",
      emoji: "🐿️",
      quote:
        "All I want to know is where I'm going to overpay on a mortgage, so I'll never go there.",
    },
    lessons: [
      {
        id: "home-loans-intro",
        title: "Home Loans 101",
        subtitle: "How mortgages actually work",
        duration: "10 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `A mortgage is simply a loan used to buy a home. The home itself serves as collateral — meaning if you stop paying, the bank can take the house back (foreclosure). That sounds scary, but understanding how mortgages work is the first step to making them work for you.\n\nThe basic mechanics:\nWhen you buy a $300,000 house with a 20% down payment, you put down $60,000 of your own money and borrow $240,000 from a lender. You then pay back that $240,000 plus interest over a set period — usually 15 or 30 years.\n\nKey terms you'll see everywhere:\n• Principal — the actual amount you borrowed ($240,000 in our example)\n• Interest — the cost of borrowing that money, expressed as an annual rate\n• Down Payment — the upfront cash you bring to the table (typically 3-20%)\n• Closing Costs — fees for processing the loan, usually 2-5% of the purchase price\n• Escrow — an account where money is held for property taxes and insurance\n\nHere's what surprises most first-time buyers: on a 30-year mortgage at 7% interest on $240,000, you'll pay roughly $335,000 in interest alone over the life of the loan. That means the total cost of your $300,000 house is actually closer to $635,000. This is why understanding loan types and interest rates matters so much — even a small rate difference can mean tens of thousands of dollars.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "What serves as collateral for a mortgage?",
            options: ["Your car", "Your savings account", "The home itself", "Your credit score"],
            correct: 2,
            explanation:
              "The home itself is the collateral — if you stop paying, the lender can take the house back through foreclosure.",
          },
          {
            id: 2,
            question: "On a $300,000 home with 20% down, how much do you borrow?",
            options: ["$300,000", "$260,000", "$240,000", "$200,000"],
            correct: 2,
            explanation:
              "20% of $300,000 is a $60,000 down payment, so you borrow the remaining $240,000 from the lender.",
          },
          {
            id: 3,
            question: "What is 'principal' in a mortgage?",
            options: [
              "The interest rate",
              "The actual amount borrowed",
              "The monthly payment",
              "The down payment",
            ],
            correct: 1,
            explanation:
              "Principal is the actual amount you borrowed — $240,000 in our example. Interest is the cost of borrowing it.",
          },
          {
            id: 4,
            question:
              "On a 30-year mortgage at 7% on $240,000, approximately how much total interest will you pay?",
            options: ["$24,000", "$100,000", "$240,000", "$335,000"],
            correct: 3,
            explanation:
              "Roughly $335,000 in interest alone — more than the amount borrowed. That's why even small rate differences matter so much.",
          },
          {
            id: 5,
            question: "What are closing costs typically?",
            options: [
              "0.5% of purchase price",
              "2-5% of purchase price",
              "10% of purchase price",
              "There are no closing costs",
            ],
            correct: 1,
            explanation:
              "Closing costs — the fees for processing the loan — typically run 2-5% of the purchase price.",
          },
        ],
      },
      {
        id: "conventional-loans",
        title: "Conventional Loans",
        subtitle: "The standard mortgage most people use",
        duration: "10 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `Conventional loans are the most common type of mortgage in the U.S. They're not backed by any government agency — instead, they're offered by private lenders like banks, credit unions, and mortgage companies.\n\nTwo types of conventional loans:\n• Conforming — meets the guidelines set by Fannie Mae and Freddie Mac (government-sponsored enterprises that buy mortgages from lenders). In 2024, the conforming loan limit is $766,550 in most areas.\n• Non-conforming (Jumbo) — exceeds conforming limits. These typically require higher credit scores and larger down payments.\n\nWhat you need to qualify:\n• Credit score: typically 620+ (though 740+ gets you the best rates)\n• Down payment: as low as 3%, but 20% avoids PMI\n• Debt-to-income ratio: generally below 43-45%\n• Stable employment and income history\n\nThe PMI trap:\nIf you put down less than 20%, you'll pay Private Mortgage Insurance (PMI) — an extra monthly fee that protects the LENDER (not you) if you default. PMI typically costs 0.5-1% of the loan amount per year. On a $240,000 loan, that's $100-200/month on top of your mortgage payment. The good news: PMI drops off automatically once you reach 22% equity in the home.\n\nConventional loans come in fixed-rate and adjustable-rate varieties, which we'll cover in separate lessons. For most young buyers, a conventional loan with the largest down payment you can manage is a solid starting point.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "Conventional loans are backed by:",
            options: [
              "The FHA",
              "The VA",
              "Private lenders, not government agencies",
              "The USDA",
            ],
            correct: 2,
            explanation:
              "Conventional loans come from private lenders — banks, credit unions, mortgage companies — with no government agency backing.",
          },
          {
            id: 2,
            question: "What triggers PMI on a conventional loan?",
            options: [
              "Putting more than 20% down",
              "Putting less than 20% down",
              "Having a high credit score",
              "Buying a new construction home",
            ],
            correct: 1,
            explanation:
              "Put down less than 20% and you'll pay Private Mortgage Insurance — typically 0.5-1% of the loan amount per year.",
          },
          {
            id: 3,
            question: "PMI protects:",
            options: ["The borrower", "The lender", "The real estate agent", "The home seller"],
            correct: 1,
            explanation:
              "PMI protects the LENDER (not you) if you default — you pay the premium, they get the protection.",
          },
          {
            id: 4,
            question: "At what equity percentage does PMI automatically drop off?",
            options: ["10%", "15%", "20%", "22%"],
            correct: 3,
            explanation:
              "PMI drops off automatically once you reach 22% equity in the home (you can request removal at 20%).",
          },
          {
            id: 5,
            question: "What credit score typically gets you the best conventional loan rates?",
            options: ["580+", "620+", "700+", "740+"],
            correct: 3,
            explanation:
              "You can qualify around 620+, but 740+ is where lenders offer their best conventional rates.",
          },
        ],
      },
      {
        id: "fha-loans",
        title: "FHA Loans",
        subtitle: "Lower barriers for first-time buyers",
        duration: "10 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `FHA loans are mortgages insured by the Federal Housing Administration — a government agency created in 1934 to make homeownership more accessible. They're especially popular with first-time buyers and people with lower credit scores.\n\nWhy FHA loans exist:\nAfter the Great Depression wiped out the housing market, the government created the FHA to encourage lending by reducing risk for banks. If a borrower defaults on an FHA loan, the government covers the lender's losses. This lets lenders offer more relaxed requirements.\n\nThe benefits:\n• Down payment as low as 3.5% (with a 580+ credit score)\n• Credit scores as low as 500 accepted (with 10% down)\n• More flexible debt-to-income ratios\n• Lower interest rates than many conventional options for borrowers with imperfect credit\n\nThe catch — MIP (Mortgage Insurance Premium):\nFHA loans require two types of mortgage insurance:\n1. Upfront MIP — 1.75% of the loan amount, paid at closing (usually rolled into the loan)\n2. Annual MIP — 0.55% of the loan amount, paid monthly for the LIFE of the loan\n\nThat last part is the big drawback. Unlike conventional PMI that drops off at 20% equity, FHA mortgage insurance stays forever (unless you refinance into a conventional loan later). On a $250,000 loan, that's about $115/month you'll never stop paying.\n\nWhen FHA makes sense:\nIf your credit score is below 700 or you can only put 3.5% down, FHA might be your best path to homeownership. But if you can qualify for conventional with even 5% down, run the numbers — the long-term cost of permanent MIP often makes conventional the better deal.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "FHA loans are insured by:",
            options: [
              "Private companies",
              "The Federal Housing Administration",
              "Fannie Mae",
              "Your local bank",
            ],
            correct: 1,
            explanation:
              "The Federal Housing Administration — a government agency created in 1934 — insures FHA loans, covering lender losses if a borrower defaults.",
          },
          {
            id: 2,
            question:
              "What is the minimum down payment for an FHA loan with a 580+ credit score?",
            options: ["0%", "3%", "3.5%", "10%"],
            correct: 2,
            explanation:
              "With a 580+ credit score you can put down as little as 3.5%. Scores as low as 500 are accepted with 10% down.",
          },
          {
            id: 3,
            question: "What is the major drawback of FHA mortgage insurance?",
            options: [
              "It's very expensive upfront",
              "It stays for the life of the loan",
              "It only lasts 5 years",
              "It's optional",
            ],
            correct: 1,
            explanation:
              "Unlike conventional PMI that drops off at 20-22% equity, FHA's annual MIP stays for the life of the loan unless you refinance out of it.",
          },
          {
            id: 4,
            question: "The annual MIP rate on FHA loans is approximately:",
            options: ["0.10%", "0.35%", "0.55%", "1.75%"],
            correct: 2,
            explanation:
              "Annual MIP runs about 0.55% of the loan amount, paid monthly. (The 1.75% figure is the one-time upfront MIP at closing.)",
          },
          {
            id: 5,
            question: "When might an FHA loan make more sense than conventional?",
            options: [
              "When you have excellent credit",
              "When your credit score is below 700 or you can only put 3.5% down",
              "When you're buying a luxury home",
              "When you have 20% down",
            ],
            correct: 1,
            explanation:
              "FHA shines when your credit is below 700 or your down payment is small. With good credit and 5%+ down, conventional often wins long-term because PMI eventually drops off.",
          },
        ],
      },
      {
        id: "va-loans",
        title: "VA Loans",
        subtitle: "The best mortgage deal in America",
        duration: "10 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `VA loans are mortgages guaranteed by the U.S. Department of Veterans Affairs, available to active-duty service members, veterans, and eligible surviving spouses. Many financial experts call them the single best mortgage product available in the country.\n\nWhy VA loans are exceptional:\n• Zero down payment required — you can finance 100% of the home's value\n• No PMI or monthly mortgage insurance — ever\n• Typically the lowest interest rates of any loan type\n• No prepayment penalties\n• Limited closing costs (the VA restricts what lenders can charge)\n• No loan limit for borrowers with full entitlement\n\nWho qualifies:\n• Active duty: 90+ continuous days of service\n• Veterans: varies by era, generally 90 days (wartime) or 181 days (peacetime)\n• National Guard/Reserves: 6+ years of service or 90 days of active duty\n• Surviving spouses of veterans who died in service or from service-connected disabilities\n\nThe VA Funding Fee:\nInstead of monthly mortgage insurance, VA loans charge a one-time funding fee (1.25-3.3% of the loan, depending on down payment and usage). This can be rolled into the loan. Some veterans are exempt — those with service-connected disabilities, Purple Heart recipients, and surviving spouses.\n\nLet's compare on a $300,000 home:\n• Conventional (5% down): $285,000 loan + PMI of ~$140/month\n• FHA (3.5% down): $289,500 loan + $133/month MIP forever\n• VA (0% down): $300,000 loan + no monthly insurance\n\nEven borrowing the full amount, the VA borrower often has a lower monthly payment because there's no insurance premium. Over 30 years, that savings can exceed $50,000.\n\nIf you qualify for a VA loan, it should almost always be your first choice.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "What down payment do VA loans require?",
            options: ["3%", "3.5%", "10%", "Zero"],
            correct: 3,
            explanation:
              "VA loans require zero down payment — you can finance 100% of the home's value.",
          },
          {
            id: 2,
            question: "VA loans are available to:",
            options: [
              "All U.S. citizens",
              "Anyone with good credit",
              "Active-duty, veterans, and eligible surviving spouses",
              "First-time homebuyers only",
            ],
            correct: 2,
            explanation:
              "VA loans are for active-duty service members, veterans, eligible National Guard/Reserve members, and eligible surviving spouses.",
          },
          {
            id: 3,
            question: "Instead of monthly mortgage insurance, VA loans charge:",
            options: ["PMI", "MIP", "A one-time funding fee", "Nothing at all"],
            correct: 2,
            explanation:
              "VA loans have no monthly insurance — instead there's a one-time funding fee of 1.25-3.3% that can be rolled into the loan.",
          },
          {
            id: 4,
            question: "Who is exempt from the VA funding fee?",
            options: [
              "All veterans",
              "First-time users",
              "Veterans with service-connected disabilities",
              "Anyone with 20% down",
            ],
            correct: 2,
            explanation:
              "Veterans with service-connected disabilities, Purple Heart recipients, and eligible surviving spouses are exempt from the funding fee.",
          },
          {
            id: 5,
            question:
              "Why do VA borrowers often have lower monthly payments despite borrowing more?",
            options: [
              "Lower interest rates only",
              "No monthly insurance premium",
              "Shorter loan terms",
              "Government subsidies",
            ],
            correct: 1,
            explanation:
              "With no PMI or MIP, the VA borrower skips the monthly insurance premium that conventional and FHA borrowers pay — often more than offsetting the larger loan.",
          },
        ],
      },
      {
        id: "usda-loans",
        title: "USDA Loans",
        subtitle: "Zero down in rural and suburban areas",
        duration: "9 min",
        difficulty: "Beginner",
        locked: false,
        videoUrl: null,
        content: `USDA loans are backed by the U.S. Department of Agriculture and designed to promote homeownership in rural and suburban areas. Like VA loans, they offer zero down payment — but you don't need military service to qualify.\n\nThe requirements:\n• Location: the property must be in a USDA-eligible area. Here's the surprise — "rural" is defined more broadly than you'd think. Many suburban areas, small cities, and towns outside major metros qualify. About 97% of U.S. land area is eligible.\n• Income limits: your household income can't exceed 115% of the area median income. This varies by location and family size.\n• Credit score: typically 640+ for automatic approval\n• Primary residence only — no investment properties or vacation homes\n\nThe benefits:\n• Zero down payment\n• Below-market interest rates\n• Flexible credit requirements\n• Closing costs can be rolled into the loan or paid by the seller\n\nThe costs:\n• Upfront guarantee fee: 1% of the loan amount\n• Annual fee: 0.35% of the loan balance, paid monthly\n\nThat annual fee is much lower than FHA's MIP (0.35% vs 0.55%), making USDA loans cheaper over time.\n\nWhen to consider USDA:\nIf you're buying in a smaller town, suburban area, or anywhere outside a major city center, check USDA eligibility first. The combination of zero down payment and low fees makes it one of the most affordable paths to homeownership — and it's dramatically underutilized because people assume they don't qualify.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "What percentage of U.S. land area is USDA-eligible?",
            options: ["About 25%", "About 50%", "About 75%", "About 97%"],
            correct: 3,
            explanation:
              "About 97% of U.S. land area qualifies — 'rural' is defined far more broadly than most people assume, including many suburbs and small cities.",
          },
          {
            id: 2,
            question: "USDA loans require a down payment of:",
            options: ["Zero", "3%", "3.5%", "5%"],
            correct: 0,
            explanation:
              "Like VA loans, USDA loans require zero down payment — and you don't need military service to qualify.",
          },
          {
            id: 3,
            question: "What income requirement exists for USDA loans?",
            options: [
              "Minimum $100,000 income",
              "No income requirements",
              "Household income can't exceed 115% of area median",
              "Must earn below poverty line",
            ],
            correct: 2,
            explanation:
              "USDA loans have income ceilings, not floors: household income can't exceed 115% of the area median income for your location and family size.",
          },
          {
            id: 4,
            question: "The annual fee for USDA loans is:",
            options: ["0.35%", "0.55%", "1%", "1.75%"],
            correct: 0,
            explanation:
              "The annual fee is 0.35% of the loan balance — much cheaper than FHA's 0.55% MIP. (The 1% figure is the one-time upfront guarantee fee.)",
          },
          {
            id: 5,
            question: "Why does the lesson say USDA loans are underutilized?",
            options: [
              "They have bad rates",
              "People assume they don't qualify",
              "They're only for farms",
              "They require perfect credit",
            ],
            correct: 1,
            explanation:
              "Most people hear 'rural' and assume they're ineligible — but about 97% of U.S. land area qualifies, including many suburban areas.",
          },
        ],
      },
      {
        id: "fixed-vs-arm",
        title: "Fixed-Rate vs. Adjustable-Rate",
        subtitle: "Predictability vs. flexibility",
        duration: "11 min",
        difficulty: "Intermediate",
        locked: false,
        videoUrl: null,
        content: `Every mortgage has an interest rate structure — and the two main types are fixed-rate and adjustable-rate (ARM). This choice affects how much you pay every single month for the life of your loan.\n\nFixed-Rate Mortgages:\nYour interest rate never changes. If you lock in at 6.5%, you pay 6.5% whether rates go to 10% or drop to 3%. Your monthly principal and interest payment stays identical from month 1 to month 360.\n• Most common terms: 30-year and 15-year\n• 30-year: lower monthly payments, more total interest paid\n• 15-year: higher monthly payments, dramatically less interest paid, build equity faster\n\nLet's compare on a $250,000 loan at 6.5%:\n• 30-year: $1,580/month — total interest paid: $319,000\n• 15-year: $2,179/month — total interest paid: $142,000\n\nThat's $177,000 saved by choosing 15-year — but your monthly payment is $599 higher.\n\nAdjustable-Rate Mortgages (ARMs):\nARMs start with a lower "teaser" rate for a fixed period, then adjust periodically based on market conditions.\n• Common structures: 5/1 ARM, 7/1 ARM, 10/1 ARM\n• 5/1 means: fixed rate for 5 years, then adjusts every 1 year after that\n• ARMs have caps that limit how much the rate can increase per adjustment and over the loan's lifetime\n\nWhy choose an ARM?\nIf you plan to sell or refinance within 5-7 years, the lower initial rate saves money. If rates drop, your payment decreases automatically.\n\nThe risk:\nIf rates rise and you're still in the home, your payment can increase significantly. People who got 1-year ARMs before 2008 saw their payments double, which contributed to the housing crisis.\n\nGeneral guidance for young buyers:\nIf this is your first home and you plan to stay 7+ years, a 30-year fixed gives you predictability and peace of mind. If you know you'll move within 5 years, a 5/1 or 7/1 ARM could save you thousands in interest during that window.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "With a fixed-rate mortgage, your interest rate:",
            options: [
              "Changes annually",
              "Changes monthly",
              "Never changes",
              "Decreases over time",
            ],
            correct: 2,
            explanation:
              "Lock in at 6.5% and you pay 6.5% for the entire loan — your principal and interest payment is identical from month 1 to month 360.",
          },
          {
            id: 2,
            question: "In a 5/1 ARM, what does '5/1' mean?",
            options: [
              "5% rate for 1 year",
              "Fixed for 5 years, adjusts every 1 year after",
              "5 payments of 1%",
              "5 points below prime for 1 year",
            ],
            correct: 1,
            explanation:
              "A 5/1 ARM holds a fixed rate for the first 5 years, then adjusts once every year after that based on market conditions.",
          },
          {
            id: 3,
            question:
              "How much total interest is saved by choosing a 15-year over a 30-year on a $250,000 loan at 6.5%?",
            options: ["$50,000", "$100,000", "$177,000", "$250,000"],
            correct: 2,
            explanation:
              "The 30-year costs about $319,000 in total interest versus $142,000 for the 15-year — a $177,000 saving, at the price of a $599 higher monthly payment.",
          },
          {
            id: 4,
            question: "When might an ARM be a good choice?",
            options: [
              "When you plan to stay in the home for 30 years",
              "When you plan to sell or refinance within 5-7 years",
              "When interest rates are rising",
              "ARMs are never a good choice",
            ],
            correct: 1,
            explanation:
              "If you'll sell or refinance before the fixed period ends, you pocket the lower teaser rate and never face the adjustments.",
          },
          {
            id: 5,
            question: "What contributed to the 2008 housing crisis related to ARMs?",
            options: [
              "Rates were too low",
              "People with 1-year ARMs saw payments double when rates rose",
              "ARMs were banned",
              "Fixed rates increased",
            ],
            correct: 1,
            explanation:
              "Borrowers with short-adjustment ARMs saw payments double when rates rose, triggering defaults that fed the housing crisis.",
          },
        ],
      },
      {
        id: "refinancing",
        title: "Refinancing Your Mortgage",
        subtitle: "When and why to restructure your loan",
        duration: "10 min",
        difficulty: "Intermediate",
        locked: true,
        videoUrl: null,
        content: null,
        transcript: null,
        quiz: null,
      },
      {
        id: "home-buying-process",
        title: "The Home Buying Process",
        subtitle: "From pre-approval to closing day",
        duration: "14 min",
        difficulty: "Intermediate",
        locked: true,
        videoUrl: null,
        content: null,
        transcript: null,
        quiz: null,
      },
    ],
  },
];

export function getCategory(categoryId) {
  return categories.find((c) => c.id === categoryId) || null;
}

export function getLesson(categoryId, lessonId) {
  const category = getCategory(categoryId);
  if (!category) return { category: null, lesson: null };
  const lesson = category.lessons.find((l) => l.id === lessonId) || null;
  return { category, lesson };
}

// The next unlocked lesson after `lessonId` within the same category.
export function getNextLesson(categoryId, lessonId) {
  const category = getCategory(categoryId);
  if (!category) return null;
  const idx = category.lessons.findIndex((l) => l.id === lessonId);
  if (idx === -1) return null;
  return category.lessons.slice(idx + 1).find((l) => !l.locked) || null;
}

export function getMasteryInfo(score) {
  if (score === null || score === undefined)
    return { label: "Not Started", color: "#475569", bg: "#1e293b", icon: "○" };
  if (score < 70) return { label: "Try Again", color: "#EF4444", bg: "#EF444415", icon: "✗" };
  if (score < 85) return { label: "Proficient", color: "#F59E0B", bg: "#F59E0B15", icon: "◉" };
  if (score < 100) return { label: "Advanced", color: "#0D9488", bg: "#0D948815", icon: "◈" };
  return { label: "Mastered", color: "#8B5CF6", bg: "#8B5CF615", icon: "★" };
}
