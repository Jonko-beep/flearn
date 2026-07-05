import { useState } from "react";

// ── QUIZ DATA ──
const QUIZZES = {
  "intro-investing": [
    { q: "What is the primary difference between saving and investing?", options: ["Saving earns more money than investing", "Investing puts money into assets expected to grow, while saving preserves cash", "There is no difference", "Saving is riskier than investing"], answer: 1 },
    { q: "If you invest $5,000 at an average 8% annual return, approximately how much would you have after 10 years?", options: ["$5,500", "$8,000", "$10,795", "$15,000"], answer: 2 },
    { q: "What does diversification mean?", options: ["Putting all your money in one stock", "Only investing in gold", "Spreading investments across different assets to reduce risk", "Investing only in safe assets"], answer: 2 },
    { q: "What is the biggest advantage young investors have?", options: ["More money to invest", "Better stock picks", "Time for compound interest to work", "Access to better brokers"], answer: 2 },
    { q: "Higher potential returns usually come with:", options: ["Lower risk", "No risk", "Higher risk", "Government guarantees"], answer: 2 },
  ],
  "tangible-assets": [
    { q: "Which of the following is a tangible asset?", options: ["A stock certificate", "A mutual fund", "An ounce of gold", "A savings account"], answer: 2 },
    { q: "Why is gold often called a 'safe haven' asset?", options: ["It earns dividends", "Investors flock to it during uncertainty and market crashes", "The government guarantees its price", "It always goes up in value"], answer: 1 },
    { q: "What is a downside of tangible assets compared to stocks?", options: ["They have no intrinsic value", "They don't produce income like dividends", "They can't be sold", "They always lose value over time"], answer: 1 },
    { q: "What percentage of a portfolio do experts suggest allocating to tangible assets for young investors?", options: ["0%", "5-15%", "50-60%", "100%"], answer: 1 },
    { q: "Silver has additional demand beyond investment because of its:", options: ["Rarity", "Government backing", "Industrial uses in electronics and solar panels", "Historical significance"], answer: 2 },
  ],
  "stocks-101": [
    { q: "When you buy a stock, you are buying:", options: ["A loan to a company", "A partial ownership stake in a company", "A government bond", "An insurance policy"], answer: 1 },
    { q: "What is a ticker symbol?", options: ["A company's tax ID", "The shorthand code for a stock on the exchange", "A stock's price", "The CEO's signature"], answer: 1 },
    { q: "What are the two main ways to make money from stocks?", options: ["Fees and penalties", "Capital appreciation and dividends", "Interest and insurance", "Taxes and rebates"], answer: 1 },
    { q: "The stock market has historically returned about what percentage per year on average?", options: ["2%", "5%", "10%", "25%"], answer: 2 },
    { q: "What does the lesson say about day trading?", options: ["It's the best way to build wealth", "It's essentially gambling compared to long-term investing", "It's recommended for beginners", "It guarantees returns"], answer: 1 },
  ],
  "budgeting-basics": [
    { q: "In the 50/30/20 rule, what does the '20%' represent?", options: ["Needs", "Wants", "Savings & Investing", "Taxes"], answer: 2 },
    { q: "What is the first step to creating a budget?", options: ["Open a savings account", "Track every dollar for one month", "Cut all spending", "Get a second job"], answer: 1 },
    { q: "What does the lesson say the goal of budgeting is?", options: ["Perfection", "Restriction", "Awareness", "Spending less than $100/month"], answer: 2 },
    { q: "What are 'leaks' in a budget?", options: ["Bank errors", "Forgotten subscriptions, impulse purchases, convenience spending", "Tax deductions", "Investment losses"], answer: 1 },
    { q: "For college students with needs covered by scholarships, what advantage do they have?", options: ["They don't need a budget", "They can push their savings rate much higher", "They should spend more on wants", "They can skip the emergency fund"], answer: 1 },
  ],
  "hysa": [
    { q: "What is the main advantage of a HYSA over a regular savings account?", options: ["Better mobile app", "Significantly higher interest rates", "Free checks", "No minimum balance"], answer: 1 },
    { q: "How much would $5,000 earn in one year at a 4.5% APY HYSA?", options: ["$2.50", "$25", "$225", "$2,250"], answer: 2 },
    { q: "HYSA accounts are typically FDIC insured up to:", options: ["$10,000", "$100,000", "$250,000", "$1,000,000"], answer: 2 },
    { q: "What should you NOT keep in a HYSA?", options: ["Emergency fund", "Short-term savings", "Long-term investments meant for 2+ years", "Moving cost savings"], answer: 2 },
    { q: "The lesson describes a HYSA as:", options: ["An investment strategy", "A foundation, not an investment strategy", "A replacement for stocks", "A retirement account"], answer: 1 },
  ],
  "emergency-fund": [
    { q: "What is the standard emergency fund recommendation?", options: ["$500", "$1,000", "3-6 months of essential expenses", "1 year of income"], answer: 2 },
    { q: "Where should you keep your emergency fund?", options: ["Under your mattress", "In stocks", "In a high-yield savings account", "In cryptocurrency"], answer: 2 },
    { q: "What is Phase 1 of building an emergency fund?", options: ["$5,000", "$500", "$100", "3 months expenses"], answer: 1 },
    { q: "Beyond financial protection, what does an emergency fund provide?", options: ["Tax benefits", "Mental freedom and confidence", "Investment returns", "Credit score improvement"], answer: 1 },
    { q: "What rule does the lesson emphasize about emergency funds?", options: ["Invest it aggressively", "Never invest money you can't afford to lose", "Keep it in cash only", "Spend it on wants if needed"], answer: 1 },
  ],
  "home-loans-intro": [
    { q: "What serves as collateral for a mortgage?", options: ["Your car", "Your savings account", "The home itself", "Your credit score"], answer: 2 },
    { q: "On a $300,000 home with 20% down, how much do you borrow?", options: ["$300,000", "$260,000", "$240,000", "$200,000"], answer: 2 },
    { q: "What is 'principal' in a mortgage?", options: ["The interest rate", "The actual amount borrowed", "The monthly payment", "The down payment"], answer: 1 },
    { q: "On a 30-year mortgage at 7% on $240,000, approximately how much total interest will you pay?", options: ["$24,000", "$100,000", "$240,000", "$335,000"], answer: 3 },
    { q: "What are closing costs typically?", options: ["0.5% of purchase price", "2-5% of purchase price", "10% of purchase price", "There are no closing costs"], answer: 1 },
  ],
  "conventional-loans": [
    { q: "Conventional loans are backed by:", options: ["The FHA", "The VA", "Private lenders, not government agencies", "The USDA"], answer: 2 },
    { q: "What triggers PMI on a conventional loan?", options: ["Putting more than 20% down", "Putting less than 20% down", "Having a high credit score", "Buying a new construction home"], answer: 1 },
    { q: "PMI protects:", options: ["The borrower", "The lender", "The real estate agent", "The home seller"], answer: 1 },
    { q: "At what equity percentage does PMI automatically drop off?", options: ["10%", "15%", "20%", "22%"], answer: 3 },
    { q: "What credit score typically gets you the best conventional loan rates?", options: ["580+", "620+", "700+", "740+"], answer: 3 },
  ],
  "fha-loans": [
    { q: "FHA loans are insured by:", options: ["Private companies", "The Federal Housing Administration", "Fannie Mae", "Your local bank"], answer: 1 },
    { q: "What is the minimum down payment for an FHA loan with a 580+ credit score?", options: ["0%", "3%", "3.5%", "10%"], answer: 2 },
    { q: "What is the major drawback of FHA mortgage insurance?", options: ["It's very expensive upfront", "It stays for the life of the loan", "It only lasts 5 years", "It's optional"], answer: 1 },
    { q: "The annual MIP rate on FHA loans is approximately:", options: ["0.10%", "0.35%", "0.55%", "1.75%"], answer: 2 },
    { q: "When might an FHA loan make more sense than conventional?", options: ["When you have excellent credit", "When your credit score is below 700 or you can only put 3.5% down", "When you're buying a luxury home", "When you have 20% down"], answer: 1 },
  ],
  "va-loans": [
    { q: "What down payment do VA loans require?", options: ["3%", "3.5%", "10%", "Zero"], answer: 3 },
    { q: "VA loans are available to:", options: ["All U.S. citizens", "Anyone with good credit", "Active-duty, veterans, and eligible surviving spouses", "First-time homebuyers only"], answer: 2 },
    { q: "Instead of monthly mortgage insurance, VA loans charge:", options: ["PMI", "MIP", "A one-time funding fee", "Nothing at all"], answer: 2 },
    { q: "Who is exempt from the VA funding fee?", options: ["All veterans", "First-time users", "Veterans with service-connected disabilities", "Anyone with 20% down"], answer: 2 },
    { q: "Why do VA borrowers often have lower monthly payments despite borrowing more?", options: ["Lower interest rates only", "No monthly insurance premium", "Shorter loan terms", "Government subsidies"], answer: 1 },
  ],
  "usda-loans": [
    { q: "What percentage of U.S. land area is USDA-eligible?", options: ["About 25%", "About 50%", "About 75%", "About 97%"], answer: 3 },
    { q: "USDA loans require a down payment of:", options: ["Zero", "3%", "3.5%", "5%"], answer: 0 },
    { q: "What income requirement exists for USDA loans?", options: ["Minimum $100,000 income", "No income requirements", "Household income can't exceed 115% of area median", "Must earn below poverty line"], answer: 2 },
    { q: "The annual fee for USDA loans is:", options: ["0.35%", "0.55%", "1%", "1.75%"], answer: 0 },
    { q: "Why does the lesson say USDA loans are underutilized?", options: ["They have bad rates", "People assume they don't qualify", "They're only for farms", "They require perfect credit"], answer: 1 },
  ],
  "fixed-vs-arm": [
    { q: "With a fixed-rate mortgage, your interest rate:", options: ["Changes annually", "Changes monthly", "Never changes", "Decreases over time"], answer: 2 },
    { q: "In a 5/1 ARM, what does '5/1' mean?", options: ["5% rate for 1 year", "Fixed for 5 years, adjusts every 1 year after", "5 payments of 1%", "5 points below prime for 1 year"], answer: 1 },
    { q: "How much total interest is saved by choosing a 15-year over a 30-year on a $250,000 loan at 6.5%?", options: ["$50,000", "$100,000", "$177,000", "$250,000"], answer: 2 },
    { q: "When might an ARM be a good choice?", options: ["When you plan to stay in the home for 30 years", "When you plan to sell or refinance within 5-7 years", "When interest rates are rising", "ARMs are never a good choice"], answer: 1 },
    { q: "What contributed to the 2008 housing crisis related to ARMs?", options: ["Rates were too low", "People with 1-year ARMs saw payments double when rates rose", "ARMs were banned", "Fixed rates increased"], answer: 1 },
  ],
};

// ── CATEGORY & LESSON DATA ──
const CATEGORIES = [
  {
    id: "investing",
    title: "Investing",
    emoji: "\u{1F4C8}",
    color: "#0D9488",
    description: "Learn how to grow your wealth through stocks, tangible assets, and smart strategies.",
    lessons: [
      { id: "intro-investing", title: "What Is Investing?", subtitle: "Why your money should work for you", duration: "8 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `Investing is the act of putting your money into assets with the expectation that they'll grow in value over time. Unlike saving \u2014 where your money sits and slowly loses purchasing power to inflation \u2014 investing gives your money the chance to compound and build real wealth.\n\nThink of it this way: if you earned $5,000 during a summer job and put it in a regular checking account, in 10 years you'd still have $5,000 (minus whatever inflation ate away). But if you invested that same $5,000 and earned an average 8% annual return, you'd have roughly $10,795 \u2014 more than double \u2014 without lifting a finger.\n\nKey concepts:\n\u2022 Risk vs. Reward \u2014 higher potential returns usually come with higher risk\n\u2022 Time Horizon \u2014 the longer you invest, the more compounding works in your favor\n\u2022 Diversification \u2014 don't put all your eggs in one basket\n\nThe biggest advantage young investors have is TIME. Starting at 20 instead of 30 can mean hundreds of thousands of dollars more by retirement, thanks to compound interest.` },
      { id: "tangible-assets", title: "Tangible Assets", subtitle: "Gold, silver, and physical investments", duration: "12 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `Tangible assets are physical items that hold value \u2014 things you can actually touch and hold. The most common examples are precious metals like gold and silver, but tangible assets also include real estate, collectibles, art, and even commodities like oil.\n\nWhy do people invest in tangible assets?\n\u2022 Inflation hedge \u2014 gold has historically maintained purchasing power over centuries\n\u2022 Portfolio diversification \u2014 tangible assets often move differently than stocks\n\u2022 Intrinsic value \u2014 unlike a stock certificate, gold has inherent worth\n\nGold: Often called a "safe haven" asset. When markets crash or uncertainty spikes, investors flock to gold. An ounce of gold in 1970 cost about $35. Today it's over $2,000. That's not just price appreciation \u2014 it reflects how the dollar has lost purchasing power.\n\nSilver: More volatile than gold but also more affordable to start with. Silver has industrial uses (electronics, solar panels) which adds demand beyond just investment.\n\nThe downsides? Tangible assets don't produce income like dividends from stocks or interest from bonds. Storage and insurance can cost money. And prices can be volatile in the short term.\n\nFor young investors, allocating a small portion (5-15%) of a portfolio to tangible assets can provide valuable diversification.` },
      { id: "stocks-101", title: "Stocks 101", subtitle: "Owning a piece of a company", duration: "10 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `When you buy a stock, you're buying a tiny piece of ownership in a company. If that company grows and becomes more profitable, your piece becomes more valuable.\n\nKey terms you need to know:\n\u2022 Share \u2014 a single unit of ownership in a company\n\u2022 Ticker Symbol \u2014 the shorthand code for a stock (AAPL = Apple, TSLA = Tesla)\n\u2022 Market Cap \u2014 the total value of all a company's shares combined\n\u2022 Dividend \u2014 a payment some companies make to shareholders from their profits\n\nHow do you actually make money from stocks?\n1. Capital Appreciation \u2014 you buy at $50, sell at $80, pocket the $30 difference\n2. Dividends \u2014 some companies pay you quarterly just for holding their stock\n\nThe stock market has historically returned about 10% per year on average (roughly 7% after inflation). That's better than almost any other asset class over long periods. But "on average" is doing heavy lifting there \u2014 individual years can swing wildly, from +30% to -40%.\n\nThe key lesson: investing in stocks is a long game. Day trading and trying to time the market is essentially gambling. Consistent, long-term investing in diversified holdings is how real wealth is built.` },
      { id: "value-investing", title: "Value Investing", subtitle: "Finding undervalued opportunities", duration: "15 min", difficulty: "Intermediate", locked: true },
      { id: "portfolio-building", title: "Building a Portfolio", subtitle: "Diversification and asset allocation", duration: "12 min", difficulty: "Intermediate", locked: true },
    ],
  },
  {
    id: "saving-budgeting",
    title: "Saving & Budgeting",
    emoji: "\u{1F4B0}",
    color: "#7C3AED",
    description: "Master the fundamentals of managing your money, building savings, and budgeting smart.",
    lessons: [
      { id: "budgeting-basics", title: "Budgeting Basics", subtitle: "Where is your money actually going?", duration: "8 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `A budget isn't a restriction \u2014 it's a plan that tells your money where to go instead of wondering where it went. Most people who say "I don't know where my money goes" simply don't have a budget.\n\nThe 50/30/20 Rule (a great starting point):\n\u2022 50% Needs \u2014 rent, food, transportation, insurance, minimum debt payments\n\u2022 30% Wants \u2014 dining out, entertainment, subscriptions, hobbies\n\u2022 20% Savings & Investing \u2014 emergency fund, retirement accounts, investments\n\nFor college students, this might look different. If your needs are covered by scholarships or family, you might be able to push that savings rate much higher \u2014 and that's a huge advantage.\n\nHow to actually start:\n1. Track every dollar for one month \u2014 use an app, spreadsheet, or notebook\n2. Categorize your spending into needs, wants, and savings\n3. Identify leaks \u2014 subscriptions you forgot about, impulse purchases, convenience spending\n4. Set specific targets for each category\n5. Review and adjust monthly\n\nThe goal isn't perfection. It's awareness. Once you see where your money goes, you naturally start making better decisions.` },
      { id: "hysa", title: "High-Yield Savings Accounts", subtitle: "Make your savings actually earn something", duration: "10 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `If your money is sitting in a regular bank savings account earning 0.01% interest, you're essentially losing money to inflation every single day. A high-yield savings account (HYSA) is one of the simplest financial upgrades you can make.\n\nWhat is a HYSA?\nIt's a savings account \u2014 usually at an online bank \u2014 that pays significantly higher interest rates than traditional banks. While your local bank might offer 0.01-0.05% APY, HYSAs currently offer 4-5% APY.\n\nLet's do the math on $5,000:\n\u2022 Regular savings (0.05% APY): earns $2.50/year\n\u2022 High-yield savings (4.5% APY): earns $225/year\n\nThat's not life-changing money, but it's free money for doing basically nothing different.\n\nWhere to open one:\nOnline banks like Marcus (Goldman Sachs), Ally, or Capital One offer competitive HYSA rates. They're FDIC insured up to $250,000 \u2014 meaning your money is just as safe as at any traditional bank.\n\nWhat to keep in a HYSA:\n\u2022 Your emergency fund (3-6 months of expenses)\n\u2022 Short-term savings goals (car, vacation, moving costs)\n\u2022 Money you'll need within 1-2 years\n\nWhat NOT to keep there:\n\u2022 Long-term investments \u2014 over 2+ years, the stock market historically outperforms savings rates\n\u2022 Money you need daily \u2014 keep that in checking for easy access\n\nA HYSA is not an investment strategy. It's a foundation. Get your emergency fund set, then focus on investing for real growth.` },
      { id: "emergency-fund", title: "Building an Emergency Fund", subtitle: "Your financial safety net", duration: "8 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `An emergency fund is money set aside specifically for unexpected expenses \u2014 car repairs, medical bills, job loss, or any surprise that would otherwise force you into debt.\n\nHow much do you need?\nThe standard advice is 3-6 months of essential expenses. For a college student, that might be $2,000-5,000. For someone with rent and bills, it could be $6,000-15,000.\n\nStart smaller if you need to:\n\u2022 Phase 1: $500 (covers most minor emergencies)\n\u2022 Phase 2: $1,000 (handles a car repair or medical copay)\n\u2022 Phase 3: 1 month of expenses\n\u2022 Phase 4: 3-6 months of expenses\n\nWhere to keep it: In a high-yield savings account. It needs to be accessible (not locked in investments) but earning something while it sits there.\n\nThe psychology matters: An emergency fund isn't just financial protection \u2014 it's mental freedom. Knowing you can handle a $1,000 surprise without panic changes how you move through life. It gives you the confidence to take calculated risks, like starting a business or switching careers, because you have a cushion.\n\nRule: Never invest money you can't afford to lose. Your emergency fund is NOT investment capital.` },
      { id: "debt-management", title: "Understanding Debt", subtitle: "Good debt vs. bad debt", duration: "11 min", difficulty: "Intermediate", locked: true },
      { id: "credit-scores", title: "Credit Scores Explained", subtitle: "The number that follows you everywhere", duration: "10 min", difficulty: "Intermediate", locked: true },
    ],
  },
  {
    id: "real-estate-loans",
    title: "Real Estate & Loans",
    emoji: "\u{1F3E0}",
    color: "#D97706",
    description: "Understand the world of home buying, mortgages, and how loans actually work.",
    lessons: [
      { id: "home-loans-intro", title: "Home Loans 101", subtitle: "How mortgages actually work", duration: "10 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `A mortgage is simply a loan used to buy a home. The home itself serves as collateral \u2014 meaning if you stop paying, the bank can take the house back (foreclosure). That sounds scary, but understanding how mortgages work is the first step to making them work for you.\n\nThe basic mechanics:\nWhen you buy a $300,000 house with a 20% down payment, you put down $60,000 of your own money and borrow $240,000 from a lender. You then pay back that $240,000 plus interest over a set period \u2014 usually 15 or 30 years.\n\nKey terms you'll see everywhere:\n\u2022 Principal \u2014 the actual amount you borrowed ($240,000 in our example)\n\u2022 Interest \u2014 the cost of borrowing that money, expressed as an annual rate\n\u2022 Down Payment \u2014 the upfront cash you bring to the table (typically 3-20%)\n\u2022 Closing Costs \u2014 fees for processing the loan, usually 2-5% of the purchase price\n\u2022 Escrow \u2014 an account where money is held for property taxes and insurance\n\nHere's what surprises most first-time buyers: on a 30-year mortgage at 7% interest on $240,000, you'll pay roughly $335,000 in interest alone over the life of the loan. That means the total cost of your $300,000 house is actually closer to $635,000. This is why understanding loan types and interest rates matters so much \u2014 even a small rate difference can mean tens of thousands of dollars.` },
      { id: "conventional-loans", title: "Conventional Loans", subtitle: "The standard mortgage most people use", duration: "10 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `Conventional loans are the most common type of mortgage in the U.S. They're not backed by any government agency \u2014 instead, they're offered by private lenders like banks, credit unions, and mortgage companies.\n\nTwo types of conventional loans:\n\u2022 Conforming \u2014 meets the guidelines set by Fannie Mae and Freddie Mac (government-sponsored enterprises that buy mortgages from lenders). In 2024, the conforming loan limit is $766,550 in most areas.\n\u2022 Non-conforming (Jumbo) \u2014 exceeds conforming limits. These typically require higher credit scores and larger down payments.\n\nWhat you need to qualify:\n\u2022 Credit score: typically 620+ (though 740+ gets you the best rates)\n\u2022 Down payment: as low as 3%, but 20% avoids PMI\n\u2022 Debt-to-income ratio: generally below 43-45%\n\u2022 Stable employment and income history\n\nThe PMI trap:\nIf you put down less than 20%, you'll pay Private Mortgage Insurance (PMI) \u2014 an extra monthly fee that protects the LENDER (not you) if you default. PMI typically costs 0.5-1% of the loan amount per year. On a $240,000 loan, that's $100-200/month on top of your mortgage payment. The good news: PMI drops off automatically once you reach 22% equity in the home.\n\nConventional loans come in fixed-rate and adjustable-rate varieties, which we'll cover in separate lessons. For most young buyers, a conventional loan with the largest down payment you can manage is a solid starting point.` },
      { id: "fha-loans", title: "FHA Loans", subtitle: "Lower barriers for first-time buyers", duration: "10 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `FHA loans are mortgages insured by the Federal Housing Administration \u2014 a government agency created in 1934 to make homeownership more accessible. They're especially popular with first-time buyers and people with lower credit scores.\n\nWhy FHA loans exist:\nAfter the Great Depression wiped out the housing market, the government created the FHA to encourage lending by reducing risk for banks. If a borrower defaults on an FHA loan, the government covers the lender's losses. This lets lenders offer more relaxed requirements.\n\nThe benefits:\n\u2022 Down payment as low as 3.5% (with a 580+ credit score)\n\u2022 Credit scores as low as 500 accepted (with 10% down)\n\u2022 More flexible debt-to-income ratios\n\u2022 Lower interest rates than many conventional options for borrowers with imperfect credit\n\nThe catch \u2014 MIP (Mortgage Insurance Premium):\nFHA loans require two types of mortgage insurance:\n1. Upfront MIP \u2014 1.75% of the loan amount, paid at closing (usually rolled into the loan)\n2. Annual MIP \u2014 0.55% of the loan amount, paid monthly for the LIFE of the loan\n\nThat last part is the big drawback. Unlike conventional PMI that drops off at 20% equity, FHA mortgage insurance stays forever (unless you refinance into a conventional loan later). On a $250,000 loan, that's about $115/month you'll never stop paying.\n\nWhen FHA makes sense:\nIf your credit score is below 700 or you can only put 3.5% down, FHA might be your best path to homeownership. But if you can qualify for conventional with even 5% down, run the numbers \u2014 the long-term cost of permanent MIP often makes conventional the better deal.` },
      { id: "va-loans", title: "VA Loans", subtitle: "The best mortgage deal in America", duration: "10 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `VA loans are mortgages guaranteed by the U.S. Department of Veterans Affairs, available to active-duty service members, veterans, and eligible surviving spouses. Many financial experts call them the single best mortgage product available in the country.\n\nWhy VA loans are exceptional:\n\u2022 Zero down payment required \u2014 you can finance 100% of the home's value\n\u2022 No PMI or monthly mortgage insurance \u2014 ever\n\u2022 Typically the lowest interest rates of any loan type\n\u2022 No prepayment penalties\n\u2022 Limited closing costs (the VA restricts what lenders can charge)\n\u2022 No loan limit for borrowers with full entitlement\n\nWho qualifies:\n\u2022 Active duty: 90+ continuous days of service\n\u2022 Veterans: varies by era, generally 90 days (wartime) or 181 days (peacetime)\n\u2022 National Guard/Reserves: 6+ years of service or 90 days of active duty\n\u2022 Surviving spouses of veterans who died in service or from service-connected disabilities\n\nThe VA Funding Fee:\nInstead of monthly mortgage insurance, VA loans charge a one-time funding fee (1.25-3.3% of the loan, depending on down payment and usage). This can be rolled into the loan. Some veterans are exempt \u2014 those with service-connected disabilities, Purple Heart recipients, and surviving spouses.\n\nLet's compare on a $300,000 home:\n\u2022 Conventional (5% down): $285,000 loan + PMI of ~$140/month\n\u2022 FHA (3.5% down): $289,500 loan + $133/month MIP forever\n\u2022 VA (0% down): $300,000 loan + no monthly insurance\n\nEven borrowing the full amount, the VA borrower often has a lower monthly payment because there's no insurance premium. Over 30 years, that savings can exceed $50,000.\n\nIf you qualify for a VA loan, it should almost always be your first choice.` },
      { id: "usda-loans", title: "USDA Loans", subtitle: "Zero down in rural and suburban areas", duration: "9 min", difficulty: "Beginner", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `USDA loans are backed by the U.S. Department of Agriculture and designed to promote homeownership in rural and suburban areas. Like VA loans, they offer zero down payment \u2014 but you don't need military service to qualify.\n\nThe requirements:\n\u2022 Location: the property must be in a USDA-eligible area. Here's the surprise \u2014 "rural" is defined more broadly than you'd think. Many suburban areas, small cities, and towns outside major metros qualify. About 97% of U.S. land area is eligible.\n\u2022 Income limits: your household income can't exceed 115% of the area median income. This varies by location and family size.\n\u2022 Credit score: typically 640+ for automatic approval\n\u2022 Primary residence only \u2014 no investment properties or vacation homes\n\nThe benefits:\n\u2022 Zero down payment\n\u2022 Below-market interest rates\n\u2022 Flexible credit requirements\n\u2022 Closing costs can be rolled into the loan or paid by the seller\n\nThe costs:\n\u2022 Upfront guarantee fee: 1% of the loan amount\n\u2022 Annual fee: 0.35% of the loan balance, paid monthly\n\nThat annual fee is much lower than FHA's MIP (0.35% vs 0.55%), making USDA loans cheaper over time.\n\nWhen to consider USDA:\nIf you're buying in a smaller town, suburban area, or anywhere outside a major city center, check USDA eligibility first. The combination of zero down payment and low fees makes it one of the most affordable paths to homeownership \u2014 and it's dramatically underutilized because people assume they don't qualify.` },
      { id: "fixed-vs-arm", title: "Fixed-Rate vs. Adjustable-Rate", subtitle: "Predictability vs. flexibility", duration: "11 min", difficulty: "Intermediate", locked: false, videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
        content: `Every mortgage has an interest rate structure \u2014 and the two main types are fixed-rate and adjustable-rate (ARM). This choice affects how much you pay every single month for the life of your loan.\n\nFixed-Rate Mortgages:\nYour interest rate never changes. If you lock in at 6.5%, you pay 6.5% whether rates go to 10% or drop to 3%. Your monthly principal and interest payment stays identical from month 1 to month 360.\n\u2022 Most common terms: 30-year and 15-year\n\u2022 30-year: lower monthly payments, more total interest paid\n\u2022 15-year: higher monthly payments, dramatically less interest paid, build equity faster\n\nLet's compare on a $250,000 loan at 6.5%:\n\u2022 30-year: $1,580/month \u2014 total interest paid: $319,000\n\u2022 15-year: $2,179/month \u2014 total interest paid: $142,000\n\nThat's $177,000 saved by choosing 15-year \u2014 but your monthly payment is $599 higher.\n\nAdjustable-Rate Mortgages (ARMs):\nARMs start with a lower "teaser" rate for a fixed period, then adjust periodically based on market conditions.\n\u2022 Common structures: 5/1 ARM, 7/1 ARM, 10/1 ARM\n\u2022 5/1 means: fixed rate for 5 years, then adjusts every 1 year after that\n\u2022 ARMs have caps that limit how much the rate can increase per adjustment and over the loan's lifetime\n\nWhy choose an ARM?\nIf you plan to sell or refinance within 5-7 years, the lower initial rate saves money. If rates drop, your payment decreases automatically.\n\nThe risk:\nIf rates rise and you're still in the home, your payment can increase significantly. People who got 1-year ARMs before 2008 saw their payments double, which contributed to the housing crisis.\n\nGeneral guidance for young buyers:\nIf this is your first home and you plan to stay 7+ years, a 30-year fixed gives you predictability and peace of mind. If you know you'll move within 5 years, a 5/1 or 7/1 ARM could save you thousands in interest during that window.` },
      { id: "refinancing", title: "Refinancing Your Mortgage", subtitle: "When and why to restructure your loan", duration: "10 min", difficulty: "Intermediate", locked: true },
      { id: "home-buying-process", title: "The Home Buying Process", subtitle: "From pre-approval to closing day", duration: "14 min", difficulty: "Intermediate", locked: true },
    ],
  },
];

const mascots = {
  investing: { name: "Warren the Walrus", emoji: "\u{1F9AD}", quote: "Price is what you pay. Value is what you get." },
  "saving-budgeting": { name: "Benjamin the Bear", emoji: "\u{1F43B}", quote: "A penny saved is a penny earned... but invested, it's a dollar." },
  "real-estate-loans": { name: "Charlie the Chipmunk", emoji: "\u{1F43F}\uFE0F", quote: "All I want to know is where I'm going to overpay on a mortgage, so I'll never go there." },
};

function getMasteryInfo(score) {
  if (score === null) return { label: "Not Started", color: "#475569", bg: "#1e293b", icon: "\u25CB" };
  if (score < 70) return { label: "Try Again", color: "#EF4444", bg: "#EF444415", icon: "\u2717" };
  if (score < 85) return { label: "Proficient", color: "#F59E0B", bg: "#F59E0B15", icon: "\u25C9" };
  if (score < 100) return { label: "Advanced", color: "#0D9488", bg: "#0D948815", icon: "\u25C8" };
  return { label: "Mastered", color: "#8B5CF6", bg: "#8B5CF615", icon: "\u2605" };
}

export default function FinanceLearnApp() {
  const [screen, setScreen] = useState("start");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonTab, setLessonTab] = useState("video");
  const [lessonScores, setLessonScores] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  const handleCategoryClick = (cat) => { setSelectedCategory(cat); setScreen("lessons"); };
  const handleLessonClick = (lesson) => {
    if (lesson.locked) return;
    setSelectedLesson(lesson); setLessonTab("video");
    setQuizAnswers({}); setQuizSubmitted(false); setQuizScore(null);
    setScreen("lesson-detail");
  };
  const handleBack = () => {
    if (screen === "lesson-detail") setScreen("lessons");
    else if (screen === "lessons") { setSelectedCategory(null); setScreen("categories"); }
    else if (screen === "categories") setScreen("start");
  };
  const handleQuizSubmit = () => {
    const quiz = QUIZZES[selectedLesson.id];
    if (!quiz) return;
    let correct = 0;
    quiz.forEach((q, i) => { if (quizAnswers[i] === q.answer) correct++; });
    const pct = Math.round((correct / quiz.length) * 100);
    setQuizScore(pct); setQuizSubmitted(true);
    const prev = lessonScores[selectedLesson.id];
    if (prev === undefined || pct > prev) setLessonScores({ ...lessonScores, [selectedLesson.id]: pct });
  };
  const handleRetakeQuiz = () => { setQuizAnswers({}); setQuizSubmitted(false); setQuizScore(null); };

  const css = `
    @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  `;
  const page = { minHeight: "100vh", background: "linear-gradient(165deg, #0a0f1e 0%, #111827 40%, #1a1a2e 100%)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#f1f5f9", padding: "2rem" };
  const bk = { background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "0.9rem", padding: "0", marginBottom: "2rem", fontFamily: "inherit" };

  // ── START ──
  if (screen === "start") {
    return (
      <div style={{ ...page, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-15%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", animation: "float 10s ease-in-out infinite reverse" }} />
        <div style={{ fontSize: "4.5rem", marginBottom: "0.5rem", animation: "fadeInDown 0.8s ease-out" }}>{"\u{1F3E6}"}</div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, margin: "0 0 0.5rem", letterSpacing: "-0.03em", textAlign: "center", animation: "fadeInDown 0.8s ease-out 0.1s both" }}>FLearn</h1>
        <p style={{ fontSize: "1.1rem", color: "#94a3b8", margin: "0 0 0.75rem", fontStyle: "italic", animation: "fadeInDown 0.8s ease-out 0.2s both" }}>Financial literacy for the next generation</p>
        <p style={{ fontSize: "0.95rem", color: "#64748b", maxWidth: 420, textAlign: "center", lineHeight: 1.7, margin: "0 0 2.5rem", fontFamily: "-apple-system, sans-serif", animation: "fadeInDown 0.8s ease-out 0.3s both" }}>No one taught us this in school. Learn investing, budgeting, and real money skills \u2014 built by young adults, for young adults.</p>
        <button onClick={() => setScreen("categories")} style={{ background: "linear-gradient(135deg, #0D9488, #0f766e)", color: "white", border: "none", padding: "1rem 3rem", fontSize: "1.1rem", fontFamily: "'Georgia', serif", fontWeight: 600, borderRadius: 60, cursor: "pointer", boxShadow: "0 4px 24px rgba(13,148,136,0.3)", transition: "all 0.3s ease", animation: "fadeInUp 0.8s ease-out 0.5s both" }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(13,148,136,0.4)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(13,148,136,0.3)"; }}>
          Start Learning \u2192
        </button>
        <div style={{ marginTop: "3rem", display: "flex", gap: "2rem", color: "#475569", fontSize: "0.8rem", fontFamily: "-apple-system, sans-serif", animation: "fadeInUp 0.8s ease-out 0.7s both" }}>
          <span>{"\u{1F3A5}"} Video Lessons</span><span>{"\u{1F4DD}"} Mastery Quizzes</span><span>{"\u{1F3AF}"} Progress Tracking</span>
        </div>
        <style>{css}</style>
      </div>
    );
  }

  // ── CATEGORIES ──
  if (screen === "categories") {
    const totalLessons = CATEGORIES.reduce((a, c) => a + c.lessons.filter(l => !l.locked).length, 0);
    const masteredCount = Object.values(lessonScores).filter(s => s >= 70).length;
    const progress = totalLessons > 0 ? Math.round((masteredCount / totalLessons) * 100) : 0;
    return (
      <div style={page}><div style={{ maxWidth: 640, margin: "0 auto" }}>
        <button onClick={handleBack} style={bk}>{"\u2190"} Back</button>
        <div style={{ marginBottom: "2rem", animation: "fadeInDown 0.6s ease-out" }}>
          <h2 style={{ fontSize: "1.8rem", fontFamily: "'Georgia', serif", fontWeight: 700, margin: "0 0 0.25rem" }}>Choose Your Path</h2>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.95rem" }}>What do you want to learn first?</p>
        </div>
        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "2rem", border: "1px solid #1e293b", animation: "fadeInDown 0.6s ease-out 0.1s both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Lessons Mastered</span>
            <span style={{ fontSize: "0.85rem", color: "#0D9488", fontWeight: 600 }}>{masteredCount}/{totalLessons} (70%+ to pass)</span>
          </div>
          <div style={{ height: 6, background: "#0f172a", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #0D9488, #7C3AED)", borderRadius: 3, transition: "width 0.5s ease" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {CATEGORIES.map((cat, i) => {
            const m = cat.lessons.filter(l => lessonScores[l.id] >= 70).length;
            const t = cat.lessons.filter(l => !l.locked).length;
            return (
              <button key={cat.id} onClick={() => handleCategoryClick(cat)} style={{ background: "#1e293b", border: `1px solid ${cat.color}22`, borderRadius: 16, padding: "1.5rem", cursor: "pointer", textAlign: "left", transition: "all 0.3s ease", animation: `fadeInUp 0.6s ease-out ${0.2+i*0.1}s both`, position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color+"55"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = cat.color+"22"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ position: "absolute", top: -30, right: -20, fontSize: "6rem", opacity: 0.06 }}>{cat.emoji}</div>
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "2rem", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", background: cat.color+"15", borderRadius: 14 }}>{cat.emoji}</span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#f1f5f9", fontFamily: "'Georgia', serif", fontWeight: 600 }}>{cat.title}</h3>
                      <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{m}/{t} mastered</span>
                    </div>
                    <span style={{ marginLeft: "auto", color: cat.color, fontSize: "1.2rem" }}>{"\u2192"}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.5 }}>{cat.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div><style>{css}</style></div>
    );
  }

  // ── LESSONS LIST ──
  if (screen === "lessons" && selectedCategory) {
    const mascot = mascots[selectedCategory.id];
    return (
      <div style={page}><div style={{ maxWidth: 640, margin: "0 auto" }}>
        <button onClick={handleBack} style={bk}>{"\u2190"} Back to categories</button>
        <div style={{ marginBottom: "1.5rem", animation: "fadeInDown 0.6s ease-out" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "2rem", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", background: selectedCategory.color+"15", borderRadius: 14 }}>{selectedCategory.emoji}</span>
            <h2 style={{ fontSize: "1.8rem", fontFamily: "'Georgia', serif", margin: 0, fontWeight: 700 }}>{selectedCategory.title}</h2>
          </div>
        </div>
        {mascot && (
          <div style={{ background: `linear-gradient(135deg, ${selectedCategory.color}12, ${selectedCategory.color}08)`, border: `1px solid ${selectedCategory.color}20`, borderRadius: 14, padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", animation: "fadeInDown 0.6s ease-out 0.1s both" }}>
            <span style={{ fontSize: "2.5rem" }}>{mascot.emoji}</span>
            <div>
              <span style={{ fontSize: "0.95rem", fontWeight: 600, color: selectedCategory.color, fontFamily: "'Georgia', serif" }}>{mascot.name}</span>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.85rem", color: "#94a3b8", fontStyle: "italic" }}>"{mascot.quote}"</p>
            </div>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {selectedCategory.lessons.map((lesson, i) => {
            const score = lessonScores[lesson.id];
            const mastery = getMasteryInfo(score !== undefined ? score : null);
            return (
              <button key={lesson.id} onClick={() => handleLessonClick(lesson)} disabled={lesson.locked} style={{
                background: lesson.locked ? "#1e293b80" : "#1e293b", border: score >= 70 ? `1px solid ${selectedCategory.color}44` : "1px solid #334155",
                borderRadius: 14, padding: "1.25rem", cursor: lesson.locked ? "not-allowed" : "pointer", textAlign: "left",
                transition: "all 0.3s ease", opacity: lesson.locked ? 0.5 : 1, animation: `fadeInUp 0.5s ease-out ${0.15+i*0.08}s both`,
                display: "flex", alignItems: "center", gap: "1rem",
              }}
                onMouseEnter={e => { if (!lesson.locked) { e.currentTarget.style.borderColor = selectedCategory.color+"44"; e.currentTarget.style.transform = "translateY(-1px)"; }}}
                onMouseLeave={e => { if (!lesson.locked) { e.currentTarget.style.borderColor = score >= 70 ? selectedCategory.color+"44" : "#334155"; e.currentTarget.style.transform = "translateY(0)"; }}}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: score >= 70 ? "1rem" : "0.85rem", fontWeight: 700, flexShrink: 0, background: score >= 70 ? selectedCategory.color : lesson.locked ? "#0f172a" : selectedCategory.color+"15", color: score >= 70 ? "white" : lesson.locked ? "#475569" : selectedCategory.color }}>
                  {lesson.locked ? "\u{1F512}" : score >= 70 ? "\u2713" : i+1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ margin: "0 0 0.15rem", fontSize: "1rem", color: lesson.locked ? "#64748b" : "#f1f5f9", fontWeight: 600 }}>{lesson.title}</h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>{lesson.subtitle}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{lesson.duration}</span>
                  {!lesson.locked && score !== undefined ? (
                    <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, background: mastery.bg, color: mastery.color, fontWeight: 600 }}>{mastery.icon} {score}%</span>
                  ) : (
                    <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, background: lesson.difficulty === "Beginner" ? "#0D948815" : "#7C3AED15", color: lesson.difficulty === "Beginner" ? "#0D9488" : "#7C3AED" }}>{lesson.difficulty}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div><style>{css}</style></div>
    );
  }

  // ── LESSON DETAIL ──
  if (screen === "lesson-detail" && selectedLesson) {
    const quiz = QUIZZES[selectedLesson.id] || [];
    const paragraphs = selectedLesson.content ? selectedLesson.content.split("\n\n") : [];
    const allAnswered = quiz.length > 0 && Object.keys(quizAnswers).length === quiz.length;
    const bestScore = lessonScores[selectedLesson.id];
    const bestMastery = getMasteryInfo(bestScore !== undefined ? bestScore : null);
    const tabActive = (t) => ({ padding: "0.6rem 1.2rem", borderRadius: 10, border: "none", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, fontFamily: "inherit", background: lessonTab === t ? selectedCategory.color+"20" : "transparent", color: lessonTab === t ? selectedCategory.color : "#64748b", transition: "all 0.2s ease" });

    return (
      <div style={page}><div style={{ maxWidth: 640, margin: "0 auto" }}>
        <button onClick={handleBack} style={bk}>{"\u2190"} Back to lessons</button>

        {/* Header */}
        <div style={{ marginBottom: "1.5rem", animation: "fadeInDown 0.6s ease-out" }}>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: 20, background: selectedCategory.color+"15", color: selectedCategory.color }}>{selectedCategory.title}</span>
            <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: 20, background: "#1e293b", color: "#94a3b8" }}>{selectedLesson.duration}</span>
            {bestScore !== undefined && <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: 20, background: bestMastery.bg, color: bestMastery.color, fontWeight: 600 }}>Best: {bestScore}% \u2014 {bestMastery.label}</span>}
          </div>
          <h2 style={{ fontSize: "1.8rem", fontFamily: "'Georgia', serif", margin: "0 0 0.25rem", fontWeight: 700 }}>{selectedLesson.title}</h2>
          <p style={{ margin: 0, color: "#94a3b8", fontStyle: "italic", fontFamily: "'Georgia', serif" }}>{selectedLesson.subtitle}</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "#1e293b", borderRadius: 12, padding: "0.35rem", animation: "fadeInDown 0.6s ease-out 0.1s both" }}>
          <button onClick={() => setLessonTab("video")} style={tabActive("video")}>{"\u{1F3A5}"} Video</button>
          <button onClick={() => setLessonTab("transcript")} style={tabActive("transcript")}>{"\u{1F4C4}"} Transcript</button>
          <button onClick={() => setLessonTab("quiz")} style={tabActive("quiz")}>{"\u{1F4DD}"} Quiz {bestScore >= 70 && "\u2713"}</button>
        </div>

        {/* VIDEO */}
        {lessonTab === "video" && (
          <div style={{ animation: "scaleIn 0.4s ease-out" }}>
            <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 14, overflow: "hidden", background: "#000", border: "1px solid #334155" }}>
              {selectedLesson.videoUrl && selectedLesson.videoUrl !== "https://www.youtube.com/embed/YOUR_VIDEO_ID" ? (
                <iframe
                  src={selectedLesson.videoUrl}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={selectedLesson.title}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: selectedCategory.color+"20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>{"\u25B6"}</div>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem", textAlign: "center", maxWidth: 300, lineHeight: 1.5 }}>Replace <code style={{ background: "#0f172a", padding: "0.15rem 0.4rem", borderRadius: 4, fontSize: "0.8rem", color: selectedCategory.color }}>YOUR_VIDEO_ID</code> in the lesson data with your YouTube or Vimeo embed URL</p>
                  <p style={{ color: "#475569", fontSize: "0.75rem" }}>YouTube: youtube.com/embed/ID  {"\u00B7"}  Vimeo: player.vimeo.com/video/ID</p>
                </div>
              )}
            </div>
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#1e293b", borderRadius: 12, border: "1px solid #334155" }}>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6 }}>
                <span style={{ color: selectedCategory.color, fontWeight: 600 }}>How it works:</span> Watch the video, review the transcript for anything you want to revisit, then take the quiz. Score 70% or higher to master the lesson. Your best score is saved.
              </p>
            </div>
          </div>
        )}

        {/* TRANSCRIPT */}
        {lessonTab === "transcript" && (
          <div style={{ animation: "scaleIn 0.4s ease-out" }}>
            <div style={{ background: "#1e293b", borderRadius: 14, padding: "1.5rem", border: "1px solid #334155" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #334155" }}>
                <span style={{ fontSize: "1.2rem" }}>{"\u{1F4C4}"}</span>
                <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 600 }}>LESSON TRANSCRIPT</span>
              </div>
              {paragraphs.map((p, i) => {
                const isBullets = p.includes("\u2022") || /^\d\./.test(p.trim());
                if (isBullets) {
                  return (
                    <div key={i} style={{ background: "#0f172a", borderLeft: `3px solid ${selectedCategory.color}`, borderRadius: "0 10px 10px 0", padding: "1rem 1.25rem", margin: "1rem 0" }}>
                      {p.split("\n").map((line, j) => <p key={j} style={{ margin: j === 0 ? 0 : "0.4rem 0 0", fontSize: "0.9rem", lineHeight: 1.6, color: "#cbd5e1" }}>{line}</p>)}
                    </div>
                  );
                }
                return <p key={i} style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "#cbd5e1", margin: "1rem 0" }}>{p}</p>;
              })}
            </div>
          </div>
        )}

        {/* QUIZ */}
        {lessonTab === "quiz" && (
          <div style={{ animation: "scaleIn 0.4s ease-out" }}>
            <div style={{ background: "#1e293b", borderRadius: 14, padding: "1.25rem", border: "1px solid #334155", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.1rem", fontFamily: "'Georgia', serif" }}>Mastery Quiz</h3>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>{quiz.length} questions \u2014 70% to pass</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{Object.keys(quizAnswers).length}/{quiz.length} answered</div>
                  <div style={{ height: 4, width: 80, background: "#0f172a", borderRadius: 2, marginTop: "0.35rem", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(Object.keys(quizAnswers).length / Math.max(quiz.length,1)) * 100}%`, background: selectedCategory.color, borderRadius: 2, transition: "width 0.3s ease" }} />
                  </div>
                </div>
              </div>
            </div>

            {quiz.map((q, qi) => {
              const ua = quizAnswers[qi];
              const correct = quizSubmitted && ua === q.answer;
              const wrong = quizSubmitted && ua !== undefined && ua !== q.answer;
              return (
                <div key={qi} style={{ background: "#1e293b", borderRadius: 14, padding: "1.25rem", border: `1px solid ${quizSubmitted ? (correct ? "#0D948844" : wrong ? "#EF444444" : "#334155") : "#334155"}`, marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <span style={{ color: selectedCategory.color, fontWeight: 700, fontSize: "0.9rem" }}>Q{qi+1}.</span>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#e2e8f0", lineHeight: 1.5 }}>{q.q}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {q.options.map((opt, oi) => {
                      const sel = ua === oi;
                      const showG = quizSubmitted && oi === q.answer;
                      const showR = quizSubmitted && sel && oi !== q.answer;
                      let bg = "#0f172a", bc = sel && !quizSubmitted ? selectedCategory.color : "#1e293b", tc = "#cbd5e1";
                      if (showG) { bg = "#0D948820"; bc = "#0D9488"; tc = "#0D9488"; }
                      if (showR) { bg = "#EF444420"; bc = "#EF4444"; tc = "#EF4444"; }
                      return (
                        <button key={oi} onClick={() => { if (!quizSubmitted) setQuizAnswers({ ...quizAnswers, [qi]: oi }); }} disabled={quizSubmitted} style={{ background: bg, border: `1px solid ${bc}`, borderRadius: 10, padding: "0.75rem 1rem", cursor: quizSubmitted ? "default" : "pointer", textAlign: "left", fontSize: "0.85rem", color: tc, transition: "all 0.2s ease", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, background: showG ? "#0D9488" : showR ? "#EF4444" : sel ? selectedCategory.color : "#1e293b", color: (showG||showR||sel) ? "white" : "#64748b" }}>
                            {showG ? "\u2713" : showR ? "\u2717" : String.fromCharCode(65+oi)}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {!quizSubmitted ? (
              <button onClick={handleQuizSubmit} disabled={!allAnswered} style={{ width: "100%", padding: "1rem", borderRadius: 14, border: "none", fontSize: "1rem", fontWeight: 600, cursor: allAnswered ? "pointer" : "not-allowed", fontFamily: "'Georgia', serif", background: allAnswered ? `linear-gradient(135deg, ${selectedCategory.color}, ${selectedCategory.color}cc)` : "#1e293b", color: allAnswered ? "white" : "#475569", boxShadow: allAnswered ? `0 4px 20px ${selectedCategory.color}30` : "none", transition: "all 0.3s ease", marginTop: "0.5rem" }}>
                {allAnswered ? "Submit Quiz" : `Answer all ${quiz.length} questions to submit`}
              </button>
            ) : (
              <div style={{ background: quizScore >= 70 ? "#0D948815" : "#EF444415", border: `1px solid ${quizScore >= 70 ? "#0D948844" : "#EF444444"}`, borderRadius: 14, padding: "1.5rem", textAlign: "center", marginTop: "0.5rem", animation: "scaleIn 0.4s ease-out" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                  {quizScore >= 100 ? "\u{1F3C6}" : quizScore >= 85 ? "\u{1F31F}" : quizScore >= 70 ? "\u2705" : "\u{1F4DA}"}
                </div>
                <h3 style={{ margin: "0 0 0.25rem", fontFamily: "'Georgia', serif", fontSize: "1.5rem", color: quizScore >= 70 ? "#0D9488" : "#EF4444" }}>{quizScore}%</h3>
                <p style={{ margin: "0 0 0.25rem", fontSize: "1rem", color: "#f1f5f9", fontWeight: 600 }}>{getMasteryInfo(quizScore).label}</p>
                <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "#94a3b8" }}>
                  {quizScore >= 100 ? "Perfect score! You've completely mastered this lesson." : quizScore >= 85 ? "Excellent work! You have a strong understanding." : quizScore >= 70 ? "You passed! Review any missed questions to strengthen your knowledge." : "You need 70% to pass. Review the video and transcript, then try again."}
                </p>
                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <button onClick={handleRetakeQuiz} style={{ padding: "0.75rem 1.5rem", borderRadius: 10, border: `1px solid ${selectedCategory.color}44`, background: "transparent", color: selectedCategory.color, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Retake Quiz</button>
                  <button onClick={handleBack} style={{ padding: "0.75rem 1.5rem", borderRadius: 10, border: "none", background: quizScore >= 70 ? selectedCategory.color : "#334155", color: "white", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    {quizScore >= 70 ? "Continue \u2192" : "Back to Lessons"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div><style>{css}</style></div>
    );
  }

  return null;
}
