import { AppProvider } from './provider';
import { AppRouter } from './router';
import { SideMenu } from '@/features';
import { MainBackground } from '@/components/ui';

export const App = () => {
  return (
    <AppProvider>
      <div className="flex min-h-screen w-full bg-slate-200">

        <main className="relative flex-1 min-h-screen">
          <MainBackground />

          <div className="relative z-10">
            <SideMenu />
            <AppRouter />
          </div>
        </main>
      </div>
    </AppProvider>
  );
};