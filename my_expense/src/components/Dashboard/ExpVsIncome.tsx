import React, { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, PieController } from "chart.js";
import type { ChartOptions } from "chart.js";
import { fetchExpenseIncomeChart } from "../../services/dashboard";

// 🔹 Register required components
Chart.register(PieController, ArcElement, Tooltip, Legend);

const FinancePieChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const createPieChart = (chartData: any) => {
    if (!canvasRef.current) return;

    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "pie",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      } as ChartOptions<"pie">,
    });
  };

  useEffect(() => {
    fetchExpenseIncomeChart().then((resp) => {
      if (resp?.labels && resp?.datasets) {
        createPieChart(resp);
      } else {
        console.error("Invalid chart data format");
      }
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="mt-4 mb-3 text-center">
      <h4>Expense Vs Income</h4>
      <div className="d-flex justify-content-center">
        <div style={{ width: "18rem", height: "18rem", alignSelf: "center" }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default FinancePieChart;
