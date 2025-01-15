
import {useTranslations} from 'next-intl';
import NewHeader from './components/Header/NewHeader';
import NewHomePage from './components/HomePage/NewHomePage'
import '/app/globals.css'
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <NewHomePage></NewHomePage>
      {/* <Header></Header>
      <HomePageComponents></HomePageComponents> */}
    </>
  );
}