import { AppProvider } from './provider';
import { AppRouter } from './router';
import bgImage from '@/assets/chess-bg.jpg';

export const App = () => {
  return (
    <AppProvider>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}>
        <AppRouter />
      </div>
    </AppProvider>
  );
};