export interface PetStats {
  hunger: number;
  happiness: number;
  energy: number;
}

export type PetState = 'normal' | 'hungry' | 'tired' | 'sleeping' | 'playing';

export type PetType = 'cat' | 'dog' | 'rabbit';

export interface Pet {
  stats: PetStats;
  state: PetState;
  name: string;
  type: PetType;
  level: number;
  experience: number;
}