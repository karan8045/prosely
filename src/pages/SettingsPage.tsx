import React from 'react';
import { SettingsPanel } from '../components/settings/SettingsPanel';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-[#E8EAF0] dark:border-[#292B33] pb-4">
        <h2 className="text-xl font-bold text-[#17191F] dark:text-[#F4F4F5]">
          Studio Settings
        </h2>
        <p className="text-xs text-[#777D89] dark:text-[#9699A5] mt-1">
          Customize your default writing styles, LinkedIn preview profile, and transformation providers.
        </p>
      </div>

      <SettingsPanel />
    </div>
  );
};
