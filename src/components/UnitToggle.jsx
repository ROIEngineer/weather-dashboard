export default function UnitToggle({ units, onChange }) {
  return (
    <div className="units">
      <label>
        <input 
          type="radio"
          name="units"
	  value="metric"
	  checked={units === "metric"}
	  onChange={() => onChange("metric")}
        />
        °C
      </label>
      <label style={{ marginLeft: "12px" }}>
        <input 
          type="radio"
          name="units"
          value="imperial"
          checked={units === "imperial"}
          onChange={() => onChange("imperial")}
        />
        °F
      </label>
    </div>
  );
}
