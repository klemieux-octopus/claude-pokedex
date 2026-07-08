import * as React from 'react';

export interface StatBarProps {
  /** Stat name, e.g. HP, ATK, DEF, SPD. */
  label?: string;
  value?: number;
  /** Scale max — base-stat convention is 255. */
  max?: number;
  /** Override the auto value-based fill color. */
  color?: string;
  style?: React.CSSProperties;
}

export function StatBar(props: StatBarProps): JSX.Element;
