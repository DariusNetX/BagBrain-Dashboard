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
  // Strict validation for content
  const hasValidContent = content && 
    typeof content === 'string' && 
    content.trim().length > 0 && 
    content !== 'undefined' && 
    content !== 'null' &&
    content !== '';
  
  // Log problematic content for debugging
  if (!hasValidContent) {
    console.warn(`MobilePopover ${id} has invalid content:`, content);
    return <span>{children}</span>;
  }
  
  return (
    <span 
      className={`mobile-popover ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(id);
      }}
    >
      <span className="popover-trigger">
        {children}
      </span>
      <div className="mobile-popover-content">
        {content}
      </div>
    </span>
  );
};