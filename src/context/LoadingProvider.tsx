import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  // Loading screen removed for instant load performance.
  // isLoading is kept in context so existing consumers don't break.
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(100);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  useEffect(() => {
    // Trigger entrance animations immediately after first render
    if ((window as any).initialFXRan) return;
    (window as any).initialFXRan = true;
    import("../components/utils/initialFX").then((module) => {
      if (module.initialFX) {
        // Small timeout ensures DOM is fully painted before animations start
        setTimeout(() => {
          module.initialFX();
        }, 50);
      }
    });
  }, []);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
