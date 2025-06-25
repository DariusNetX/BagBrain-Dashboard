import { useState, useEffect } from 'react';

export const useMobilePopover = () => {
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const togglePopover = (id: string) => {
    setActivePopover(activePopover === id ? null : id);
  };

  const closePopover = () => {
    setActivePopover(null);
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-popover')) {
        closePopover();
      }
    };

    if (activePopover) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activePopover]);

  // Auto-close after 3 seconds on mobile
  useEffect(() => {
    if (activePopover) {
      const timer = setTimeout(() => {
        closePopover();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activePopover]);

  return {
    activePopover,
    togglePopover,
    closePopover
  };
};