import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AgeGroup } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { validationSchema } from '@/validationSchema';

type FormData = yup.InferType<typeof validationSchema>;

const Form: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isIdle, isPending, isSuccess, isError } = useMutation<unknown, Error, FormData, unknown>(
    {
      mutationFn: async (data: FormData) => {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          if (response.status === 400) {
            const errorData = await response.json();
            throw new Error(`Validation Error: ${errorData.message}`);
          }
          if (response.status === 405) {
            throw new Error('Method Not Allowed');
          }
          throw new Error('Internal Server Error');
        }
        return response.json();
      },
      onSuccess: () => {
        enqueueSnackbar('Form submitted successfully!', { variant: 'success' });
      },
      onSettled: () => {
        reset();
      },
      onError: (res: Error) => {
        enqueueSnackbar(res.message, { variant: 'error' });
      }
    }
  );

  const onSubmit = (data: FormData) => mutate(data);

  return (
    <div className="w-full max-w-xs">
      {(isIdle || isError) && (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" {...register('firstName')} />
            {errors.firstName && <p className="text-red-700 m-2">{errors.firstName.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" {...register('email')} />
            {errors.email && <p className="text-red-700 m-2">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ageGroup">Age Group</label>
            <select id="ageGroup" {...register('ageGroup')} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
              <option value="">Select age group</option>
              <option value={AgeGroup.ADULT}>Adult</option>
              <option value={AgeGroup.CHILD}>Child</option>
              <option value={AgeGroup.INFANT}>Infant</option>
            </select>
            {errors.ageGroup && <p className="text-red-700 m-2">{errors.ageGroup.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" {...register('address')} />
          </div>
          <div className="flex items-center flex-col">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
      {isPending && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-grey-700 m-2">Please wait...</p>
        </div>
      )}
      {isSuccess && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-grey-700 m-2">Form submitted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Form;
