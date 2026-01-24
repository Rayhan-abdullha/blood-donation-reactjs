// LoadingSpinner.jsx
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 border-solid"></div>
    <p className="text-red-600 font-medium animate-pulse">নিকটস্থ ডোনার খোঁজা হচ্ছে...</p>
  </div>
);
export default LoadingSpinner;