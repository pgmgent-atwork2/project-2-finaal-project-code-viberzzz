import { getWaardeStatus, getParameterRowStyle } from "../statusWaarde.ts";

const WaterParameters = ({ waarde, range }) => {
  const waardeStatus = getWaardeStatus(waarde, range);

  return (
    <div
      style={{
        marginTop: 20,
        paddingTop: 20,
        borderTop: "1px solid #e2e8f0",
      }}
    >
      <h4 style={{ marginBottom: 12 }}>Water Parameters</h4>
      <div style={{ fontSize: "13px", lineHeight: "1.8" }}>
        <div style={getParameterRowStyle(waardeStatus.ph)}>
          <strong>pH:</strong> {range.ph_min} - {range.ph_max}{" "}
          (Current: {waarde?.ph ?? "N/A"})
        </div>
        <div style={getParameterRowStyle(waardeStatus.temperatuur)}>
          <strong>Temperatuur:</strong> {range.temperatuur_min}
          °C - {range.temperatuur_max}°C (Current:{" "}
          {waarde?.temperatuur ?? "N/A"}°C)
        </div>
        <div style={getParameterRowStyle(waardeStatus.water_level)}>
          <strong>Water Level:</strong> {range.water_level_min}{" "}
          - {range.water_level_max} (Current:{" "}
          {waarde?.water_level ?? "N/A"})
        </div>
        <div style={getParameterRowStyle(waardeStatus.zoutgehalte)}>
          <strong>Zoutgehalte:</strong> {range.zoutgehalte_min}{" "}
          - {range.zoutgehalte_max} (Current:{" "}
          {waarde?.zoutgehalte ?? "N/A"})
        </div>
        <div style={getParameterRowStyle(waardeStatus.microbiologie)}>
          <strong>Microbiologie Max:</strong>{" "}
          {range.microbiologie_max} (Current:{" "}
          {waarde?.microbiologie ?? "N/A"})
        </div>
      </div>
    </div>
  );
};

export default WaterParameters;
