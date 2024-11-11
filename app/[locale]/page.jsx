// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const router = useRouter();

//   useEffect(() => {
//       // Redirect to a different page (e.g., /HomePage)
//       router.push('[locale]/HomePage');
//   }, [router]);
//  // Or you can add a loader or message
// }
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import HomePageComponents from '../components/HomePage/HomePage';
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <HomePageComponents></HomePageComponents>
  );
}