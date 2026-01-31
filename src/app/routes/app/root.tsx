import { Outlet } from 'react-router-dom';

export default function AppRoot() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-stone-100">
      <main className="flex-grow min-h-[90vh]">
        <Outlet />
      </main>
      <div className="animate-in fade-in duration-1000 delay-700 fill-mode-both">
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <div className="p-10 text-center">Något gick fel. Försök ladda om sidan.</div>;
}