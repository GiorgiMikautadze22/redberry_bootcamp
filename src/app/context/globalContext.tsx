"use client";
import React, { createContext, useState, useEffect } from "react";

interface ContextType {
    activePopUp: boolean;
    setActivePopUp: React.Dispatch<React.SetStateAction<boolean>>;
    agentDelete: boolean;
    setAgentDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const globalContext = createContext<ContextType | null>(null);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [activePopUp, setActivePopUp] = useState(false);
    const [agentDelete, setAgentDelete] = useState(false);

    return (
        <globalContext.Provider value={{ activePopUp, setActivePopUp, agentDelete, setAgentDelete }}>
            {children}
        </globalContext.Provider>
    );
};
