import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import { validationSchema } from '@/validationSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await validationSchema.validate({ ...req.body });
      setTimeout(() => {
        res.status(200).json({ message: 'Form submitted successfully' });
      }, 3000);
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        res.status(400).json({ message: e.errors });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    res.status(405).end();
  }
}
