import { Outlet } from 'react-router-dom';
import { DefaultLayout } from './layouts';

function App() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

export default App;
