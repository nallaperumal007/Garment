import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function SchedulerCalendar() {
  const { state, dispatch } = useContext(AppContext);

  const days = [...Array(7)].map((_, i) =>
    new Date(Date.now() + i * 86400000).toISOString().slice(0, 10)
  );

  const handleDrop = (e, lineName, date) => {
    const orderId = e.dataTransfer.getData("orderId");
    const order = state.orders.find((o) => o.id.toString() === orderId);
    if (!order) return;

    const newSchedule = [...state.schedule];

    // Check for overlapping shift
    const conflict = newSchedule.find(
      (s) => s.line === lineName && s.date === date && s.shift === order.shift
    );

    if (conflict) {
      alert("❌ Conflict: Shift already scheduled on this line and date.");
      return;
    }

    newSchedule.push({
      ...order,
      line: lineName,
      date,
    });

    dispatch({ type: "UPDATE_SCHEDULE", payload: newSchedule });
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered text-center align-middle calendar-table">
        <thead className="table-dark sticky-top">
          <tr>
            <th>Line</th>
            {days.map((day, i) => (
              <th key={i}>
                {new Date(day).toLocaleDateString("en-IN", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.lines.map((line, i) => (
            <tr key={i}>
              <th className="bg-light fw-bold">{line.name}</th>
              {days.map((day, d) => {
                const cellSchedule = state.schedule.filter(
                  (s) =>
                    s.line === line.name &&
                    new Date(s.date).toISOString().slice(0, 10) === day
                );

                const isConflict =
                  new Set(cellSchedule.map((s) => s.shift)).size !==
                  cellSchedule.length;

                return (
                  <td
                    key={d}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, line.name, day)}
                    className={isConflict ? "conflict-cell" : ""}
                    style={{ minWidth: "150px", height: "90px" }}
                  >
                    {cellSchedule.map((s, idx) => (
                      <div
                        key={idx}
                        className="bg-info text-white rounded px-2 py-1 mb-1 shadow-sm"
                      >
                        <strong>{s.orderNo}</strong>
                        <div style={{ fontSize: "0.75rem" }}>{s.shift}</div>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
