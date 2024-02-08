import React, { useState } from 'react';
import Head from 'next/head';
import Header from 'components/org/quotient/Header';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoanSchema } from 'lib/zodSchemas';
import { Form } from 'components/ui/form';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import FormFieldCarDetails from 'components/forms/user/newLoan/form-field-car-details';
import FormFieldNameAndBirthday from 'components/forms/user/form-field-id';
import FormFieldAddress from 'components/forms/user/form-field-address';
import FormFieldPersonalContact from 'components/forms/user/form-field-personal-contact';
import LoanQrAuthentication from 'components/org/quotient/loan-auth';
import QuotientSuccess from 'components/org/quotient/quotient-success';

const DEFAULT_FORM_VALUES = {
  sellerName: 'Charleswood Toyota Partners',
  newOrUsed: 'Used',
  year: '2022',
  mileage: '45000',
  make: 'Toyota',
  model: 'Celica',
  price: '28999',
  firstName: 'ken',
  middleName: 'zambrano',
  lastName: 'de jesus',
  suffix: 'He',
  streetAddress: 'asdasdasd',
  suite: 'asdasd',
  zipCode: '1233',
  city: 'caracas',
  state: 'caracas',
  email: 'asdg@gmail.com',
  phoneNumber: '12312312321',
};

/**
 * @description Quotient Form to apply for a loan.
 * @todo refactor this page by making code more modular
 * @returns React.FC Form Field
 */
const QuotientApplyLoanForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);
  const form = useForm({
    resolver: zodResolver(LoanSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES,
  });

  async function onSubmit(values) {
    toast.info('Form Submitted');
    console.log('onSubmit', { values });
    setIsSuccess(true);
  }

  return (
    <>
      <Head>
        <title>Quotient - Apply Loan</title>
      </Head>
      <Header />
      {isSuccess ? (
        <QuotientSuccess title="Your loan application has been approved!" />
      ) : (
        <div className='pt-8 p-5'>
          <h2 className='text-2xl font-semibold mb-5'>Apply for Auto Loan</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-2">
              <div className='p-4 bg-neutral-50 rounded-lg space-y-5'>
                <FormFieldCarDetails control={form.control} />
                <Separator />
                <FormFieldNameAndBirthday control={form.control} />
                <Separator />
                <FormFieldAddress control={form.control} />
                <Separator />
                <FormFieldPersonalContact />
              </div>
              <LoanQrAuthentication isAuth={userInfo} setUserInfo={setUserInfo} />
              <Button
                className="col-span-2 w-fit md:place-self-end px-10 bg-blue-700 text-lg"
                type="submit">
                Submit Application
              </Button>
            </form>
          </Form>
        </div>
      )}

    </>
  );
};

export default QuotientApplyLoanForm;
