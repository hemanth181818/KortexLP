import type { ContentPage } from "@/content/types";

/**
 * Comparison pages. The other products are described only through their widely
 * documented public positioning (their own websites), never with claims about
 * their quality, prices or results. Each page carries its last-checked date.
 * Kortex's side is only what Kortex does today.
 */
const COMPARE = { name: "Compare", path: "/compare" };
const CHECKED = "18 October 2026";
const CAVEAT =
  "Products change. This page describes the other product from its public website as of the date above; check their site for current details. If something here is out of date, email human@kortexagent.co and we will correct it.";

export const madgicx: ContentPage = {
  path: "/compare/madgicx",
  title: "Kortex vs Madgicx: AI Ad Agent Comparison",
  description:
    "Kortex vs Madgicx compared fairly: how an approval-first AI agent for Meta and Google Ads, priced for India, differs from a Meta-focused ad platform.",
  crumb: "Kortex vs Madgicx",
  parent: COMPARE,
  eyebrow: "Compare",
  h1: "Kortex vs Madgicx",
  lede:
    "Kortex and Madgicx both help advertisers improve Meta ad performance; Kortex is an approval-first agent that checks Meta and Google Ads every day and proposes each change for a person to approve, while Madgicx presents itself as an ad platform with a suite of AI tools for Meta advertisers.",
  lastChecked: CHECKED,
  faqGroup: "Kortex vs Madgicx",
  sections: [
    {
      q: "What is Madgicx?",
      a: "Madgicx describes itself as an AI-powered advertising platform, focused mainly on Meta ads for ecommerce businesses and agencies.",
      body: [
        "Its public site presents a set of tools around Meta advertising, covering areas such as creative insights, ad launching, automation and reporting. For its current features and prices, see madgicx.com.",
      ],
    },
    {
      q: "What is Kortex?",
      a: "Kortex is an AI agent for Meta Ads and Google Ads that reads your accounts every day, finds where ROAS is leaking and proposes the exact fix.",
      body: [
        "A person approves each change; Kortex makes it, then checks whether it worked. See [Kortex for Meta Ads](/meta-ads).",
      ],
    },
    {
      q: "How do Kortex and Madgicx differ?",
      a: "Kortex is built around one daily list of proposed changes that a person approves, across Meta and Google.",
      body: [
        {
          table: {
            caption: `Kortex and Madgicx at a glance. Last checked ${CHECKED}.`,
            head: ["", "Kortex", "Madgicx"],
            rows: [
              ["What it is", "An AI agent that proposes changes", "An ad platform with a suite of AI tools"],
              ["How changes happen", "Every change approved by a person first", "See madgicx.com for how its automation works"],
              ["Platforms", "Meta Ads and Google Ads", "Focused mainly on Meta ads"],
              ["Daily work", "A short list of fixes each morning, with the numbers", "Dashboards and tools you work through"],
              ["Pricing", "Ads agent free during early access", "Published plans; see madgicx.com"],
            ],
          },
        },
      ],
    },
    {
      q: "When might Madgicx suit you better?",
      a: "If you want a broad toolkit for working inside Meta ads yourself, a platform like Madgicx may fit.",
      body: [
        "If instead you want an agent to read your accounts every day and hand you a short list of approved, bounded changes across Meta and Google, Kortex is built for that.",
      ],
    },
    {
      q: "Is this comparison up to date?",
      a: `It was last checked on ${CHECKED}.`,
      body: [CAVEAT],
    },
  ],
  faq: [
    {
      q: "Is Kortex an alternative to Madgicx?",
      a: "For advertisers who want a daily list of proposed fixes they approve, across Meta and Google Ads, yes. The two products take different approaches.",
    },
    {
      q: "Does Kortex work with Google Ads as well as Meta?",
      a: "Yes. Kortex works on Meta Ads, covering Facebook and Instagram, and on Google Ads.",
    },
    {
      q: "How much does Kortex cost compared with Madgicx?",
      a: "The Kortex ads agent is free during early access, and Kortex's Growth plan is $50 a month (₹4,999 in India); see [pricing](/pricing). For Madgicx's prices, see its website.",
    },
  ],
  related: ["/compare/revealbot", "/compare/smartly", "/features/approvals-and-guardrails", "/pricing"],
};

export const revealbot: ContentPage = {
  path: "/compare/revealbot",
  title: "Kortex vs Revealbot: Proposals vs Automation Rules",
  description:
    "Kortex vs Revealbot compared fairly: proposals a person approves against automation rules you write, for Meta and Google Ads, with Kortex free in early access.",
  crumb: "Kortex vs Revealbot",
  parent: COMPARE,
  eyebrow: "Compare",
  h1: "Kortex vs Revealbot",
  lede:
    "Revealbot is known for rule-based ad automation, where you write rules that act on your campaigns; Kortex is an approval-first AI agent that reads your Meta and Google Ads every day and proposes each change for a person to approve.",
  lastChecked: CHECKED,
  faqGroup: "Kortex vs Revealbot",
  sections: [
    {
      q: "What is Revealbot?",
      a: "Revealbot is an ad automation tool, best known for rules that act on ad campaigns when conditions you set are met.",
      body: [
        "Revealbot renamed itself Bïrch in 2024. Its public site presents automation rules, reporting and bulk ad tools across several ad platforms, including Meta and Google. For current features and prices, see its website.",
      ],
    },
    {
      q: "How is a proposal different from a rule?",
      a: "A rule acts when its condition is met; a Kortex proposal waits for a person to approve it.",
      body: [
        "With rules, you decide the logic in advance, for example pausing an ad when its cost per purchase passes a threshold, and the tool applies it. That is predictable and fast, and it does exactly what the rule says. With Kortex, the agent does the reading and suggests a specific change with the numbers behind it, and a person decides each time. You do not have to write or maintain rules.",
      ],
    },
    {
      q: "How do Kortex and Revealbot differ?",
      a: "The main difference is who writes the logic and who makes the final call.",
      body: [
        {
          table: {
            caption: `Kortex and Revealbot at a glance. Last checked ${CHECKED}.`,
            head: ["", "Kortex", "Revealbot (Bïrch)"],
            rows: [
              ["Approach", "An agent proposes; a person approves", "Rules you write act on campaigns"],
              ["Setup", "Connect your accounts; first three suggestions from the last 30 days", "Build or pick the rules you want"],
              ["Explanations", "Each proposal shows what Kortex saw and the numbers", "Rules run on the conditions you set"],
              ["Limits", "Budgets at most double or halve per change; new ads start paused", "Set within your rules"],
              ["Pricing", "Ads agent free during early access", "Published plans; see its website"],
            ],
          },
        },
      ],
    },
    {
      q: "When might Revealbot suit you better?",
      a: "If you already know the exact rules you want and want them applied without waiting for anyone, rule automation fits.",
      body: [
        "If you would rather not write rules, and want a daily review with a person approving each change, Kortex is built for that. Read more on [approvals and guardrails](/features/approvals-and-guardrails).",
      ],
    },
    {
      q: "Is this comparison up to date?",
      a: `It was last checked on ${CHECKED}.`,
      body: [CAVEAT],
    },
  ],
  faq: [
    {
      q: "Is Revealbot the same as Bïrch?",
      a: "Yes. Revealbot renamed itself Bïrch in 2024.",
    },
    {
      q: "Do I need to write rules in Kortex?",
      a: "No. Kortex reads your accounts every day and proposes changes; you approve the ones that make sense.",
    },
    {
      q: "Can Kortex make changes without me, like a rule can?",
      a: "No. Every Kortex change is approved by a person first, by design.",
    },
  ],
  related: ["/compare/madgicx", "/compare/smartly", "/features/approvals-and-guardrails", "/vs-media-buyer"],
};

export const smartly: ContentPage = {
  path: "/compare/smartly",
  title: "Kortex vs Smartly: AI Ad Agent vs Enterprise Platform",
  description:
    "Kortex vs Smartly compared fairly: an approval-first AI agent for growing teams on Meta and Google Ads, next to an enterprise creative and media platform.",
  crumb: "Kortex vs Smartly",
  parent: COMPARE,
  eyebrow: "Compare",
  h1: "Kortex vs Smartly",
  lede:
    "Smartly (Smartly.io) is an enterprise platform for large advertisers' creative production and campaign management across many channels; Kortex is an approval-first AI agent that checks Meta and Google Ads every day for performance marketers, D2C businesses and agencies.",
  lastChecked: CHECKED,
  faqGroup: "Kortex vs Smartly",
  sections: [
    {
      q: "What is Smartly?",
      a: "Smartly, also known as Smartly.io, positions itself as an advertising platform for large brands, covering creative production and media buying across social and other channels.",
      body: ["It is sold to enterprise teams through sales conversations. For current details, see smartly.io."],
    },
    {
      q: "Who is each product for?",
      a: "Smartly targets large brands with big creative and media teams; Kortex targets performance marketers, D2C businesses and agencies, starting with India.",
      body: [
        "Kortex connects through Meta's and Google's own sign-in screens, has published prices and needs no sales call: you leave your email and we open access by hand.",
      ],
    },
    {
      q: "How do Kortex and Smartly differ?",
      a: "They solve different-sized problems: Smartly runs creative and media at enterprise scale, Kortex keeps a growing account's ROAS in check every day.",
      body: [
        {
          table: {
            caption: `Kortex and Smartly at a glance. Last checked ${CHECKED}.`,
            head: ["", "Kortex", "Smartly"],
            rows: [
              ["Built for", "Performance marketers, D2C businesses, agencies", "Large brands and enterprise teams"],
              ["Core job", "Daily ROAS checks and approved fixes", "Creative production and campaign management at scale"],
              ["Platforms", "Meta Ads and Google Ads", "Many channels; see smartly.io"],
              ["Getting started", "Leave your email; access opened by hand", "Through their sales team"],
              ["Pricing", "Ads agent free during early access", "Not published; see smartly.io"],
            ],
          },
        },
      ],
    },
    {
      q: "When might Smartly suit you better?",
      a: "If you are a large brand producing creative at scale across many channels, an enterprise platform like Smartly is built for that.",
      body: [
        "If you want a daily agent for your Meta and Google accounts that a small team can run, Kortex fits. See [features](/features).",
      ],
    },
    {
      q: "Is this comparison up to date?",
      a: `It was last checked on ${CHECKED}.`,
      body: [CAVEAT],
    },
  ],
  faq: [
    {
      q: "Is Kortex a Smartly alternative for smaller teams?",
      a: "Kortex is built for performance marketers, D2C businesses and agencies who want daily ROAS checks with approved changes on Meta and Google Ads. Smartly targets large enterprise teams.",
    },
    {
      q: "Do I need a sales call to start with Kortex?",
      a: "No. Leave your work email and we email you when your access is ready.",
    },
    {
      q: "Which channels does Kortex cover?",
      a: "Meta Ads, covering Facebook and Instagram, and Google Ads. Shopify, TikTok Ads and ChatGPT Ads are coming soon.",
    },
  ],
  related: ["/compare/madgicx", "/compare/revealbot", "/features", "/pricing"],
};

export const vsMediaBuyer: ContentPage = {
  path: "/vs-media-buyer",
  title: "AI Ad Agent vs Media Buyer: Kortex Compared",
  description:
    "Kortex vs hiring a media buyer: what an AI ad agent does well, what a person does better, and how the two work together on Meta and Google Ads.",
  crumb: "Kortex vs a media buyer",
  parent: COMPARE,
  eyebrow: "Compare",
  h1: "Kortex vs a media buyer",
  lede:
    "Kortex is not a replacement for a good media buyer: it does the daily account reading and arithmetic across every ad, and leaves the judgement calls, strategy and creative direction to a person who approves each change.",
  faqGroup: "Kortex vs a media buyer",
  sections: [
    {
      q: "Can an AI ad agent replace a media buyer?",
      a: "Not entirely; it replaces the repetitive daily review, not the judgement.",
      body: [
        "A media buyer knows your business: the launch next month, the product that is short on stock, the margin on each line. Kortex does not. What Kortex does is read every campaign, ad set and ad every day, without skipping the boring ones, and propose specific changes with the numbers behind them.",
      ],
    },
    {
      q: "What does Kortex do better than a person?",
      a: "Consistency and coverage: the same checks on every ad, every day.",
      body: [
        {
          list: [
            "Reads the whole account daily, including the small ad sets nobody has time for",
            "Ranks problems by money at risk, so the biggest leak comes first",
            "Compares placements inside the same ad set, so the comparison is fair",
            "Judges every change on its ROAS over the following one to two weeks",
          ],
        },
      ],
    },
    {
      q: "What does a media buyer do better?",
      a: "Strategy, context and creative judgement.",
      body: [
        {
          list: [
            "Deciding what the account is for this quarter and how much to spend",
            "Knowing about sales, launches, stock and margins before the numbers show them",
            "Briefing and judging creative, and building the offer",
            "Talking to the business and explaining trade-offs",
          ],
        },
      ],
    },
    {
      q: "How do Kortex and a media buyer work together?",
      a: "Kortex proposes, the media buyer approves or skips, and the buyer spends their time on the decisions only a person can make.",
      body: [
        "Every Kortex change waits for a person's approval, so the buyer stays in charge. See [approvals and guardrails](/features/approvals-and-guardrails).",
      ],
    },
    {
      q: "What about agencies?",
      a: "Agencies are one of the audiences Kortex is built for: the same daily list of fixes, approved by the buyer who runs the account.",
      body: ["To talk about how client accounts would connect, email human@kortexagent.co."],
    },
  ],
  faq: [
    {
      q: "Is Kortex cheaper than hiring a media buyer?",
      a: "Kortex is free during early access. It is meant to work alongside a media buyer, not instead of one.",
    },
    {
      q: "Do I need a media buyer to use Kortex?",
      a: "No. Anyone who runs your ads can approve Kortex's proposals. Kortex explains each one with the numbers behind it.",
    },
    {
      q: "Is Kortex built for agencies?",
      a: "Agencies are one of the audiences Kortex is built for, alongside performance marketers and D2C businesses. Email human@kortexagent.co to talk about client accounts.",
    },
  ],
  related: ["/features/approvals-and-guardrails", "/compare/revealbot", "/about", "/meta-ads"],
};
