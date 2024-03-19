import { addEmailToQueue } from '../src/queue/emailQueue';
import emailQueue from '../src/config/queueConfig';

jest.mock('../src/config/queueConfig', () => ({
    default: {
        add: jest.fn(),
        process: jest.fn()
    }
}));

describe('Email Service', () => {
    it('should enqueue an email job', async () => {
        const emailData = {
            to: ['test@example.com'],
            subject: 'Test Email',
            text: 'This is a test email',
            title: 'Test title',
            style: 'p {color: red;}',
            body: '<p>This is a test email</p>',
            priority: 1
        };

        await addEmailToQueue(emailData);

        expect(emailQueue.add).toHaveBeenCalledWith(emailData, { priority: emailData.priority });
    });
});
