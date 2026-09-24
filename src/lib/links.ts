// Every outbound link the page uses, in one place. The product and its legal
// pages live on the app host; the landing page only points at them.
export const APP_URL = "https://app.kortexagent.co";
// Same host: the load balancer routes /privacy and /terms to the app, which
// renders them in the landing page's frame.
export const PRIVACY_URL = "/privacy";
export const TERMS_URL = "/terms";
export const CONTACT_EMAIL = "hemanth@kreo-tech.com";

// Where the sign-up form posts. The app stores it as a lead for the operator
// console and sends the thank-you email.
export const LEADS_URL = import.meta.env.VITE_LEADS_URL || `${APP_URL}/api/leads`;
