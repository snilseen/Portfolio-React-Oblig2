function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" mx-auto px-4 max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
      {children}
    </div>
  );
}

export default Layout;
