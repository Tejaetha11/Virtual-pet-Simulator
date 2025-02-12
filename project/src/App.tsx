import React, { useEffect, useState } from 'react';
import { Pet as PetComponent } from './components/Pet';
import { StatusBar } from './components/StatusBar';
import { Controls } from './components/Controls';
import { ExperienceBar } from './components/ExperienceBar';
import { Pet, PetStats, PetState, PetType } from './types';
import { Pizza, Heart, Battery, Trophy } from 'lucide-react';

const STAT_DECAY_INTERVAL = 3000; // 3 seconds
const STAT_DECAY_AMOUNT = 5;
const XP_PER_LEVEL = 100;

interface Cooldowns {
  feed: number;
  play: number;
  pet: number;
}

function App() {
  const [pet, setPet] = useState<Pet>({
    stats: {
      hunger: 100,
      happiness: 100,
      energy: 100
    },
    state: 'normal',
    name: 'Whiskers',
    type: 'cat',
    level: 1,
    experience: 0
  });

  const [cooldowns, setCooldowns] = useState<Cooldowns>({
    feed: 0,
    play: 0,
    pet: 0
  });

  const updateStats = (newStats: Partial<PetStats>) => {
    setPet(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        ...newStats
      }
    }));
  };

  const addExperience = (amount: number) => {
    setPet(prev => {
      const newExperience = prev.experience + amount;
      const maxExperience = prev.level * XP_PER_LEVEL;
      
      if (newExperience >= maxExperience) {
        return {
          ...prev,
          level: prev.level + 1,
          experience: newExperience - maxExperience
        };
      }
      
      return {
        ...prev,
        experience: newExperience
      };
    });
  };

  const startCooldown = (action: keyof Cooldowns, duration: number) => {
    setCooldowns(prev => ({ ...prev, [action]: duration }));
    const interval = setInterval(() => {
      setCooldowns(prev => {
        const newValue = prev[action] - 1;
        if (newValue <= 0) {
          clearInterval(interval);
          return { ...prev, [action]: 0 };
        }
        return { ...prev, [action]: newValue };
      });
    }, 1000);
  };

  const determineState = (stats: PetStats): PetState => {
    if (stats.energy <= 30) return 'tired';
    if (stats.hunger <= 30) return 'hungry';
    if (stats.happiness <= 30) return 'normal';
    return 'normal';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (pet.state === 'sleeping') {
        updateStats({
          energy: Math.min(pet.stats.energy + 5, 100),
          hunger: Math.max(pet.stats.hunger - STAT_DECAY_AMOUNT / 2, 0)
        });
      } else {
        setPet(prev => {
          const newStats = {
            hunger: Math.max(prev.stats.hunger - STAT_DECAY_AMOUNT, 0),
            happiness: Math.max(prev.stats.happiness - STAT_DECAY_AMOUNT, 0),
            energy: Math.max(prev.stats.energy - STAT_DECAY_AMOUNT, 0)
          };
          
          return {
            ...prev,
            stats: newStats,
            state: determineState(newStats)
          };
        });
      }
    }, STAT_DECAY_INTERVAL);

    return () => clearInterval(interval);
  }, [pet.state]);

  const handleFeed = () => {
    if (pet.state === 'sleeping' || cooldowns.feed > 0) return;
    updateStats({ hunger: Math.min(pet.stats.hunger + 30, 100) });
    addExperience(10);
    startCooldown('feed', 5);
  };

  const handlePlay = () => {
    if (pet.state === 'sleeping' || cooldowns.play > 0) return;
    updateStats({
      happiness: Math.min(pet.stats.happiness + 30, 100),
      energy: Math.max(pet.stats.energy - 20, 0)
    });
    addExperience(15);
    setPet(prev => ({ ...prev, state: 'playing' }));
    startCooldown('play', 8);
    setTimeout(() => {
      setPet(prev => ({ ...prev, state: determineState(prev.stats) }));
    }, 2000);
  };

  const handlePet = () => {
    if (pet.state === 'sleeping' || cooldowns.pet > 0) return;
    updateStats({ happiness: Math.min(pet.stats.happiness + 15, 100) });
    addExperience(5);
    startCooldown('pet', 3);
  };

  const handleSleep = () => {
    setPet(prev => ({
      ...prev,
      state: prev.state === 'sleeping' ? determineState(prev.stats) : 'sleeping'
    }));
  };

  const maxExperience = pet.level * XP_PER_LEVEL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{pet.name}</h1>
          <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm">
            {pet.type}
          </div>
        </div>
        
        <ExperienceBar
          level={pet.level}
          experience={pet.experience}
          maxExperience={maxExperience}
        />
        
        <div className="flex flex-col items-center mb-8">
          <PetComponent
            state={pet.state}
            type={pet.type}
            className="mb-8"
          />
          
          <div className="w-full space-y-2">
            <StatusBar
              label="Hunger"
              value={pet.stats.hunger}
              color="bg-green-500"
              icon={<Pizza className="w-4 h-4 text-green-500" />}
            />
            <StatusBar
              label="Happiness"
              value={pet.stats.happiness}
              color="bg-yellow-500"
              icon={<Heart className="w-4 h-4 text-yellow-500" />}
            />
            <StatusBar
              label="Energy"
              value={pet.stats.energy}
              color="bg-blue-500"
              icon={<Battery className="w-4 h-4 text-blue-500" />}
            />
          </div>
        </div>

        <Controls
          onFeed={handleFeed}
          onPlay={handlePlay}
          onSleep={handleSleep}
          onPet={handlePet}
          disabled={pet.state === 'sleeping'}
          cooldowns={cooldowns}
        />

        <div className="mt-4 text-center text-sm text-gray-500">
          {pet.state === 'sleeping' ? '💤 Sleeping...' :
           pet.state === 'hungry' ? '🍽️ I\'m hungry!' :
           pet.state === 'tired' ? '😴 I\'m tired...' :
           pet.state === 'playing' ? '🎮 Playing!' :
           '😊 I\'m happy!'}
        </div>
      </div>
    </div>
  );
}

export default App;