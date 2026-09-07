/**
 * Translated clinical labels — kept in a tiny standalone module (no imports)
 * so dashboard/pharmacy/patient pages never depend on the ~1MB i18n
 * dictionary chunk for these helpers. `t` comes from `useLang()`.
 */
export type TFunction = (k: string) => string;

/** Translated DR stage label — keeps charts, badges and timelines in the active language. */
export function drStageLabel(t: TFunction, stage: number | undefined): string {
  switch (stage) {
    case 0:
      return t("stageNoDR");
    case 1:
      return t("stageMild");
    case 2:
      return t("stageModerate");
    case 3:
      return t("stageSevere");
    case 4:
      return t("stageProlif");
    default:
      return t("stageUnscreened");
  }
}

/** Translated referral status label. */
export function referralStatusLabel(t: TFunction, s: string): string {
  if (s === "pending") return t("referralsPendingLabel");
  if (s === "confirmed") return t("referralsConfirmedLabel");
  return t("referralsCompletedLabel");
}

/** Translated pharmacy status label (uses generic pipeline strings). */
export function pharmacyStatusLabel(t: TFunction, s: string): string {
  if (s === "pending") return t("genericPending");
  if (s === "verified") return t("genericVerified");
  if (s === "dispatched") return t("genericDispatched");
  return t("genericDelivered");
}
