import React from "react";

function LogoIcon({ width = 88, height = 88 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 88 88"
      fill="none"
    >
      <g filter="url(#filter0_d_90_170)">
        <g clipPath="url(#clip0_90_170)">
          <rect x="12" y="12" width="48" height="48" rx="24" fill="#E4F5EE"/>
          <rect x="-13.0526" y="-14.5263" width="54.9474" height="65.4737" rx="27.4737" fill="url(#paint0_radial_90_170)"/>
          <rect x="20.6316" y="16" width="64.4211" height="71.1579" rx="32.2105" fill="url(#paint1_radial_90_170)"/>
          <rect x="20.6316" y="16" width="64.4211" height="71.1579" rx="32.2105" fill="url(#paint2_radial_90_170)"/>
          <rect x="-47.3684" y="4.8421" width="126.737" height="102.105" rx="51.0526" fill="url(#paint3_radial_90_170)"/>
          <rect x="5.47363" y="-14.5263" width="90.5263" height="74.5263" rx="37.2632" fill="url(#paint4_radial_90_170)"/>
        </g>
      </g>

      <defs>
        <filter id="filter0_d_90_170" x="-8" y="-8" width="96" height="96" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="8" dy="8"/>
          <feGaussianBlur stdDeviation="10"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_90_170"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_90_170" result="shape"/>
        </filter>

        <clipPath id="clip0_90_170">
          <rect x="12" y="12" width="48" height="48" rx="24" fill="white"/>
        </clipPath>

        <radialGradient id="paint0_radial_90_170" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.4211 18.2105) rotate(90) scale(32.7368 27.4737)">
          <stop stopColor="#CC8829" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#999999" stopOpacity="0"/>
        </radialGradient>

        <radialGradient id="paint1_radial_90_170" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(52.8421 51.5789) rotate(90) scale(35.5789 32.2105)">
          <stop stopColor="#CC8829" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#999999" stopOpacity="0"/>
        </radialGradient>

        <radialGradient id="paint2_radial_90_170" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(52.8421 51.5789) rotate(90) scale(35.5789 32.2105)">
          <stop stopColor="#CC8829" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#999999" stopOpacity="0"/>
        </radialGradient>

        <radialGradient id="paint3_radial_90_170" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 55.8947) rotate(90) scale(51.0526 63.3684)">
          <stop stopColor="#CC4429" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#999999" stopOpacity="0"/>
        </radialGradient>

        <radialGradient id="paint4_radial_90_170" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50.7368 22.7368) rotate(90) scale(37.2632 45.2632)">
          <stop stopColor="#7ACC29" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#999999" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

export default LogoIcon;