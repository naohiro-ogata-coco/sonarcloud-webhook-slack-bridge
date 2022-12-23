/* eslint-disable @typescript-eslint/no-var-requires */
require("json5/lib/register");

const awsEventTemplate = require("../events/event.json5");
const sonarEventTemplate = require("../events/sonarcloud_webhook_sample.json5");

awsEventTemplate.body = JSON.stringify(sonarEventTemplate);

console.log(JSON.stringify(awsEventTemplate));
