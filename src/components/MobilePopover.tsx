import React from 'react';

interface MobilePopoverProps {
  id: string;
  content: string;
  children: React.ReactNode;
  isActive: boolean;
  onToggle: (id: string) => void;
}

export const MobilePopover: React.FC<MobilePopoverProps> = ({
  id,
  content,
  children,
  isActive,
  onToggle
}) => {
  return (
    <span 
      className={`mobile-popover ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(id);
      }}
    >
      <span 
        className="mobile-hint" 
        {...(content && content.trim() ? { 'data-tooltip': content } : {})}
      >
        {children}
      </span>
      <div className="mobile-popover-content">
        {content}
      </div>
    </span>
  );
};