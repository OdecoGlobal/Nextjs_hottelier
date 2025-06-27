import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};
export const dynamic = 'force-dynamic';
export default function Home() {
  return <div>Home</div>;
}
