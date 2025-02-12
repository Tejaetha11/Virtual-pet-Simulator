import React from 'react';
import { Trophy } from 'lucide-react';

interface ExperienceBarProps {
  level: number;
  experience: number;
  maxExperience: number;
}

export function ExperienceBar({ level, experience, maxExperience }: ExperienceBarProps) {
  const percentage = (experience / maxExperience) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-lg font-bold text-gray-700">Level {level}</span>
        </div>
        <span className="text-sm text-gray-500">
          {experience} / {maxExperience} XP
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
          style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in-out' }}
        ></div>
      </div>
    </div>
  );
}