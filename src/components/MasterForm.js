import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function MasterForm({ type }) {
  const { dispatch, state } = useContext(AppContext);
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: `ADD_${type.toUpperCase()}`, payload: form });
    setForm({});
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        Add {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {type === "unit" && (
            <div className="mb-3">
              <label className="form-label">Unit Name</label>
              <input
                type="text"
                className="form-control"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          )}

          {type === "line" && (
            <>
              <div className="mb-3">
                <label className="form-label">Line Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Associated Unit</label>
                <select
                  className="form-select"
                  value={form.unit || ""}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  required
                >
                  <option value="">Select Unit</option>
                  {state.units.map((u, idx) => (
                    <option key={idx} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {type === "shift" && (
            <>
              <div className="mb-3">
                <label className="form-label">Shift Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={form.start || ""}
                  onChange={(e) => setForm({ ...form, start: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={form.end || ""}
                  onChange={(e) => setForm({ ...form, end: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-success">
            Add {type}
          </button>
        </form>
      </div>
    </div>
  );
}
