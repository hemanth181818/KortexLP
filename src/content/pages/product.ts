import type { ContentPage } from "@/content/types";

/**
 * The product pages. Every claim is what Kortex does today, as stated on the home
 * page and in its FAQ (checked against Kortex Pilot, 2026-10-09 and 2026-10-18).
 * No results, customers or numbers that are not labelled as made up.
 */

export const metaAds: ContentPage = {
  path: "/meta-ads",
  title: "AI Agent for Meta Ads (Facebook and Instagram) | Kortex",
  description:
    "Kortex is an AI agent for Meta Ads. It checks your Facebook and Instagram ads daily, finds where ROAS leaks and proposes the fix. You approve every change.",
  crumb: "AI agent for Meta Ads",
  eyebrow: "Meta Ads: Facebook and Instagram",
  h1: "An AI agent for your Meta Ads account",
  lede:
    "Kortex is an AI agent for Meta Ads that reads your Facebook and Instagram ad account every day, finds where return on ad spend is leaking and proposes the exact fix for a person on your team to approve.",
  aboutApp: true,
  faqGroup: "Meta Ads",
  sections: [
    {
      q: "What does an AI agent for Meta Ads do?",
      a: "It does the daily account review a media buyer would do, then hands you a short list of fixes with the numbers behind each one.",
      body: [
        "Each day Kortex reads your campaigns, ad sets and ads in Meta Ads Manager and runs the same set of checks. What it finds lands in **Needs attention**, each item with a proposed change. You approve it in the chat or in your queue, and Kortex makes the change in your account.",
        "You can also ask it questions in plain words, such as why ROAS fell last week or which ads to retire, and it answers from your own account data.",
      ],
    },
    {
      q: "What does Kortex check in a Meta Ads account?",
      a: "It looks for spend that is not returning and for good ads that are being held back.",
      body: [
        {
          list: [
            "**Money going where it should not:** spend shifting toward ads whose ROAS is falling, ranked by the money at risk rather than the worst ratio.",
            "**Winners held back:** ads beating your account's ROAS while a budget cap holds them flat and weaker ones spend more. See [budget reallocation](/features/budget-reallocation).",
            "**Creative wearing out:** frequency rising while click-through falls, told apart from an ad that never worked. See [creative fatigue](/features/creative-fatigue).",
            "**Budget on the wrong placement:** placements compared inside the same ad set, so the only difference is where the ad ran. See [placements and audiences](/features/placements-and-audiences).",
            "**Audiences you own and don't use:** saved audiences worth excluding or testing, tested as a copy of the ad set so the result is clean.",
            "**Clicks that don't convert:** strong click-through with weak ROAS, which points at the page, price or stock rather than the ad.",
          ],
        },
      ],
    },
    {
      q: "What can Kortex change in Meta Ads?",
      a: "It can pause and resume ads, ad sets and campaigns, change budgets, adjust placements and audiences, and launch new ad sets and ads, each only after you approve it.",
      body: [
        "A single budget change can at most double or halve the budget. Anything new Kortex creates in Meta, such as an ad set or an ad, starts paused, so a person switches it on. The full set of limits is on [approvals and guardrails](/features/approvals-and-guardrails).",
        "Kortex can also make image ads from your products, in your colours and type, and launch them paused for review. See [ad creation](/features/ad-creation).",
      ],
    },
    {
      q: "How does Kortex connect to Meta?",
      a: "Through Meta's own sign-in screen, so you never give Kortex your password.",
      body: [
        "Access is opened by hand during early access. You then sign in with Facebook, choose the ad accounts Kortex may use and approve the permissions Meta shows you. Kortex then reads the last 30 days and suggests its first three changes. You can remove its access from your Meta settings at any time. More on [security and access](/security).",
      ],
    },
    {
      q: "How is this different from Meta's own automation?",
      a: "Meta's automation decides inside a campaign; Kortex reviews the whole account and explains each change before it happens.",
      body: [
        "Options such as Advantage+ let Meta's system choose more of the targeting, placements and budget within a campaign. That can work well, but it does not tell you which campaign is wasting money or why. Kortex sits above it: it compares campaigns, ad sets and ads against your account's own ROAS, proposes a specific change and shows the numbers. The terms are explained in the [glossary](/glossary).",
      ],
    },
    {
      q: "Who is it for?",
      a: "Performance marketers, D2C and ecommerce businesses, and agencies running Meta Ads, starting with India.",
      body: [
        "Amounts are shown in rupees for Indian accounts. If you also run Google Ads, the same agent covers both, so one list of fixes covers your whole paid spend. See [Kortex for Google Ads](/google-ads).",
      ],
    },
  ],
  faq: [
    {
      q: "Does Kortex work with both Facebook and Instagram ads?",
      a: "Yes. Facebook and Instagram ads both run through Meta Ads, and Kortex reads and changes them through the same Meta connection.",
    },
    {
      q: "Will Kortex change my Meta ads without asking?",
      a: "No. Every change is proposed first, and a person on your team approves it before Kortex makes it. Proposals nobody approves expire, and anything new Kortex creates in Meta starts paused.",
    },
    {
      q: "How often does Kortex check my Meta Ads account?",
      a: "Every day. Each day's findings arrive as a short list, each with a proposed fix and the numbers behind it.",
    },
    {
      q: "Do I need to change how my campaigns are set up?",
      a: "No. Kortex works with the campaigns you already run and proposes changes to them.",
    },
  ],
  related: ["/google-ads", "/features/creative-fatigue", "/features/approvals-and-guardrails", "/blog/why-meta-roas-dropped"],
  ctaTitle: "Start each day with the fixes to your Meta ads.",
};

export const googleAds: ContentPage = {
  path: "/google-ads",
  title: "AI Agent for Google Ads | Kortex",
  description:
    "Kortex is an AI agent for Google Ads. It checks your campaigns every day, finds spend that is not returning and proposes the fix for you to approve first.",
  crumb: "AI agent for Google Ads",
  eyebrow: "Google Ads",
  h1: "An AI agent for your Google Ads account",
  lede:
    "Kortex is an AI agent for Google Ads that reads your campaigns every day, finds where spend is not returning and proposes the exact change for a person on your team to approve.",
  aboutApp: true,
  faqGroup: "Google Ads",
  sections: [
    {
      q: "What does an AI agent for Google Ads do?",
      a: "It reviews your Google Ads account each day and gives you a short list of proposed fixes, each with the numbers behind it.",
      body: [
        "Kortex reads your campaigns, compares what each one spends with what it returns, and flags the ones that need attention. Each finding comes with a proposed change. You approve it, Kortex makes it in your account, and then it checks whether the change worked.",
        "You can ask follow-up questions in plain words, such as which campaign's return fell this week, and get an answer from your own account.",
      ],
    },
    {
      q: "What does Kortex look for in Google Ads?",
      a: "Spend that is not coming back, and campaigns that return well but are held back.",
      body: [
        {
          list: [
            "Campaigns whose return on ad spend has fallen while their spend has not, ranked by the money at risk.",
            "Campaigns beating your account's return while their budget holds them flat. See [budget reallocation](/features/budget-reallocation).",
            "Ads and campaigns worth pausing because they keep spending without results.",
          ],
        },
      ],
    },
    {
      q: "What can Kortex change in Google Ads?",
      a: "It can pause and resume what it finds and propose budget changes, and nothing happens until a person approves it.",
      body: [
        "The same limits apply as on Meta: a single budget change can at most double or halve the budget, a proposal nobody approves expires, and something Kortex has just changed is left alone for a few days so the result can show. See [approvals and guardrails](/features/approvals-and-guardrails).",
      ],
    },
    {
      q: "How does Kortex connect to Google Ads?",
      a: "Through Google's own sign-in screen; Kortex never sees your password.",
      body: [
        "You sign in with Google, pick the Google Ads account and approve the access Google shows you. You can remove that access from your Google account settings at any time. More on [security and access](/security).",
      ],
    },
    {
      q: "Why manage Meta and Google Ads with one agent?",
      a: "Because your budget is one budget, and one list of fixes across both is easier to act on than two dashboards.",
      body: [
        "Most D2C and ecommerce businesses split spend between Meta and Google. Kortex reads both and puts each day's findings in the same place, so a person can approve the changes that matter most across the whole paid spend. See [Kortex for Meta Ads](/meta-ads).",
      ],
    },
  ],
  faq: [
    {
      q: "Does Kortex make changes in Google Ads automatically?",
      a: "No. It proposes each change and a person on your team approves it first. Proposals nobody approves expire.",
    },
    {
      q: "Can I use Kortex for Google Ads without Meta Ads?",
      a: "Yes. You connect the ad accounts you use. Kortex covers Meta Ads, Google Ads or both.",
    },
    {
      q: "How does Kortex know whether a change worked?",
      a: "Every change is judged on its return over the following one to two weeks, and later proposals learn from the result.",
    },
  ],
  related: ["/meta-ads", "/features/budget-reallocation", "/security", "/pricing"],
  ctaTitle: "Start each day with the fixes to your Google Ads.",
};

export const pricing: ContentPage = {
  path: "/pricing",
  title: "Kortex Pricing: Free Audit, Growth at $50 a Month",
  description:
    "The SEO and AI visibility audit is free. Growth is $50 a month, or ₹4,999 in India, with weekly checks, posts and ads. The ads agent is free for now.",
  crumb: "Pricing",
  eyebrow: "Pricing",
  h1: "Start free. Growth is $50 a month.",
  lede: "The audit is free, one per website. Growth is $50 a month, or ₹4,999 a month in India. The ads agent for Meta and Google is free during early access.",
  aboutApp: true,
  faqGroup: "Pricing and access",
  sections: [
    {
      q: "How much does Kortex cost?",
      a: "The audit is free. Growth is $50 a month, or ₹4,999 a month in India.",
      body: [
        {
          list: [
            "Free: one full SEO and AI visibility audit per website, your four fixes written, two questions to Kortex on your report, and 50 free credits to try the agent.",
            "Growth, $50 a month (₹4,999 in India): your website checked every week with a Monday email of what changed, live checks with ChatGPT, Gemini, Claude and Google, blog, Medium, LinkedIn and Reddit posts, competitor ad reports and daily watching, new ads made from your products, Kortex inside Claude, ChatGPT or Cursor, and a monthly usage allowance that resets each month.",
            "Top-ups whenever you need more.",
          ],
        },
        "[Get Growth](https://rzp.io/rzp/1fANlcjW), or [start with the free audit](https://visibility.kortexagent.co).",
      ],
    },
    {
      q: "How do I start?",
      a: "Run the free audit on your website; everything else starts from your report.",
      body: ["Enter your website at [visibility.kortexagent.co](https://visibility.kortexagent.co), confirm your work email with a six-digit code, and your report is ready in about four minutes."],
    },
    {
      q: "What does the ads agent cost?",
      a: "Nothing, while it is in early access.",
      body: [
        "The Kortex ads agent for [Meta Ads](/meta-ads) and [Google Ads](/google-ads) checks your ad accounts every day and proposes fixes a person approves. Access is opened by hand: leave your work email and we email you when it is your turn. It charges nothing on your ad spend.",
      ],
    },
    {
      q: "Are the other tools free?",
      a: "Yes. These Kortex tools are open to everyone.",
      body: [
        {
          cards: [
            { title: "Visibility", body: "Do ChatGPT, Gemini, Claude and Google recommend you when your customers ask?", href: "https://visibility.kortexagent.co" },
            { title: "Compete", body: "See the Meta ads your competitors are running and which ones they keep.", href: "https://compete.kortexagent.co" },
            { title: "Creators", body: "Find Instagram creators who fit what you sell, for partnership ads.", href: "https://creators.kortexagent.co" },
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Is the audit really free?",
      a: "Yes. One full audit per website, with the report and the written fixes, and no card.",
    },
    {
      q: "How much is the Growth plan?",
      a: "$50 a month, or ₹4,999 a month in India, with a monthly usage allowance that resets each month and top-ups whenever you need more.",
    },
    {
      q: "Does Kortex take a percentage of my ad spend?",
      a: "No. Kortex charges nothing on your ad spend.",
    },
  ],
  related: ["/meta-ads", "/google-ads", "/security", "/faq"],
  ctaTitle: "Start with the free audit.",
};

export const security: ContentPage = {
  path: "/security",
  title: "Security and Access: How Kortex Connects | Kortex",
  description:
    "How Kortex connects to Meta and Google Ads through their own sign-in screens, with no passwords, what it can and cannot change, and how to remove its access.",
  crumb: "Security and access",
  eyebrow: "Security and access",
  h1: "How Kortex connects to your ad accounts, and what it can touch",
  lede:
    "Kortex connects to Meta Ads and Google Ads through Meta's and Google's own sign-in screens, never asks for a password, and changes nothing in your accounts until a person on your team approves it.",
  faqGroup: "Security and access",
  sections: [
    {
      q: "How does Kortex connect to my ad accounts?",
      a: "Through Meta's and Google's own sign-in and permission screens.",
      body: [
        "When you connect, Meta or Google shows you which access Kortex is asking for, and you choose whether to grant it. Kortex receives access from them, not your login. You never type your Meta or Google password into Kortex.",
      ],
    },
    {
      q: "What can Kortex change?",
      a: "A fixed list of ad changes, each one only after a person approves it.",
      body: [
        {
          list: [
            "Pause and resume ads, ad sets and campaigns",
            "Change budgets, by at most double or half in a single change",
            "Adjust placements and audiences",
            "Launch new ad sets and ads, which start paused in Meta",
            "Make image ads from your products, launched paused",
          ],
        },
      ],
    },
    {
      q: "What will Kortex not do?",
      a: "It will not make a change nobody approved.",
      body: [
        {
          list: [
            "It does not act on its own: every change waits for approval in the chat or in your queue.",
            "It does not move a budget by more than double or half in one step.",
            "It does not switch on what it creates in Meta: new ad sets and ads start paused for a person to turn on.",
            "It does not keep stale proposals alive: one nobody approves expires.",
            "It does not pile changes onto the same thing: something it has just changed is left alone for a few days so the result can show.",
          ],
        },
        "The reasoning behind these limits is on [approvals and guardrails](/features/approvals-and-guardrails).",
      ],
    },
    {
      q: "How do I remove Kortex's access?",
      a: "Remove it from your Meta or Google account settings at any time, and ask us to delete your data.",
      body: [
        "Removing the connection on Meta's or Google's side stops Kortex from reading or changing anything from that moment. To have your data deleted, follow the steps on the [data deletion page](/data-deletion) or write to human@kortexagent.co.",
      ],
    },
    {
      q: "Where are the privacy policy and terms?",
      a: "On this site, at [privacy](/privacy) and [terms](/terms).",
    },
  ],
  faq: [
    {
      q: "Does Kortex need my Facebook or Google password?",
      a: "No. You connect through Meta's and Google's own sign-in screens, and Kortex never sees your password.",
    },
    {
      q: "Can Kortex spend more money than I approve?",
      a: "Kortex only makes changes a person approved, and a single budget change can at most double or halve the budget.",
    },
    {
      q: "How do I delete my data?",
      a: "Follow the steps on the Kortex data deletion page at kortexagent.co/data-deletion, or email human@kortexagent.co.",
    },
  ],
  related: ["/features/approvals-and-guardrails", "/meta-ads", "/google-ads", "/about"],
};

export const about: ContentPage = {
  path: "/about",
  title: "About Kortex: AI Agents for ROAS Optimization",
  description:
    "Kortex builds AI agents for high frequency ROAS optimization on Meta and Google Ads, for performance marketers, D2C businesses and agencies, India first.",
  crumb: "About",
  eyebrow: "About",
  h1: "About Kortex",
  lede:
    "Kortex makes AI agents for high frequency ROAS optimization: software that checks your Meta and Google ad accounts every day and proposes the changes that protect your return on ad spend.",
  pageType: "AboutPage",
  faqGroup: "About Kortex",
  sections: [
    {
      q: "What is Kortex?",
      a: "An AI ad agent that reads your ad accounts, finds where ROAS is leaking and proposes the exact fix.",
      body: [
        "A person approves each change, Kortex makes it, then checks whether it worked. It works on [Meta Ads](/meta-ads), which covers Facebook and Instagram, and [Google Ads](/google-ads). Shopify, TikTok Ads and ChatGPT Ads are coming soon.",
      ],
    },
    {
      q: "Why high frequency?",
      a: "Because ad accounts drift every day, and a weekly review finds the leak after the money is gone.",
      body: [
        "Creatives wear out, budgets end up on the wrong campaigns and placements spend without returns. Kortex checks every day and keeps each change small and reversible, so you can correct course often without large swings.",
      ],
    },
    {
      q: "Who is Kortex for?",
      a: "Performance marketers, D2C and ecommerce businesses, and agencies, starting with India.",
      body: ["Amounts are in rupees, and the examples and guides on this site are written with Indian advertisers in mind."],
    },
    {
      q: "What else does Kortex make?",
      a: "Three free tools anyone can use today.",
      body: [
        {
          cards: [
            { title: "Visibility", body: "Check whether ChatGPT, Gemini, Claude and Google recommend you.", href: "https://visibility.kortexagent.co" },
            { title: "Compete", body: "Read your competitors' live Meta ads.", href: "https://compete.kortexagent.co" },
            { title: "Creators", body: "Find Instagram creators for partnership ads.", href: "https://creators.kortexagent.co" },
          ],
        },
      ],
    },
    {
      q: "How do I contact Kortex?",
      a: "Email human@kortexagent.co.",
    },
  ],
  faq: [
    {
      q: "Is Kortex an agency?",
      a: "No. Kortex is software. It proposes changes in your ad accounts and a person on your team approves them.",
    },
    {
      q: "Where is Kortex available?",
      a: "Kortex is in early access and opened by hand, starting with businesses in India. Leave your work email to join the list.",
    },
    {
      q: "How do I reach the Kortex team?",
      a: "Email human@kortexagent.co.",
    },
  ],
  related: ["/security", "/pricing", "/faq", "/blog"],
};

export const featuresHub: ContentPage = {
  path: "/features",
  title: "Kortex Features: What the AI Ad Agent Does",
  description:
    "What Kortex does in your Meta and Google ad accounts: budget reallocation, creative fatigue checks, placements and audiences, approvals and ad creation.",
  crumb: "Features",
  eyebrow: "Features",
  h1: "What Kortex does in your ad accounts",
  lede: "Kortex runs daily checks on your Meta and Google ad accounts and turns each finding into one approved change: a budget moved, a tired ad paused, a placement trimmed or a new ad launched paused.",
  aboutApp: true,
  sections: [
    {
      q: "Which features does Kortex have?",
      a: "Five, each a kind of change Kortex can propose and make once you approve it.",
      body: [
        {
          cards: [
            { title: "Budget reallocation", body: "Move money from ad sets and campaigns that leak to the ones that return.", href: "/features/budget-reallocation" },
            { title: "Creative fatigue", body: "Catch ads wearing out, and tell them apart from ads that never worked.", href: "/features/creative-fatigue" },
            { title: "Placements and audiences", body: "Find where an ad runs or who sees it that spends without returns.", href: "/features/placements-and-audiences" },
            { title: "Approvals and guardrails", body: "Every change approved by a person, with hard limits underneath.", href: "/features/approvals-and-guardrails" },
            { title: "Ad creation", body: "Image ads made from your products, in your colours and type, launched paused.", href: "/features/ad-creation" },
          ],
        },
      ],
    },
  ],
  faq: [],
  related: ["/meta-ads", "/google-ads", "/pricing"],
};

export const compareHub: ContentPage = {
  path: "/compare",
  title: "Compare Kortex with Other Ad Tools",
  description:
    "How Kortex compares with Madgicx, Revealbot and Smartly, and with hiring a media buyer: approval-first changes, daily checks, Meta and Google in one, rupees.",
  crumb: "Compare",
  eyebrow: "Compare",
  h1: "How Kortex compares",
  lede: "Kortex is an approval-first AI agent for Meta and Google Ads: it checks your accounts daily and proposes each change for a person to approve, which is how it differs from rule-based automation and enterprise ad platforms.",
  lastChecked: "18 October 2026",
  sections: [
    {
      q: "Which comparisons are there?",
      a: "Three ad tools and one hire.",
      body: [
        {
          cards: [
            { title: "Kortex vs Madgicx", body: "An approval-first agent next to a Meta-focused ad platform.", href: "/compare/madgicx" },
            { title: "Kortex vs Revealbot", body: "Proposals you approve next to automation rules you write.", href: "/compare/revealbot" },
            { title: "Kortex vs Smartly", body: "A daily agent for growing teams next to an enterprise platform.", href: "/compare/smartly" },
            { title: "Kortex vs a media buyer", body: "What an agent does well, what a person does well, and how they work together.", href: "/vs-media-buyer" },
          ],
        },
        "Each comparison describes the other product only through its widely documented public positioning, and says when it was last checked. Products change, so check their sites for current details.",
      ],
    },
  ],
  faq: [],
  related: ["/features", "/pricing"],
};
