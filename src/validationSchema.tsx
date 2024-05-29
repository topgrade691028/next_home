import * as yup from 'yup';
import { AgeGroup } from '@/types';

export const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  ageGroup: yup.mixed<AgeGroup>().oneOf(Object.values(AgeGroup), "Please select age").required("Age group is required"),
  address: yup.string().optional(),
});