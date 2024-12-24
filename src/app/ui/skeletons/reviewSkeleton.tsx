// components/ReviewSkeleton.tsx
const ReviewSkeleton = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 animate-pulse">
 
            {/* Card Skeleton */}
            <div className="w-full aspect-[3/2]">
                <div className="w-full h-full rounded-xl shadow-lg p-8
                    flex items-center justify-center
                    bg-gray-100 border-2 border-gray-200">
                    {/* Content placeholder */}
                    <div className="space-y-3 w-2/3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ReviewSkeleton;