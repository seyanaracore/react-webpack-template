import { Link } from 'react-router-dom';
import s from './styles.module.scss';

type DefaultLayoutProps = { children: React.ReactNode };

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={s.container}>{children}</main>
      <footer>footer</footer>
    </>
  );
}

export default DefaultLayout;
