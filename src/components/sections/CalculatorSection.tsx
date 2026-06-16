"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Slider } from "@/components/ui/Slider";
import {
  DollarSign,
  Leaf,
  TrendingDown,
  Calendar,
  Fuel,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CalcResult {
  monthlyGas: number;
  monthlyElec: number;
  monthlySaving: number;
  annualSaving: number;
  fiveYearSaving: number;
  co2Avoided: number;
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNum(value: number, decimals = 0): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function CalculatorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Inputs
  const [kmPerDay, setKmPerDay] = useState(30);
  const [daysPerMonth, setDaysPerMonth] = useState(22);
  const [fuelConsumption, setFuelConsumption] = useState(35); // km/L
  const [fuelPrice, setFuelPrice] = useState(6.2); // R$/L

  // Derived calculations
  const [result, setResult] = useState<CalcResult>({
    monthlyGas: 0,
    monthlyElec: 0,
    monthlySaving: 0,
    annualSaving: 0,
    fiveYearSaving: 0,
    co2Avoided: 0,
  });

  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const kmPerMonth = kmPerDay * daysPerMonth;
    const litersPerMonth = kmPerMonth / fuelConsumption;
    const monthlyGas = litersPerMonth * fuelPrice;

    // Electric: ~3kWh per 100km, avg R$0.80/kWh
    const kWhPerMonth = (kmPerMonth / 100) * 3;
    const monthlyElec = kWhPerMonth * 0.8;

    const monthlySaving = monthlyGas - monthlyElec;
    const annualSaving = monthlySaving * 12;
    const fiveYearSaving = annualSaving * 5;

    // CO2: 2.3kg per liter of gasoline
    const co2Avoided = litersPerMonth * 2.3 * 12;

    setResult({
      monthlyGas,
      monthlyElec,
      monthlySaving,
      annualSaving,
      fiveYearSaving,
      co2Avoided,
    });
  }, [kmPerDay, daysPerMonth, fuelConsumption, fuelPrice]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%",
            onEnter: () => setTriggered(true),
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate result numbers
  const animateValue = (
    el: HTMLElement | null,
    from: number,
    to: number,
    prefix = "",
    suffix = "",
    isCurrency = false
  ) => {
    if (!el) return;
    const obj = { val: from };
    gsap.to(obj, {
      val: to,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        if (isCurrency) {
          el.textContent = formatBRL(obj.val);
        } else {
          el.textContent = `${prefix}${formatNum(obj.val, 1)}${suffix}`;
        }
      },
    });
  };

  const monthlySavingRef = useRef<HTMLSpanElement>(null);
  const annualSavingRef = useRef<HTMLSpanElement>(null);
  const fiveYearRef = useRef<HTMLSpanElement>(null);
  const co2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!triggered) return;
    animateValue(monthlySavingRef.current, 0, result.monthlySaving, "", "", true);
    animateValue(annualSavingRef.current, 0, result.annualSaving, "", "", true);
    animateValue(fiveYearRef.current, 0, result.fiveYearSaving, "", "", true);
    animateValue(co2Ref.current, 0, result.co2Avoided, "", " kg", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, triggered]);

  const savingsPercent = result.monthlyGas > 0
    ? Math.round(((result.monthlyGas - result.monthlyElec) / result.monthlyGas) * 100)
    : 0;

  return (
    <section
      ref={sectionRef}
      id="calculadora"
      className="relative py-[120px] sm:py-[160px] bg-obsidian border border-white/5 rounded-[2rem] sm:rounded-[3rem] overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(#FF6B00 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/4 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <p className="inline-flex items-center gap-3 text-electric text-xs font-semibold tracking-[0.4em] uppercase mb-6">
            <span className="w-8 h-px bg-electric" />
            Calculadora
            <span className="w-8 h-px bg-electric" />
          </p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Calcule sua{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF6B00, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              economia real
            </span>
          </h2>
          <p className="text-steel text-lg max-w-2xl mx-auto">
            Insira seus dados de uso atual e descubra exatamente quanto você economizaria
            trocando para uma scooter elétrica YESU.
          </p>
        </div>

        {/* Calculator Card */}
         <div
           ref={cardRef}
           className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-3xl overflow-hidden border border-white/8 ds-card"
           style={{ background: "linear-gradient(145deg, #111111, #0d0d0d)" }}
         >
          {/* LEFT — Inputs */}
           <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/8 ds-card ds-card-hover">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-electric/15 border border-electric/30 flex items-center justify-center">
                <Fuel size={18} className="text-electric" />
              </div>
              <div>
                <h3 className="text-white font-bold">Seus dados atuais</h3>
                <p className="text-steel text-xs">Configurações do veículo a combustão</p>
              </div>
            </div>

            <div className="space-y-10">
              {/* km/day */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-chrome text-sm font-medium">Km por dia</label>
                  <span className="text-electric font-bold text-lg">{kmPerDay} km</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  value={kmPerDay}
                  onChange={(e) => setKmPerDay(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FF6B00 ${((kmPerDay - 5) / 195) * 100}%, #1a1a1a ${((kmPerDay - 5) / 195) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-steel text-xs mt-1">
                  <span>5 km</span><span>200 km</span>
                </div>
              </div>

              {/* days/month */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-chrome text-sm font-medium">Dias por mês</label>
                  <span className="text-electric font-bold text-lg">{daysPerMonth} dias</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={31}
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FF6B00 ${((daysPerMonth - 1) / 30) * 100}%, #1a1a1a ${((daysPerMonth - 1) / 30) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-steel text-xs mt-1">
                  <span>1 dia</span><span>31 dias</span>
                </div>
              </div>

              {/* fuel consumption */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-chrome text-sm font-medium">Consumo atual (km/L)</label>
                  <span className="text-electric font-bold text-lg">{fuelConsumption} km/L</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={80}
                  value={fuelConsumption}
                  onChange={(e) => setFuelConsumption(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FF6B00 ${((fuelConsumption - 10) / 70) * 100}%, #1a1a1a ${((fuelConsumption - 10) / 70) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-steel text-xs mt-1">
                  <span>10 km/L</span><span>80 km/L</span>
                </div>
              </div>

              {/* fuel price */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-chrome text-sm font-medium">Preço da gasolina (R$/L)</label>
                  <span className="text-electric font-bold text-lg">R$ {fuelPrice.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={10}
                  step={0.1}
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FF6B00 ${((fuelPrice - 4) / 6) * 100}%, #1a1a1a ${((fuelPrice - 4) / 6) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-steel text-xs mt-1">
                  <span>R$ 4,00</span><span>R$ 10,00</span>
                </div>
              </div>
            </div>

            {/* Comparison bar */}
            <div className="mt-8 p-4 rounded-2xl bg-white/3 border border-white/5">
              <div className="flex items-center justify-between mb-3 text-xs text-steel uppercase tracking-wider">
                <span>Gasolina</span>
                <span>Elétrico</span>
              </div>
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden mb-2">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-electric to-emerald-400 transition-all duration-500"
                  style={{
                    width: `${result.monthlyGas > 0 ? (result.monthlyElec / result.monthlyGas) * 100 : 10}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-red-400 font-bold">{formatBRL(result.monthlyGas)}/mês</span>
                <span className="text-electric font-bold">{formatBRL(result.monthlyElec)}/mês</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Results */}
           <div className="p-8 lg:p-12 ds-card ds-card-hover">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <Zap size={18} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">Sua economia com YESU</h3>
                <p className="text-steel text-xs">Resultados em tempo real</p>
              </div>
            </div>

            {/* Savings % pill */}
            <div className="mb-8 text-center">
              <div
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full border ds-card"
                style={{ background: "#FF6B0015", borderColor: "#FF6B0030" }}
              >
                <TrendingDown size={16} className="text-electric" />
                <span className="text-electric font-black text-2xl">{savingsPercent}%</span>
                <span className="text-steel text-sm">de economia</span>
              </div>
            </div>

            {/* Result cards */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-electric/10 border border-electric/20 ds-card">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} className="text-electric" />
                  <span className="text-steel text-xs uppercase tracking-wider">Por mês</span>
                </div>
                <span
                  ref={monthlySavingRef}
                  className="text-2xl font-black text-electric"
                >
                  {formatBRL(result.monthlySaving)}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/8 ds-card">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={14} className="text-white" />
                  <span className="text-steel text-xs uppercase tracking-wider">Por ano</span>
                </div>
                <span
                  ref={annualSavingRef}
                  className="text-2xl font-black text-white"
                >
                  {formatBRL(result.annualSaving)}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/8 ds-card">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown size={14} className="text-white" />
                  <span className="text-steel text-xs uppercase tracking-wider">Em 5 anos</span>
                </div>
                <span
                  ref={fiveYearRef}
                  className="text-2xl font-black text-white"
                >
                  {formatBRL(result.fiveYearSaving)}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 ds-card">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf size={14} className="text-emerald-400" />
                  <span className="text-steel text-xs uppercase tracking-wider">CO₂ evitado/ano</span>
                </div>
                <span
                  ref={co2Ref}
                  className="text-2xl font-black text-emerald-400"
                >
                  {formatNum(result.co2Avoided, 1)} kg
                </span>
              </div>
            </div>

            {/* CTA */}
              <a
                href={`https://wa.me/5500000000000?text=${encodeURIComponent(
                  `Olá! Calculei que economizaria ${formatBRL(result.annualSaving)} por ano com uma scooter elétrica YESU. Gostaria de mais informações!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-bold text-white transition-all duration-300 cursor-none ds-cta-primary"
                style={{ background: "linear-gradient(135deg, #FF6B00, #FF8C00)", boxShadow: "0 0 30px rgba(255,107,0,0.3)" }}
              >
              <Zap size={18} />
              Quero economizar {formatBRL(result.annualSaving)}/ano
            </a>
            <p className="text-steel text-xs text-center mt-3">
              * Cálculo baseado em energia elétrica média R$ 0,80/kWh e consumo de 3kWh/100km
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
