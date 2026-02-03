import { PrimaryContainer, RegisterForm } from '@/components/ui';

export function RegisterLayout() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">

      <PrimaryContainer className='w-[30%]'>
        <h1 className="flex justify-center uppercase tracking-[0.2em]  text-white/70 text-2xl pb-5">
          Create Account
        </h1>

        <RegisterForm />
      </PrimaryContainer>
    </div>
  );
}