import SeaparkNav from './SeaparkNav';

const Layout = ({ children }) => {
  return (
      <>
          <div className="box">
            <SeaparkNav />
            <main>
                {children}
            </main>
        </div>
    </>
  );
};

export default Layout;
