import React, { useId } from 'react';

interface ViceHorizonSilhouetteProps {
  className?: string;
}

/**
 * Subtle Ocean Drive Art Deco skyline & palm horizon anchored along the Hero backdrop.
 * Low-opacity dusk silhouettes keep foreground typography crisp for recruiters and HR readers.
 */
export const ViceHorizonSilhouette: React.FC<ViceHorizonSilhouetteProps> = ({
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const sunGradId = `${uid}-sun`;
  const skylineGradId = `${uid}-skyline`;
  const fadeGradId = `${uid}-fade`;
  const fadeMaskId = `${uid}-mask`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden select-none ${className}`}
    >
      <svg
        viewBox="0 0 1200 220"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full block"
      >
        <defs>
          <linearGradient id={sunGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffb35c" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#ff3b9a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8b3dff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={skylineGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff3b9a" stopOpacity="0.14" />
            <stop offset="55%" stopColor="#8b3dff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id={fadeGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={fadeMaskId}>
            <rect width="1200" height="220" fill={`url(#${fadeGradId})`} />
          </mask>
        </defs>

        <g mask={`url(#${fadeMaskId})`}>
          {/* Soft Vice Sunset Disc */}
          <circle cx="930" cy="145" r="88" fill={`url(#${sunGradId})`} />

          {/* Art Deco Ocean Drive Skyline Silhouettes */}
          <g fill={`url(#${skylineGradId})`}>
            <path d="M24 220 V156 H48 V142 H68 V156 H92 V220 Z" opacity="0.35" />
            <path d="M108 220 V172 H144 V220 Z" opacity="0.28" />
            <path d="M740 220 V158 H764 V134 H782 V116 H794 V134 H812 V158 H834 V220 Z" opacity="0.45" />
            <path d="M846 220 V142 H872 V120 H904 V142 H928 V220 Z" opacity="0.40" />
            <path d="M998 220 V148 H1022 V126 H1032 V104 H1038 V126 H1050 V148 H1072 V220 Z" opacity="0.50" />
            <path d="M1084 220 V166 H1126 V220 Z" opacity="0.34" />
          </g>

          {/* Clean Palm Silhouettes */}
          <g fill="#ff3b9a" fillOpacity="0.15">
            <path d="M960 220 C956 178 960 132 972 86 L978 88 C967 134 964 178 968 220 Z" />
            <path d="M975 88 C954 70 924 72 902 88 C928 84 952 84 973 92 Z" />
            <path d="M975 88 C950 56 916 48 892 60 C922 60 950 68 972 90 Z" />
            <path d="M976 87 C978 52 1004 34 1032 38 C1006 46 988 64 978 90 Z" />
            <path d="M977 89 C1004 64 1038 64 1062 82 C1034 76 1004 78 977 93 Z" />
            <path d="M976 92 C1008 86 1034 100 1050 124 C1026 108 1000 98 975 95 Z" />
            <path d="M973 92 C946 92 924 108 914 130 C932 114 952 102 973 96 Z" />

            <path d="M1142 220 C1148 184 1146 150 1134 114 L1139 113 C1151 150 1154 184 1149 220 Z" opacity="0.65" />
            <path d="M1136 115 C1114 98 1088 100 1070 114 C1094 110 1116 110 1134 118 Z" opacity="0.65" />
            <path d="M1137 114 C1128 84 1100 72 1076 78 C1102 82 1122 92 1134 116 Z" opacity="0.65" />
            <path d="M1138 113 C1148 84 1172 74 1194 82 C1172 86 1152 98 1139 117 Z" opacity="0.65" />
            <path d="M1138 117 C1162 104 1186 112 1198 130 C1178 120 1156 116 1137 120 Z" opacity="0.65" />
          </g>
        </g>
      </svg>
    </div>
  );
};
