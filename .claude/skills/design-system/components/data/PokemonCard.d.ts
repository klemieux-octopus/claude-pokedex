import * as React from 'react';
import type { PokemonType } from './TypeBadge';

export interface PokemonCardProps {
  /** Dex number, rendered zero-padded (#0001). */
  number?: number;
  name?: string;
  types?: PokemonType[];
  /** Creature artwork URL. Omit for a neutral silhouette slot. */
  sprite?: string | null;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * The iconic dex entry tile — type-tinted, with number, name, sprite slot and chips.
 * @startingPoint section="Data" subtitle="Type-tinted dex entry tile" viewport="360x180"
 */
export function PokemonCard(props: PokemonCardProps): JSX.Element;
