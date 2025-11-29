import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  currency: string;
  timezone: string;
  currencySymbol: string;
  updateCurrency: (currency: string) => void;
  updateTimezone: (timezone: string) => void;
  formatCurrency: (amount: number) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const currencySymbols: Record<string, string> = {
  'AED': '  AED',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'SAR': '﷼',
  'QAR': 'ر.ق',
  'KWD': 'د.ك',
  'BHD': 'د.ب',
  'OMR': 'ر.ع.',
  'INR': '₹',
  'PKR': '₨',
  'EGP': 'E£',
  'JPY': '¥',
  'CNY': '¥',
  'AUD': 'A$',
  'CAD': 'C$',
  'CHF': 'Fr',
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('crm-currency') || 'AED';
  });

  const [timezone, setTimezone] = useState(() => {
    return localStorage.getItem('crm-timezone') || 'Asia/Dubai';
  });

  const currencySymbol = currencySymbols[currency] || currency;

  useEffect(() => {
    localStorage.setItem('crm-currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('crm-timezone', timezone);
  }, [timezone]);

  const updateCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  const updateTimezone = (newTimezone: string) => {
    setTimezone(newTimezone);
  };

  const formatCurrency = (amount: number): string => {
    const symbol = currencySymbols[currency] || currency;
    
    // Format number with commas
    const formattedAmount = amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    // For Arabic currencies (AED, SAR, QAR, etc.), put symbol after number
    const arabicCurrencies = ['AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR', 'EGP'];
    if (arabicCurrencies.includes(currency)) {
      return `${formattedAmount} ${symbol}`;
    }

    // For most other currencies, put symbol before number
    return `${symbol}${formattedAmount}`;
  };

  return (
    <SettingsContext.Provider
      value={{
        currency,
        timezone,
        currencySymbol,
        updateCurrency,
        updateTimezone,
        formatCurrency,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
