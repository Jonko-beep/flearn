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
          {
            id: 6,
            question:
              "You leave $5,000 in a checking account for 10 years instead of investing it. According to the lesson, what do you end up with?",
            options: [
              "About $10,795",
              "Still $5,000, but with less purchasing power thanks to inflation",
              "More than $5,000, because banks pay high interest",
              "Nothing — checking accounts lose money outright",
            ],
            correct: 1,
            explanation:
              "The nominal $5,000 doesn't grow, and inflation quietly eats away at what it can buy. Invested at an 8% average return, the same money would have roughly doubled.",
          },
          {
            id: 7,
            question:
              "Why does starting to invest at 20 instead of 30 make such a big difference by retirement?",
            options: [
              "Younger investors get better interest rates",
              "Brokers charge lower fees to younger customers",
              "The extra decade gives compounding far more time to snowball",
              "Stocks are less risky for young people",
            ],
            correct: 2,
            explanation:
              "Compounding grows fastest at the end — each year your returns earn returns of their own. An extra ten years early on can translate into hundreds of thousands of dollars more by retirement.",
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
          {
            id: 6,
            question:
              "A friend puts 60% of their portfolio into gold and silver. Based on the lesson, what's the problem?",
            options: [
              "Tangible assets always lose value",
              "Experts suggest only 5-15% — that much sacrifices the income and growth stocks provide",
              "Gold can't be sold quickly",
              "Precious metals aren't allowed in investment portfolios",
            ],
            correct: 1,
            explanation:
              "Tangible assets don't produce dividends or interest, so overweighting them means giving up growth and income. A 5-15% slice captures the diversification benefit without that cost.",
          },
          {
            id: 7,
            question:
              "Gold rising from about $35 an ounce in 1970 to over $2,000 today mostly reflects:",
            options: [
              "Gold becoming rarer",
              "Government price supports",
              "The dollar losing purchasing power over those decades",
              "Industrial demand for gold",
            ],
            correct: 2,
            explanation:
              "The lesson notes that gold's long climb isn't just price appreciation — it mirrors how much purchasing power the dollar has lost, which is exactly why gold works as an inflation hedge.",
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
          {
            id: 6,
            question:
              "You buy a share at $50 and later sell it at $80. The company paid no dividends. What was your profit per share, and what is it called?",
            options: [
              "$30, capital appreciation",
              "$30, a dividend",
              "$80, capital appreciation",
              "$130, total return",
            ],
            correct: 0,
            explanation:
              "You pocket the $80 − $50 = $30 difference. Profit from selling at a higher price than you paid is capital appreciation — the other way stocks pay you is dividends.",
          },
          {
            id: 7,
            question:
              "Why can 'the market returns about 10% per year on average' be misleading for any single year?",
            options: [
              "The real average is much lower",
              "Individual years swing wildly — from roughly +30% to -40%",
              "Returns only count if you day trade",
              "The 10% figure ignores dividends",
            ],
            correct: 1,
            explanation:
              "The 10% average only shows up over long periods. Any single year can be dramatically higher or lower, which is why stock investing is a long game.",
          },
        ],
      },
      {
        id: "value-investing",
        title: "Value Investing",
        subtitle: "Finding undervalued opportunities",
        duration: "15 min",
        difficulty: "Intermediate",
        locked: false,
        videoUrl: null,
        content: `Value investing is the art of buying a dollar for fifty cents. The strategy was pioneered by Benjamin Graham — yes, the namesake of our own Benjamin the Bear — and perfected by his most famous student, Warren Buffett (sound familiar, Warren the Walrus fans?). The core insight: a stock's PRICE and its VALUE are two different things, and your job is to buy when price sits well below value.\n\nGraham asked investors to imagine the market as a moody business partner he called "Mr. Market." Some days he's euphoric and offers to buy your shares at silly-high prices. Other days he panics and offers to sell you his shares dirt cheap. You never have to trade with him — you simply wait for the days his mood works in your favor.\n\nKey concepts:\n• Intrinsic value — what a business is actually worth, based on its earnings, assets, and future prospects\n• Margin of safety — only buying when the price is meaningfully below intrinsic value. Graham suggested paying $70 or less for something worth $100, so even if your estimate is off, you're protected\n• Mr. Market — the market's mood swings are an opportunity to exploit, not a guide to follow\n\nA concrete example: you analyze a company and estimate it's worth $50 per share. It trades at $48. That's NOT a value buy — one bad quarter and you're underwater. But if a market panic knocks it to $35, you now have a $15 margin of safety. If your analysis is right, you profit handsomely. If you're somewhat wrong, you still probably don't lose much. That asymmetry is the whole game.\n\nHow do investors estimate value? Common starting points: the P/E ratio (price divided by annual earnings — paying $15 for every $1 of yearly profit is very different from paying $80), the company's debt load, and whether earnings are stable or erratic.\n\nWhat this means for you as a young adult: you don't need to dissect balance sheets at 20. The value investing MINDSET matters more than the math — never pay silly prices just because everyone's excited, and treat market crashes as sales, not sirens. When the market drops 30% and your friends panic-sell, the value investor in you recognizes the best buying opportunity in years.\n\nAs Warren the Walrus puts it: "Price is what you pay. Value is what you get."`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "Who is considered the father of value investing?",
            options: [
              "Warren Buffett",
              "Benjamin Graham",
              "Charlie Munger",
              "John Bogle",
            ],
            correct: 1,
            explanation:
              "Benjamin Graham pioneered value investing and taught it to Warren Buffett, his most famous student. Our mascots Benjamin the Bear and Warren the Walrus are named in their honor.",
          },
          {
            id: 2,
            question: "What is a 'margin of safety'?",
            options: [
              "A stop-loss order that sells automatically",
              "Buying only when the price is meaningfully below your estimate of intrinsic value",
              "Keeping 6 months of expenses in savings",
              "Only buying stocks that pay dividends",
            ],
            correct: 1,
            explanation:
              "The margin of safety is the gap between price and value — Graham suggested paying $70 or less for something worth $100 — so even an imperfect estimate still leaves you protected.",
          },
          {
            id: 3,
            question: "In Graham's metaphor, who or what is 'Mr. Market'?",
            options: [
              "The Federal Reserve chairman",
              "A moody partner whose price swings you can exploit but never have to obey",
              "A stockbroker who charges commissions",
              "The S&P 500 index",
            ],
            correct: 1,
            explanation:
              "Mr. Market shows up daily with a new mood and a new price. You're free to ignore him — his panics are your buying opportunities, not instructions to follow.",
          },
          {
            id: 4,
            question:
              "You estimate a stock's intrinsic value at $50 per share. Which price gives you a meaningful margin of safety?",
            options: ["$48", "$52", "$35", "$50"],
            correct: 2,
            explanation:
              "At $35 you have a $15 cushion below your $50 estimate, so even if your analysis is somewhat off, you're unlikely to lose much. At $48 or $50 one bad quarter puts you underwater.",
          },
          {
            id: 5,
            question: "What does the P/E ratio measure?",
            options: [
              "Price divided by annual earnings",
              "Profit divided by equity",
              "Price divided by employee count",
              "Potential versus expectations",
            ],
            correct: 0,
            explanation:
              "P/E is the price you pay for each dollar of a company's yearly earnings — paying $15 per $1 of profit is a very different bet than paying $80.",
          },
          {
            id: 6,
            question:
              "The market crashes 30% and your friends are panic-selling. What does the value investing mindset say this moment is?",
            options: [
              "A signal to sell before things get worse",
              "One of the best buying opportunities in years",
              "A reason to switch entirely to bonds",
              "Proof that stocks don't work",
            ],
            correct: 1,
            explanation:
              "A crash is Mr. Market in a panic, offering shares dirt cheap. For a value investor with a long horizon, that's a sale, not a siren.",
          },
          {
            id: 7,
            question:
              "Why does a margin of safety protect you even if your estimate of a company's value is wrong?",
            options: [
              "It guarantees the stock can't fall further",
              "The gap between price and value absorbs your estimation error before you lose money",
              "Brokers refund purchases made below intrinsic value",
              "Companies must buy back shares sold below value",
            ],
            correct: 1,
            explanation:
              "Buying well below your estimate creates asymmetry: if you're right you profit a lot, and if you're moderately wrong the discount cushions the mistake. Nothing eliminates risk — the margin just absorbs error.",
          },
        ],
      },
      {
        id: "portfolio-building",
        title: "Building a Portfolio",
        subtitle: "Diversification and asset allocation",
        duration: "12 min",
        difficulty: "Intermediate",
        locked: false,
        videoUrl: null,
        content: `A portfolio is simply the collection of everything you're invested in — stocks, bonds, funds, cash, maybe a little gold. Building a good one isn't about picking winners. It's about combining pieces so that no single mistake can wreck you.\n\nDiversification is your armor. Put $1,000 into one company and a 50% drop costs you $500. Spread that same $1,000 across 500 companies and one of them can go to zero while you barely notice. The remarkable part: diversification lowers your risk WITHOUT proportionally lowering your expected return. It's the closest thing to a free lunch in investing.\n\nAsset allocation — how you split money between stocks, bonds, and cash — matters more than which specific stocks you pick. The right split depends on your time horizon:\n• Money you need within 3 years (tuition, a car) — savings account or CDs, not the market\n• 3-10 years out (a house down payment) — a balanced mix, something like 60% stocks / 40% bonds\n• 10+ years out (retirement) — mostly stocks, because you have decades to ride out crashes\n\nA classic rule of thumb: hold roughly your age as a percentage in bonds. At 20, that means about 80-90% stocks — aggressive, but appropriate, because at 20 a market crash is a buying opportunity, not a catastrophe. You won't touch the money for decades.\n\nFor beginners, index funds are the default answer. An index fund (like one tracking the S&P 500) buys tiny slices of hundreds of companies in a single purchase, charges near-zero fees (often 0.03% versus 1%+ for actively managed funds), and outperforms the majority of professional stock pickers over long periods. That fee gap is bigger than it looks: on a $100,000 portfolio, 0.03% is $30 a year while 1% is $1,000 — and the difference compounds for decades.\n\nA simple starter portfolio: 80% total US stock market index fund, 10% international index fund, 10% bonds. Boring? Absolutely. Effective? Devastatingly.\n\nOne maintenance habit: rebalance once a year. If stocks surge and your 80/10/10 drifts to 88/7/5, sell a little of what grew and top up what lagged. It quietly forces you to buy low and sell high.\n\nWhat this means for you as a young adult: your first portfolio can be ONE index fund and an automatic $50 monthly contribution. That single boring decision, sustained for decades, will likely beat almost any clever stock-picking scheme you could devise.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question:
              "According to the lesson, what matters more than picking specific stocks?",
            options: [
              "Timing the market",
              "Asset allocation — how you split money between stocks, bonds, and cash",
              "Following analyst ratings",
              "Trading frequently",
            ],
            correct: 1,
            explanation:
              "Your split between stocks, bonds, and cash drives most of your long-term results — it determines how much risk you carry and how much growth you can capture.",
          },
          {
            id: 2,
            question: "Why is diversification called 'the closest thing to a free lunch in investing'?",
            options: [
              "It guarantees positive returns",
              "It lowers risk without proportionally lowering expected return",
              "Index funds are free to buy",
              "It eliminates the need to save",
            ],
            correct: 1,
            explanation:
              "Spreading money across many assets slashes the damage any single failure can do, yet your expected return stays roughly the same — you give up almost nothing for the protection.",
          },
          {
            id: 3,
            question:
              "You're saving for tuition due in 2 years. Where does the lesson say that money belongs?",
            options: [
              "An S&P 500 index fund",
              "Individual growth stocks",
              "A savings account or CDs",
              "80% stocks, 20% bonds",
            ],
            correct: 2,
            explanation:
              "Money needed within 3 years can't afford to ride out a crash. Short-horizon money stays out of the market so it's guaranteed to be there when the bill arrives.",
          },
          {
            id: 4,
            question: "Using the 'age in bonds' rule of thumb, a 20-year-old would hold roughly:",
            options: [
              "20% stocks, 80% bonds",
              "50% stocks, 50% bonds",
              "80-90% stocks",
              "100% bonds",
            ],
            correct: 2,
            explanation:
              "Age in bonds means about 20% bonds at age 20, leaving 80-90% in stocks. That's aggressive, but decades of time horizon turn crashes into buying opportunities.",
          },
          {
            id: 5,
            question: "What does an S&P 500 index fund actually do?",
            options: [
              "Buys tiny slices of hundreds of companies in one purchase",
              "Picks the 10 best-performing stocks each year",
              "Guarantees a fixed 8% return",
              "Invests only in government bonds",
            ],
            correct: 0,
            explanation:
              "An index fund passively holds the whole index — instant diversification in a single purchase, with near-zero fees and no stock-picking required.",
          },
          {
            id: 6,
            question:
              "On a $100,000 portfolio, what's the yearly fee difference between a 0.03% index fund and a 1% actively managed fund?",
            options: ["$9.70", "$97", "$970", "$9,700"],
            correct: 2,
            explanation:
              "0.03% of $100,000 is $30; 1% is $1,000 — a $970 gap every single year, and the money lost to fees also loses all its future compounding.",
          },
          {
            id: 7,
            question: "Why does annual rebalancing quietly force you to 'buy low and sell high'?",
            options: [
              "It times the market using economic forecasts",
              "You trim the assets that grew (selling high) and top up the ones that lagged (buying low)",
              "It moves everything to cash before crashes",
              "Brokers offer discounts for annual trades",
            ],
            correct: 1,
            explanation:
              "Restoring your target percentages mechanically sells a bit of whatever got expensive and buys whatever got cheap — disciplined contrarian behavior without any forecasting.",
          },
        ],
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
          {
            id: 6,
            question:
              "Your after-tax income is $2,000 a month. Following the 50/30/20 rule, how much should go to savings and investing?",
            options: ["$200", "$400", "$600", "$1,000"],
            correct: 1,
            explanation:
              "20% of $2,000 is $400. The other slices are $1,000 for needs (50%) and $600 for wants (30%).",
          },
          {
            id: 7,
            question:
              "Under the 50/30/20 rule, dining out and streaming subscriptions belong to which bucket?",
            options: ["Needs", "Wants", "Savings & Investing", "They don't fit the rule"],
            correct: 1,
            explanation:
              "Dining out, entertainment, subscriptions, and hobbies are Wants — the 30% slice. Needs are essentials like rent, groceries, transportation, and insurance.",
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
          {
            id: 6,
            question:
              "Your car suddenly needs a $900 repair. Which phase of emergency fund building would fully cover it?",
            options: [
              "Phase 1: $500",
              "Phase 2: $1,000",
              "Only Phase 4 could",
              "None — car repairs aren't emergencies",
            ],
            correct: 1,
            explanation:
              "Phase 2's $1,000 handles a car repair or a medical copay. Phase 1's $500 covers most minor emergencies but would fall short of a $900 bill.",
          },
          {
            id: 7,
            question:
              "For a typical college student, how large does the lesson suggest a full emergency fund might be?",
            options: ["$100-500", "$2,000-5,000", "$6,000-15,000", "One year of tuition"],
            correct: 1,
            explanation:
              "A college student's essential expenses are lower, so 3-6 months might be $2,000-5,000. Someone paying rent and bills would need more like $6,000-15,000.",
          },
        ],
      },
      {
        id: "debt-management",
        title: "Understanding Debt",
        subtitle: "Good debt vs. bad debt",
        duration: "11 min",
        difficulty: "Intermediate",
        locked: false,
        videoUrl: null,
        content: `Debt isn't automatically evil — it's a tool. And like any power tool, it can build something valuable or take a finger off. Whether debt is "good" or "bad" comes down to two questions: what does it cost (the APR), and what does it buy?\n\nGood debt is low-cost borrowing that builds an asset or increases your earning power:\n• Federal student loans — typically 5-8% APR, and the degree they fund can raise your lifetime income by hundreds of thousands of dollars\n• Mortgages — roughly 6-7% APR, and you end up owning a home that historically appreciates\n\nBad debt is high-cost borrowing for things that lose value or simply vanish:\n• Credit card balances — commonly 20-28% APR. Carry a $3,000 balance at 24% and you're burning about $720 a year in interest alone\n• Payday loans — effective APRs of 300-400%+. Avoid these at all costs\n• Financing a rapidly depreciating car beyond your means\n\nWhy APR is nearly the whole story: borrow $10,000 at 5% and it costs you about $500 a year. Borrow the same $10,000 at 24% and it costs $2,400 a year. Identical debt, nearly five times the price. That's why the same tool can be a ladder or a trapdoor.\n\nIf you're already carrying multiple debts, there are two proven payoff strategies:\n• Avalanche — pay minimums on everything, then throw every extra dollar at the HIGHEST-APR debt first. Mathematically optimal; saves the most interest\n• Snowball — attack the SMALLEST balance first for quick wins. Slightly more expensive on paper, but the early victories keep people motivated\n\nEither works. The best method is the one you'll actually stick with.\n\nThe golden rule of credit cards: never carry a balance. Cards themselves are fantastic tools — rewards, fraud protection, credit building — as long as you pay the statement in full every month. Do that, and the scary 24% APR never touches you, because interest only accrues on balances you carry.\n\nWhat this means for you as a young adult: the debt habits you set in your 20s compound just like investments do. Treat student loans as a calculated investment in yourself, treat credit cards as a convenience you settle monthly, and reserve real suspicion for any borrowing where the APR is high and the purchase won't be worth anything in five years.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question:
              "According to the lesson, which two questions determine whether debt is good or bad?",
            options: [
              "Who the lender is, and how long the term is",
              "What it costs (APR), and what it buys",
              "Whether it's secured, and whether it's federal",
              "Your income, and your age",
            ],
            correct: 1,
            explanation:
              "Good debt is cheap borrowing that builds an asset or earning power; bad debt is expensive borrowing for things that lose value. Cost and purpose are the whole test.",
          },
          {
            id: 2,
            question: "Which of these does the lesson classify as good debt?",
            options: [
              "A payday loan to cover rent",
              "A carried credit card balance",
              "Federal student loans at 5-8% APR",
              "Financing a luxury car",
            ],
            correct: 2,
            explanation:
              "Federal student loans carry a relatively low APR and fund a degree that can raise your lifetime income by hundreds of thousands — low cost, wealth-building purpose.",
          },
          {
            id: 3,
            question:
              "You carry a $3,000 credit card balance at 24% APR. Roughly how much interest does that cost per year?",
            options: ["$72", "$240", "$720", "$3,000"],
            correct: 2,
            explanation:
              "24% of $3,000 is about $720 a year — money that buys you nothing. That's why carried card balances are the classic example of bad debt.",
          },
          {
            id: 4,
            question: "How does the avalanche payoff method work?",
            options: [
              "Pay off the smallest balance first for quick wins",
              "Pay minimums on everything, then put every extra dollar toward the highest-APR debt",
              "Consolidate all debts into one loan",
              "Pay each debt proportionally to its size",
            ],
            correct: 1,
            explanation:
              "Avalanche targets the most expensive debt first, which minimizes total interest paid — it's the mathematically optimal order.",
          },
          {
            id: 5,
            question: "What APR range does the lesson cite for payday loans?",
            options: ["10-15%", "20-28%", "50-100%", "300-400%+"],
            correct: 3,
            explanation:
              "Payday loans carry effective APRs of 300-400% or more — costly enough that the lesson's advice is simply: avoid them at all costs.",
          },
          {
            id: 6,
            question:
              "Two friends each borrow $10,000 — one at 5% APR, one at 24% APR. What's the approximate difference in their yearly interest cost?",
            options: ["$500", "$1,000", "$1,900", "$2,400"],
            correct: 2,
            explanation:
              "The 5% loan costs about $500 a year while the 24% loan costs about $2,400 — a $1,900 gap on the exact same debt. APR is nearly the whole story.",
          },
          {
            id: 7,
            question:
              "Why does paying your credit card statement in full every month make its 24% APR irrelevant?",
            options: [
              "Card companies waive APR for loyal customers",
              "Interest only accrues on balances you carry, so a fully paid statement is never charged interest",
              "Full payments earn enough rewards to offset the interest",
              "The APR only applies after two years",
            ],
            correct: 1,
            explanation:
              "Credit card interest applies to carried balances. Pay the full statement each month and there's no balance to charge — you keep the rewards, fraud protection, and credit building for free.",
          },
        ],
      },
      {
        id: "credit-scores",
        title: "Credit Scores Explained",
        subtitle: "The number that follows you everywhere",
        duration: "10 min",
        difficulty: "Intermediate",
        locked: false,
        videoUrl: null,
        content: `Your credit score is a three-digit number between 300 and 850 that tells lenders how risky it is to lend you money. It follows you everywhere: it sets your mortgage and car loan rates, landlords check it before renting to you, and some employers even peek at your credit history. A strong score is quietly one of the most valuable financial assets you can build in your 20s.\n\nThe FICO score — the one most lenders use — is built from five factors, each with a specific weight:\n• Payment history (35%) — do you pay your bills on time? One 30-day late payment can drop a good score by 50-100 points and stays on your report for 7 years\n• Amounts owed (30%) — mostly your credit utilization: the percentage of your available credit you're actually using. Under 30% is good; under 10% is excellent\n• Length of credit history (15%) — the average age of your accounts. This is why closing your oldest card can hurt\n• Credit mix (10%) — having different types of credit (a card plus a student loan, for example)\n• New credit (10%) — recent applications. Each hard inquiry dings you a few points, so don't open five cards in a month\n\nWhy it's worth real money: on a $240,000 mortgage, the rate difference between a 640 score and a 760 score can be close to a full percentage point — roughly $150 a month, or over $50,000 across a 30-year loan. Same house, same income, wildly different price.\n\nBuilding a score from thin credit (the young adult starter kit):\n1. Open a student or secured credit card (a secured card is backed by a small refundable deposit, so approval is easy), put one small recurring bill on it, and autopay the statement in full every month\n2. Ask a parent with good credit to add you as an authorized user on an old card — you inherit some of that account's history\n3. Keep utilization low: on a $1,000-limit card, that means keeping your reported balance under $300, ideally under $100\n\nWhat this means for you as a young adult: your score is built from boring, repeated behavior — on-time payments and low balances, sustained for years. Start now with one card and one autopaid bill, and by the time you need a mortgage, the number that follows you everywhere will be opening doors instead of closing them.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "What is the largest factor in your FICO score, and what is its weight?",
            options: [
              "Credit utilization, 35%",
              "Payment history, 35%",
              "Length of credit history, 30%",
              "New credit, 20%",
            ],
            correct: 1,
            explanation:
              "Payment history is 35% of your score — the single biggest slice. Lenders care most about one thing: do you pay on time, every time?",
          },
          {
            id: 2,
            question: "What does 'credit utilization' measure?",
            options: [
              "How many credit cards you own",
              "The percentage of your available credit you're actually using",
              "How often you use your card each month",
              "The total dollar amount of your credit limits",
            ],
            correct: 1,
            explanation:
              "Utilization is your balance divided by your credit limit. It drives most of the 'amounts owed' factor (30% of your score) — under 30% is good, under 10% is excellent.",
          },
          {
            id: 3,
            question:
              "Your credit card has a $1,000 limit and a $250 reported balance. What's your utilization, and how does it rate?",
            options: [
              "25% — good, under the 30% guideline",
              "25% — bad, anything over 10% is harmful",
              "40% — too high",
              "2.5% — excellent",
            ],
            correct: 0,
            explanation:
              "$250 ÷ $1,000 = 25%, which sits under the 30% 'good' threshold. Getting it under $100 (10%) would rate excellent.",
          },
          {
            id: 4,
            question: "What is the range of a FICO credit score?",
            options: ["0-100", "100-1000", "300-850", "500-900"],
            correct: 2,
            explanation:
              "FICO scores run from 300 to 850. Higher means less risky to lenders — and cheaper borrowing for you.",
          },
          {
            id: 5,
            question:
              "Which move does the lesson recommend for someone with thin or no credit history?",
            options: [
              "Take out a personal loan and repay it early",
              "Open five credit cards at once to raise your total limit",
              "Open a secured or student card, put one small bill on it, and autopay in full",
              "Avoid credit entirely until you need a mortgage",
            ],
            correct: 2,
            explanation:
              "One easy-approval card with a small autopaid recurring bill builds exactly what FICO rewards: a long streak of on-time payments at low utilization. Opening many cards at once hurts the new-credit factor.",
          },
          {
            id: 6,
            question: "Why can closing your oldest credit card hurt your score?",
            options: [
              "Closing a card counts as a missed payment",
              "It shortens your average account age and can raise your overall utilization",
              "Lenders are notified and flag your file",
              "It erases your payment history entirely",
            ],
            correct: 1,
            explanation:
              "Length of credit history is 15% of your score, and losing that card's limit shrinks your available credit — pushing utilization (30% of your score) up. Old cards are worth keeping open.",
          },
          {
            id: 7,
            question:
              "On the lesson's $240,000 mortgage example, roughly what does a 760 score save versus a 640 score over 30 years?",
            options: ["$1,500", "$5,000", "$50,000+", "$240,000"],
            correct: 2,
            explanation:
              "The near one-point rate difference is worth about $150 a month, which compounds to over $50,000 across the life of the loan — same house, wildly different price.",
          },
        ],
      },
      {
        id: "credit-cards",
        title: "Credit Cards Done Right",
        subtitle: "The tool that builds wealth or destroys it",
        duration: "12 min",
        difficulty: "Intermediate",
        locked: false,
        videoUrl: null,
        content: `A credit card is the most polarizing tool in personal finance, and both sides are right. Used carelessly, it's the fastest way to bury yourself in 24% debt. Used with discipline, it's free rewards, fraud protection, and the raw material of the credit score you built in the last lesson. The difference comes down to three rules.\n\nRule 1: Pay the statement balance — not the minimum.\nEvery statement shows three numbers:\n• Statement balance — everything you charged during the last billing cycle. This is the number that matters\n• Minimum payment — the tiny amount (often ~$25-50) that keeps your account in good standing\n• Current balance — the statement balance plus whatever you've charged since the cycle closed\n\nThe minimum payment is a trap dressed up as a courtesy. Carry a $2,000 balance at 24% APR and pay the ~$50 minimum, and you'll be paying for nearly seven years — over $2,000 in interest on a $2,000 purchase. Pay the full statement balance every month instead and you pay ZERO interest, ever. Here's the mechanism: the grace period — the window where new purchases accrue no interest — only exists when you pay in full. Carry even a small balance and interest starts running on everything immediately.\n\nRule 2: Match your rewards to your actual spending.\nCards are tailored to categories: dining cards pay 3-4% at restaurants, travel cards reward flights and hotels, grocery/gas cards cover the weekly errands, and flat-rate cards pay a simple 2% on everything. Look at where your money actually goes and pick accordingly — a young adult who eats out a lot might pair a no-annual-fee dining card with a flat 2% card for everything else, and quietly collect a few hundred dollars a year. The golden caveat: rewards are only profit if you never pay interest. Carrying a balance at 24% APR to earn 3% back is losing 21%.\n\nRule 3: Only charge what's already in your checking account.\nA credit card is a payment method, not a loan. Treat every swipe as if the money left checking that instant — if the cash isn't sitting there, you can't afford the purchase, no matter what your credit limit says. The practical tactic: set autopay to pay the statement in full so carrying a balance becomes structurally impossible.\n\nFollow these rules and your card quietly feeds the two biggest credit score factors from the last lesson — every autopaid statement builds payment history (35%) and low charging keeps utilization (30%) in the excellent zone.\n\nOne honest caveat: if you can't yet trust yourself to follow Rule 3 — if a $5,000 limit feels like $5,000 of spending money — you're not ready for a credit card, and that's fine. A debit card can't charge you interest, and there's no shame in using one while you build the habit. The card will still be there when you are.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question:
              "Which of the three numbers on your credit card statement should you pay every month to never owe interest?",
            options: [
              "The minimum payment",
              "The statement balance",
              "The current balance",
              "Half of the current balance",
            ],
            correct: 1,
            explanation:
              "Paying the full statement balance — everything from the last billing cycle — keeps your grace period alive, so you never pay a cent of interest. The minimum just keeps the account in good standing while interest piles up.",
          },
          {
            id: 2,
            question: "Under what condition does the grace period on new purchases exist?",
            options: [
              "Whenever you make at least the minimum payment",
              "During your first year with the card",
              "Only when you pay your statement balance in full",
              "It always applies to purchases under $100",
            ],
            correct: 2,
            explanation:
              "The grace period only exists when you pay in full. Carry even a small balance and interest starts accruing on everything immediately — including new purchases.",
          },
          {
            id: 3,
            question:
              "You carry a $2,000 balance at 24% APR and pay only the ~$50 minimum each month. Roughly what happens?",
            options: [
              "It's paid off in about a year with minimal interest",
              "It takes nearly seven years and costs over $2,000 in interest",
              "It takes two years and costs about $200 in interest",
              "The card company forgives the balance after five years",
            ],
            correct: 1,
            explanation:
              "At 24% APR, most of that $50 goes to interest, not principal. The debt drags on for nearly seven years and the interest alone exceeds the original $2,000 purchase — the minimum payment trap in action.",
          },
          {
            id: 4,
            question: "What is the lesson's core strategy for choosing rewards cards?",
            options: [
              "Always pick the card with the biggest sign-up bonus",
              "Open one card in every category to maximize coverage",
              "Match cards to where your money actually goes, like pairing a dining card with a flat 2% card",
              "Only use cards with annual fees, since they have the best rewards",
            ],
            correct: 2,
            explanation:
              "Cards are tailored to spending categories — dining, travel, groceries, gas, or flat-rate. Look at your actual spending and pick accordingly, like a no-annual-fee dining card plus a flat 2% card for everything else.",
          },
          {
            id: 5,
            question:
              "You carry a balance at 24% APR on a card that earns 3% cash back. What's your net result?",
            options: [
              "Earning 3%, since rewards are separate from interest",
              "Breaking even",
              "Losing 21%",
              "Losing 3%",
            ],
            correct: 2,
            explanation:
              "Paying 24% in interest to earn 3% in rewards nets out to losing 21%. Rewards are only profit if you never pay interest — a carried balance wipes them out many times over.",
          },
          {
            id: 6,
            question: "What is the lesson's discipline rule for credit card spending?",
            options: [
              "Never spend more than half your credit limit",
              "Only charge what's already sitting in your checking account",
              "Keep purchases under $500 per month",
              "Use the card only for emergencies",
            ],
            correct: 1,
            explanation:
              "Treat the card as a payment method, not a loan: every swipe should be money that's already in checking. Pair it with autopay-in-full and carrying a balance becomes structurally impossible.",
          },
          {
            id: 7,
            question:
              "Why does using a credit card with autopay-in-full and light spending strengthen your credit score?",
            options: [
              "Card companies report bonus points to the credit bureaus",
              "It feeds the two biggest FICO factors: on-time payments build payment history and low balances keep utilization down",
              "Autopay counts as a separate type of credit, improving your credit mix",
              "It lengthens your credit history faster than manual payments",
            ],
            correct: 1,
            explanation:
              "Every autopaid statement adds to payment history (35% of your score) and charging lightly keeps utilization (30%) in the excellent zone — the same two factors from the credit scores lesson, built automatically.",
          },
        ],
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
          {
            id: 6,
            question: "What is escrow?",
            options: [
              "The loan's interest rate lock",
              "An account where money is held for property taxes and insurance",
              "The bank's profit on the loan",
              "A penalty for late payments",
            ],
            correct: 1,
            explanation:
              "Escrow is a holding account: part of your monthly payment sits there so property taxes and homeowner's insurance get paid when they come due.",
          },
          {
            id: 7,
            question: "Why does even a small difference in mortgage interest rate matter so much?",
            options: [
              "Rates change your down payment",
              "Interest accrues over 15-30 years, so a small rate change compounds into tens of thousands of dollars",
              "Lenders penalize borrowers who get low rates",
              "It doesn't — only the principal matters",
            ],
            correct: 1,
            explanation:
              "On a $240,000 loan at 7% for 30 years, interest alone totals roughly $335,000 — more than the amount borrowed. Stretch any rate difference across three decades and the gap becomes enormous.",
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
          {
            id: 6,
            question:
              "You take a $240,000 conventional loan with 10% down. Roughly what extra monthly cost should you expect?",
            options: [
              "Nothing extra",
              "$100-200 in PMI",
              "$500 in MIP",
              "A one-time funding fee instead",
            ],
            correct: 1,
            explanation:
              "Under 20% down triggers PMI at roughly 0.5-1% of the loan per year — about $100-200 a month on a $240,000 loan, on top of the mortgage payment itself.",
          },
          {
            id: 7,
            question:
              "Beyond borrowing less money, why does a 20% down payment lower your monthly cost?",
            options: [
              "It lowers your property taxes",
              "It eliminates PMI entirely",
              "It automatically shortens the loan term",
              "It removes closing costs",
            ],
            correct: 1,
            explanation:
              "PMI only exists to protect the lender when you put down less than 20%. Reach that threshold up front and the extra monthly fee never appears at all.",
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
          {
            id: 6,
            question:
              "Your credit score is 540. What's the minimum down payment for an FHA loan?",
            options: ["0%", "3.5%", "10%", "You can't qualify at all"],
            correct: 2,
            explanation:
              "The 3.5% minimum requires a 580+ score. Scores between 500 and 579 are still accepted, but the down payment requirement rises to 10%.",
          },
          {
            id: 7,
            question: "Why can FHA lenders offer relaxed credit and down payment requirements?",
            options: [
              "They charge much higher interest rates",
              "The government covers the lender's losses if the borrower defaults",
              "FHA borrowers rarely default",
              "The loans are smaller than conventional loans",
            ],
            correct: 1,
            explanation:
              "The FHA insures the loan, so the bank's risk drops dramatically — if a borrower defaults, the government absorbs the loss. That safety net is what lets lenders say yes to riskier borrowers.",
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
          {
            id: 6,
            question:
              "How many continuous days of service qualify an active-duty member for a VA loan?",
            options: ["30+", "90+", "365+", "6 years"],
            correct: 1,
            explanation:
              "Active-duty members qualify after 90+ continuous days. Veterans' requirements vary by era, and National Guard/Reserves generally need 6 years or 90 days of active duty.",
          },
          {
            id: 7,
            question:
              "Over 30 years, roughly how much can a VA borrower save versus comparable loans, per the lesson's $300,000 comparison?",
            options: [
              "$500",
              "$5,000",
              "More than $50,000",
              "Nothing — the funding fee cancels it out",
            ],
            correct: 2,
            explanation:
              "Skipping a ~$130-140 monthly insurance premium for decades adds up — the lesson's comparison puts the savings above $50,000, even accounting for the one-time funding fee.",
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
          {
            id: 6,
            question:
              "You want to buy a rental investment property in a USDA-eligible small town. Will a USDA loan work?",
            options: [
              "Yes, any property in an eligible area qualifies",
              "No — USDA loans are for primary residences only",
              "Yes, but only with 20% down",
              "No — rental properties require VA loans",
            ],
            correct: 1,
            explanation:
              "USDA loans exist to promote homeownership, so the property must be your primary residence — no investment properties or vacation homes.",
          },
          {
            id: 7,
            question: "What credit score does the lesson cite for automatic USDA approval?",
            options: ["580+", "620+", "640+", "740+"],
            correct: 2,
            explanation:
              "A 640+ score typically gets automatic approval, though USDA credit requirements are flexible overall.",
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
          {
            id: 6,
            question:
              "On the lesson's $250,000 comparison at 6.5%, how much higher is the 15-year monthly payment than the 30-year?",
            options: ["$99", "$299", "$599", "$1,099"],
            correct: 2,
            explanation:
              "$2,179 versus $1,580 — a $599 higher monthly payment. In exchange, you pay about $177,000 less in total interest and build equity much faster.",
          },
          {
            id: 7,
            question: "What limits how much an ARM's interest rate can rise?",
            options: [
              "Nothing — it can rise without limit",
              "Caps on each adjustment and over the loan's lifetime",
              "The original teaser rate",
              "Federal law freezes rates after 10 years",
            ],
            correct: 1,
            explanation:
              "ARMs carry caps restricting how much the rate can increase per adjustment period and in total over the life of the loan — your protection against runaway payments.",
          },
        ],
      },
      {
        id: "refinancing",
        title: "Refinancing Your Mortgage",
        subtitle: "When and why to restructure your loan",
        duration: "10 min",
        difficulty: "Intermediate",
        locked: false,
        videoUrl: null,
        content: `Refinancing means replacing your existing mortgage with a brand-new loan — usually to get a lower rate, a different term, or a different structure. The old loan gets paid off by the new one, and you start making payments under the new terms. Done right, it can save tens of thousands of dollars. Done carelessly, it just pays your lender twice.\n\nWhen refinancing makes sense:\n• Rates dropped — the classic trigger. A common rule of thumb: consider refinancing when you can cut your rate by about 1 percentage point or more. On a $250,000 loan, dropping from 7.5% to 6.5% saves roughly $170 a month\n• Removing PMI — if you bought with less than 20% down, you're paying private mortgage insurance. Once you've built 20% equity (through payments or rising home value), refinancing can shed PMI — often $100-250 a month\n• Escaping an ARM — if your adjustable-rate mortgage is about to exit its fixed period and rates are climbing, refinancing into a fixed rate locks in predictability before your payment jumps\n• Shortening the term — refinancing a 30-year into a 15-year builds equity dramatically faster if you can handle the higher payment\n\nThe catch: refinancing isn't free. You pay closing costs all over again — typically 2-5% of the loan amount, so $5,000-12,500 on a $250,000 loan.\n\nThat's why break-even math is the heart of every refinance decision:\n\nBreak-even months = closing costs ÷ monthly savings\n\nExample: closing costs of $6,000, monthly savings of $200. $6,000 ÷ $200 = 30 months. If you'll stay in the home longer than 2.5 years, the refinance pays for itself and everything after is profit. Planning to move in 2 years? You'd eat $1,200 of unrecovered costs — skip it.\n\nOne trap to watch: resetting the clock. If you're 8 years into a 30-year loan and refinance into a fresh 30-year, you now have 38 total years of interest payments. Even at a lower rate, stretching the timeline can cost more overall. Ask the lender to match your remaining term, or just pay extra each month.\n\nWhat this means for you as a young adult: you probably won't refinance anything soon, but understanding this now changes how you'll buy. Your first mortgage rate isn't a life sentence — buy when YOU'RE ready, not when rates are perfect, knowing you can refinance if rates fall later.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "What does refinancing a mortgage actually mean?",
            options: [
              "Negotiating a lower rate on your existing loan",
              "Replacing your existing mortgage with a brand-new loan under new terms",
              "Skipping payments during financial hardship",
              "Selling the home back to the bank",
            ],
            correct: 1,
            explanation:
              "A refinance pays off your old mortgage with an entirely new loan — new rate, new term, and a fresh set of closing costs. It's a replacement, not a renegotiation.",
          },
          {
            id: 2,
            question:
              "What rate drop does the lesson's rule of thumb suggest before considering a refinance?",
            options: [
              "0.1 percentage point",
              "About 1 percentage point or more",
              "3 percentage points",
              "Any drop at all",
            ],
            correct: 1,
            explanation:
              "Around 1 point of savings (like 7.5% to 6.5%) is usually enough for the monthly savings to overcome the closing costs within a reasonable time.",
          },
          {
            id: 3,
            question:
              "Your refinance has $6,000 in closing costs and saves $200 per month. What's your break-even point?",
            options: ["12 months", "20 months", "30 months", "60 months"],
            correct: 2,
            explanation:
              "$6,000 ÷ $200 = 30 months. Stay past 2.5 years and the refinance turns profitable; leave earlier and you never recover the costs.",
          },
          {
            id: 4,
            question: "How can refinancing eliminate PMI?",
            options: [
              "PMI is automatically waived on any refinance",
              "Once you have 20% equity, the new loan doesn't require mortgage insurance",
              "The lender rolls PMI into the interest rate",
              "PMI transfers to the new loan at half price",
            ],
            correct: 1,
            explanation:
              "PMI exists to protect lenders on low-equity loans. With 20% equity — from payments or a rising home value — a new loan doesn't need it, often saving $100-250 a month.",
          },
          {
            id: 5,
            question: "Why might an ARM holder refinance into a fixed-rate loan?",
            options: [
              "Fixed rates are always lower than ARM rates",
              "To lock in a predictable payment before the ARM's fixed period ends and rates adjust upward",
              "ARMs legally must be refinanced after 5 years",
              "To remove the loan's rate caps",
            ],
            correct: 1,
            explanation:
              "When an ARM's fixed window is closing and rates are climbing, refinancing to a fixed rate trades the coming uncertainty for a locked, predictable payment.",
          },
          {
            id: 6,
            question:
              "Your break-even is 30 months, but you plan to sell the house in 24 months. Should you refinance?",
            options: [
              "Yes — savings always beat costs eventually",
              "Yes — selling resets the break-even math",
              "No — you'd move before recovering the closing costs, losing money overall",
              "No — you can never refinance within 5 years of selling",
            ],
            correct: 2,
            explanation:
              "At $200 a month you'd recover only $4,800 of the $6,000 in costs before selling — about $1,200 lost. The break-even point only matters if you'll stay past it.",
          },
          {
            id: 7,
            question:
              "Why can refinancing 8 years into a 30-year loan with a fresh 30-year term cost more overall, even at a lower rate?",
            options: [
              "New loans carry higher property taxes",
              "It stretches your total payoff to 38 years, adding many extra years of interest",
              "The lower rate only applies for the first year",
              "Lenders charge double closing costs on second mortgages",
            ],
            correct: 1,
            explanation:
              "Resetting the clock means paying interest over 38 total years instead of 30. The longer timeline can outweigh the lower rate — so match your remaining term or pay extra monthly.",
          },
        ],
      },
      {
        id: "home-buying-process",
        title: "The Home Buying Process",
        subtitle: "From pre-approval to closing day",
        duration: "14 min",
        difficulty: "Intermediate",
        locked: false,
        videoUrl: null,
        content: `Buying a home feels overwhelming mostly because nobody explains the sequence. Here's the whole journey as a timeline — six steps, typically 30-60 days from accepted offer to keys in hand.\n\nStep 1: Pre-approval (before you look at a single house)\nA lender reviews your income, debts, and credit, then issues a letter stating how much they'll lend you. This is different from pre-qualification, which is just an unverified estimate. Pre-approval tells you your real budget and — critically — makes sellers take your offers seriously. In a competitive market, offers without one often get ignored.\n\nStep 2: House hunting\nWork with a buyer's agent (typically paid from the seller's side, so their help costs you little or nothing). Make two lists: needs (non-negotiable) and wants (nice to have). Falling in love with a house before checking the budget is how people end up house-poor.\n\nStep 3: The offer\nYou propose a price and terms. To show you're serious, you include earnest money — a deposit of roughly 1-3% of the price held in escrow, credited back to you at closing. Smart offers include contingencies: escape hatches that let you back out (with your earnest money) if the inspection, appraisal, or financing goes sideways.\n\nStep 4: Inspection\nFor $300-500, a professional inspector spends hours documenting the home's real condition — roof, foundation, plumbing, electrical. Find something serious? You can negotiate repairs, ask for a price cut, or walk away under your inspection contingency. Never skip this to make an offer "more competitive" — that $400 can save you from a $40,000 foundation problem.\n\nStep 5: Appraisal\nYour lender orders an independent estimate of the home's value, because the house is their collateral — they won't lend $310,000 on a home worth $295,000. If the appraisal comes in low, you can cover the gap in cash, renegotiate the price with the seller, or exit via your appraisal contingency.\n\nStep 6: Closing\nYou do a final walkthrough, sign a mountain of documents, and pay closing costs — typically 2-5% of the purchase price ($6,000-15,000 on a $300,000 home) on top of your down payment. Then you get the keys. The house is yours.\n\nWhat this means for you as a young adult: the process rewards preparation years in advance. The credit score you're building now sets your rate, your emergency fund becomes earnest money and closing costs, and knowing this timeline means that when the day comes, you'll walk in as the most prepared buyer in the room.`,
        transcript: null,
        quiz: [
          {
            id: 1,
            question: "What is the first step in the home buying process?",
            options: [
              "Touring houses to see what you like",
              "Making an offer",
              "Getting pre-approved by a lender",
              "Hiring an inspector",
            ],
            correct: 2,
            explanation:
              "Pre-approval comes before you look at a single house — it establishes your real budget and makes sellers treat your offers as credible.",
          },
          {
            id: 2,
            question: "How is pre-approval different from pre-qualification?",
            options: [
              "They're the same thing with different names",
              "Pre-approval means the lender verified your income, debts, and credit; pre-qualification is just an unverified estimate",
              "Pre-qualification is more rigorous than pre-approval",
              "Pre-approval is only required for FHA loans",
            ],
            correct: 1,
            explanation:
              "Pre-qualification is a quick guess based on what you self-report. Pre-approval is a verified commitment — which is why sellers only take one of them seriously.",
          },
          {
            id: 3,
            question: "What is earnest money?",
            options: [
              "The inspector's fee",
              "A 1-3% deposit held in escrow that shows the seller you're serious, credited back at closing",
              "A non-refundable gift to the seller",
              "Another name for the down payment",
            ],
            correct: 1,
            explanation:
              "Earnest money backs your offer with real cash. It sits in escrow and counts toward your purchase at closing — and contingencies let you reclaim it if the deal falls through properly.",
          },
          {
            id: 4,
            question: "Why does the lender order an appraisal?",
            options: [
              "To find repairs the seller must make",
              "To confirm the home is worth the loan amount, since the house is their collateral",
              "To set the property tax rate",
              "To verify the buyer's income",
            ],
            correct: 1,
            explanation:
              "If you default, the lender's protection is the house itself — so they won't lend more than an independent appraiser says it's worth.",
          },
          {
            id: 5,
            question:
              "You offer $310,000 but the appraisal comes in at $295,000. Which is NOT one of your options?",
            options: [
              "Cover the $15,000 gap in cash",
              "Renegotiate the price with the seller",
              "Exit the deal through your appraisal contingency",
              "Require the lender to loan the full $310,000 anyway",
            ],
            correct: 3,
            explanation:
              "The lender won't lend beyond the appraised value — the home is their collateral. Your real choices are paying the gap yourself, renegotiating, or walking away via the contingency.",
          },
          {
            id: 6,
            question: "What do closing costs typically run on a $300,000 home?",
            options: [
              "$500-1,000",
              "$1,000-3,000",
              "$6,000-15,000 (2-5% of the price)",
              "$60,000 (20% of the price)",
            ],
            correct: 2,
            explanation:
              "Closing costs run 2-5% of the purchase price — $6,000-15,000 here — and come due on top of your down payment, which is why buyers need cash beyond the down payment alone.",
          },
          {
            id: 7,
            question:
              "Why does the lesson warn against skipping the inspection to make your offer 'more competitive'?",
            options: [
              "Skipping it is illegal in most states",
              "It delays closing by several months",
              "A $300-500 inspection can reveal hidden problems that would cost tens of thousands after you own the home",
              "Sellers are required to pay for it anyway",
            ],
            correct: 2,
            explanation:
              "The inspection is your only professional look at the home's true condition before it becomes your problem. A $400 fee that catches a $40,000 foundation issue is the best money in the whole process.",
          },
        ],
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
