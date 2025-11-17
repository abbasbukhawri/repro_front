import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BrandColors {
  realEstate: string;
  businessSetup: string;
}

interface BrandingContextType {
  brandColors: BrandColors;
  updateBrandColor: (brand: 'realEstate' | 'businessSetup', color: string) => void;
  resetBrandColors: () => void;
}

const defaultColors: BrandColors = {
  realEstate: '#3b82f6', // Default blue
  businessSetup: '#10b981', // Default green
};

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: { children: ReactNode }) {
  const [brandColors, setBrandColors] = useState<BrandColors>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('brandColors');
    return saved ? JSON.parse(saved) : defaultColors;
  });

  // Save to localStorage whenever colors change
  useEffect(() => {
    localStorage.setItem('brandColors', JSON.stringify(brandColors));
  }, [brandColors]);

  const updateBrandColor = (brand: 'realEstate' | 'businessSetup', color: string) => {
    setBrandColors(prev => ({
      ...prev,
      [brand]: color
    }));
  };

  const resetBrandColors = () => {
    setBrandColors(defaultColors);
  };

  return (
    <BrandingContext.Provider value={{ brandColors, updateBrandColor, resetBrandColors }}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  const context = useContext(BrandingContext);
  if (context === undefined) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
}
