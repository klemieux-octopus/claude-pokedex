import * as React from 'react';

export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'grass' | 'electric' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export interface TypeBadgeProps {
  type?: PokemonType;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/**
 * Elemental type chip — the system's signature data atom.
 * @startingPoint section="Data" subtitle="18 elemental type chips" viewport="700x150"
 */
export function TypeBadge(props: TypeBadgeProps): JSX.Element;
