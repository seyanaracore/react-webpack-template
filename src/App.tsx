import { DefaultLayout } from './layouts';
import HelloWorld from './components/HelloWorld';

const App: React.FC = () => {
  return (
    <>
      <header>Header</header>
      <DefaultLayout>
        <HelloWorld msg="hello epta1" />
      </DefaultLayout>
      <footer>footer</footer>
    </>
  );
};

export default App;
