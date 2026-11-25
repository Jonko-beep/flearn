// The Bonds & Fixed Income course. Kept in its own file (and spliced into
// `categories` by curriculum.js) so the long lesson text stays reviewable.
//
// Every bond price, yield, and dollar figure quoted here is checked by
// tests/bonds.test.js against src/lib/bonds.js. If you change an example here,
// change it there.

const paragraphs = (...blocks) => blocks.join("\n\n");

export const bondsCategory = {
  id: "fixed-income",
  title: "Bonds & Fixed Income",
  emoji: "🦡",
  color: "#65A30D",
  description:
    "Learn how bonds, Treasuries, and CDs really work — the steady side of a portfolio, and the risks hiding inside \"safe\" investments.",
  mascot: {
    name: "Bill the Badger",
    emoji: "🦡",
    quote: "A bond is a promise. Know who's making it, and for how long.",
  },
  lessons: [
    {
      id: "bonds-basics",
      title: "What Is a Bond?",
      subtitle: "Being the lender instead of the borrower",
      duration: "9 min",
      difficulty: "Beginner",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "A bond is a loan, except you're the bank. When you buy a bond, you lend money to a government or a company. They promise to pay you interest on a set schedule and to pay back the full amount on a set date. That's why bonds are called fixed income: the payments are spelled out in advance.",
        "Every bond has four parts:\n• Issuer — who's borrowing: the U.S. government, a state or city, or a company\n• Face value (par) — the amount you get back at the end, usually $1,000 per bond\n• Coupon — the interest rate the bond pays on its face value, fixed when the bond is issued\n• Maturity — the date the loan ends and your face value comes back. It can be weeks away or 30 years away",
        "An example. You buy a newly issued 10-year bond with a $1,000 face value and a 4% coupon. It pays $40 a year, usually as two $20 payments six months apart. Over 10 years that's $400 in interest, and at maturity you get your $1,000 back. Hold it to the end, and as long as the issuer doesn't default, you know every dollar you'll receive on the day you buy it.",
        "Stocks make you an owner. Bonds make you a lender. An owner's upside is unlimited, but nothing is promised. A lender's upside is capped at the interest, but that interest is promised, and if the company goes bankrupt, lenders get paid back before shareholders get anything.",
        "Why people own bonds:\n• Steady income — predictable interest payments\n• Stability — high-quality bonds swing far less than stocks\n• A cushion in crashes — when stocks plunge, high-quality government bonds have often held steady or even risen, though not every time\n• Known money for known goals — a bond that matures when you need the money lines the two up",
        "What bonds won't do is make you rich. Over long periods, stocks have earned far more. Bonds are the shock absorber, not the engine.",
        "You don't have to hold a bond until it matures. Bonds trade between investors every day, and their prices move. The next few lessons explain why. Most people own bonds through a bond fund rather than one bond at a time, which is covered in the last lesson.",
        "What this means for you as a young adult: if you're saving for retirement decades away, you probably need few bonds right now, and a target-date fund adds them gradually as you age. Where bonds and their cousins (Treasury bills, CDs) earn a place early on is money you'll need in the next few years: a down payment, a car, tuition."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "When you buy a bond, you are:",
          options: [
            "Buying part ownership of a company",
            "Lending money to a government or company",
            "Opening a savings account",
            "Buying an option on a stock",
          ],
          correct: 1,
          explanation:
            "A bond is a loan. You're the lender, and the issuer promises to pay interest and return your money at maturity.",
        },
        {
          id: 2,
          question: "A bond has a $1,000 face value and a 4% coupon. How much interest does it pay each year?",
          options: ["$400", "$4", "$40", "$1,040"],
          correct: 2,
          explanation:
            "The coupon is a percentage of face value: 4% × $1,000 = $40 a year, usually paid as two $20 payments.",
        },
        {
          id: 3,
          question: "What is a bond's face value?",
          options: [
            "The amount the issuer pays back at maturity",
            "The price the bond trades at today",
            "The total interest the bond will pay",
            "The bond's credit rating",
          ],
          correct: 0,
          explanation:
            "Face value, or par, is what you get back when the bond matures — usually $1,000. The bond's market price can be above or below it.",
        },
        {
          id: 4,
          question: "A company goes bankrupt. Who gets paid back first?",
          options: [
            "Shareholders",
            "Everyone equally",
            "Whoever invested most recently",
            "Bondholders, before shareholders",
          ],
          correct: 3,
          explanation:
            "Lenders are ahead of owners in line. Bondholders are repaid before shareholders get anything, though they may not recover everything.",
        },
        {
          id: 5,
          question: "What's the main role of high-quality bonds in a portfolio?",
          options: [
            "The highest long-term growth",
            "Stability and income — a shock absorber, not the engine",
            "Guaranteed protection from every loss",
            "Tax-free returns",
          ],
          correct: 1,
          explanation:
            "Stocks have earned far more over long periods. Bonds bring steadier income and smaller swings, which cushions the portfolio.",
        },
        {
          id: 6,
          question: "Why are bonds called \"fixed income\"?",
          options: [
            "Their price never changes",
            "The Federal Reserve sets their interest rate every month",
            "The payment schedule is spelled out in advance",
            "Only retirees on a fixed income can buy them",
          ],
          correct: 2,
          explanation:
            "The coupon payments and the maturity date are set when the bond is issued. The bond's market price can still move.",
        },
        {
          id: 7,
          question: "What is a bond's maturity?",
          options: [
            "The day interest is first paid",
            "The bond's credit rating",
            "The age you must be to buy bonds",
            "The date the loan ends and the face value is paid back",
          ],
          correct: 3,
          explanation:
            "Maturity is when the loan is over. Bonds can mature in a few weeks or in 30 years.",
        },
      ],
    },
    {
      id: "bond-types",
      title: "Types of Bonds",
      subtitle: "Treasuries, TIPS, munis, and corporates",
      duration: "11 min",
      difficulty: "Beginner",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "Who you lend to changes everything: how safe the bond is, what it pays, and how its interest is taxed.",
        "U.S. Treasuries — loans to the federal government:\n• Treasury bills (T-bills) — mature in a year or less. Instead of paying interest, they're sold at a discount: pay $980 now, get $1,000 at maturity\n• Treasury notes — mature in 2 to 10 years\n• Treasury bonds — mature in 20 or 30 years\n• Taxes — interest is taxed federally but is exempt from state and local income tax",
        "Treasuries are considered the safest bonds in the world when it comes to default, because they're backed by the U.S. government's power to tax and borrow. That's why other bonds' yields are measured against them.",
        "Two ways to protect against inflation:\n• TIPS — Treasury Inflation-Protected Securities. Their face value rises with inflation, as measured by the Consumer Price Index, so your interest and your final payment grow with prices\n• I bonds — savings bonds bought directly from the government at TreasuryDirect.gov, up to $10,000 per person per year. The rate combines a fixed rate with an inflation rate that resets every six months. You can't cash them in for the first 12 months, and cashing in before 5 years costs you the last 3 months of interest",
        "Municipal bonds (munis) are loans to states, cities, school districts, and public projects like airports and water systems. Their big feature is taxes: their interest is generally free from federal income tax, and often from state tax too if you live in the state that issued them.",
        "Because of that tax break, munis pay lower rates. To compare one with a taxable bond, use the taxable-equivalent yield: muni yield ÷ (1 − your tax rate).\n• In the 32% bracket, a 3% muni is worth about the same as a 4.41% taxable bond\n• In the 12% bracket, the same 3% muni is only worth about 3.41%",
        "So munis tend to make sense for high earners investing in a regular brokerage account. They rarely make sense for someone in a low bracket, or inside an IRA, where the money is already sheltered from tax.",
        "Corporate bonds are loans to companies. They pay more than Treasuries because a company can go bust. How much more depends on how strong the company is, which is the subject of the Credit Risk lesson.",
        "Two more you'll see inside bond funds:\n• Agency and mortgage-backed bonds — issued by government-sponsored agencies, often bundles of home loans. They make up a big slice of total bond market funds\n• International bonds — issued by foreign governments and companies, often with currency risk on top",
        "What this means for you as a young adult: Treasuries for safety, TIPS and I bonds for inflation protection, munis only when your tax bracket is high, and corporates for extra income in exchange for extra risk. A total bond market fund holds a mix of most of these in one purchase."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "Interest from U.S. Treasuries is exempt from which tax?",
          options: [
            "Federal income tax",
            "All taxes",
            "State and local income tax",
            "None — it's fully taxable everywhere",
          ],
          correct: 2,
          explanation:
            "Treasury interest is taxed by the federal government but not by states or cities. Muni bonds are the reverse: usually free from federal tax.",
        },
        {
          id: 2,
          question: "How does a Treasury bill pay you?",
          options: [
            "You buy it below face value and receive the full face value at maturity",
            "It pays a coupon every month",
            "It pays dividends like a stock",
            "Its face value rises with inflation",
          ],
          correct: 0,
          explanation:
            "T-bills are sold at a discount. Pay $980, get $1,000 at maturity, and the $20 difference is your interest.",
        },
        {
          id: 3,
          question: "What do TIPS protect you from?",
          options: [
            "Default by the government",
            "Inflation, because their face value rises with prices",
            "Rising interest rates",
            "Currency swings",
          ],
          correct: 1,
          explanation:
            "TIPS adjust their face value with the Consumer Price Index, so both your interest and your final payment keep up with inflation.",
        },
        {
          id: 4,
          question: "You're in the 32% tax bracket. A tax-free muni yields 3%. What's its taxable-equivalent yield?",
          options: ["2.04%", "3.00%", "3.96%", "4.41%"],
          correct: 3,
          explanation:
            "Taxable-equivalent yield = muni yield ÷ (1 − tax rate) = 3% ÷ 0.68 ≈ 4.41%. A taxable bond would need to pay that much to match it.",
        },
        {
          id: 5,
          question: "Who generally gets the least benefit from municipal bonds?",
          options: [
            "A high earner investing in a regular brokerage account",
            "Someone in the 12% bracket, or anyone holding them in an IRA",
            "A resident of the state that issued them",
            "Someone in the 32% bracket",
          ],
          correct: 1,
          explanation:
            "The tax break is worth little in a low bracket and nothing in an IRA, which is already sheltered. In those cases a taxable bond usually pays more.",
        },
        {
          id: 6,
          question: "Why do corporate bonds pay more than Treasuries?",
          options: [
            "Companies are required by law to pay more",
            "Corporate bonds last longer",
            "A company can default, so lenders demand extra pay for that risk",
            "Corporate bond interest is tax-free",
          ],
          correct: 2,
          explanation:
            "Treasuries are backed by the U.S. government. A company can go bust, so its bonds pay extra to compensate lenders.",
        },
        {
          id: 7,
          question: "What happens if you cash in an I bond after 2 years?",
          options: [
            "You give up the last 3 months of interest",
            "You lose all the interest earned",
            "Nothing — there's no penalty after the first month",
            "You aren't allowed to until 5 years have passed",
          ],
          correct: 0,
          explanation:
            "I bonds can't be cashed in for the first 12 months. Between 1 and 5 years, cashing in costs the last 3 months of interest.",
        },
      ],
    },
    {
      id: "bond-prices",
      title: "Bond Prices and Interest Rates",
      subtitle: "Why \"safe\" bonds can lose money",
      duration: "11 min",
      difficulty: "Intermediate",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "Here's the rule that confuses almost everyone at first: when interest rates go up, the prices of existing bonds go down. When rates go down, prices go up. They move like a seesaw.",
        "Why? Say you own a 10-year bond paying 3% on $1,000, which is $30 a year. Then rates rise, and new 10-year bonds pay 5%, or $50 a year. Nobody will pay you $1,000 for your $30-a-year bond when $1,000 buys a $50-a-year bond. To sell it, you'd have to cut the price until the buyer earns the same 5% overall. That price is about $844.",
        "It works in reverse too. If rates fall to 2%, your 3% bond is suddenly the better deal, and buyers would pay about $1,090 for it.",
        "Three words for where a bond trades:\n• Par — at its face value, $1,000\n• Discount — below face value, like the $844 bond\n• Premium — above face value, like the $1,090 bond",
        "\"Yield\" can mean three different things:\n• Coupon rate — the fixed interest on face value. It never changes: a 3% coupon is always $30 a year\n• Current yield — yearly interest ÷ today's price. $30 ÷ $844 is about 3.55%\n• Yield to maturity (YTM) — your total yearly return if you buy today and hold to the end, counting the interest plus the price climbing back to $1,000. For the $844 bond, it's 5%, the same as a new bond",
        "That last point is the whole idea. A bond's price falls exactly far enough that its yield matches the market. Price and yield are two ways of describing the same thing.",
        "Holding to maturity. If you hold an individual bond to maturity and the issuer pays, the price swings along the way don't change what you get: every coupon, plus $1,000 at the end. The drop to $844 only becomes a real loss if you sell early. There's still a cost, though: you're stuck earning 3% while new bonds pay 5%.",
        "This isn't theoretical. In 2022, interest rates rose faster than they had in decades, and the broad U.S. bond market lost about 13%, its worst year on record. Plenty of investors learned that \"safe\" bonds can lose money.",
        "The bright side of rising rates: new bonds pay more. Investors who held on after 2022 were soon earning much higher yields on new money and reinvested interest.",
        "What this means for you as a young adult: when you hear \"rates are going up,\" think bond prices down, future bond income up. When you hear \"rates are falling,\" think the reverse. Your bond holdings will ride that seesaw, and that's normal."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "Interest rates rise. What happens to the prices of existing bonds?",
          options: ["They rise", "They fall", "They stay the same", "The bonds stop paying interest"],
          correct: 1,
          explanation:
            "New bonds now pay more, so older, lower-paying bonds have to get cheaper to attract a buyer.",
        },
        {
          id: 2,
          question:
            "You own a 3% bond. New bonds pay 5%. Why would your bond sell for less than $1,000?",
          options: [
            "Because the issuer is about to default",
            "Because coupons shrink when rates rise",
            "Because bond prices always fall over time",
            "Because a buyer can get 5% elsewhere, so the price drops until your bond also yields 5%",
          ],
          correct: 3,
          explanation:
            "Nobody pays full price for $30 a year when $1,000 buys $50 a year. The price falls, to about $844 for a 10-year bond, until the yields match.",
        },
        {
          id: 3,
          question: "A $1,000 bond trades at $1,090. It's trading at a:",
          options: ["Discount", "Par", "Premium", "Default"],
          correct: 2,
          explanation:
            "Above face value is a premium. This happens when the bond's coupon is higher than what new bonds pay.",
        },
        {
          id: 4,
          question: "A bond pays $30 a year and trades at $844. What's its current yield?",
          options: ["About 3.55%", "3.00%", "5.00%", "8.44%"],
          correct: 0,
          explanation:
            "Current yield = yearly interest ÷ price = $30 ÷ $844 ≈ 3.55%. The coupon rate is still 3%, since that's based on the $1,000 face value.",
        },
        {
          id: 5,
          question: "What does yield to maturity measure?",
          options: [
            "Only the coupon payments",
            "How long until the bond matures",
            "Your total yearly return if you buy today and hold to the end, including the price change",
            "The bond's credit rating",
          ],
          correct: 2,
          explanation:
            "YTM counts the interest plus the gain or loss as the price moves back to face value. For the $844 bond, it's 5%.",
        },
        {
          id: 6,
          question:
            "Your 3% bond drops to $844 after rates rise. You hold it to maturity and the issuer pays. What do you get at the end?",
          options: [
            "$844",
            "$1,000, plus every coupon along the way",
            "Nothing — the bond lost value",
            "$1,000 minus the price drop",
          ],
          correct: 1,
          explanation:
            "Price swings don't change what a bond pays if you hold it to the end. The loss is only real if you sell early, though you're stuck earning 3% meanwhile.",
        },
        {
          id: 7,
          question: "What happened to the broad U.S. bond market in 2022?",
          options: [
            "It rose about 13%",
            "It was unaffected by interest rates",
            "Only junk bonds lost money",
            "It lost about 13% as rates rose quickly — its worst year on record",
          ],
          correct: 3,
          explanation:
            "Rates rose faster than they had in decades, and bond prices fell along the seesaw. It was a reminder that \"safe\" doesn't mean \"can't lose money.\"",
        },
      ],
    },
    {
      id: "duration-yield-curve",
      title: "Duration and the Yield Curve",
      subtitle: "How much a rate change can hurt",
      duration: "11 min",
      difficulty: "Intermediate",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "Not all bonds react to rate changes equally. The longer you're locked in, the more a rate change hurts, or helps.",
        "Take three $1,000 bonds that all pay 3%, and imagine rates jump to 5%:\n• 2-year bond — falls to about $962, roughly a 4% drop\n• 10-year bond — falls to about $844, roughly a 16% drop\n• 30-year bond — falls to about $691, roughly a 31% drop",
        "Same rate change, very different losses. With 2 years left, you're only stuck with the lower rate briefly. With 30 years left, you're stuck with it for decades.",
        "Duration is one number that captures this sensitivity. The rule of thumb:\n• Price change ≈ −duration × change in rates\n• A bond fund with a duration of 6 years drops about 6% if rates rise 1 percentage point, and gains about 6% if they fall 1 point",
        "Every bond fund lists its duration, and it's the first number to check. Roughly:\n• Short-term bonds (a few years) — small price swings, usually lower yields\n• Intermediate bonds (around 5 to 10 years) — the middle ground, where total bond market funds usually sit\n• Long-term bonds (20+ years) — big price swings, and the most to gain if rates fall",
        "Match duration to when you need the money. Money you need in two years belongs in short-term bonds, T-bills, or CDs. Putting next year's down payment in a long-term bond fund isn't a plan. It's a bet on interest rates.",
        "The yield curve is a chart of Treasury yields, from the shortest maturities to the longest:\n• Normal — longer bonds pay more, to reward you for tying your money up longer. This is the usual shape\n• Flat — short and long bonds pay about the same\n• Inverted — short-term bonds pay MORE than long-term ones. It usually means investors expect rates to fall, often because they expect the economy to slow",
        "An inverted curve has come before most U.S. recessions of the past 50 years, which is why it makes headlines. It's not a precise timer, though. The gap between inversion and recession has ranged from months to years, and it can give false alarms.",
        "Short bonds have a risk of their own. When they mature, you have to reinvest at whatever rates are on offer then. Lock in 5% for one year, and next year's rate might be 3%. That's reinvestment risk, and it's the trade-off for short bonds' stability.",
        "What this means for you as a young adult: before buying any bond fund, look up two numbers: its duration (how much it can swing) and its yield (what it pays). Then ask whether that duration matches when you'll need the money."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "Rates rise from 3% to 5%. Which 3% bond loses the most value?",
          options: ["A 2-year bond", "A 10-year bond", "A 30-year bond", "They all lose the same amount"],
          correct: 2,
          explanation:
            "The longer the bond, the longer you're stuck with the lower rate. The 30-year falls about 31%, versus about 4% for the 2-year.",
        },
        {
          id: 2,
          question: "A bond fund has a duration of 6 years. Rates rise 1 percentage point. About how much does it lose?",
          options: ["About 6%", "About 1%", "About 0.6%", "About 60%"],
          correct: 0,
          explanation:
            "Price change ≈ −duration × rate change = −6 × 1% = about −6%. If rates fell 1 point instead, it would gain about 6%.",
        },
        {
          id: 3,
          question: "What does duration tell you about a bond or bond fund?",
          options: [
            "How long until you can sell it",
            "How much interest it pays",
            "Its credit rating",
            "How sensitive its price is to changes in interest rates",
          ],
          correct: 3,
          explanation:
            "Duration measures rate sensitivity. Higher duration means bigger price swings when rates move.",
        },
        {
          id: 4,
          question: "You'll need money for a down payment next year. Where does it fit best?",
          options: [
            "A long-term bond fund, for the higher yield",
            "Short-term options like T-bills, CDs, or a short-term bond fund",
            "A 30-year Treasury bond",
            "A high-yield junk bond fund",
          ],
          correct: 1,
          explanation:
            "Match duration to your timeline. A long-term fund could drop 10% or more in a year if rates rise, right when you need the money.",
        },
        {
          id: 5,
          question: "What does an inverted yield curve mean?",
          options: [
            "Long-term bonds pay much more than short-term bonds",
            "All bonds pay the same rate",
            "Short-term bonds pay more than long-term bonds",
            "Bond prices are rising",
          ],
          correct: 2,
          explanation:
            "Normally, longer bonds pay more. When short-term bonds pay more, investors usually expect rates to fall, often because they expect a slowdown.",
        },
        {
          id: 6,
          question: "Why do longer bonds usually pay higher yields?",
          options: [
            "The government requires it",
            "To reward you for tying your money up longer and taking more rate risk",
            "Longer bonds never default",
            "They're always issued by riskier companies",
          ],
          correct: 1,
          explanation:
            "That's the normal, upward-sloping yield curve: lenders expect extra pay for locking their money away longer.",
        },
        {
          id: 7,
          question: "What is reinvestment risk?",
          options: [
            "The risk that a bond's price falls when rates rise",
            "The risk that the issuer defaults",
            "The risk of paying too much in fees",
            "The risk that when a short bond matures, you have to reinvest at a lower rate",
          ],
          correct: 3,
          explanation:
            "Short bonds swing less in price, but you have to keep reinvesting. If rates have dropped by then, your income drops too.",
        },
      ],
    },
    {
      id: "credit-risk",
      title: "Credit Risk and Ratings",
      subtitle: "Will they actually pay you back?",
      duration: "10 min",
      difficulty: "Intermediate",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "Interest-rate risk is about the market. Credit risk is about the borrower: will they actually pay you back? A bond is only as good as the promise behind it.",
        "Credit rating agencies, mainly S&P Global, Moody's, and Fitch, grade borrowers on their ability to pay:\n• Investment grade — BBB− and above (Baa3 and above at Moody's). AAA is the top. Defaults have historically been rare\n• High-yield, or \"junk\" — BB+ and below. Weaker borrowers who pay higher rates because defaults are much more common\n• D — already in default",
        "Even the top can slip. All three major agencies now rate the U.S. government one notch below their highest grade. Treasuries are still treated as the benchmark for safety, but a rating is an opinion, not a guarantee.",
        "Lenders demand extra pay for extra risk. The extra yield a bond pays over a Treasury with the same maturity is called its credit spread. With illustrative numbers:\n• 10-year Treasury — 4.0%\n• Strong company, A-rated — 5.0%, a 1-point spread\n• Junk-rated company — 7.5%, a 3.5-point spread",
        "Spreads move with fear. In a recession, investors worry about defaults, spreads widen, and lower-quality bond prices fall, often at the same time stocks are falling.",
        "That's why high-yield bonds behave more like stocks than like Treasuries. In the 2008 financial crisis, junk bonds lost about a quarter of their value while Treasuries rose. If you hold bonds as a cushion for stock crashes, quality matters more than yield.",
        "When a company defaults, bondholders don't always lose everything. They're in line ahead of shareholders and often recover part of their money through bankruptcy. But \"part\" can be well under half.",
        "One bond from one company is a concentrated bet on that company. A bond fund spreads credit risk across hundreds or thousands of borrowers, so a single default barely registers.",
        "Beware of chasing yield. A bond paying far more than similar bonds is the bond market's version of the dividend yield trap: the market is pricing in a real chance you won't be paid in full. Find out why the yield is high before you get excited about it.",
        "What this means for you as a young adult: for the safe part of your money, stick with high-quality bonds: Treasuries, investment-grade funds, or a total bond market fund. If you want more risk for more return, that's what the stock side of your portfolio is for."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "What is credit risk?",
          options: [
            "The risk that the borrower doesn't pay you back in full",
            "The risk that interest rates rise",
            "The risk of losing your credit card",
            "The risk that inflation rises",
          ],
          correct: 0,
          explanation:
            "Credit risk is about the issuer's ability to pay. Interest-rate risk is a separate risk that affects even the safest bonds.",
        },
        {
          id: 2,
          question: "On the S&P scale, what's the lowest rating that still counts as investment grade?",
          options: ["AAA", "BB+", "BBB−", "D"],
          correct: 2,
          explanation:
            "BBB− (Baa3 at Moody's) is the bottom of investment grade. BB+ and below is high-yield, or junk.",
        },
        {
          id: 3,
          question: "What is a credit spread?",
          options: [
            "The fee a broker charges to buy a bond",
            "The extra yield a bond pays over a Treasury with the same maturity",
            "The difference between a bond's face value and its price",
            "The range of ratings an issuer has received",
          ],
          correct: 1,
          explanation:
            "The spread is the extra pay for taking credit risk. A riskier borrower has to offer a wider spread to attract lenders.",
        },
        {
          id: 4,
          question: "In a recession, what tends to happen to junk bond prices?",
          options: [
            "They rise, like Treasuries",
            "They're unaffected",
            "They stop trading",
            "They fall as fear of defaults grows, often alongside stocks",
          ],
          correct: 3,
          explanation:
            "Spreads widen when investors fear defaults. In 2008, junk bonds lost about a quarter of their value while Treasuries rose.",
        },
        {
          id: 5,
          question: "A bond yields far more than similar bonds. What's the most likely reason?",
          options: [
            "It's a hidden bargain the market missed",
            "The market sees a real chance the borrower won't pay in full",
            "It's backed by the U.S. government",
            "It has a very short maturity",
          ],
          correct: 1,
          explanation:
            "Like a dividend yield trap, an unusually high yield usually reflects higher risk. Find out why before buying.",
        },
        {
          id: 6,
          question: "A company defaults on its bonds. What usually happens to bondholders?",
          options: [
            "They're ahead of shareholders and often recover part of their money",
            "They always get 100% back",
            "They're paid after shareholders",
            "They always lose everything",
          ],
          correct: 0,
          explanation:
            "Lenders are ahead of owners in bankruptcy and often recover something. How much varies widely and can be well under half.",
        },
        {
          id: 7,
          question: "How does a bond fund help with credit risk?",
          options: [
            "It guarantees no bond in it will default",
            "It only buys AAA bonds",
            "It spreads your money across hundreds of borrowers, so one default barely matters",
            "It's insured by the FDIC",
          ],
          correct: 2,
          explanation:
            "Diversification works for bonds too. Owning many borrowers turns a single default from a disaster into a rounding error.",
        },
      ],
    },
    {
      id: "bond-funds-ladders",
      title: "Bond Funds, CDs, and Ladders",
      subtitle: "Putting fixed income to work",
      duration: "11 min",
      difficulty: "Beginner",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "There are several ways to own fixed income, and each one works a little differently.",
        "Bond funds and ETFs — the choice of most investors:\n• One purchase holds hundreds or thousands of bonds, so credit risk is spread thin\n• A total bond market index fund can cost as little as 0.03% a year\n• You can buy or sell on any trading day, in any amount\n• The catch: a fund never matures. It keeps replacing old bonds with new ones, so there's no date when you're guaranteed your money back, and its price moves with rates every day",
        "The silver lining: a fund keeps reinvesting at current rates. After rates rise, its price drops but its income climbs. A rough rule of thumb is that if you hold for about as many years as the fund's duration, the higher income tends to make up for the price drop.",
        "Individual bonds — you buy a specific Treasury or corporate bond through a brokerage and know exactly what you'll get at maturity, as long as the issuer pays. Treasuries are easy and cheap to buy this way at most large brokerages. Corporate and municipal bonds can carry hefty markups for small buyers.",
        "Certificates of deposit (CDs) — a bank pays a fixed rate for a fixed term, from a few months to five years or more:\n• FDIC insured up to $250,000 per depositor, per bank, per ownership category, so your principal is safe\n• Cash out early and you pay a penalty, often several months of interest\n• The rate is locked: if rates rise you're stuck, and if they fall you're glad you locked in",
        "A ladder spreads your money across several maturities so that something comes due every year. With $10,000:\n• Put $2,000 each into terms of 1, 2, 3, 4, and 5 years\n• Each year, one rung matures. Spend it if you need it, or reinvest it in a new 5-year rung\n• After a few years, every rung is earning a 5-year rate, and $2,000 still comes free every year",
        "A ladder answers \"what if rates change?\" with \"a little of both.\" You never lock everything in at today's rate, and you never have to sell a bond at a loss to get cash. You can build one from CDs, Treasuries, or both.",
        "Money market funds hold very short-term debt, such as T-bills. They aim to keep a steady $1.00 share price and pay close to short-term interest rates. They're not FDIC insured, but they're among the lowest-risk investments available, and brokerages often use them as the default home for cash.",
        "Where fixed income fits, by when you need the money:\n• Within a year or two — high-yield savings, T-bills, money market funds, or short CDs\n• 3 to 10 years out — high-quality bonds and CDs, or a ladder timed to when you need the money\n• Retirement decades away — mostly stocks, with bonds added gradually as you age. A target-date fund does this for you",
        "What this means for you as a young adult: you don't need to become a bond trader. One total bond market fund, a CD or T-bill for a specific near-term goal, and maybe a ladder later on covers almost everything most people ever need from fixed income."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "What's the biggest difference between a bond fund and an individual bond?",
          options: [
            "Bond funds can't lose money",
            "A bond fund never matures, so there's no date when you're guaranteed your money back",
            "Individual bonds can't be sold before maturity",
            "Bond funds don't pay interest",
          ],
          correct: 1,
          explanation:
            "A fund keeps replacing maturing bonds with new ones. That keeps its duration steady but means its price is always moving with rates.",
        },
        {
          id: 2,
          question: "How much does FDIC insurance cover on a CD?",
          options: [
            "$100,000 total, across all banks",
            "Unlimited amounts",
            "$10,000 per year",
            "Up to $250,000 per depositor, per bank, per ownership category",
          ],
          correct: 3,
          explanation:
            "FDIC insurance covers up to $250,000 per depositor, per insured bank, for each ownership category. That's why CDs are among the safest places for cash.",
        },
        {
          id: 3,
          question:
            "You split $10,000 evenly into CDs maturing in 1, 2, 3, 4, and 5 years. How much comes due each year?",
          options: ["$10,000 every five years", "Nothing until year 5", "$2,000 every year", "$1,000 every year"],
          correct: 2,
          explanation:
            "Five rungs of $2,000 each. One matures every year, which you can spend or roll into a new 5-year rung.",
        },
        {
          id: 4,
          question: "What happens if you cash out a CD before its term ends?",
          options: [
            "You usually pay a penalty, often several months of interest",
            "Nothing — CDs can be withdrawn anytime for free",
            "You lose your entire deposit",
            "The bank doubles your interest",
          ],
          correct: 0,
          explanation:
            "The fixed rate comes with a commitment. Breaking it early typically costs some of the interest you earned.",
        },
        {
          id: 5,
          question: "Interest rates rise. What happens to a bond fund's income over time?",
          options: [
            "It falls permanently",
            "It climbs, as the fund reinvests in new bonds paying higher rates",
            "It stays exactly the same forever",
            "It stops until rates fall again",
          ],
          correct: 1,
          explanation:
            "The price drops first, but the fund keeps buying new, higher-paying bonds. Over roughly its duration in years, the extra income tends to make up for the drop.",
        },
        {
          id: 6,
          question: "You'll need $15,000 for a down payment in 18 months. Where does it fit best?",
          options: [
            "A long-term bond fund",
            "A high-yield junk bond fund",
            "High-yield savings, T-bills, a money market fund, or a short CD",
            "A 30-year Treasury bond",
          ],
          correct: 2,
          explanation:
            "Money needed within a year or two should sit somewhere its value won't swing much. Short-term, high-quality options fit.",
        },
        {
          id: 7,
          question: "Which describes a money market fund?",
          options: [
            "A stock fund that tracks the S&P 500",
            "A bank account insured by the FDIC",
            "A fund of long-term corporate bonds",
            "A fund holding very short-term debt that aims to keep a steady $1.00 share price",
          ],
          correct: 3,
          explanation:
            "Money market funds hold things like T-bills and aim for a stable $1.00 price. They're very low risk but not FDIC insured.",
        },
      ],
    },
  ],
};
