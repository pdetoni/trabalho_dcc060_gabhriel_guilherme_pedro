"use client";

import { CircularProgress } from "@mui/material";
import React, { ReactNode, createContext, useContext, useState } from "react";

type LoadingOverlayType = {
  setLoadingOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingOverlay: ({
    show,
    message,
  }: {
    show: boolean;
    message?: string | null | undefined;
  }) => void;
};

const LoadingOverlay = createContext<LoadingOverlayType | undefined>(undefined);

export const LoadingOverlayProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [visible, setLoadingOverlayVisible] = useState(false);
  const [message, setMessage] = useState<string | null | undefined>(null);
  const setLoadingOverlay = ({
    show,
    message,
  }: {
    show: boolean;
    message?: string | null | undefined;
  }) => {
    setLoadingOverlayVisible(show);
    if (show) {
      setMessage(message);
    } else {
      setMessage(null);
    }
  };
  return (
    <LoadingOverlay.Provider
      value={{ setLoadingOverlayVisible, setLoadingOverlay }}
    >
      {visible && (
        <div className="fixed z-[1500] flex h-screen w-screen text-white flex-col items-center justify-center bg-black/50">
          <CircularProgress size={72} color="inherit" />
          <div className="text-md font-semibold">{message}</div>
        </div>
      )}
      {children}
    </LoadingOverlay.Provider>
  );
};

export const useLoadingOverlay = () => {
  const context = useContext(LoadingOverlay);
  if (!context) {
    throw new Error(
      "useLoadingOverlay must be used within a HelperCardProvider"
    );
  }
  return context;
};
