/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Point the sign-up form at a local app server while developing. */
  readonly VITE_LEADS_URL?: string;
}
