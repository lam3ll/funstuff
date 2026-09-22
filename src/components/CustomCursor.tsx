import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Precise mouse coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  // Trailing smooth ring coordinates
  const followerPos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        setIsTouchDevice(true);
        return;
      }
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onPointerDown = () => setIsClicked(true);
    const onPointerUp = () => setIsClicked(false);

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Detect hover over interactive elements (buttons, links, nav, pills)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor="expand"]'
        )
      ) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const related = e.relatedTarget as HTMLElement | null;
      if (
        !related?.closest(
          'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor="expand"]'
        )
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Animation frame for trailing follower
    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const render = () => {
      followerPos.current.x = lerp(
        followerPos.current.x,
        mousePos.current.x,
        0.2
      );
      followerPos.current.y = lerp(
        followerPos.current.y,
        mousePos.current.y,
        0.2
      );

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      id="custom-cursor-container"
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer fluid circular cursor that expands when hovering over buttons or links */}
      <div
        ref={ringRef}
        id="custom-cursor-ring"
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-[width,height,background-color,border-color,opacity,transform] duration-200 ease-out will-change-transform ${
          isHovered
            ? 'w-14 h-14 bg-white/20 border-2 border-white backdrop-blur-[0.5px] scale-100'
            : isClicked
            ? 'w-7 h-7 bg-white/40 border border-white scale-90'
            : 'w-9 h-9 bg-transparent border border-white/70 scale-100'
        }`}
      />

      {/* Center pinpoint dot */}
      <div
        ref={dotRef}
        id="custom-cursor-dot"
        className={`fixed top-0 left-0 rounded-full pointer-events-none bg-white will-change-transform transition-all duration-150 ${
          isHovered ? 'w-2 h-2 opacity-50' : 'w-1.5 h-1.5 opacity-100'
        }`}
      />
    </div>
  );
}
