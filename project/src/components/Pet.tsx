import React from 'react';
import { Moon } from 'lucide-react';
import { PetState, PetType } from '../types';

interface PetProps {
  state: PetState;
  type: PetType;
  className?: string;
}

export function Pet({ state, type, className = '' }: PetProps) {
  const getAnimation = () => {
    switch (state) {
      case 'sleeping':
        return 'animate-bounce';
      case 'playing':
        return 'animate-pulse';
      case 'hungry':
        return 'animate-pulse';
      default:
        return '';
    }
  };

  const getPetImage = () => {
    if (state === 'sleeping') {
      return (
        <div className="relative">
          <img
            src={getPetImageUrl()}
            alt={`${type} pet`}
            className="w-48 h-48 object-cover rounded-full opacity-75"
          />
          <Moon className="w-8 h-8 text-blue-400 absolute top-0 right-0" />
        </div>
      );
    }

    return (
      <img
        src={getPetImageUrl()}
        alt={`${type} pet`}
        className="w-48 h-48 object-cover rounded-full"
      />
    );
  };

  const getPetImageUrl = () => {
    switch (type) {
      case 'cat':
        return 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&h=400';
      case 'dog':
        return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&h=400';
      case 'rabbit':
        return 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=400&h=400';
    }
  };

  return (
    <div className={`${className} ${getAnimation()}`}>
      {getPetImage()}
    </div>
  );
}