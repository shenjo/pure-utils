import React, { useRef, useEffect, useState } from 'react';

type CircularProgressProps = {
  activeColor: string
  inactiveColor?: string;
  progress?: number;
  strokeWidth?: number;
  className?: string;
};

function CircularProgress (props: CircularProgressProps) {
  const { activeColor, inactiveColor = '#ccc', progress = 0, strokeWidth = 10, className } = props;
  const [radius, setRadius] = useState<number>(0);
  const [circumference, setCircumference] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const boundingRect = svgElement.getBoundingClientRect();
    const newSize = Math.min(boundingRect.width, boundingRect.height);
    const newRadius = newSize / 2 - strokeWidth / 2;
    setRadius(newRadius);
    setCircumference(2 * Math.PI * newRadius);
    svgElement.setAttribute('viewBox', `0 0 ${newSize} ${newSize}`);
  }, [strokeWidth]);

  const dashOffset = circumference * (1 - progress);

  return (
    <svg ref={svgRef} className={className}>
      <circle cx={radius} cy={radius} r={radius - strokeWidth / 2} stroke={inactiveColor} strokeWidth={strokeWidth} fill="none" />
      <circle cx={radius} cy={radius} r={radius - strokeWidth / 2} stroke={activeColor} strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference}
              strokeDashoffset={dashOffset} transform={`rotate(-90 ${radius} ${radius})`} />
    </svg>
  );
}

export default CircularProgress;
