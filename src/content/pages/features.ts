import type { ContentPage } from "@/content/types";

const FEATURES = { name: "Features", path: "/features" };

export const budgetReallocation: ContentPage = {
  path: "/features/budget-reallocation",
  title: "Budget Reallocation for Meta and Google Ads | Kortex",
  description:
    "Kortex finds budget sitting on ad sets and campaigns that do not return, and proposes moving it to the ones that do. Each change at most doubles or halves.",
  crumb: "Budget reallocation",
  parent: FEATURES,
  eyebrow: "Feature: budget reallocation",
  h1: "Budget reallocation: money moved to what returns",
  lede:
    "Budget reallocation in Kortex means finding money spent on ad sets and campaigns that return less than your account, and proposing a bounded change that moves it toward the ones that return more.",
  aboutApp: true,
  faqGroup: "Budget reallocation",
  sections: [
    {
      q: "What is ad budget reallocation?",
      a: "It is moving spend from the parts of an ad account that return least to the parts that return most.",
      body: [
        "Every account has a few campaigns or ad sets carrying it and a few quietly spending without much to show. Reallocation shifts the balance. Done by hand, it usually happens once a week at best. Kortex checks daily, so the shift can happen in small steps as the numbers change.",
      ],
    },
    {
      q: "How does Kortex decide where budget should go?",
      a: "It compares each ad set and campaign with your account's own ROAS and ranks problems by the money at risk.",
      body: [
        "A tiny ad set with a terrible ratio matters less than a large one slipping slowly, so Kortex ranks findings by how much money is involved, not by the worst number. It looks for two patterns:",
        {
          list: [
            "**Money going where it should not:** spend shifting toward ads whose ROAS is falling.",
            "**Winners held back:** ads beating your account's ROAS while a budget cap holds them flat and weaker ones spend more.",
          ],
        },
      ],
    },
    {
      q: "What does a budget proposal look like?",
      a: "It says what Kortex saw, what it wants to change, and the numbers before and after.",
      body: [
        {
          table: {
            caption: "An example proposal. Names and numbers are made up.",
            head: ["", "Prospecting, broad"],
            rows: [
              ["What Kortex saw", "₹18,400 spent in two days at 0.9 ROAS, against 2.8 for the rest of the account"],
              ["Proposed change", "Halve the daily budget"],
              ["Daily budget now", "₹9,000"],
              ["After the change", "₹4,500"],
            ],
          },
        },
        "You approve or skip it. If nobody acts, the proposal expires.",
      ],
    },
    {
      q: "How big can a single budget change be?",
      a: "A single change can at most double or halve a budget.",
      body: [
        "Large jumps can unsettle delivery and are hard to judge afterwards, so Kortex moves in bounded steps. An ad set it has just changed is left alone for a few days so the result can show before it proposes anything else there. More on [approvals and guardrails](/features/approvals-and-guardrails).",
      ],
    },
    {
      q: "Does this work on Meta Ads and Google Ads?",
      a: "Yes. Kortex reviews budgets in both, so one list covers your paid spend.",
      body: ["See how it works on [Meta Ads](/meta-ads) and on [Google Ads](/google-ads)."],
    },
  ],
  faq: [
    {
      q: "Will Kortex move my budget without asking?",
      a: "No. Every budget change is a proposal until a person on your team approves it.",
    },
    {
      q: "Does Kortex only cut budgets?",
      a: "No. It also proposes raising the budget on ads and ad sets that beat your account's ROAS but are held back by their budget.",
    },
    {
      q: "How does Kortex judge whether a budget change worked?",
      a: "Each change is judged on its ROAS over the following one to two weeks, and later proposals learn from the result.",
    },
  ],
  related: ["/features/approvals-and-guardrails", "/features/placements-and-audiences", "/meta-ads", "/glossary"],
};

export const creativeFatigue: ContentPage = {
  path: "/features/creative-fatigue",
  title: "Creative Fatigue Detection for Meta Ads | Kortex",
  description:
    "Kortex spots creative fatigue in Meta ads: frequency rising while click-through falls. It tells tired ads from ads that never worked, then proposes the fix.",
  crumb: "Creative fatigue",
  parent: FEATURES,
  eyebrow: "Feature: creative fatigue",
  h1: "Creative fatigue: catch ads as they wear out",
  lede:
    "Creative fatigue is when the same people have seen an ad so often that they stop responding to it; Kortex spots it from frequency rising while click-through falls, and proposes what to do about it.",
  aboutApp: true,
  faqGroup: "Creative fatigue",
  sections: [
    {
      q: "What is creative fatigue?",
      a: "It is the drop in response that comes from showing the same ad to the same people too many times.",
      body: [
        "An ad that worked well starts to cost more for each result. Usually nothing in the ad changed; the audience got used to it. The longer it runs past that point, the more budget it uses for less return. The term and its neighbours are in the [glossary](/glossary).",
      ],
    },
    {
      q: "How do you know an ad has creative fatigue?",
      a: "Frequency rises while click-through rate falls.",
      body: [
        "Frequency is how many times, on average, each person has seen the ad. When it climbs and click-through falls at the same time, people are seeing the ad again and acting on it less. That pair is the signal Kortex looks for.",
      ],
    },
    {
      q: "How is a tired ad different from a bad ad?",
      a: "A tired ad used to work and has declined; a bad ad never worked.",
      body: [
        "They need different fixes. A tired ad might come back after a rest or be replaced with a fresh version of the same idea. An ad that never worked should usually stop. Kortex tells the two apart from the ad's own history before it proposes anything.",
      ],
    },
    {
      q: "What does Kortex propose when it finds fatigue?",
      a: "Usually pausing the tired ad, and where it helps, a fresh ad to take its place.",
      body: [
        "You approve the pause before it happens. Kortex can also [make new image ads](/features/ad-creation) from your products, which launch paused for you to review and switch on.",
      ],
    },
    {
      q: "Why check for fatigue every day?",
      a: "Because fatigue builds gradually, and a weekly check catches it after days of wasted spend.",
      body: [
        "In busy periods such as festive sales, frequency can climb faster than usual. Daily checks catch the turn earlier. For a full list of reasons ROAS falls, see [why your Meta ROAS dropped](/blog/why-meta-roas-dropped).",
      ],
    },
  ],
  faq: [
    {
      q: "What frequency is too high for a Meta ad?",
      a: "There is no single number. What matters is the trend: frequency rising while click-through falls means people are tiring of the ad.",
    },
    {
      q: "Does Kortex pause fatigued ads automatically?",
      a: "No. It proposes the pause with the numbers behind it, and a person on your team approves it.",
    },
    {
      q: "Can Kortex make replacement ads?",
      a: "Yes. Kortex can make image ads from your products in your colours and type, and launches them paused for review.",
    },
  ],
  related: ["/features/ad-creation", "/meta-ads", "/glossary", "/blog/why-meta-roas-dropped"],
};

export const placementsAudiences: ContentPage = {
  path: "/features/placements-and-audiences",
  title: "Meta Ads Placements and Audiences, Checked Daily | Kortex",
  description:
    "Kortex compares placements inside the same ad set and tests saved audiences as a copy of the ad set, so you know what spends without returns before you act.",
  crumb: "Placements and audiences",
  parent: FEATURES,
  eyebrow: "Feature: placements and audiences",
  h1: "Placements and audiences: find where spend leaks",
  lede:
    "Kortex checks where your ads run and who sees them, comparing placements inside the same ad set and testing saved audiences as a copy, so it can propose trimming what spends without returns.",
  aboutApp: true,
  faqGroup: "Placements and audiences",
  sections: [
    {
      q: "What are placements in Meta Ads?",
      a: "Placements are where an ad appears, such as the Facebook feed, Instagram feed, Stories, Reels or the Audience Network.",
      body: [
        "Meta can spread an ad set across many placements. Some will return more than others. Knowing which ones spend without returns is the first step to fixing them.",
      ],
    },
    {
      q: "How does Kortex compare placements fairly?",
      a: "It compares placements inside the same ad set, so the only difference is where the ad ran.",
      body: [
        "Comparing Reels in one campaign with feed in another mixes up the audience, the ad and the budget. Inside one ad set those are the same, so a gap in return is about the placement. Even then, Meta's system moves spend to where it finds cheaper results overall, which can make one placement look worse on average than it is at the margin. This is known as the breakdown effect, explained in the [glossary](/glossary).",
      ],
    },
    {
      q: "What does Kortex do with saved audiences?",
      a: "It finds saved audiences worth excluding or testing, and tests them as a copy of the ad set so the result is clean.",
      body: [
        "Changing the audience on a running ad set muddies its history. Testing a copy keeps the original as it was, so you can compare the two directly.",
      ],
    },
    {
      q: "What changes can Kortex make to placements and audiences?",
      a: "It can adjust placements and audiences and launch new ad sets, each after a person approves it.",
      body: [
        "New ad sets Kortex creates in Meta start paused. See [approvals and guardrails](/features/approvals-and-guardrails) for the full set of limits.",
      ],
    },
    {
      q: "What if clicks are strong but sales are weak?",
      a: "That usually points at the landing page, price or stock rather than the placement or audience.",
      body: [
        "Kortex flags strong click-through with weak ROAS as its own finding, so you do not cut a placement for a problem that is on your site.",
      ],
    },
  ],
  faq: [
    {
      q: "Should I turn off Audience Network?",
      a: "Only if your own numbers say so. Kortex compares it with other placements in the same ad set and proposes a change only when the gap is clear.",
    },
    {
      q: "Does Kortex change my targeting without asking?",
      a: "No. Placement and audience changes are proposals until a person on your team approves them.",
    },
    {
      q: "Why test an audience as a copy of the ad set?",
      a: "So the original keeps running unchanged and the result of the test is clean.",
    },
  ],
  related: ["/features/budget-reallocation", "/meta-ads", "/glossary", "/features/approvals-and-guardrails"],
};

export const approvals: ContentPage = {
  path: "/features/approvals-and-guardrails",
  title: "Approvals and Guardrails for AI Ad Changes | Kortex",
  description:
    "Every Kortex change is approved by a person first. Budgets at most double or halve, proposals expire, and new ads start paused. Here is how the limits work.",
  crumb: "Approvals and guardrails",
  parent: FEATURES,
  eyebrow: "Feature: approvals and guardrails",
  h1: "Approvals and guardrails: nothing changes without you",
  lede:
    "In Kortex, every change to an ad account is a proposal that a person on your team approves first, and hard limits sit underneath every proposal so no single change can swing your account.",
  aboutApp: true,
  faqGroup: "Approvals and guardrails",
  sections: [
    {
      q: "Does Kortex change ads without approval?",
      a: "No. Kortex proposes, a person approves, and only then does Kortex make the change.",
      body: [
        "You approve in the chat or in your queue. Each proposal says what Kortex saw, what it wants to change, and the numbers before and after, so you can judge it quickly.",
      ],
    },
    {
      q: "What limits apply to every change?",
      a: "Four limits apply whatever the proposal.",
      body: [
        {
          list: [
            "**Bounded budgets:** a single change can at most double or halve a budget.",
            "**Room to show results:** an ad set Kortex has just changed is left alone for a few days.",
            "**Proposals expire:** one nobody approves does not linger and run later.",
            "**New things start paused:** ad sets and ads Kortex creates in Meta start paused for a person to switch on.",
          ],
        },
      ],
    },
    {
      q: "Why approval-first instead of full automation?",
      a: "Because you know things your ad account does not, such as a sale next week, a stock problem or a launch.",
      body: [
        "Rules and automation act on numbers alone. A person can see that the 'losing' campaign is the one carrying a new product, or that a sale ends tomorrow. Approval-first keeps that judgement in the loop while Kortex does the daily reading and the arithmetic.",
      ],
    },
    {
      q: "How does Kortex check whether a change worked?",
      a: "It judges each change on its ROAS over the following one to two weeks.",
      body: ["The result feeds back into later proposals, so Kortex learns what works in your account."],
    },
    {
      q: "How does Kortex connect without my password?",
      a: "Through Meta's and Google's own sign-in screens.",
      body: ["More on [security and access](/security)."],
    },
  ],
  faq: [
    {
      q: "Who on my team can approve changes?",
      a: "A person on your team approves each change in the chat or in the queue before Kortex makes it.",
    },
    {
      q: "What happens if nobody approves a proposal?",
      a: "It expires. Kortex does not make changes that nobody approved.",
    },
    {
      q: "Can Kortex double my budget overnight?",
      a: "Only if you approve it, and a single change can at most double or halve a budget.",
    },
  ],
  related: ["/security", "/features/budget-reallocation", "/vs-media-buyer", "/meta-ads"],
};

export const adCreation: ContentPage = {
  path: "/features/ad-creation",
  title: "AI Image Ads Made from Your Products | Kortex",
  description:
    "Kortex makes image ads from your products, in your brand's colours and type, and launches them paused in Meta so a person reviews each one before it runs.",
  crumb: "Ad creation",
  parent: FEATURES,
  eyebrow: "Feature: ad creation",
  h1: "Ad creation: image ads from your own products",
  lede:
    "Kortex makes image ads from your products, in your colours and type, and launches them paused in your Meta ad account for a person to review and switch on.",
  aboutApp: true,
  faqGroup: "Ad creation",
  sections: [
    {
      q: "What kind of ads can Kortex make?",
      a: "Image ads built from your products.",
      body: [
        "Kortex uses your product images and your colours and type, so the ads look like yours rather than a generic template.",
      ],
    },
    {
      q: "When would I use Kortex to make an ad?",
      a: "When an ad set needs fresh creative, for example after an ad has worn out.",
      body: [
        "Kortex's daily checks catch [creative fatigue](/features/creative-fatigue). A fresh image ad gives the ad set something new to show while the tired one rests.",
      ],
    },
    {
      q: "Do new ads go live straight away?",
      a: "No. Ads Kortex launches start paused, so a person reviews each one before it runs.",
      body: [
        "You see the ad in your Meta ad account and switch it on when you are happy with it. See [approvals and guardrails](/features/approvals-and-guardrails).",
      ],
    },
    {
      q: "Can I see what competitors run before I make an ad?",
      a: "Yes, with the free Compete tool.",
      body: [
        "[Kortex Compete](https://compete.kortexagent.co) reads your competitors' live ads from the Meta Ad Library and shows which ones they keep running. For partnership ads with creators, [Kortex Creators](https://creators.kortexagent.co) finds Instagram creators who fit what you sell.",
      ],
    },
  ],
  faq: [
    {
      q: "Does Kortex make video ads?",
      a: "Kortex makes image ads today.",
    },
    {
      q: "Will the ads use my brand's colours and fonts?",
      a: "Yes. Kortex makes the ads in your colours and type, from your products.",
    },
    {
      q: "Are Kortex-made ads published automatically?",
      a: "No. They launch paused in your Meta ad account, and a person switches them on.",
    },
  ],
  related: ["/features/creative-fatigue", "/meta-ads", "/features/approvals-and-guardrails", "/pricing"],
};
