'use client'

const LoadingBar = () => {
  return (
    <div className="w-full max-w-xl mx-auto p-4 mt-10">
      {/* Outer container with glow */}
      <div className="relative">
       
        {/* Main container */}
        <div className="relative h-4 bg-gray-900/50 backdrop-blur-sm rounded-full overflow-hidden shadow-lg border border-white/10">
          
          {/* Gradient animated fill */}
          <div className="absolute top-0 left-0 h-full w-full 
            bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 
            animate-fill">
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoadingBar;