interface IQTestBackgroundProps {
  questionNumber?: number;
  variant?: 'intro' | 'question' | 'results';
}

export default function IQTestBackground({ questionNumber = 1, variant = 'question' }: IQTestBackgroundProps) {
  // Character images based on question number for variety
  const getCharacterImage = () => {
    if (variant === 'intro') return '/bagbrain-character-clean.png';
    if (variant === 'results') return '/bagbrain-results.png';
    
    // Cycle through different character expressions for questions
    const questionImages = [
      '/bagbrain-character-clean.png',
      '/bagbrain-confused.png', 
      '/bagbrain-cool.png',
      '/bagbrain-character-1.png',
      '/bagbrain-character-2.png'
    ];
    
    return questionImages[(questionNumber - 1) % questionImages.length] || '/bagbrain-character-clean.png';
  };

  // Different positioning and sizing based on variant
  const getCharacterStyles = () => {
    switch (variant) {
      case 'intro':
        return {
          position: 'fixed' as const,
          bottom: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          opacity: 0.15,
          zIndex: 1
        };
      case 'results':
        return {
          position: 'fixed' as const,
          top: '50%',
          left: '5%',
          transform: 'translateY(-50%)',
          width: '180px',
          height: '180px',
          opacity: 0.12,
          zIndex: 1
        };
      default: // question
        return {
          position: 'fixed' as const,
          top: '20%',
          right: '8%',
          width: '160px',
          height: '160px',
          opacity: 0.1,
          zIndex: 1
        };
    }
  };

  // Mobile responsive adjustments
  const getMobileStyles = () => {
    switch (variant) {
      case 'intro':
        return {
          width: '120px',
          height: '120px',
          bottom: '5%',
          right: '2%'
        };
      case 'results':
        return {
          width: '100px',
          height: '100px',
          left: '2%'
        };
      default:
        return {
          width: '100px',
          height: '100px',
          top: '15%',
          right: '3%'
        };
    }
  };

  return (
    <>
      {/* Desktop Background Character */}
      <div className="hidden md:block">
        <img
          src={getCharacterImage()}
          alt="BagBrain Background"
          className="object-contain transition-all duration-500 hover:opacity-20"
          style={getCharacterStyles()}
          onError={(e) => {
            console.log(`Background character failed to load: ${getCharacterImage()}`);
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Mobile Background Character */}
      <div className="block md:hidden">
        <img
          src={getCharacterImage()}
          alt="BagBrain Background"
          className="object-contain transition-all duration-500"
          style={{
            ...getCharacterStyles(),
            ...getMobileStyles()
          }}
          onError={(e) => {
            console.log(`Mobile background character failed to load: ${getCharacterImage()}`);
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Subtle gradient overlay for better text readability */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: variant === 'results' 
            ? 'radial-gradient(circle at right center, rgba(0,0,0,0.4) 0%, transparent 50%)'
            : 'radial-gradient(circle at right center, rgba(0,0,0,0.3) 0%, transparent 60%)'
        }}
      />
    </>
  );
}