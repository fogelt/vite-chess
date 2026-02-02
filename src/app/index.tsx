import { AppProvider } from './provider';
import { AppRouter } from './router';

export const App = () => {
  return (
    <AppProvider>
      <div
        className="min-h-screen w-full bg-slate-200">
        <AppRouter />
      </div>
    </AppProvider>
  );
};