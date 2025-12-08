interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
}

export default function StarRating({
    rating,
    maxRating = 5,
    size = 'md',
    showValue = true,
}: StarRatingProps) {
    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    const starSize = sizeClasses[size];

    // Round to nearest 0.5
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center">
                {/* Full stars */}
                {Array.from({ length: fullStars }).map((_, i) => (
                    <svg
                        key={`full-${i}`}
                        className={`${starSize} text-yellow-400 fill-current`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}

                {/* Half star */}
                {hasHalfStar && (
                    <div className="relative inline-block">
                        <svg
                            className={`${starSize} text-gray-300 fill-current`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                            <svg
                                className={`${starSize} text-yellow-400 fill-current`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Empty stars */}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <svg
                        key={`empty-${i}`}
                        className={`${starSize} text-gray-300 fill-current`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
            </div>
            {showValue && (
                <span className="text-sm font-medium text-gray-700 ml-1">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
}
