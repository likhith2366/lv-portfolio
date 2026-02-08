import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for making elements draggable
 * @param {string} storageKey - localStorage key for persisting position
 * @param {object} defaultPosition - Default position {x, y}
 * @returns {object} { position, isDragging, dragHandlers }
 */
export function useDraggable(storageKey, defaultPosition = null) {
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : defaultPosition;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });

  const constrainPosition = useCallback((x, y) => {
    const margin = 16;
    const maxX = window.innerWidth - margin;
    const maxY = window.innerHeight - margin;

    return {
      x: Math.max(margin, Math.min(x, maxX)),
      y: Math.max(margin, Math.min(y, maxY)),
    };
  }, []);

  const handleMouseDown = useCallback((e) => {
    // Only drag if clicking on the header (check for data-drag-handle attribute)
    if (!e.target.closest('[data-drag-handle]')) return;

    setIsDragging(true);
    setHasDragged(false);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = position || { x: 0, y: 0 };

    e.preventDefault();
  }, [position]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      // If moved more than 5 pixels, consider it a drag
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setHasDragged(true);
      }

      const newX = elementStartPos.current.x + deltaX;
      const newY = elementStartPos.current.y + deltaY;

      const constrained = constrainPosition(newX, newY);
      setPosition(constrained);
    },
    [isDragging, constrainPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    // Persist position to localStorage
    if (position) {
      localStorage.setItem(storageKey, JSON.stringify(position));
    }
  }, [isDragging, position, storageKey]);

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const dragHandlers = {
    onMouseDown: handleMouseDown,
  };

  return {
    position,
    isDragging,
    hasDragged,
    dragHandlers,
  };
}
