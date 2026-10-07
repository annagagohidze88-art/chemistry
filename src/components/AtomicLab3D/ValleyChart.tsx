import React, { useRef, useEffect, useCallback } from 'react';
import { getIdealNeutrons } from '../../utils/nuclearPhysics';

interface ValleyChartProps {
  protons: number;
  neutrons: number;
  onSelectNuclide?: (z: number, n: number) => void;
  width?: number;
  height?: number;
}

const MAX_Z = 120;
const MAX_N = 180;
const PADDING = { top: 18, right: 18, bottom: 28, left: 34 };

export const ValleyChart: React.FC<ValleyChartProps> = ({
  protons,
  neutrons,
  onSelectNuclide,
  width = 320,
  height = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const toCanvasX = useCallback(
    (z: number, w: number) => {
      const plotW = w - PADDING.left - PADDING.right;
      return PADDING.left + (z / MAX_Z) * plotW;
    },
    []
  );

  const toCanvasY = useCallback(
    (n: number, h: number) => {
      const plotH = h - PADDING.top - PADDING.bottom;
      return h - PADDING.bottom - (n / MAX_N) * plotH;
    },
    []
  );

  const fromCanvasCoords = useCallback(
    (cx: number, cy: number, w: number, h: number) => {
      const plotW = w - PADDING.left - PADDING.right;
      const plotH = h - PADDING.top - PADDING.bottom;
      const z = Math.max(0, Math.min(MAX_Z, Math.round(((cx - PADDING.left) / plotW) * MAX_Z)));
      const n = Math.max(0, Math.min(MAX_N, Math.round(((h - PADDING.bottom - cy) / plotH) * MAX_N)));
      return { z, n };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.clientWidth || width;
    const displayH = canvas.clientHeight || height;
    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;
    ctx.scale(dpr, dpr);

    const w = displayW;
    const h = displayH;

    // Background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.font = '9px ui-monospace, SFMono-Regular, monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    // N horizontal grid lines (every 40)
    for (let n = 0; n <= MAX_N; n += 40) {
      const y = toCanvasY(n, h);
      ctx.beginPath();
      ctx.moveTo(PADDING.left, y);
      ctx.lineTo(w - PADDING.right, y);
      ctx.stroke();
      ctx.fillText(n.toString(), PADDING.left - 5, y);
    }

    // Z vertical grid lines (every 30)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let z = 0; z <= MAX_Z; z += 30) {
      const x = toCanvasX(z, w);
      ctx.beginPath();
      ctx.moveTo(x, PADDING.top);
      ctx.lineTo(x, h - PADDING.bottom);
      ctx.stroke();
      ctx.fillText(z.toString(), x, h - PADDING.bottom + 5);
    }

    // N = Z reference line (dashed line)
    ctx.save();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0, w), toCanvasY(0, h));
    ctx.lineTo(toCanvasX(120, w), toCanvasY(120, h));
    ctx.stroke();
    ctx.restore();

    // N = Z label
    ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
    ctx.font = '8px ui-monospace, SFMono-Regular, monospace';
    ctx.textAlign = 'left';
    ctx.fillText('N = Z', toCanvasX(95, w) + 4, toCanvasY(95, h));

    // Valley of Stability Band (green/cyan glow)
    // Draw polygon for the band of stable nuclides
    ctx.beginPath();
    for (let z = 1; z <= MAX_Z; z += 2) {
      const ideal = getIdealNeutrons(z);
      const spread = z <= 20 ? 2 : Math.min(10, 2 + z * 0.08);
      const topN = ideal + spread;
      const x = toCanvasX(z, w);
      const y = toCanvasY(topN, h);
      if (z === 1) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    for (let z = MAX_Z; z >= 1; z -= 2) {
      const ideal = getIdealNeutrons(z);
      const spread = z <= 20 ? 2 : Math.min(10, 2 + z * 0.08);
      const bottomN = Math.max(0, ideal - spread);
      const x = toCanvasX(z, w);
      const y = toCanvasY(bottomN, h);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
    ctx.fill();

    // Valley center line
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    for (let z = 1; z <= MAX_Z; z += 2) {
      const ideal = getIdealNeutrons(z);
      const x = toCanvasX(z, w);
      const y = toCanvasY(ideal, h);
      if (z === 1) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('ნეიტრონები (N)', PADDING.left + 72, PADDING.top - 5);
    ctx.textAlign = 'right';
    ctx.fillText('პროტონები (Z)', w - PADDING.right, h - 8);

    // Plot current atom position (protons, neutrons)
    if (protons > 0 || neutrons > 0) {
      const curX = toCanvasX(Math.min(MAX_Z, protons), w);
      const curY = toCanvasY(Math.min(MAX_N, neutrons), h);

      // Ideal point for this Z
      const idealN = getIdealNeutrons(protons);
      const idealY = toCanvasY(idealN, h);

      // Dash line to ideal valley point
      if (Math.abs(neutrons - idealN) > 2) {
        ctx.save();
        ctx.strokeStyle = '#f59e0b';
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(curX, curY);
        ctx.lineTo(curX, idealY);
        ctx.stroke();
        ctx.restore();
      }

      // Outer glow pulse
      ctx.beginPath();
      ctx.arc(curX, curY, 7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.fill();

      // Inner dot
      ctx.beginPath();
      ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Coordinate tag
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 9px ui-monospace, SFMono-Regular, monospace';
      ctx.textAlign = curX > w - 60 ? 'right' : 'left';
      ctx.fillText(
        `Z:${protons}, N:${neutrons}`,
        curX > w - 60 ? curX - 8 : curX + 8,
        curY - 6
      );
    }
  }, [protons, neutrons, width, height, toCanvasX, toCanvasY]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onSelectNuclide || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const { z, n } = fromCanvasCoords(cx, cy, rect.width, rect.height);
    if (z > 0 || n > 0) {
      onSelectNuclide(z, n);
    }
  };

  return (
    <div className="flex flex-col items-center select-none w-full">
      <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 shadow-inner bg-slate-950">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-44 sm:h-48 cursor-crosshair block"
          title="დააწკაპუნეთ გრაფიკზე პროტონებისა (Z) და ნეიტრონების (N) ასარჩევად"
        />
        <div className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-850 text-slate-400">
          სტაბილურობის ველი
        </div>
      </div>
      <div className="flex items-center justify-between w-full text-[10px] text-slate-400 mt-1.5 px-1 font-mono">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span>სტაბილური ზოლი</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
          <span>თქვენი ატომი ({protons}, {neutrons})</span>
        </span>
        <span className="text-slate-500 hidden sm:inline">დააწკაპუნეთ არჩევისთვის</span>
      </div>
    </div>
  );
};
