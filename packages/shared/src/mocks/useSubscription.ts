// Toggle these to test different states:
const MOCK_STATE = {
  isSubscribed: true,    // set false to test the paywall screen
  isTrialActive: true,   // set false to test trial expiry
  trialDaysLeft: 12,
  plan: 'monthly',       // 'monthly' | 'annual'
};

export function useSubscription() {
  return {
    isSubscribed: MOCK_STATE.isSubscribed,
    isTrialActive: MOCK_STATE.isTrialActive,
    trialDaysLeft: MOCK_STATE.trialDaysLeft,
    plan: MOCK_STATE.plan,
    // Called when user taps 'Subscribe' — mock just flips the flag
    subscribe: async (plan: 'monthly' | 'annual') => {
      MOCK_STATE.isSubscribed = true;
      MOCK_STATE.isTrialActive = false;
      return { success: true };
    },
    restore: async () => ({ success: true }),
  };
}