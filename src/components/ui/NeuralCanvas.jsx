import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function NeuralCanvas({ className = '' }) {
 const canvasRef = useRef(null);
 const containerRef = useRef(null);
 const prefersReducedMotion = useReducedMotion();

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 let animationFrameId;
 let width = 0;
 let height = 0;
 let isVisible = true;

 // Track mouse position
 const mouse = {
 x: -1000,
 y: -1000,
 radius: 140,
 };

 const nodeCount = 34;
 const nodes = [];

 const handleResize = () => {
 const rect = containerRef.current?.getBoundingClientRect();
 if (!rect) return;

 const dpr = window.devicePixelRatio || 1;
 width = rect.width;
 height = rect.height;

 canvas.width = width * dpr;
 canvas.height = height * dpr;
 ctx.scale(dpr, dpr);

 if (nodes.length === 0) {
 for (let i = 0; i < nodeCount; i++) {
 const angle = Math.random() * Math.PI * 2;
 const distance = Math.pow(Math.random(), 0.7) * (Math.min(width, height) * 0.42);
 const cx = width * 0.5 + Math.cos(angle) * distance;
 const cy = height * 0.5 + Math.sin(angle) * distance;

 nodes.push({
 x: Math.max(20, Math.min(width - 20, cx)),
 y: Math.max(20, Math.min(height - 20, cy)),
 originX: cx,
 originY: cy,
 vx: (Math.random() - 0.5) * 0.45,
 vy: (Math.random() - 0.5) * 0.45,
 radius: Math.random() * 3 + 2.5,
 pulsePhase: Math.random() * Math.PI * 2,
 type: Math.random() > 0.7 ? 'core' : 'standard',
 });
 }
 }
 };

 handleResize();
 window.addEventListener('resize', handleResize);

 const handleMouseMove = (e) => {
 const rect = canvas.getBoundingClientRect();
 mouse.x = e.clientX - rect.left;
 mouse.y = e.clientY - rect.top;
 };

 const handleMouseLeave = () => {
 mouse.x = -1000;
 mouse.y = -1000;
 };

 const canvasEl = canvas;
 canvasEl.addEventListener('mousemove', handleMouseMove);
 canvasEl.addEventListener('mouseleave', handleMouseLeave);

 const observer = new IntersectionObserver(([entry]) => {
 isVisible = entry.isIntersecting;
 }, { threshold: 0.1 });

 observer.observe(canvasEl);

 const pulses = [];
 let lastPulseTime = 0;

 const animate = (timestamp) => {
 if (!isVisible) {
 animationFrameId = requestAnimationFrame(animate);
 return;
 }

 ctx.clearRect(0, 0, width, height);

 // Periodically spawn traveling pulse
 if (timestamp - lastPulseTime > 1200 && nodes.length > 2) {
 const fromIdx = Math.floor(Math.random() * nodes.length);
 let closestIdx = -1;
 let closestDist = Infinity;
 for (let j = 0; j < nodes.length; j++) {
 if (fromIdx !== j) {
 const dx = nodes[fromIdx].x - nodes[j].x;
 const dy = nodes[fromIdx].y - nodes[j].y;
 const dist = Math.hypot(dx, dy);
 if (dist < 130 && dist < closestDist) {
 closestDist = dist;
 closestIdx = j;
 }
 }
 }
 if (closestIdx !== -1) {
 pulses.push({
 from: nodes[fromIdx],
 to: nodes[closestIdx],
 progress: 0,
 speed: 0.02 + Math.random() * 0.015,
 });
 }
 lastPulseTime = timestamp;
 }

 // Draw connections
 const maxDistance = 125;
 for (let i = 0; i < nodes.length; i++) {
 const nodeA = nodes[i];

 for (let j = i + 1; j < nodes.length; j++) {
 const nodeB = nodes[j];
 const dx = nodeA.x - nodeB.x;
 const dy = nodeA.y - nodeB.y;
 const dist = Math.hypot(dx, dy);

 if (dist < maxDistance) {
 const alpha = (1 - dist / maxDistance) * 0.45;
 ctx.beginPath();
 ctx.moveTo(nodeA.x, nodeA.y);
 ctx.lineTo(nodeB.x, nodeB.y);
 
 const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
 gradient.addColorStop(0, `rgba(163, 230, 53, ${alpha})`);
 gradient.addColorStop(1, `rgba(16, 185, 129, ${alpha})`);
 ctx.strokeStyle = gradient;
 ctx.lineWidth = 1.1;
 ctx.stroke();
 }
 }

 // Connection to mouse cursor (real-time reaction)
 const mouseDx = nodeA.x - mouse.x;
 const mouseDy = nodeA.y - mouse.y;
 const mouseDist = Math.hypot(mouseDx, mouseDy);
 if (mouseDist < mouse.radius) {
 const alpha = (1 - mouseDist / mouse.radius) * 0.75;
 ctx.beginPath();
 ctx.moveTo(nodeA.x, nodeA.y);
 ctx.lineTo(mouse.x, mouse.y);
 ctx.strokeStyle = `rgba(190, 242, 100, ${alpha})`;
 ctx.lineWidth = 1.4;
 ctx.stroke();

 // Smooth interactive reaction to mouse movement
 const force = (mouse.radius - mouseDist) / mouse.radius;
 nodeA.x += (mouseDx / mouseDist) * force * 1.2;
 nodeA.y += (mouseDy / mouseDist) * force * 1.2;
 }

 // Float updates
 if (!prefersReducedMotion) {
 nodeA.x += nodeA.vx;
 nodeA.y += nodeA.vy;

 if (nodeA.x < 15 || nodeA.x > width - 15) nodeA.vx *= -1;
 if (nodeA.y < 15 || nodeA.y > height - 15) nodeA.vy *= -1;

 nodeA.x += (nodeA.originX - nodeA.x) * 0.003;
 nodeA.y += (nodeA.originY - nodeA.y) * 0.003;
 }

 // Node Glow
 const pulse = Math.sin(timestamp * 0.003 + nodeA.pulsePhase) * 1.2;
 const r = Math.max(2, nodeA.radius + pulse);

 const glowGrad = ctx.createRadialGradient(nodeA.x, nodeA.y, 0, nodeA.x, nodeA.y, r * 3.5);
 glowGrad.addColorStop(0, nodeA.type === 'core' ? 'rgba(163, 230, 53, 0.45)' : 'rgba(16, 185, 129, 0.3)');
 glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
 ctx.fillStyle = glowGrad;
 ctx.beginPath();
 ctx.arc(nodeA.x, nodeA.y, r * 3.5, 0, Math.PI * 2);
 ctx.fill();

 ctx.beginPath();
 ctx.arc(nodeA.x, nodeA.y, r, 0, Math.PI * 2);
 ctx.fillStyle = nodeA.type === 'core' ? '#A3E635' : '#10B981';
 ctx.shadowColor = 'rgba(163, 230, 53, 0.6)';
 ctx.shadowBlur = 8;
 ctx.fill();
 ctx.shadowBlur = 0;

 ctx.beginPath();
 ctx.arc(nodeA.x - r * 0.3, nodeA.y - r * 0.3, r * 0.35, 0, Math.PI * 2);
 ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
 ctx.fill();
 }

 // Traveling pulses
 for (let p = pulses.length - 1; p >= 0; p--) {
 const pulse = pulses[p];
 pulse.progress += pulse.speed;

 if (pulse.progress >= 1) {
 pulses.splice(p, 1);
 continue;
 }

 const px = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
 const py = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;

 ctx.beginPath();
 ctx.arc(px, py, 2.5, 0, Math.PI * 2);
 ctx.fillStyle = '#BEF264';
 ctx.shadowColor = '#A3E635';
 ctx.shadowBlur = 6;
 ctx.fill();
 ctx.shadowBlur = 0;
 }

 if (!prefersReducedMotion) {
 animationFrameId = requestAnimationFrame(animate);
 }
 };

 animationFrameId = requestAnimationFrame(animate);

 return () => {
 cancelAnimationFrame(animationFrameId);
 window.removeEventListener('resize', handleResize);
 canvasEl.removeEventListener('mousemove', handleMouseMove);
 canvasEl.removeEventListener('mouseleave', handleMouseLeave);
 observer.disconnect();
 };
 }, [prefersReducedMotion]);

 return (
 <div 
 ref={containerRef} 
 className={`relative w-full h-[320px] sm:h-[370px] lg:h-[400px] rounded-[2.5rem] overflow-hidden bg-[#06150D]/80 backdrop-blur-md border border-white/15 shadow-2xl ${className}`}
 >
 <canvas
 ref={canvasRef}
 className="w-full h-full cursor-crosshair"
 aria-label="Interactive AI Neural Network Visualization"
 />

 {/* Grounded, simple label as requested */}
 <div className="absolute bottom-4 left-4 right-4 sm:right-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-white pointer-events-none select-none shadow-md">
 <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
 <span className="font-bold tracking-wide" style={{ wordSpacing: '0.12em' }}>
 AI Systems Network
 </span>
 </div>
 </div>
 );
}
