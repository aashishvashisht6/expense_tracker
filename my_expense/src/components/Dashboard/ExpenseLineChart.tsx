import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import type { ChartOptions } from "chart.js";
import { fetchExpenseDateWise } from "../../services/dashboard";

const ExpenseLineChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const createLineChart = (chartData:any) => {
    if (!canvasRef.current) return;

    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      } as ChartOptions<"line">,
    });
  };

  useEffect(() => {
    fetchExpenseDateWise().then((resp) => {
      if (resp?.labels) {
        createLineChart(resp);
      }
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="mt-4 mb-3">
      <h4 className="text-center">Expense Trend</h4>
      <div style={{ width: "100%", height: "350px" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default ExpenseLineChart;