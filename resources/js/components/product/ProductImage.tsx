interface ProductImageProps {
    imageUrl?: string | null;
    alt: string;
    className?: string;
    containerClassName?: string;
}

export default function ProductImage({
    imageUrl,
    alt,
    className = 'w-full h-full object-cover hover:scale-105 transition-transform duration-300',
    containerClassName = 'relative w-full h-48 bg-gray-100 overflow-hidden',
}: ProductImageProps) {
    if (imageUrl) {
        return (
            <div className={containerClassName}>
                <img
                    src={imageUrl}
                    alt={alt}
                    className={className}
                    onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                />
            </div>
        );
    }

    return (
        <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
            <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        </div>
    );
}
