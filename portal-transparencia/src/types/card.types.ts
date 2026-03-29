import React, { type PropsWithChildren } from 'react';

export interface CardProps extends PropsWithChildren {
  title?: string;
  action?: React.JSX.Element | string | null | false;
  className?: string;
}
