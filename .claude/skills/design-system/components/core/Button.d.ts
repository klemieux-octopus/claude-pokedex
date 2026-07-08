import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` = Pokédex red, `secondary` = lens blue. */
  variant?: 'primary' | 'secondary' | 'neutral' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Fill container width. */
  block?: boolean;
  disabled?: boolean;
  /** Node rendered before the label (e.g. a Lucide icon). */
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Primary tactile control for the Pokédex system.
 * @startingPoint section="Controls" subtitle="Molded-plastic pill buttons" viewport="700x160"
 */
export function Button(props: ButtonProps): JSX.Element;
