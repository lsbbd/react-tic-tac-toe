import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Game } from "./components/Game";

const Clock = lazy(() => import("./components/Clock"));

export function App() {
  return (
    <div>
      <ErrorBoundary message="OMG! the clock can not load!">
        <Suspense fallback="loading...">
          <Clock />
        </Suspense>
      </ErrorBoundary>
      <Game />
    </div>
  );
}
