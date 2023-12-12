import HelloWorld from '@/components/HelloWorld';
import { DefaultLayout } from './layouts';

function App() {
  return (
    <>
      <header>Header</header>
      <DefaultLayout>
        <HelloWorld msg="hello epta1" />
      </DefaultLayout>
      <footer>footer</footer>
    </>
  );
}

export default App;
