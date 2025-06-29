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
  // Validate content - only render tooltip functionality if content exists
  const hasValidContent = content && typeof content === 'string' && content.trim().length > 0;
  
  if (!hasValidContent) {
    // Return children without tooltip functionality if no valid content
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
      <span 
        className="mobile-hint" 
        data-tooltip={content}
      >
        {children}
      </span>
      <div className="mobile-popover-content">
        {content}
      </div>
    </span>
  );
};