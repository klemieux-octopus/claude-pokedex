import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'neutral' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Fully round instead of soft-square. */
  round?: boolean;
  /** Accessible label (also the tooltip). */
  label?: string;
  disabled?: boolean;
  /** The icon glyph, typically a Lucide SVG. */
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;
