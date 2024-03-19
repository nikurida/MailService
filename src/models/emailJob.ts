import * as yup from 'yup';

export interface EmailJob {
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    text: string;
    title: string;
    style: string;
    body: string;
    priority: number;
}

export const emailSchema = yup.object().shape({
    to: yup.array().of(yup.string().email()).required(),
    cc: yup.array().of(yup.string().email()),
    bcc: yup.array().of(yup.string().email()),
    subject: yup.string().required(),
    text: yup.string().required(),
    title: yup.string().required(),
    style: yup.string().required(),
    body: yup.string().required(),
    priority: yup.number().oneOf([0, 1]).required()
});
