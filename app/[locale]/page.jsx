
import { get } from 'http';
import NewHomePage from './components/HomePage/NewHomePage';
import '/app/globals.css';

export default async function HomePage() {
  return (
    <>
      <NewHomePage></NewHomePage>
    </>
  );
}