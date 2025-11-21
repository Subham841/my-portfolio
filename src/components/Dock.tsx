'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

import './Dock.css';

function DockItem({ children, className = '', onClick, mouseY, spring, distance, magnification, baseItemSize }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    mouseY: any;
    spring: any;
    distance: number;
    magnification: number;
    baseItemSize: number;

}) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseY, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      y: 0,
      height: baseItemSize
    };
    return val - rect.y - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child: any) => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, className = '', ...rest }: {
    children: React.ReactNode;
    className?: string;
    isHovered?: any;
}) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', (latest: number) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: -10 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ y: '-50%', left: '-1.5rem', transform: 'translate(-100%, -50%)' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }: {
    children: React.ReactNode;
    className?: string;
}) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelWidth = 68,
  dockWidth = 256,
  baseItemSize = 50
}: {
    items: {
        icon: React.ReactNode;
        label: string;
        onClick?: () => void;
        className?: string;
    }[];
    className?: string;
    spring?: any;
    magnification?: number;
    distance?: number;
    panelWidth?: number;
    dockWidth?: number;
    baseItemSize?: number;
}) {
  const mouseY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxWidth = useMemo(
    () => Math.max(dockWidth, magnification + magnification / 2 + 4),
    [magnification, dockWidth]
  );
  const widthRow = useTransform(isHovered, [0, 1], [panelWidth, maxWidth]);
  const width = useSpring(widthRow, spring);

  return (
    <motion.div style={{ width, scrollbarWidth: 'none' }} className="dock-outer">
      <motion.div
        onMouseMove={({ pageY }) => {
          isHovered.set(1);
          mouseY.set(pageY);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseY.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ width: panelWidth }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseY={mouseY}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
