import * as amplitude from '@amplitude/analytics-browser';
import { Identify } from '@amplitude/analytics-browser';
import { plugin as engagementPlugin } from '@amplitude/engagement-browser';

const AMPLITUDE_API_KEY = 'fc2b67baa715261b5314c27096785943';

amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: true,
});
amplitude.add(engagementPlugin());

/**
 * Identifies the current user to Amplitude.
 * Call this when a user logs in.
 * @param {string} userId - Your internal unique ID for the user.
 * @param {Record<string, any>} [userProperties] - Optional traits like email, name, plan type.
 */
export const identifyUser = (userId: string, userProperties: Record<string, any> = {}) => {
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
 * Tracks a custom event.
 * @param {string} eventName - The name of the event (e.g., "Project Created").
 * @param {Record<string, any>} [eventProperties] - Optional data about the event.
 */
export const trackEvent = (eventName: string, eventProperties: Record<string, any> = {}) => {
  amplitude.track(eventName, eventProperties);
};

/**
 * Logs out the user by resetting the User ID.
 */
export const logoutUser = () => {
  amplitude.reset(); // Resets user ID and generates a new anonymous ID.
};