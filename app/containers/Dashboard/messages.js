/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Dashboard';

export default defineMessages({
  step1Title: {
    id: `${scope}.step1Title`,
    defaultMessage: 'Connecting',
  },
  step1Body: {
    id: `${scope}.step1Body`,
    defaultMessage: 'Looking for your profile',
  },
  step2Title: {
    id: `${scope}.step2Title`,
    defaultMessage: 'Storage',
  },
  step2Body: {
    id: `${scope}.step2Body`,
    defaultMessage: 'Loading existing data',
  },
  step3Title: {
    id: `${scope}.step3Title`,
    defaultMessage: 'Messages',
  },
  step3Body: {
    id: `${scope}.step3Body`,
    defaultMessage: 'Getting some messages',
  },
});
