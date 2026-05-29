import SeaparkNav from "./SeaparkNav";
import "../css/layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <div className="box">
        <SeaparkNav />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
