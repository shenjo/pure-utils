import React, {useRef, useEffect, useState} from 'react';

type CircularProgressProps = {
  activeColor: string
  inactiveColor?: string;
  progress?: number;
  strokeWidth?: number;
  className?: string;
};

function CircularProgress(props: CircularProgressProps) {
  const {activeColor, inactiveColor = '#ccc', progress = 0, strokeWidth = 10, className} = props;
  const [radius, setRadius] = useState<number>(0);
  const [circumference, setCircumference] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const calcSvgAttr = () => {
    const svgElement = svgRef.current;
    if (!svgElement) return;
    
    const boundingRect = svgElement.getBoundingClientRect();
    const newSize = Math.min(boundingRect.width, boundingRect.height);
    
    // 如果在有缓存的页面计算的过程中，切换了页面，获取不到domsize。这时需要等恢复了计算
    console.log("shenjo 计算size", newSize)
    
    if (newSize <= 0) {
      return;
    }
    
    const newRadius = newSize / 2 - strokeWidth / 2;
    setRadius(newRadius);
    setCircumference(2 * Math.PI * newRadius);
    svgElement.setAttribute('viewBox', `0 0 ${newSize} ${newSize}`);
  }
  
  useEffect(() => {
    calcSvgAttr();
  }, [strokeWidth]);
  
  useEffect(() => {
    const targetElement = svgRef.current!;
    
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          if (mutation.target === targetElement && mutation.attributeName === 'style') {
            console.log("shenjo test 重新计算",)
            calcSvgAttr();
          }
        }
      }
    });
    
    observer.observe(targetElement, {attributes: true});
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  
  const dashOffset = circumference * (1 - progress);
  
  const r = Math.max(0,radius - strokeWidth / 2)

  return (
    <svg ref={svgRef} className={className}>
      <circle cx={radius} cy={radius} r={r} stroke={inactiveColor} strokeWidth={strokeWidth}
              fill="none"/>
      <circle cx={radius} cy={radius} r={r} stroke={activeColor} strokeWidth={strokeWidth}
              fill="none" strokeDasharray={circumference}
              strokeDashoffset={dashOffset} transform={`rotate(-90 ${radius} ${radius})`}/>
      {/*{showText && (*/}
      {/*  <text x={radius} y={radius} textAnchor="middle" dominantBaseline="central" fill={activeColor}>*/}
      {/*    {Math.floor(progress * 100)}%*/}
      {/*  </text>*/}
      {/*)}*/}
    </svg>
  );
}

export default CircularProgress;
