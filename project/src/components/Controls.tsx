import React from 'react';
import { Pizza, PlayCircle, Moon, Heart, Trophy } from 'lucide-react';

interface ControlsProps {
  onFeed: () => void;
  onPlay: () => void;
  onSleep: () => void;
  onPet: () => void;
  disabled?: boolean;
  cooldowns: {
    feed: number;
    play: number;
    pet: number;
  };
}

export function Controls({ onFeed, onPlay, onSleep, onPet, disabled, cooldowns }: ControlsProps) {
  const buttonClass = (cooldown: number) => `
    flex flex-col items-center justify-center p-4 rounded-lg 
    ${disabled ? 'bg-gray-200 cursor-not-allowed' : 
      cooldown > 0 ? 'bg-gray-100 cursor-not-allowed' : 
      'bg-white hover:bg-gray-50 cursor-pointer'}
    transition-colors duration-200 shadow-md relative
  `;

  const renderCooldown = (cooldown: number) => {
    if (cooldown <= 0) return null;
    return (
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
        {cooldown}s
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <button
        onClick={onFeed}
        disabled={disabled || cooldowns.feed > 0}
        className={buttonClass(cooldowns.feed)}
        title="Feed"
      >
        {renderCooldown(cooldowns.feed)}
        <Pizza className="w-8 h-8 mb-2" />
        <span className="text-sm font-medium">Feed</span>
      </button>

      <button
        onClick={onPlay}
        disabled={disabled || cooldowns.play > 0}
        className={buttonClass(cooldowns.play)}
        title="Play"
      >
        {renderCooldown(cooldowns.play)}
        <PlayCircle className="w-8 h-8 mb-2" />
        <span className="text-sm font-medium">Play</span>
      </button>

      <button
        onClick={onPet}
        disabled={disabled || cooldowns.pet > 0}
        className={buttonClass(cooldowns.pet)}
        title="Pet"
      >
        {renderCooldown(cooldowns.pet)}
        <Heart className="w-8 h-8 mb-2" />
        <span className="text-sm font-medium">Pet</span>
      </button>

      <button
        onClick={onSleep}
        disabled={disabled}
        className={buttonClass(0)}
        title="Sleep"
      >
        <Moon className="w-8 h-8 mb-2" />
        <span className="text-sm font-medium">Sleep</span>
      </button>
    </div>
  );
}