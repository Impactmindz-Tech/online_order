"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import Store from "./Store";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default Providers;
