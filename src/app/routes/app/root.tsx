import { Outlet } from 'react-router-dom';
import { SideMenu } from '@/features';
import { MainBackground } from '@/components/ui';

export default function AppRoot() {
  return (
    <div className="flex min-h-screen w-full bg-slate-200 selection:bg-stone-100">
      <main className="relative flex-1 min-h-screen">
        <MainBackground />
        <div className="relative z-10">
          <SideMenu />
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </main>
      <div className="animate-in fade-in duration-1000 delay-700 fill-mode-both">
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <div className="p-10 text-center">Något gick fel. Försök ladda om sidan.</div>;
}