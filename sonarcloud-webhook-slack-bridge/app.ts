import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IncomingWebhook } from '@slack/webhook';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error('No body in event');
        }
        const sonarWebhookBody = JSON.parse(event.body);

        await sendSlakWebhook(sonarWebhookBody.status);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};

async function sendSlakWebhook(status: string) {
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhookUrl) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('SLACK_WEBHOOK_URL is not set');
    }
    const webhook = new IncomingWebhook(slackWebhookUrl);
    await webhook.send({
        text: status,
    });
}