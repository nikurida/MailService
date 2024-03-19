import request from 'supertest';

describe('POST /api/email', () => {
    it.only('should send an email', async () => {
        const emailData = {
            to: ['test@example.com'],
            subject: 'Test Email',
            text: 'This is a test email',
            title: 'TESTE TITLE',
            style: 'p {color: red;}',
            body: '<p>This is a test email</p>',
            priority: 1
        };

        const response = await request('http://localhost:4000')
            .post('/api/email')
            .send(emailData);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Email added to queue');
    });
});