import { ReactElement } from "react";
import { EventsList } from "../../components/EventsList/EventsList";
import { ErrorBoundary } from "react-error-boundary";

export const LandingPage = (): ReactElement => {
  return (
    <ErrorBoundary fallback={<p> Something went wrong</p>}>
      <EventsList />
    </ErrorBoundary>
  );
};
