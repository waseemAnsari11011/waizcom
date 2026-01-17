import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import CalculatorView from "./CalculatorView";

export default function CalculatorModal({ isOpen, onClose, config, currency }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <CalculatorView 
        onClose={onClose} 
        isModal={true} 
        preloadedConfig={config} 
        preloadedCurrency={currency} 
      />
    </div>,
    document.body
  );
}
