import { serif } from '@/lib/serifFont';

export default function IvyLeagueLayout({ children }) {
  return <div className={serif.variable}>{children}</div>;
}
