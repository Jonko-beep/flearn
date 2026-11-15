// The Options module — the fourth curriculum category. Kept in its own file
// (and spliced into `categories` by curriculum.js) so the long lesson text
// stays reviewable.
//
// Every dollar figure in these lessons is checked by tests/options.test.js
// against src/lib/options.js. If you change an example here, change it there.

const paragraphs = (...blocks) => blocks.join("\n\n");

export const optionsCategory = {
  id: "options",
  title: "Options",
  emoji: "🎯",
  color: "#0EA5E9",
  description:
    "Understand calls, puts, and how options really pay off — before you ever risk a dollar on one.",
  mascot: {
    name: "Fischer the Fox",
    emoji: "🦊",
    quote: "An option is a right, not an obligation — but the premium is due either way.",
  },
  lessons: [
    {
      id: "options-basics",
      title: "What Is an Option?",
      subtitle: "Buying a choice, not a stock",
      duration: "10 min",
      difficulty: "Intermediate",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "An option is a contract that gives its buyer the right — but not the obligation — to buy or sell a stock at a set price, on or before a set date. You're not buying the stock. You're buying a choice about the stock, and that choice has a price tag and an expiration date.",
        "Every option has four moving parts:\n• Underlying — the stock (or ETF) the contract is tied to\n• Strike price — the fixed price at which the stock can be bought or sold\n• Expiration date — the last day the contract can be used; after that it's gone\n• Premium — the price the buyer pays the seller for the contract",
        "There are two types:\n• Call option — the right to BUY the stock at the strike price. Calls gain value when the stock rises\n• Put option — the right to SELL the stock at the strike price. Puts gain value when the stock falls",
        "One standard contract covers 100 shares, and premiums are quoted per share. So an option quoted at $2.00 actually costs $200 ($2.00 × 100), plus any fees.",
        "Think of a call as a deposit that locks in a price. Suppose a stock trades at $100 and you pay $3 per share ($300) for a call with a $105 strike that expires in two months. If the stock jumps to $120, your contract lets you buy at $105 something worth $120 — it's worth $15 per share, or $1,500, and you paid $300. But if the stock never gets above $105, the option expires worthless and your $300 is gone. That's the whole deal: your loss is capped at the premium, but that loss is 100% of what you put in.",
        "Every contract has two sides. The buyer (the holder) pays the premium and gets the right. The seller (the writer) collects the premium and takes on the obligation — if the buyer exercises, the seller must deliver. Buyers have limited risk; sellers can have far larger risk, which a later lesson covers.",
        "An option's life ends one of three ways:\n1. You sell the contract to someone else before expiration — how most positions are closed\n2. You exercise it — actually buying or selling the 100 shares at the strike\n3. It expires worthless",
        "Why do options exist at all? Originally, as insurance. A put works like an insurance policy on a stock you own: you pay a premium, and if the price collapses you can still sell at the strike. Options are also used to earn income and to speculate — and speculation is where most beginners get hurt.",
        "What this means for you as a young adult: options are not a shortcut to wealth, and you can build an excellent financial life without ever trading one. But they're everywhere — in the news, all over social media, in the stock options some employers grant — so understanding how they work protects you from the hype. Learn the mechanics here, with zero dollars at risk."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "What does buying an option give you?",
          options: [
            "Ownership of 100 shares of the stock",
            "The right, but not the obligation, to buy or sell a stock at a set price on or before a set date",
            "A guaranteed profit if the stock moves",
            "A loan from your broker to buy stock",
          ],
          correct: 1,
          explanation:
            "An option is a contract for a choice, not the stock itself. You can use the right or let it lapse — but you pay the premium either way.",
        },
        {
          id: 2,
          question: "A call option gives its holder the right to:",
          options: [
            "Buy the stock at the strike price",
            "Sell the stock at the strike price",
            "Collect the stock's dividends",
            "Borrow shares from the seller",
          ],
          correct: 0,
          explanation:
            "Calls are the right to BUY at the strike, so they gain value when the stock rises. Puts are the mirror image: the right to SELL at the strike.",
        },
        {
          id: 3,
          question: "An option is quoted at $2.00. What does one standard contract cost?",
          options: ["$2", "$20", "$200", "$2,000"],
          correct: 2,
          explanation:
            "Premiums are quoted per share and one contract covers 100 shares: $2.00 × 100 = $200, plus any fees.",
        },
        {
          id: 4,
          question:
            "You buy a call, and the stock never rises above the strike price before expiration. What happens?",
          options: [
            "The seller refunds your premium",
            "The contract rolls over to the next month automatically",
            "You're required to buy the shares anyway",
            "The option expires worthless and you lose the premium you paid",
          ],
          correct: 3,
          explanation:
            "A call that finishes at or below its strike is worth nothing. Your loss is capped at the premium — but it's 100% of what you put in.",
        },
        {
          id: 5,
          question: "Which side of an options contract takes on an obligation?",
          options: [
            "The buyer, who pays the premium",
            "The seller (writer), who collects the premium",
            "Both sides equally",
            "Neither — options are always optional",
          ],
          correct: 1,
          explanation:
            "The buyer pays for a right. The seller is paid to accept an obligation: if the buyer exercises, the seller has to deliver.",
        },
        {
          id: 6,
          question: "How are most option positions closed?",
          options: [
            "By exercising them to buy or sell the shares",
            "By letting them expire",
            "By selling the contract to someone else before expiration",
            "By returning them to the company that issued the stock",
          ],
          correct: 2,
          explanation:
            "Options trade like stocks do. Most holders sell the contract itself before expiration rather than exercising it or letting it lapse.",
        },
        {
          id: 7,
          question:
            "A stock trades at $100. You pay $3 per share for a call with a $105 strike, and the stock is at $120 at expiration. What is the option worth per share?",
          options: ["$15", "$3", "$20", "$120"],
          correct: 0,
          explanation:
            "The right to buy at $105 something worth $120 is worth $15 per share — $1,500 per contract, against the $300 you paid.",
        },
      ],
    },
    {
      id: "buying-calls-puts",
      title: "Buying Calls and Puts",
      subtitle: "The payoff math, in plain numbers",
      duration: "12 min",
      difficulty: "Intermediate",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "Buying an option is the simplest options trade: you pay the premium, and the premium is the most you can ever lose. What makes it tricky is that being right about a stock isn't enough — you have to be right about how far it moves and by when.",
        "Buying a call (you think the stock will rise):\nA stock trades at $50. You buy one $55 call for $2 per share — $200 total. At expiration:\n• Stock at $60 — the call is worth $5. Minus the $2 you paid, that's $3 per share: a $300 profit, or 150% on your $200. The stock itself rose 20%\n• Stock at $56 — the call is worth $1. You paid $2, so you LOSE $100 — even though the stock went up 12%\n• Stock at $55 or lower — the call is worthless. You lose the full $200",
        "The number to memorize is the breakeven. For a call held to expiration:\n• Breakeven = strike price + premium\nHere that's $55 + $2 = $57. Below $57 you lose money; above it you profit.",
        "Buying a put (you think the stock will fall):\nSame $50 stock. You buy one $45 put for $1.50 per share — $150 total. At expiration:\n• Stock at $38 — the put is worth $7. Minus $1.50, that's a $550 profit\n• Stock at $45 or higher — the put is worthless. You lose the full $150\n• Breakeven = strike price − premium, so $45 − $1.50 = $43.50",
        "Puts as insurance: the protective put. Say you own 100 shares you bought at $50, and you're nervous about a rough few months. Buy that same $45 put for $1.50 and your worst case is locked in: you can always sell at $45, so the most you can lose is $5 on the shares plus the $1.50 premium — $6.50 per share, $650 total — no matter how far the stock falls. It works exactly like insurance with a deductible, and like insurance, it costs money every time you renew it.",
        "Notice what leverage did in the call example. With the same $200 you could have bought 4 shares, and a move to $60 would have made you $40. The call made $300. That's the appeal. But at $56 the 4 shares are up $24 while the call is down $100, and at $54 the shares are up $16 while the call has lost everything. Leverage magnifies the outcome in both directions.",
        "A buyer needs three things to go right:\n1. Direction — the stock moves the way you expected\n2. Size — it moves far enough to clear the breakeven\n3. Timing — it does so before expiration\nMiss any one of the three and the trade loses.",
        "What this means for you as a young adult: before you ever look at a real options chain, be able to answer two questions instantly — what's my breakeven, and what's my maximum loss? If a trade idea can't survive those two questions, it's not a trade. Try the Options Payoff Visualizer in Tools and drag the numbers around until the shapes feel obvious."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "What is the breakeven price for a call option held to expiration?",
          options: [
            "The strike price",
            "The stock's price when you bought the option",
            "The strike price plus the premium paid",
            "The strike price minus the premium paid",
          ],
          correct: 2,
          explanation:
            "The stock has to climb past the strike by enough to pay back the premium. A $55 call bought for $2 breaks even at $57.",
        },
        {
          id: 2,
          question:
            "You buy one $55 call for $2 per share. The stock finishes at $60. What's your profit?",
          options: ["$500", "$300", "$200", "$1,000"],
          correct: 1,
          explanation:
            "The call is worth $60 − $55 = $5. Subtract the $2 premium: $3 per share × 100 shares = $300, a 150% gain on the $200 you paid.",
        },
        {
          id: 3,
          question: "Same $55 call bought for $2, but the stock finishes at $56. What's the result?",
          options: [
            "A $100 loss — the option is worth $1 but cost $2",
            "A $100 profit — the stock finished above the strike",
            "A $600 profit",
            "You break even",
          ],
          correct: 0,
          explanation:
            "Finishing above the strike isn't the same as finishing above breakeven. The option is worth $1 per share, you paid $2, so you're down $100.",
        },
        {
          id: 4,
          question: "What's the most you can lose when you BUY a call or a put?",
          options: [
            "The strike price times 100",
            "An unlimited amount",
            "Whatever the stock loses",
            "The premium you paid",
          ],
          correct: 3,
          explanation:
            "A buyer's risk is defined up front: the premium. The catch is that losing all of it is a common outcome, not a rare one.",
        },
        {
          id: 5,
          question: "You buy a $45 put for $1.50 per share. What's your breakeven at expiration?",
          options: ["$46.50", "$43.50", "$45.00", "$41.50"],
          correct: 1,
          explanation:
            "For a put, breakeven = strike − premium: $45 − $1.50 = $43.50. The stock has to fall below that for you to profit.",
        },
        {
          id: 6,
          question:
            "You own 100 shares bought at $50 and buy a $45 put for $1.50 as protection. What's your worst-case loss per share?",
          options: ["$1.50", "$5.00", "$6.50", "$50.00"],
          correct: 2,
          explanation:
            "You can always sell at $45, so the shares can cost you at most $5 — plus the $1.50 you paid for the put. That's $6.50 per share, however far the stock falls.",
        },
        {
          id: 7,
          question: "Why can you lose money on a call even when the stock goes up?",
          options: [
            "Brokers keep the first 10% of any gain",
            "Calls only pay off when the stock falls",
            "Dividends are subtracted from the option's value",
            "The stock has to rise past the strike plus the premium, before expiration — direction alone isn't enough",
          ],
          correct: 3,
          explanation:
            "A buyer needs direction, size, and timing all at once. A stock that rises too little, or too late, still leaves the option worth less than you paid.",
        },
      ],
    },
    {
      id: "option-pricing",
      title: "What's in a Premium?",
      subtitle: "Intrinsic value, time, and volatility",
      duration: "12 min",
      difficulty: "Advanced",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "Why does one option cost $0.40 and another $12? An option's premium isn't arbitrary — it's built from two pieces, and once you can see them, option prices stop looking like magic.",
        "Premium = intrinsic value + time value\n• Intrinsic value — what the option would be worth if it expired right now. For a call: stock price minus strike. For a put: strike minus stock price. It can't be less than zero\n• Time value — everything else. It's what buyers pay for the chance that the option becomes more valuable before it expires",
        "An example with the stock at $100:\n• A $95 call costs $8. Intrinsic value is $5 ($100 − $95), so time value is $3\n• A $105 call costs $2. Intrinsic value is $0, so all $2 is time value — you're paying purely for possibility",
        "Traders describe where the strike sits with one word — moneyness:\n• In the money (ITM) — the option has intrinsic value. A call with a strike below the stock price; a put with a strike above it\n• At the money (ATM) — the strike is right around the stock price\n• Out of the money (OTM) — no intrinsic value. A call with a strike above the stock price; a put with a strike below it",
        "Time decay. Time value melts a little every day, and at expiration it's exactly zero. The melt isn't steady — it speeds up as expiration approaches, so an option can lose more time value in its final two weeks than in the two months before. Think of an ice cube: slow at first, then all at once. Traders call this decay theta. It works against every option buyer and in favor of every option seller.",
        "Implied volatility (IV). The more a stock is expected to swing, the more its options cost, because big swings make big payoffs more likely. IV is the market's forecast of those swings, baked into the price. It matters most around scheduled news. Before an earnings report, IV rises and options get expensive; the moment the news is out, IV collapses. That's why you can buy a call before earnings, watch the stock go up, and still lose money — the option's time value shrank faster than the stock rose. This is called IV crush.",
        "Delta: how much the option moves when the stock moves. A delta of 0.50 means the option gains about $0.50 when the stock gains $1. At-the-money options sit near 0.50; deep in-the-money options approach 1.00 and move almost like the stock; far out-of-the-money options sit near zero and barely react. Delta is also used as a rough gauge of the market's odds that the option finishes in the money — a 0.10-delta option is priced like a long shot because it is one.",
        "Put it together and three things drive nearly every option price:\n1. Where the stock is relative to the strike\n2. How much time is left\n3. How volatile the market expects the stock to be",
        "What this means for you as a young adult: cheap options are cheap for a reason. A $0.20 far out-of-the-money call isn't a bargain — the market is telling you it will very probably expire worthless. Before buying any option, split its price into intrinsic and time value and ask what you're actually paying for."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "An option's premium is made of which two parts?",
          options: [
            "Intrinsic value and time value",
            "Strike price and expiration date",
            "Dividends and interest",
            "Commission and spread",
          ],
          correct: 0,
          explanation:
            "Intrinsic value is what the option is worth if it expired now; time value is what buyers pay for what might still happen before it does.",
        },
        {
          id: 2,
          question: "A stock trades at $100 and a $95 call costs $8. How much of that is time value?",
          options: ["$8", "$5", "$3", "$0"],
          correct: 2,
          explanation:
            "Intrinsic value is $100 − $95 = $5. The remaining $8 − $5 = $3 is time value.",
        },
        {
          id: 3,
          question: "With the stock at $100, which option is out of the money?",
          options: [
            "A call with a $95 strike",
            "A call with a $105 strike",
            "A put with a $105 strike",
            "A put with a $110 strike",
          ],
          correct: 1,
          explanation:
            "A call is out of the money when its strike is above the stock price — there's no gain in buying at $105 what you can buy at $100. The other three all have intrinsic value.",
        },
        {
          id: 4,
          question: "How does time decay behave as an option approaches expiration?",
          options: [
            "It stops once the option is in the money",
            "It slows down, since less time value is left",
            "It only affects put options",
            "It speeds up — time value melts fastest in the final weeks and hits zero at expiration",
          ],
          correct: 3,
          explanation:
            "Time value erodes every day and the erosion accelerates near the end. That's theta: a headwind for buyers and a tailwind for sellers.",
        },
        {
          id: 5,
          question: "What does higher implied volatility do to option prices?",
          options: [
            "Raises them — bigger expected swings make big payoffs more likely",
            "Lowers them — volatile stocks are less desirable",
            "Nothing — only the stock price matters",
            "Raises calls but lowers puts",
          ],
          correct: 0,
          explanation:
            "IV is the market's forecast of how much the stock will move. More expected movement makes both calls and puts more valuable.",
        },
        {
          id: 6,
          question:
            "You buy a call just before earnings. The stock rises slightly on the report, yet your option loses value. What most likely happened?",
          options: [
            "The broker changed the strike price",
            "The option was exercised without your permission",
            "Implied volatility collapsed once the news was out, shrinking the option's time value",
            "Calls always fall when stocks rise",
          ],
          correct: 2,
          explanation:
            "That's IV crush. Options are priced for uncertainty ahead of earnings; when the uncertainty is resolved, the extra time value disappears — sometimes faster than the stock's move can make up for.",
        },
        {
          id: 7,
          question: "An option has a delta of 0.50. If the stock rises $1, the option's price rises by about:",
          options: ["$1.00", "$0.50", "$0.05", "$5.00"],
          correct: 1,
          explanation:
            "Delta is the option's price change per $1 move in the stock. At-the-money options sit near 0.50, so they move about half as much as the shares.",
        },
      ],
    },
    {
      id: "selling-options",
      title: "Selling Options for Income",
      subtitle: "Covered calls and cash-secured puts",
      duration: "12 min",
      difficulty: "Advanced",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "So far you've been the buyer: pay a premium, get a right. Flip to the other side and you're the seller: you collect the premium up front and accept an obligation. Sellers win when nothing dramatic happens, which is most of the time — and lose, sometimes badly, when something does.",
        "Two selling strategies are considered conservative, because the obligation is backed by something you already hold.",
        "The covered call — you own 100 shares and sell a call against them.\nYou own 100 shares bought at $50 and sell one $55 call for $1.50, collecting $150. At expiration:\n• Stock below $55 — the call expires worthless. You keep your shares and the $150\n• Stock above $55 — your shares are \"called away\": you sell them at $55. Your gain is $5 on the shares plus the $1.50 premium — $6.50 per share, $650 — and that's your ceiling, whether the stock finishes at $56 or $90\n• Stock falls — you still own it. The premium cushions the first $1.50, so your breakeven is $48.50, but below that you lose like any shareholder",
        "The trade-off is the whole strategy: you sell your upside above the strike in exchange for cash today.",
        "The cash-secured put — you sell a put and keep enough cash to buy the shares.\nA stock trades at $50. You sell one $45 put for $1.20, collecting $120, and set aside the $4,500 you'd need to buy 100 shares at $45. At expiration:\n• Stock above $45 — the put expires worthless. You keep the $120\n• Stock below $45 — you're assigned: you must buy 100 shares at $45. With the premium, your effective cost is $43.80 per share\n• If the stock is at $35 by then, you paid $43.80 for something worth $35 — an $880 loss",
        "People call this \"getting paid to wait\" for a stock they'd like to own at a lower price. That's fair, as long as you remember what you've signed up for: all of the stock's downside below the strike, in exchange for a small, capped premium.",
        "Assignment. When a buyer exercises, a seller is assigned and has to make good — deliver shares (calls) or buy them (puts). With the stock options traded in the U.S., that can happen on any day before expiration, not just the last one. It's most likely when the option is in the money near expiration, or just before a dividend for calls.",
        "The one to stay away from: the naked call. Selling a call WITHOUT owning the shares means that if the stock soars you must buy shares at the market price to deliver them at the strike. A stock has no maximum price, so your loss has no maximum either. Brokers restrict naked selling to their highest approval levels for a reason.",
        "Selling options is selling insurance. You collect many small premiums, and every so often you owe a large claim. Insurance companies survive by pricing carefully and never betting the company on one policy; an individual selling options needs the same discipline.",
        "What this means for you as a young adult: \"income\" from selling options is not free money — it's payment for taking a risk off someone else's hands. If you ever do it, do it only in its covered forms, on a stock you'd be glad to own, with a worst case you've calculated in advance."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "What makes a call \"covered\"?",
          options: [
            "You bought insurance on the option",
            "The broker guarantees you can't lose money",
            "You own the 100 shares you might have to deliver",
            "The option is already in the money",
          ],
          correct: 2,
          explanation:
            "A covered call is sold against shares you already hold, so if you're assigned you simply hand them over at the strike price.",
        },
        {
          id: 2,
          question:
            "You own 100 shares bought at $50 and sell a $55 call for $1.50. What's the most you can make by expiration?",
          options: ["$150", "$500", "$1,500", "$650"],
          correct: 3,
          explanation:
            "$5 per share from selling at the $55 strike plus the $1.50 premium is $6.50 per share — $650 — no matter how far above $55 the stock goes.",
        },
        {
          id: 3,
          question: "What's the core trade-off of a covered call?",
          options: [
            "You cap your upside at the strike in exchange for the premium",
            "You eliminate all downside risk in the stock",
            "You give up your dividends permanently",
            "You must hold the shares for at least a year",
          ],
          correct: 0,
          explanation:
            "The premium is payment for the gains you're giving away above the strike. The downside of owning the stock is still yours, minus that small cushion.",
        },
        {
          id: 4,
          question:
            "You sell a $45 put for $1.20 and get assigned. What's your effective purchase price per share?",
          options: ["$45.00", "$43.80", "$46.20", "$1.20"],
          correct: 1,
          explanation:
            "You pay the $45 strike but you already collected $1.20, so your net cost is $45 − $1.20 = $43.80 per share.",
        },
        {
          id: 5,
          question: "What does \"cash-secured\" mean when you sell a put?",
          options: [
            "The premium is paid to you in cash",
            "Your broker insures the trade",
            "You keep enough cash set aside to buy the shares at the strike if assigned",
            "The put can only be settled in cash, never shares",
          ],
          correct: 2,
          explanation:
            "Selling one $45 put means you might have to buy 100 shares for $4,500. Keeping that cash on hand is what makes the obligation safe to carry.",
        },
        {
          id: 6,
          question: "Why is selling a naked call the most dangerous basic options trade?",
          options: [
            "A stock can rise without limit, so the potential loss is unlimited",
            "The premium is taxed twice",
            "It can only be done once per year",
            "The stock might pay a dividend",
          ],
          correct: 0,
          explanation:
            "Without the shares, you'd have to buy them at whatever the market price is to deliver them at the strike. There's no ceiling on a stock price, so there's no ceiling on the loss.",
        },
        {
          id: 7,
          question: "Selling options is most like which business?",
          options: [
            "Running a lottery — a few big winners pay for everything",
            "Owning a savings account — slow, guaranteed interest",
            "Day trading — many quick bets on direction",
            "Selling insurance — steady small premiums, with an occasional large claim to pay",
          ],
          correct: 3,
          explanation:
            "Sellers are paid to take on someone else's risk. Most contracts cost them nothing; the rare bad one can cost far more than any single premium earned.",
        },
      ],
    },
    {
      id: "options-risk",
      title: "Options Risk",
      subtitle: "Leverage cuts both ways",
      duration: "11 min",
      difficulty: "Advanced",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "Options aren't dangerous because they're complicated. They're dangerous because they make it easy to take a very large bet with a very small amount of money — and to lose that money completely, on schedule. This lesson is the honest fine print.",
        "Leverage, restated. A stock that drops 10% has lost 10%. A call on that stock can lose 100% on the same move. With shares, being early or a little wrong costs you some money and you can wait. With a bought option, the clock runs out and the position goes to zero. Total loss isn't the disaster scenario for an option buyer — it's one of the normal outcomes.",
        "A myth worth retiring: you'll hear that \"90% of options expire worthless.\" Not so. Most contracts are closed out before expiration, and industry figures have long put the share that actually expire worthless at closer to a third. But the instinct behind the myth is sound: studies of individual investors have found that, as a group, they lose money trading options — mostly by buying short-dated, out-of-the-money contracts around exciting news.",
        "The costs you don't see on the chart:\n• Time decay — covered earlier: a bought option loses value every day the stock doesn't move your way\n• Bid-ask spreads — the gap between the price you can buy at and the price you can sell at. On options it's often much wider than on stocks, so you give up a slice of value just getting in and out\n• Taxes — in the U.S., profits on options held under a year are generally short-term capital gains, taxed at ordinary income rates rather than the lower long-term rates",
        "Defined risk vs. undefined risk:\n• Buying a call or put — defined. You can't lose more than the premium\n• Covered calls and cash-secured puts — large but known. Your worst case is the stock going to zero\n• Selling naked calls — undefined. The loss has no ceiling",
        "Very short-dated options deserve their own warning. Contracts that expire within days — or the same day — are cheap, move violently, and have almost no time for you to be right. They're closer to lottery tickets than investments, and the odds are priced accordingly.",
        "Brokers know all this, which is why you can't just start trading options. You apply for approval, and the broker grants levels: buying calls and puts and selling covered calls sit at the lower levels, while naked selling requires the highest level and a margin account. The questionnaire is there to protect you. Answer it honestly.",
        "Before any options trade, answer three questions out loud:\n1. What's the most I can lose?\n2. Where's my breakeven?\n3. What has to happen, and by when, for this to work?",
        "A sensible guideline for size: treat money in speculative options as money you could lose completely, and keep it to a small slice of what you invest. If losing it would change your plans, the position is too big.",
        "What this means for you as a young adult: nothing in this module replaces the boring plan from the Investing lessons — an emergency fund, then low-cost index funds, held for decades. Options are optional. If you explore them, start with paper trades and the Payoff Visualizer, risk only small amounts, and remember that the people selling you the dream of fast money are usually on the other side of the trade."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question:
            "A stock moves 10% and an option on it moves 100%. What is that amplification called?",
          options: ["Diversification", "Leverage", "Compounding", "Arbitrage"],
          correct: 1,
          explanation:
            "Leverage means a small amount of money controls a large position, so gains and losses are both magnified.",
        },
        {
          id: 2,
          question: "What does the lesson say about the claim that \"90% of options expire worthless\"?",
          options: [
            "It's exactly right",
            "It's too low — nearly all options expire worthless",
            "It's a myth — most contracts are closed before expiration, and closer to a third expire worthless",
            "It's only true for put options",
          ],
          correct: 2,
          explanation:
            "Most positions are closed out early. The useful truth underneath the myth is that individual investors, as a group, have lost money trading options.",
        },
        {
          id: 3,
          question: "In the U.S., how are profits on options held for under a year generally taxed?",
          options: [
            "As short-term capital gains, at ordinary income rates",
            "At the lower long-term capital gains rates",
            "They aren't taxed until you withdraw the cash",
            "At a flat 10%",
          ],
          correct: 0,
          explanation:
            "Most options trades are short-term, so gains are taxed like regular income — a cost that doesn't show up on a payoff chart.",
        },
        {
          id: 4,
          question: "What does a wide bid-ask spread cost you?",
          options: [
            "Nothing, if you hold to expiration",
            "A yearly account fee",
            "A higher strike price",
            "A slice of value every time you get in and out of a trade",
          ],
          correct: 3,
          explanation:
            "You buy at the higher ask and sell at the lower bid. On thinly traded options that gap can be a meaningful share of the option's price.",
        },
        {
          id: 5,
          question: "Which position has undefined — potentially unlimited — risk?",
          options: [
            "Buying a put",
            "Selling a naked call",
            "Buying a call",
            "Selling a covered call",
          ],
          correct: 1,
          explanation:
            "Buyers can lose only their premium, and covered sellers know their worst case. A naked call seller owes whatever the stock rises to, with no cap.",
        },
        {
          id: 6,
          question: "Which is NOT one of the three questions to answer before any options trade?",
          options: [
            "What's the most I can lose?",
            "Where's my breakeven?",
            "What is everyone on social media buying?",
            "What has to happen, and by when, for this to work?",
          ],
          correct: 2,
          explanation:
            "Maximum loss, breakeven, and the scenario-plus-deadline are the checklist. Popularity tells you nothing about any of them.",
        },
        {
          id: 7,
          question: "How much does the lesson suggest putting into speculative options?",
          options: [
            "Only a small slice you could afford to lose completely",
            "Most of your portfolio while you're young",
            "Your emergency fund, since the risk is defined",
            "As much as your broker will approve",
          ],
          correct: 0,
          explanation:
            "Total loss is a normal outcome for a bought option, so size it accordingly. If losing it would change your plans, it's too big.",
        },
      ],
    },
  ],
};
