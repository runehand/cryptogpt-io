// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'node-fetch';
// eslint-disable-next-line import/no-extraneous-dependencies
import { schedules } from "@trigger.dev/sdk/v3";

export const callEndpointTask = schedules.task({
  id: "call-endpoint-every-5-seconds",
  cron: "*/5 * * * *",
  run: async () => {
    try {
      await fetch('https://cryptogpt.app/api/auth/transaction/', {
        method: 'POST',
      });
    } catch (error) {
      console.error("Error calling API:", error);
    }
  },
});
