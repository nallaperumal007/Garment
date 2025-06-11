import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Orders() {
  const { state, dispatch } = useContext(AppContext);
  const [form, setForm] = useState({});

  const handleCreate = (e) => {
    e.preventDefault();
    const newOrder = { ...form, id: Date.now() };
    dispatch({ type: "ADD_ORDER", payload: newOrder });
    setForm({});
  };

  return (
    <div className="card mb-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Create Order</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleCreate}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Order No</label>
                <input
                  className="form-control"
                  value={form.orderNo || ""}
                  onChange={(e) =>
                    setForm({ ...form, orderNo: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Style Name</label>
                <input
                  className="form-control"
                  value={form.styleName || ""}
                  onChange={(e) =>
                    setForm({ ...form, styleName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.quantity || ""}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.deliveryDate || ""}
                  onChange={(e) =>
                    setForm({ ...form, deliveryDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Unit</label>
                <select
                  className="form-select"
                  value={form.unit || ""}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  required
                >
                  <option value="">Select Unit</option>
                  {state.units.map((u, i) => (
                    <option key={i} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Shift</label>
                <select
                  className="form-select"
                  value={form.shift || ""}
                  onChange={(e) => setForm({ ...form, shift: e.target.value })}
                  required
                >
                  <option value="">Select Shift</option>
                  {state.shifts.map((s, i) => (
                    <option key={i} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Lines (Multi-select)</label>
              <select
                multiple
                className="form-select"
                value={form.lines || []}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lines: Array.from(e.target.selectedOptions).map(
                      (o) => o.value
                    ),
                  })
                }
              >
                {state.lines.map((l, i) => (
                  <option key={i} value={l.name}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success">
              Create Order
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <h5>Orders List</h5>
        {state.orders.length === 0 ? (
          <div className="alert alert-warning">No orders created yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Order No</th>
                  <th>Style Name</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Shift</th>
                </tr>
              </thead>
              <tbody>
                {state.orders.map((order, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{order.orderNo}</td>
                    <td>{order.styleName}</td>
                    <td>{order.quantity}</td>
                    <td>{order.unit}</td>
                    <td>{order.shift}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
