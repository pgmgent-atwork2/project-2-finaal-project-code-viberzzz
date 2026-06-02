import "../../css/ReportsHeader.css";

const ReportsHeader = () => {
  return (
    <section className="reports-header">
      <div className="reports-header-left">
        <h1>Reports & Analytics</h1>

        <p>
          Trends, water quality and maintenance activity across all
          installations.
        </p>
      </div>

      <div className="reports-header-right">
        <select>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>

        <select>
          <option>All Installations</option>
          <option>Dolphin Pool A</option>
          <option>Shark Tank</option>
          <option>Seal Pool</option>
        </select>

        <button>Export PDF</button>
      </div>
    </section>
  );
};

export default ReportsHeader;
