
import {useTranslations} from 'next-intl';
import HomePageComponents from '../components/HomePage/HomePage';
import Header from "../components/Header";
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <Header></Header>
      <HomePageComponents></HomePageComponents>
    </>
  );
}