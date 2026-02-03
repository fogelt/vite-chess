import { RegisterForm } from '@/features/side-menu/components/register-form';
import { PrimaryContainer } from '../ui';

export function RegisterLayout() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">

      <PrimaryContainer className='w-[30%]'>
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">
          Create Account
        </h1>

        <RegisterForm />
      </PrimaryContainer>
    </div>
  );
}