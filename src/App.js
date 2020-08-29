import React from "react";
import Home from "./pages/Home";
import { Provider as ModelProvider } from "./context/ModelContext";

const App = () => {
  return (
    <ModelProvider>
      <Home />
    </ModelProvider>
  );
};

export default App;
