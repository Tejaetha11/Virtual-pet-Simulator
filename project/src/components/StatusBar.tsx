import React from 'react';

interface StatusBarProps {
  value: number;
  label: string;
  color: string;
  icon: React.ReactNode;
}

export function StatusBar({ value, label, color, icon }: StatusBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className="text-sm font-medium text-gray-700">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${value}%`, transition: 'width 0.5s ease-in-out' }}
        ></div>
      </div>
    </div>
  );
}