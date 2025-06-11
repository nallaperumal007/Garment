import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function OrderList() {
  const { state } = useContext(AppContext);

  return (
    <div className="mt-4">
      <h5>Available Orders</h5>
      <div className="d-flex flex-wrap gap-2">
        {state.orders.map((order) => (
          <div
            key={order.id}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("orderId", order.id.toString())
            }
            className="p-2 border bg-light rounded shadow-sm"
            style={{ cursor: "grab", minWidth: "180px" }}
          >
            <strong>{order.orderNo}</strong>
            <div style={{ fontSize: "0.8rem" }}>
              {order.styleName} | Qty: {order.quantity}
              <br />
              Shift: {order.shift} | Unit: {order.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
