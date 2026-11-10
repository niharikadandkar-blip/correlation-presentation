import React from 'react';
import { motion } from 'framer-motion';

export const IceCreamAndThermometer: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Soft background glow */}
    <circle cx="100" cy="100" r="90" fill="#FFE0D2" fillOpacity="0.4" />
    
    {/* Ice Cream Cone */}
    <g transform="translate(105, 45)">
      {/* Waffle Cone */}
      <polygon points="40,80 15,145 65,145" fill="#FDEFD9" stroke="#E995AF" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Waffle pattern */}
      <line x1="28" y1="100" x2="52" y2="100" stroke="#E2C19E" strokeWidth="1.5" />
      <line x1="33" y1="120" x2="47" y2="120" stroke="#E2C19E" strokeWidth="1.5" />
      
      {/* Ice cream scoops */}
      {/* Bottom scoop (Mint) */}
      <circle cx="40" cy="80" r="24" fill="#DDEFE1" stroke="#97CAA1" strokeWidth="2.5" />
      {/* Middle scoop (Lavender) */}
      <circle cx="40" cy="55" r="22" fill="#E9E1FA" stroke="#B89DF2" strokeWidth="2.5" />
      {/* Top scoop (Strawberry Pink) */}
      <circle cx="40" cy="32" r="18" fill="#F8DCE5" stroke="#FF7E67" strokeWidth="2.5" />
      
      {/* Cherry on top */}
      <circle cx="40" cy="14" r="7" fill="#FF6B52" />
      <path d="M40 14 C44 4, 52 6, 54 2" stroke="#27334A" strokeWidth="2" strokeLinecap="round" />
      
      {/* Sprinkle dots */}
      <circle cx="34" cy="52" r="2" fill="#7C5CFC" />
      <circle cx="46" cy="58" r="2" fill="#FF7E67" />
      <circle cx="38" cy="82" r="2.5" fill="#38BDF8" />
    </g>

    {/* Thermometer */}
    <g transform="translate(25, 40)">
      {/* Glass tube */}
      <rect x="25" y="10" width="18" height="95" rx="9" fill="#FFF8EF" stroke="#27334A" strokeWidth="3" />
      {/* Glass bulb */}
      <circle cx="34" cy="115" r="19" fill="#FFF8EF" stroke="#27334A" strokeWidth="3" />
      {/* Mercury fluid */}
      <rect x="29" y="32" width="10" height="75" rx="5" fill="#FF7E67" />
      <circle cx="34" cy="115" r="14" fill="#FF7E67" />
      
      {/* Temperature tick marks */}
      <line x1="16" y1="35" x2="23" y2="35" stroke="#27334A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="52" x2="23" y2="52" stroke="#27334A" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="70" x2="23" y2="70" stroke="#27334A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="88" x2="23" y2="88" stroke="#27334A" strokeWidth="2" strokeLinecap="round" />
      
      {/* Heat wavy lines */}
      <motion.path
        d="M50 30 Q54 24 50 18 Q46 12 50 6"
        stroke="#FF7E67"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        animate={{ y: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
    </g>

    {/* Upward positive arrow indicator */}
    <g transform="translate(85, 148)">
      <rect x="0" y="0" width="30" height="30" rx="15" fill="#DDEFE1" stroke="#97CAA1" strokeWidth="1.5" />
      <path d="M15 22 L15 8 M10 13 L15 8 L20 13" stroke="#27334A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

export const CarSpeedAndTime: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#DCEBFA" fillOpacity="0.45" />

    {/* Speedometer (Left/Top) */}
    <g transform="translate(15, 30)">
      <path d="M 20 80 A 45 45 0 0 1 110 80" stroke="#27334A" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Color bands on arc */}
      <path d="M 24 75 A 41 41 0 0 1 50 45" stroke="#DDEFE1" strokeWidth="6" fill="none" />
      <path d="M 50 45 A 41 41 0 0 1 80 45" stroke="#FFE0D2" strokeWidth="6" fill="none" />
      <path d="M 80 45 A 41 41 0 0 1 106 75" stroke="#F8DCE5" strokeWidth="6" fill="none" />

      {/* Speedometer Needle pointing HIGH */}
      <circle cx="65" cy="78" r="7" fill="#27334A" />
      <motion.line
        x1="65" y1="78" x2="98" y2="52"
        stroke="#FF7E67"
        strokeWidth="3.5"
        strokeLinecap="round"
        animate={{ rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      />
      {/* Speed icon label */}
      <text x="65" y="96" textAnchor="middle" fill="#27334A" fontSize="9" fontWeight="700" fontFamily="sans-serif">HIGH SPEED</text>
    </g>

    {/* Clock showing LESS TIME (Right/Bottom) */}
    <g transform="translate(100, 75)">
      <circle cx="50" cy="50" r="40" fill="#FFF8EF" stroke="#27334A" strokeWidth="3.5" />
      {/* Clock ticks */}
      <circle cx="50" cy="18" r="2.5" fill="#27334A" />
      <circle cx="82" cy="50" r="2.5" fill="#27334A" />
      <circle cx="50" cy="82" r="2.5" fill="#27334A" />
      <circle cx="18" cy="50" r="2.5" fill="#27334A" />
      
      {/* Center peg */}
      <circle cx="50" cy="50" r="5" fill="#7C5CFC" />
      {/* Hands indicating short duration */}
      <line x1="50" y1="50" x2="50" y2="28" stroke="#27334A" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="50" x2="68" y2="50" stroke="#7C5CFC" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Downward indicator */}
      <rect x="30" y="98" width="40" height="20" rx="10" fill="#FFE0D2" stroke="#FF7E67" strokeWidth="1.5" />
      <text x="50" y="112" textAnchor="middle" fill="#27334A" fontSize="9" fontWeight="700" fontFamily="sans-serif">↓ TIME</text>
    </g>

    {/* Opposite direction visual arrows */}
    <g transform="translate(30, 138)">
      <rect x="0" y="0" width="55" height="26" rx="13" fill="#DDEFE1" stroke="#97CAA1" strokeWidth="1.5" />
      <text x="27" y="17" textAnchor="middle" fill="#27334A" fontSize="10" fontWeight="700">↑ SPEED</text>
    </g>
  </svg>
);

export const RandomObjectsShoeRain: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#E9E1FA" fillOpacity="0.4" />

    {/* Cloud with Raindrops (Weather) */}
    <g transform="translate(25, 25)">
      {/* Fluffy cloud */}
      <path
        d="M25 45 a18 18 0 0 1 32 -8 a16 16 0 0 1 24 5 a14 14 0 0 1 12 18 a10 10 0 0 1 -7 11 l-58 0 a14 14 0 0 1 -3 -26 z"
        fill="#DCEBFA"
        stroke="#27334A"
        strokeWidth="2.5"
      />
      {/* Rain droplets */}
      <line x1="38" y1="78" x2="33" y2="90" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="55" y1="80" x2="50" y2="94" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="78" x2="67" y2="90" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Running Shoe (Shoe Size) */}
    <g transform="translate(90, 85)">
      {/* Sole */}
      <path
        d="M10 50 C25 52, 60 52, 80 48 C85 47, 88 56, 78 57 C55 59, 15 58, 8 55 C6 52, 7 50, 10 50 Z"
        fill="#FFF8EF"
        stroke="#27334A"
        strokeWidth="2.5"
      />
      {/* Shoe Upper */}
      <path
        d="M15 50 C20 40, 25 25, 42 26 C48 26, 52 35, 65 38 C75 40, 80 48, 80 48 L10 50 Z"
        fill="#FF7E67"
        stroke="#27334A"
        strokeWidth="2.5"
      />
      {/* Laces & stripes */}
      <path d="M42 32 L49 42" stroke="#FFF8EF" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 36 L43 45" stroke="#FFF8EF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="40" r="4" fill="#FFE0D2" />
    </g>

    {/* Question mark / No connection badge */}
    <g transform="translate(85, 145)">
      <rect x="0" y="0" width="80" height="26" rx="13" fill="#FFF8EF" stroke="#B89DF2" strokeWidth="1.5" />
      <text x="40" y="17" textAnchor="middle" fill="#27334A" fontSize="10" fontWeight="700">r ≈ 0 (No Link)</text>
    </g>
  </svg>
);

export const AgricultureRainCrop: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#DDEFE1" fillOpacity="0.5" />

    {/* Rain Cloud */}
    <g transform="translate(30, 25)">
      <path
        d="M30 40 a16 16 0 0 1 28 -7 a14 14 0 0 1 20 4 a12 12 0 0 1 10 16 a9 9 0 0 1 -6 10 l-50 0 a12 12 0 0 1 -2 -23 z"
        fill="#DCEBFA"
        stroke="#27334A"
        strokeWidth="2.5"
      />
      {/* Gentle raindrops */}
      <line x1="42" y1="70" x2="38" y2="84" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="58" y1="72" x2="54" y2="86" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="74" y1="70" x2="70" y2="84" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Rolling Hill Ground */}
    <path d="M15 160 C50 145, 140 145, 185 160 L185 190 L15 190 Z" fill="#BDDEC4" />
    <path d="M15 160 C50 145, 140 145, 185 160" stroke="#27334A" strokeWidth="2.5" />

    {/* Sprouting Corn/Wheat Plant */}
    <g transform="translate(90, 80)">
      {/* Main stalk */}
      <path d="M20 75 Q20 30 20 15" stroke="#27334A" strokeWidth="3" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M20 55 Q5 45 2 30 Q12 40 20 48" fill="#97CAA1" stroke="#27334A" strokeWidth="2" />
      <path d="M20 45 Q35 35 38 20 Q28 30 20 38" fill="#97CAA1" stroke="#27334A" strokeWidth="2" />
      <path d="M20 30 Q8 20 6 5 Q16 16 20 22" fill="#DDEFE1" stroke="#27334A" strokeWidth="2" />
      <path d="M20 20 Q32 10 34 0 Q24 8 20 14" fill="#DDEFE1" stroke="#27334A" strokeWidth="2" />
      {/* Golden wheat ear */}
      <ellipse cx="20" cy="8" rx="5" ry="9" fill="#FDEFD9" stroke="#E2C19E" strokeWidth="2" />
    </g>

    {/* Second smaller sprout */}
    <g transform="translate(50, 115)">
      <path d="M15 45 Q15 25 15 15" stroke="#27334A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M15 32 Q5 25 3 15 Q10 22 15 26" fill="#97CAA1" stroke="#27334A" strokeWidth="1.5" />
      <path d="M15 24 Q23 18 25 10 Q19 16 15 20" fill="#97CAA1" stroke="#27334A" strokeWidth="1.5" />
    </g>
  </svg>
);

export const AdvertisingAndSales: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#FFE0D2" fillOpacity="0.45" />

    {/* Megaphone (Advertising) */}
    <g transform="translate(20, 70)">
      {/* Cone */}
      <path d="M35 30 L70 10 L70 65 L35 45 Z" fill="#FF7E67" stroke="#27334A" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Back cup */}
      <ellipse cx="35" cy="37" rx="7" ry="10" fill="#FFE0D2" stroke="#27334A" strokeWidth="2.5" />
      {/* Handle */}
      <path d="M42 45 L42 62 C42 66, 48 66, 48 62 L48 45" fill="#FFF8EF" stroke="#27334A" strokeWidth="2.5" />
      {/* Sound waves */}
      <path d="M78 22 C84 28, 84 46, 78 52" stroke="#7C5CFC" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M85 15 C95 24, 95 54, 85 62" stroke="#7C5CFC" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
    </g>

    {/* Rising Bar Chart (Sales) */}
    <g transform="translate(105, 50)">
      {/* Chart baseline */}
      <line x1="10" y1="95" x2="80" y2="95" stroke="#27334A" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Bar 1 */}
      <rect x="18" y="65" width="14" height="30" rx="3" fill="#DCEBFA" stroke="#27334A" strokeWidth="2" />
      {/* Bar 2 */}
      <rect x="38" y="42" width="14" height="53" rx="3" fill="#E9E1FA" stroke="#27334A" strokeWidth="2" />
      {/* Bar 3 */}
      <rect x="58" y="18" width="14" height="77" rx="3" fill="#DDEFE1" stroke="#27334A" strokeWidth="2" />

      {/* Upward trend arrow */}
      <path d="M18 55 L38 32 L65 8" stroke="#FF7E67" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="65,3 68,14 58,10" fill="#FF7E67" />
    </g>

    {/* Sparkle star */}
    <g transform="translate(155, 30)">
      <polygon points="10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7" fill="#F59E0B" />
    </g>
  </svg>
);

export const TemperatureAndEnergy: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#DCEBFA" fillOpacity="0.45" />

    {/* Sun and Air Condition / Climate */}
    <g transform="translate(25, 35)">
      {/* Glowing sun */}
      <circle cx="40" cy="40" r="22" fill="#FFE0D2" stroke="#FF7E67" strokeWidth="2.5" />
      <line x1="40" y1="10" x2="40" y2="3" stroke="#FF7E67" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="70" x2="40" y2="77" stroke="#FF7E67" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="40" x2="3" y2="40" stroke="#FF7E67" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="40" x2="77" y2="40" stroke="#FF7E67" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="18" x2="13" y2="13" stroke="#FF7E67" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="62" x2="67" y2="67" stroke="#FF7E67" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="62" x2="13" y2="67" stroke="#FF7E67" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="18" x2="67" y2="13" stroke="#FF7E67" strokeWidth="2" strokeLinecap="round" />
      <text x="40" y="44" textAnchor="middle" fill="#27334A" fontSize="9" fontWeight="700">HOT</text>
    </g>

    {/* Electricity Bolt / Power grid */}
    <g transform="translate(100, 50)">
      {/* Power meter box */}
      <rect x="15" y="15" width="65" height="75" rx="10" fill="#FFF8EF" stroke="#27334A" strokeWidth="2.5" />
      <circle cx="47" cy="42" r="18" fill="#E9E1FA" stroke="#27334A" strokeWidth="2" />
      
      {/* High-voltage bolt */}
      <polygon points="48,28 38,44 46,44 42,56 56,38 48,38" fill="#F59E0B" stroke="#27334A" strokeWidth="1.5" />

      {/* Electricity readout */}
      <rect x="25" y="66" width="45" height="15" rx="4" fill="#DDEFE1" stroke="#97CAA1" strokeWidth="1.5" />
      <text x="47" y="78" textAnchor="middle" fill="#27334A" fontSize="8" fontWeight="800">HIGH kWh</text>
    </g>

    {/* Connecting electrical wire */}
    <path d="M72 82 Q85 105 115 105" stroke="#7C5CFC" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
  </svg>
);

export const HealthcareIndicators: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#F8DCE5" fillOpacity="0.45" />

    {/* Heart shape */}
    <path
      d="M100 65 C85 30, 45 40, 50 75 C55 105, 100 135, 100 135 C100 135, 145 105, 150 75 C155 40, 115 30, 100 65 Z"
      fill="#FFE0D2"
      stroke="#FF7E67"
      strokeWidth="2.5"
    />

    {/* ECG Pulse Line */}
    <path
      d="M35 100 L75 100 L83 82 L92 118 L102 70 L110 110 L118 95 L124 100 L165 100"
      stroke="#27334A"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Stethoscope loop around */}
    <path
      d="M55 60 C40 75, 40 145, 80 155 C120 165, 145 140, 145 115"
      stroke="#7C5CFC"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="145" cy="115" r="7" fill="#FFF8EF" stroke="#7C5CFC" strokeWidth="2.5" />
    <circle cx="145" cy="115" r="3" fill="#27334A" />

    {/* Vital badge */}
    <g transform="translate(60, 150)">
      <rect x="0" y="0" width="80" height="24" rx="12" fill="#FFF8EF" stroke="#D5C4F7" strokeWidth="1.5" />
      <text x="40" y="16" textAnchor="middle" fill="#27334A" fontSize="9" fontWeight="700">Health Indicator</text>
    </g>
  </svg>
);

export const TransportationFuel: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#DDEFE1" fillOpacity="0.45" />

    {/* Road Highway with perspective */}
    <polygon points="40,150 75,90 125,90 160,150" fill="#DCEBFA" stroke="#27334A" strokeWidth="2.5" />
    {/* Highway dashed center line */}
    <line x1="100" y1="95" x2="100" y2="145" stroke="#FFF8EF" strokeWidth="3" strokeDasharray="8 6" />

    {/* Fuel Pump dispenser (Right) */}
    <g transform="translate(115, 35)">
      {/* Dispenser Body */}
      <rect x="10" y="10" width="38" height="65" rx="6" fill="#FFF8EF" stroke="#27334A" strokeWidth="2.5" />
      {/* Pump screen */}
      <rect x="16" y="18" width="26" height="18" rx="3" fill="#FFE0D2" stroke="#27334A" strokeWidth="1.5" />
      <text x="29" y="30" textAnchor="middle" fill="#27334A" fontSize="7" fontWeight="700">FUEL</text>
      {/* Pump nozzle hose */}
      <path d="M48 30 C58 35, 60 55, 52 65 L48 62" stroke="#FF7E67" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="46" y="60" width="6" height="12" rx="2" fill="#27334A" />
    </g>

    {/* Distance / Fuel relationship tag */}
    <g transform="translate(35, 38)">
      <rect x="0" y="0" width="65" height="26" rx="13" fill="#FFF8EF" stroke="#97CAA1" strokeWidth="1.5" />
      <text x="32" y="17" textAnchor="middle" fill="#27334A" fontSize="9" fontWeight="700">Distance ↑ Fuel ↑</text>
    </g>
  </svg>
);

export const RealEstateProperty: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="#E9E1FA" fillOpacity="0.45" />

    {/* Modern House */}
    <g transform="translate(35, 50)">
      {/* Roof */}
      <polygon points="65,15 15,50 115,50" fill="#FF7E67" stroke="#27334A" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Chimney */}
      <rect x="85" y="20" width="12" height="20" fill="#FFE0D2" stroke="#27334A" strokeWidth="2" />
      
      {/* House walls */}
      <rect x="25" y="50" width="80" height="60" rx="4" fill="#FFF8EF" stroke="#27334A" strokeWidth="2.5" />
      
      {/* Door */}
      <rect x="55" y="75" width="20" height="35" rx="3" fill="#DDEFE1" stroke="#27334A" strokeWidth="2" />
      <circle cx="70" cy="92" r="2" fill="#27334A" />

      {/* Windows */}
      <rect x="33" y="60" width="16" height="16" rx="2" fill="#DCEBFA" stroke="#27334A" strokeWidth="1.5" />
      <line x1="41" y1="60" x2="41" y2="76" stroke="#27334A" strokeWidth="1" />
      <line x1="33" y1="68" x2="49" y2="68" stroke="#27334A" strokeWidth="1" />

      <rect x="81" y="60" width="16" height="16" rx="2" fill="#DCEBFA" stroke="#27334A" strokeWidth="1.5" />
      <line x1="89" y1="60" x2="89" y2="76" stroke="#27334A" strokeWidth="1" />
      <line x1="81" y1="68" x2="97" y2="68" stroke="#27334A" strokeWidth="1" />
    </g>

    {/* Upward Price Tag */}
    <g transform="translate(115, 30)">
      <polygon points="10,0 45,0 55,20 45,40 10,40 0,20" fill="#DDEFE1" stroke="#27334A" strokeWidth="2" />
      <circle cx="12" cy="20" r="3" fill="#27334A" />
      <text x="32" y="24" textAnchor="middle" fill="#27334A" fontSize="10" fontWeight="800">$$$ ↑</text>
    </g>

    {/* Floor Area badge */}
    <g transform="translate(45, 145)">
      <rect x="0" y="0" width="110" height="24" rx="12" fill="#FFF8EF" stroke="#B89DF2" strokeWidth="1.5" />
      <text x="55" y="16" textAnchor="middle" fill="#27334A" fontSize="9" fontWeight="700">Area (sq ft) ↑ Price ↑</text>
    </g>
  </svg>
);

