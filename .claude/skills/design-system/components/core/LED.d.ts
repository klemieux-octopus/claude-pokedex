import * as React from 'react';

export interface LEDProps {
  color?: 'blue' | 'red' | 'yellow' | 'green';
  /** Diameter in px. The big lens LED is ~48. */
  size?: number;
  /** Off state renders grey. */
  lit?: boolean;
  glow?: boolean;
  style?: React.CSSProperties;
}

export function LED(props: LEDProps): JSX.Element;
