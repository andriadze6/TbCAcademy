
import {useTranslations} from 'next-intl';
import HomePageComponents from './components/HomePage/HomePage';
import Header from "./components/OldHeader";
import NewHeader from './components/Header/NewHeader'
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <NewHeader></NewHeader>
      {/* <Header></Header>
      <HomePageComponents></HomePageComponents> */}
    </>
  );
}