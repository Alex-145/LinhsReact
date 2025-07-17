// src/pages/Dashboard.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mes: "Enero", ventas: 240 },
  { mes: "Febrero", ventas: 320 },
  { mes: "Marzo", ventas: 500 },
  { mes: "Abril", ventas: 300 },
  { mes: "Mayo", ventas: 450 },
];

function Dashboard() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        Bienvenido al Dashboard
      </h2>

      <div className="bg-white shadow rounded-lg p-4 h-[300px]">
        <h3 className="text-lg font-semibold mb-2">Ventas mensuales</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventas" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
