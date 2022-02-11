import React, { useCallback, useReducer } from 'react';

import ClickAnimation from './ClickAnimation';

type Particle = {
  id: string;
  posX: number;
  posY: number;
};

export type GameState = {
  particles: Particle[];
};

type GameAction =
  | { type: 'spawn'; posX: number; posY: number }
  | { type: 'remove'; id: string };

const clickAnimationReducer: React.Reducer<GameState, GameAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'spawn':
      return {
        ...state,
        particles: state.particles.concat({
          id: Math.random().toString(),
          posX: action.posX,
          posY: action.posY,
        }),
      };
    case 'remove':
      return {
        ...state,
        particles: state.particles.filter(
          particle => particle.id !== action.id,
        ),
      };
    default:
      return state;
  }
};

export const useClickAnimation = () => {
  type ParticleDestroyHandler = React.ComponentProps<
    typeof ClickAnimation
  >['onDestroy'];

  const [state, dispatch] = useReducer(clickAnimationReducer, {
    particles: [],
  });

  const handleParticleSpawn = useCallback((posX, posY) => {
    dispatch({ type: 'spawn', posX, posY });
  }, []);
  const handleParticleDestroy = useCallback<ParticleDestroyHandler>(id => {
    dispatch({ type: 'remove', id });
  }, []);

  return {
    handleParticleSpawn,
    handleParticleDestroy,
    state,
  };
};
