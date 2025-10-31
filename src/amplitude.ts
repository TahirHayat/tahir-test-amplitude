import * as amplitude from '@amplitude/analytics-browser';
import { plugin as engagementPlugin } from '@amplitude/engagement-browser';

const AMPLITUDE_API_KEY = 'fc2b67baa715261b5314c27096785943';

amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: true,
});
amplitude.add(engagementPlugin());