import { render } from "@testing-library/react";
import PlanetsProvider from "../context/PlanetsProvider";

const renderWithContext = (element: React.ReactElement) => {
  return (
    render (
    <PlanetsProvider>
      { element }
    </PlanetsProvider>
    )
  )
}

export default renderWithContext;