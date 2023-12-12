type DefaultLayoutProps = { children: React.ReactNode };

function DefaultLayout({ children }: DefaultLayoutProps) {
  return <main>{children}</main>;
}

export default DefaultLayout;
