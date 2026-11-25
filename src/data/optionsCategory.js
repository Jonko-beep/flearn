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
        "Puts as insurance: the protective put. Say you own 100 shares you bought at $50, and you're nervous about a rough few months. Buy that same $45 put for $1.50 and your worst case is locked in: you can always sell at $45, so the most you can lose is $5 on the shares plus the $1.50 premium — $6.50 per share, $650 total — no matter how far the stock falls. It works exactly like insurance with a deductible, and like insurance, it costs money every time you renew it. The Protective Puts lesson goes deeper.",
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
      id: "protective-puts",
      title: "Protective Puts",
      subtitle: "Insurance for shares you already own",
      duration: "10 min",
      difficulty: "Intermediate",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "A protective put is the original reason options exist: insurance. You own shares, you buy a put on them, and no matter how far the stock falls, you can still sell at the strike price. Your upside stays open. Your downside gets a floor.",
        "The setup: own 100 shares (one contract covers 100) and buy one put. If you buy the shares and the put at the same time, it's sometimes called a married put. It's the same position.",
        "An example. You bought 100 shares at $80 and they now trade at $100. You're nervous about the next three months, so you buy a $95 put expiring in three months for $3 per share, or $300. Measured from today's $100 price, at expiration:\n• Stock at $70 — the shares are down $30, but the put is worth $25. Minus the $3 premium, you're down $8 per share: $800\n• Stock at $95 — the shares are down $5 and the put is worthless. With the premium, you're still down $800. That's the floor\n• Stock at $100 — nothing happened. You're down the $300 premium, the cost of the insurance\n• Stock at $120 — the shares are up $20, minus the $3 premium: a $1,700 gain, versus $2,000 without the put",
        "The three numbers to know:\n• Maximum loss = (today's price − strike) + premium. Here, $5 + $3 = $8 per share, however far the stock falls\n• Breakeven = today's price + premium. Here, $103. The stock has to rise enough to pay for the insurance\n• Maximum gain — unlimited, minus the premium",
        "Notice what the floor did to your existing gain. You bought at $80, and the worst case is now selling at $95 after paying $3 for the put, an effective $92. At least $12 of your $20-per-share gain is locked in, even if the company collapses.",
        "Choosing the strike is choosing your deductible. With the stock at $100, prices might look like this:\n• $90 put for $1.50 — cheap, but you absorb the first $10 of a drop. Maximum loss: $11.50 per share\n• $95 put for $3.00 — the middle ground. Maximum loss: $8 per share\n• $100 put for $5.50 — full protection from today's price, but expensive. Maximum loss: $5.50 per share, all of it premium",
        "A higher strike gives a higher floor and costs more, exactly like a lower deductible on car insurance. A longer expiration costs more in total, but usually less per month of protection.",
        "The catch is cost over time. $3 every three months is $12 a year, or 12% of a $100 stock. Insurance that expensive, renewed forever, can eat most of what a stock earns over the long run. That's why protective puts are usually a temporary tool, not a permanent one.",
        "When a protective put makes sense:\n• A concentrated position — a large chunk of one stock, such as employer stock, that you can't or don't want to sell yet\n• A known event — an earnings report, a court ruling, or a stretch when you'll need the money soon\n• A big gain you want to protect without selling",
        "Why not just use a stop-loss order? A stop-loss tells your broker to sell if the stock drops to a set price. It's free, but it isn't a guarantee. Once triggered it becomes a regular sell order, so if the stock closes at $100 and opens the next morning at $70 after bad news, you sell near $70, not at your $95 stop. A put guarantees the strike, gap or no gap. That certainty is what the premium pays for.",
        "Looking ahead: you can pay for some or all of a put by also selling a covered call on the same shares. That combination is called a collar, and it's covered in the Covered Calls lesson.",
        "What this means for you as a young adult: if you own a diversified index fund and won't need the money for decades, time and diversification are your protection, and they're free. Protective puts are for specific, temporary risks: one big stock, one big event, one big gain. Try \"Protective put\" in the Options Payoff Visualizer and watch the floor move as you change the strike."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "What is a protective put?",
          options: [
            "Selling a put on a stock you'd like to buy",
            "Buying a put on shares you already own, so you can always sell at the strike",
            "Selling a call to collect income",
            "A put that can't lose money",
          ],
          correct: 1,
          explanation:
            "A protective put is insurance: you own the shares and buy a put, which puts a floor under your losses while leaving your upside open.",
        },
        {
          id: 2,
          question:
            "A stock trades at $100. You own 100 shares and buy a $95 put for $3. What's your maximum loss per share from today's price?",
          options: ["$3", "$5", "$8", "$95"],
          correct: 2,
          explanation:
            "You can always sell at $95, so the shares can lose at most $5, plus the $3 premium. That's $8 per share, or $800, however far the stock falls.",
        },
        {
          id: 3,
          question: "Same position: shares at $100, a $95 put bought for $3. What's your breakeven at expiration?",
          options: ["$97", "$95", "$100", "$103"],
          correct: 3,
          explanation:
            "The shares have to rise enough to pay for the insurance: $100 + $3 = $103.",
        },
        {
          id: 4,
          question: "The stock rises from $100 to $120 by expiration. What happened to your protected position?",
          options: [
            "You kept the gain, minus the $3 premium — $1,700 instead of $2,000",
            "Your gain was capped at the strike",
            "You lost the full premium plus $5 per share",
            "The put was exercised and your shares were sold",
          ],
          correct: 0,
          explanation:
            "A protective put doesn't cap your upside. The put expires worthless and you keep the $20 gain per share, less the $3 you paid for protection.",
        },
        {
          id: 5,
          question: "What happens when you choose a higher strike for your protective put?",
          options: [
            "It gets cheaper and the floor gets higher",
            "Nothing — all strikes cost the same",
            "It costs more, but your floor is higher",
            "Your upside becomes capped",
          ],
          correct: 2,
          explanation:
            "Like a lower deductible, a higher strike protects more and costs more. With the stock at $100, a $100 put costs far more than a $90 put.",
        },
        {
          id: 6,
          question:
            "Your stock closes at $100 and opens at $70 after bad news. What's the advantage of a $95 put over a $95 stop-loss order?",
          options: [
            "The stop-loss would have sold at exactly $95",
            "The put still lets you sell at $95; the stop-loss would likely sell near $70",
            "There's no difference",
            "The put is free and the stop-loss isn't",
          ],
          correct: 1,
          explanation:
            "A triggered stop-loss becomes a regular sell order at whatever the market price is. A put guarantees the strike, even when the stock jumps straight past it.",
        },
        {
          id: 7,
          question: "Why do most investors use protective puts only temporarily?",
          options: [
            "They're only allowed during earnings season",
            "Puts can't be bought on index funds",
            "They cap your upside",
            "Renewing the insurance over and over can eat most of a stock's long-run return",
          ],
          correct: 3,
          explanation:
            "Paying $3 every three months on a $100 stock is 12% a year. That's worth it for a specific, temporary risk, but not as a permanent habit.",
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
        "The trade-off is the whole strategy: you sell your upside above the strike in exchange for cash today. The Covered Calls lesson goes deeper.",
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
      id: "covered-calls",
      title: "Covered Calls",
      subtitle: "Renting out your shares for income",
      duration: "11 min",
      difficulty: "Advanced",
      locked: false,
      videoUrl: null,
      content: paragraphs(
        "The covered call is the most popular way investors sell options, and the previous lesson introduced it. This lesson goes deeper: how to choose the strike and expiration, what really happens when your shares get called away, and why a high \"yield\" doesn't tell the whole story.",
        "The setup: you own 100 shares and sell one call against them. You collect the premium today. In exchange, you agree to sell your shares at the strike price if the buyer wants them. Think of it as renting out the upside of your shares: you get paid rent, and the renter keeps any gains above the strike.",
        "An example. You own 100 shares bought at $40, and the stock is at $40. You sell a $42 call expiring in about a month for $0.80, collecting $80. At expiration:\n• Stock at or below $42 — the call expires worthless. You keep your shares and the $80, about 2% in a month on $4,000\n• Stock above $42 — your shares are called away at $42. Your profit is $2 on the shares plus the $0.80 premium: $280, and that's the ceiling\n• Stock at $50 — still $280. Just holding the shares would have made $1,000. The extra $720 went to the call's buyer\n• Stock at $35 — you still own the shares. You're down $5 per share, cushioned by the $0.80 premium: a $420 loss instead of $500",
        "The three numbers to know:\n• Maximum profit = (strike − your cost) + premium. Here, $2 + $0.80 = $2.80 per share, or $280\n• Breakeven = your cost − premium. Here, $39.20\n• Maximum loss — the stock going to zero, minus the premium. The covered call barely changes your downside",
        "Choosing the strike is a trade-off between income and keeping your shares. With the stock at $40:\n• A $40 call might pay $1.80 — big income, but you'll very likely be called away, and any gain above $40 goes to the buyer\n• A $42 call might pay $0.80 — the middle ground\n• A $45 call might pay $0.25 — little income, but plenty of room for the stock to rise before you have to sell",
        "Choosing the expiration: many covered-call sellers use contracts about 30 to 45 days out. Time decay speeds up in an option's final weeks, and as the seller, decay works for you. Longer contracts pay more in total but lock you in for longer.",
        "The \"2% a month\" trap. 2% a month sounds like 24% a year, but it doesn't work that way. In months when the stock falls, you keep the whole loss, minus a small premium. In months when it soars, you've sold away the gain. You keep all of the bad months and give away the best ones. Over long periods, covered-call strategies have tended to trail simply owning the stock in strong markets.",
        "Being called away. If the stock is above your strike at expiration, expect to sell. It can also happen earlier: a call buyer may exercise early, most often just before the stock's ex-dividend date to collect the dividend. Then you lose both the shares and the dividend. Don't sell a covered call on shares you'd hate to part with at the strike.",
        "Rolling. If the stock climbs toward your strike and you want to keep the shares, you can buy back the call and sell a new one with a later expiration, often at a higher strike. That's called rolling up and out. It isn't a free fix. Buying back a call on a rising stock costs money, so a roll is really a brand-new trade, and it should make sense on its own.",
        "Taxes. In a regular brokerage account, premiums are generally taxed as short-term capital gains. If your shares are called away, that's a sale, which can trigger capital gains tax on shares you'd planned to hold for years. Many brokers allow covered calls inside an IRA, where none of that applies.",
        "Covered-call funds. Some ETFs sell calls on an entire index and advertise yields of 10% or more. That \"yield\" is mostly option premium, not company profits, and it comes from giving up upside. In strong markets these funds usually lag the plain index fund. Compare total return, not yield.",
        "Pairing with a protective put. Sell a covered call and use the premium to help pay for a protective put on the same shares, and you have a collar: a floor below and a ceiling above. It's a common way to protect a big position cheaply, in exchange for capping its upside.",
        "What this means for you as a young adult: covered calls fit a stock you're happy to own, happy to sell at the strike, and don't expect to move much soon. They're a poor fit for a stock you think could take off. Before you sell one, say your maximum profit and your breakeven out loud. Try different strikes in the Options Payoff Visualizer and compare each one with just holding the shares."
      ),
      transcript: null,
      quiz: [
        {
          id: 1,
          question: "When do you keep both your shares and the premium from a covered call?",
          options: [
            "When the stock finishes at or below the strike at expiration",
            "Only when the stock rises above the strike",
            "Always — covered calls can't be assigned",
            "Only if you exercise the call yourself",
          ],
          correct: 0,
          explanation:
            "If the stock finishes at or below the strike, the call expires worthless. You keep the shares and the full premium.",
        },
        {
          id: 2,
          question:
            "You own 100 shares bought at $40 and sell a $42 call for $0.80. What's your maximum profit?",
          options: ["$80", "$200", "$280", "$4,200"],
          correct: 2,
          explanation:
            "$2 per share from selling at the $42 strike plus the $0.80 premium is $2.80 per share, or $280. That's the ceiling, however high the stock goes.",
        },
        {
          id: 3,
          question: "Same position: shares bought at $40, a $42 call sold for $0.80. What's your breakeven?",
          options: ["$40.80", "$39.20", "$42.00", "$38.00"],
          correct: 1,
          explanation:
            "The premium cushions the first $0.80 of a drop: $40 − $0.80 = $39.20. Below that, you lose like any shareholder.",
        },
        {
          id: 4,
          question: "The stock jumps to $50 by expiration. What happens to your covered call position?",
          options: [
            "You make $1,000 plus the $80 premium",
            "The call is canceled because the move was too large",
            "You lose money because the call is in the money",
            "Your shares are called away at $42, so you make $280 instead of the $1,000 from just holding",
          ],
          correct: 3,
          explanation:
            "You agreed to sell at $42. Your profit stops at $280, and the $720 of gains above the strike goes to the call buyer.",
        },
        {
          id: 5,
          question: "What happens when you sell a covered call with a strike closer to today's stock price?",
          options: [
            "Less premium, and less chance of being called away",
            "No change in premium or risk",
            "More premium, but a higher chance your shares are called away",
            "Your downside risk disappears",
          ],
          correct: 2,
          explanation:
            "A closer strike pays more because the call is more likely to finish in the money. That also means you're more likely to sell your shares.",
        },
        {
          id: 6,
          question: "When is early assignment on a covered call most likely?",
          options: [
            "On the day you sell it",
            "Just before the stock's ex-dividend date, when the call is in the money",
            "When the stock is far below the strike",
            "Never — early assignment isn't allowed",
          ],
          correct: 1,
          explanation:
            "A call buyer may exercise early to own the shares in time for the dividend. You lose the shares and the dividend.",
        },
        {
          id: 7,
          question: "A covered-call ETF advertises a 12% yield. What's the catch?",
          options: [
            "The yield is guaranteed by the government",
            "ETFs can't hold options",
            "There is none — it's free extra income",
            "The yield comes mostly from selling away upside, so it often trails the index in strong markets",
          ],
          correct: 3,
          explanation:
            "The premium is payment for giving up gains above the strike. Judge these funds on total return, not yield.",
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
