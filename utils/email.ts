import React from 'react';
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();
// RoaméLux
const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export const sendEmail = async ({
  to = 'okechukwuchidera12@gmail.com',
  subject,
  component,
}: {
  to?: string;
  subject: string;
  component: React.ReactNode;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to,
      react: component,
      subject: subject,
    });
    if (error || !data?.id) throw new Error('Failed to send email');
    if (process.env.NODE_ENV === 'development')
      console.log('Email sent:', data);
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development')
      console.log('Error occured', error);

    throw error;
  }
};
