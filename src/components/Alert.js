"use client";
import { useEffect, useState } from "react";

export default function TestPage() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("seenTestNotice");
    if (!seen) {
      setShowNotice(true);
    }
  }, []);

  const dismissNotice = () => {
    localStorage.setItem("seenTestNotice", "true");
    setShowNotice(false);
  };

  return (
    <div>
      {/* Floating Modal Notice */}
      {showNotice && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-white max-w-sm w-full p-6 rounded-lg shadow-lg text-center p-4">
            <p className="text-lg mb-4">
              ⚠️ Esta es una <strong>página de prueba</strong>. La información
              mostrada no es real.
            </p>
            <button
              onClick={dismissNotice}
              className="mt-2 px-6 py-2 bg-primary !text-white rounded-full"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
