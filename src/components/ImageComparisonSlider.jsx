import { useState, useRef, useEffect } from "react"; // 🔧 FIX: added useEffect for resize handling
import { MoveHorizontal } from "lucide-react";

const ImageComparisonSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Original",
  afterLabel = "AI Enhanced",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0); // 🔧 FIX: track container width in state
  const containerRef = useRef(null);

  // 🔧 FIX: containerRef.current is null on first render, so reading
  // containerRef.current.offsetWidth directly during render always
  // fell back to "100%" — which, combined with the clipped wrapper width
  // (sliderPosition%), squished/scaled the "before" image incorrectly.
  // Measuring after mount (and on resize) gives the real pixel width.
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="w-full">
      {/* Instructions */}
      <div className="text-center mb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
        <p className="text-sm font-bold text-gray-700 flex items-center justify-center gap-2">
          <MoveHorizontal className="w-5 h-5 text-green-600 animate-pulse" />
          Drag the slider to compare Before & After
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden rounded-2xl shadow-2xl border-4 border-green-200 hover:border-green-400 transition-all cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After Image (Full Width) */}
        <div className="relative w-full">
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-auto block"
            draggable={false}
          />
          <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-2xl border-2 border-white animate-pulse">
            ✨ {afterLabel}
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="h-full object-cover block"
            style={{
              // 🔧 FIX: use measured pixel width from state instead of
              // reading containerRef.current during render (which is null
              // on first render and never updates afterwards)
              width: containerWidth ? `${containerWidth}px` : "100%",
              maxWidth: "none", // 🔧 FIX: prevent w-full/max-width clamping from shrinking the image back to the clipped wrapper's width
            }}
            draggable={false}
          />
          <div className="absolute top-6 left-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-2xl border-2 border-white">
            📸 {beforeLabel}
          </div>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Top Arrow */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>

          {/* Bottom Arrow */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div
            className={`w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize border-4 transition-all duration-300 ${
              isDragging
                ? "border-green-500 scale-125 shadow-green-500/50"
                : "border-gray-300 hover:border-green-400 hover:scale-110"
            }`}
          >
            <MoveHorizontal
              className={`w-8 h-8 transition-colors ${isDragging ? "text-green-600" : "text-gray-600"}`}
            />
          </div>
        </div>

        {/* Percentage Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-xs font-bold">
          {Math.round(sliderPosition)}% / {Math.round(100 - sliderPosition)}%
        </div>
      </div>

      {/* Labels Below */}
      <div className="flex justify-between mt-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <span className="text-sm font-bold text-gray-700">{beforeLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded"></div>
          <span className="text-sm font-bold text-green-600">{afterLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;
