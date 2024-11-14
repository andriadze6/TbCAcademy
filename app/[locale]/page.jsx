
import {useTranslations} from 'next-intl';
import HomePageComponents from './components/HomePage/HomePage';
import Header from "./components/OldHeader";
import NewHeader from './components/Header/NewHeader';
import NewHomePage from './components/HomePage/NewHomePage'
import '@/app/globals.css'
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <NewHeader></NewHeader>
      <NewHomePage></NewHomePage>
      {/* <Header></Header>
      <HomePageComponents></HomePageComponents> */}
    </>
  );
}