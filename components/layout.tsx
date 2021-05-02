import { ReactElement } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  return <main>{children}</main>;
}
