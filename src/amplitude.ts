import * as amplitude from '@amplitude/analytics-browser';
import { Identify } from '@amplitude/analytics-browser';
import { plugin as engagementPlugin } from '@amplitude/engagement-browser';
import * as engagement from "@amplitude/engagement-browser";

// It's best practice to load secrets from environment variables
const AMPLITUDE_API_KEY = 'fc2b67baa715261b5314c27096785943';

let initialized = false;

export const initAmplitude = () => {
  if (!initialized) {
    amplitude.init(AMPLITUDE_API_KEY, undefined, {
      autocapture: true,
    });

    // Initialize Engagement SDK (for surveys)
    engagement.init(AMPLITUDE_API_KEY);
    amplitude.add(engagementPlugin());

    initialized = true;
    console.log("✅ Amplitude initialized (analytics + engagement)");
  }
};

export const identifyUser = (userId: string, userProperties: Record<string, any> = {}) => {
  if (!initialized) return;
  amplitude.setUserId(userId);
  if (Object.keys(userProperties).length > 0) {
    const identifyObj = new Identify();
    for (const [key, value] of Object.entries(userProperties)) {
      identifyObj.set(key, value);
    }
    amplitude.identify(identifyObj);
  }
};

/**
 * Resets the user ID when a user logs out.
 * This generates a new anonymous ID for subsequent events.
 */
export const resetAmplitude = () => {
  if (!initialized) return;
  amplitude.reset();
  console.log("🚪 Amplitude user reset (logged out)");
};

/**
 * Opts the user out of all Amplitude tracking.
 */
export const optOutOfTracking = () => {
  if (!initialized) return;
  amplitude.setOptOut(true);
  console.log("🚫 Amplitude tracking disabled for this user.");
};