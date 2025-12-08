import {
    Laptop,
    Monitor,
    Tablet,
    Smartphone,
    Tag,
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory?: string;
    onCategorySelect: (categorySlug: string | null) => void;
}

// Map category names/slugs to icons
const getCategoryIcon = (categoryName: string, categorySlug: string) => {
    const name = categoryName.toLowerCase();
    const slug = categorySlug.toLowerCase();
    
    if (name.includes('accessories') || slug.includes('accessories')) return Monitor;
    if (name.includes('laptop') || slug.includes('laptop')) return Laptop;
    if (name.includes('tablet') || slug.includes('tablet')) return Tablet;
    if (name.includes('phone') ||  slug.includes('phone')) return Smartphone;    
    
    // Default icon
    return Tag;
};

// Map category names to gradient colors using logo colors (Orange, Cyan, Green, Yellow)
const getCategoryGradient = (categoryName: string): string => {
    const categoryColors: Record<string, string> = {
        'Laptop': 'from-cyan-500 via-blue-500 to-cyan-600',
        'Phone': 'from-yellow-500 via-orange-500 to-yellow-600',
        'Tablet': 'from-orange-500 via-yellow-500 to-orange-600',
        'Accessories': 'from-green-500 via-lime-500 to-green-600',
    };
    
    return categoryColors[categoryName] || 'from-orange-500 via-cyan-500 to-green-500';
};

export default function CategoryFilter({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) {
    if (categories.length === 0) {
        return null;
    }

    return (
        <div className="w-full mb-12">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-10">
                {/* All Categories Button */}
                <button
                    onClick={() => onCategorySelect(null)}
                    className="flex flex-col items-center group cursor-pointer transition-all duration-300"
                >
                    <div
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center transition-all duration-300 transform ${
                            !selectedCategory
                                ? 'bg-gradient-to-br from-orange-500 via-cyan-500 to-green-500 shadow-xl scale-110 ring-4 ring-orange-200'
                                : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:to-gray-300 group-hover:scale-110 shadow-md hover:shadow-lg'
                        }`}
                    >
                        <Tag
                            className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-300 ${
                                !selectedCategory 
                                    ? 'text-white drop-shadow-lg' 
                                    : 'text-gray-600 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-cyan-500 group-hover:to-green-500'
                            }`}
                            strokeWidth={!selectedCategory ? 2 : 1.5}
                        />
                    </div>
                    <span
                        className={`mt-3 text-sm md:text-base font-bold transition-all duration-300 ${
                            !selectedCategory
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500'
                                : 'text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-cyan-500 group-hover:to-green-500'
                        }`}
                    >
                        All
                    </span>
                </button>

                {/* Category Buttons */}
                {categories.map((category) => {
                    const Icon = getCategoryIcon(category.name, category.slug);
                    const isSelected = selectedCategory === category.slug;
                    const gradientClass = getCategoryGradient(category.name);
                    
                    // Get hover gradient classes based on category using logo colors
                    const getHoverClasses = () => {
                        if (category.name === 'Laptop') {
                            return 'group-hover:from-cyan-500 group-hover:via-blue-500 group-hover:to-cyan-600';
                        }
                        if (category.name === 'Phone') {
                            return 'group-hover:from-yellow-500 group-hover:via-orange-500 group-hover:to-yellow-600';
                        }
                        if (category.name === 'Tablet') {
                            return 'group-hover:from-orange-500 group-hover:via-yellow-500 group-hover:to-orange-600';
                        }
                        if (category.name === 'Accessories') {
                            return 'group-hover:from-green-500 group-hover:via-lime-500 group-hover:to-green-600';
                        }
                        return 'group-hover:from-orange-500 group-hover:via-cyan-500 group-hover:to-green-500';
                    };

                    return (
                        <button
                            key={category.id}
                            onClick={() => onCategorySelect(category.slug)}
                            className="flex flex-col items-center group cursor-pointer transition-all duration-300"
                        >
                            <div
                                className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center transition-all duration-300 transform ${
                                    isSelected
                                        ? `bg-gradient-to-br ${gradientClass} shadow-2xl scale-110 ring-4 ring-opacity-50 ${
                                            category.name === 'Laptop' ? 'ring-cyan-200' :
                                            category.name === 'Phone' ? 'ring-yellow-200' :
                                            category.name === 'Tablet' ? 'ring-orange-200' :
                                            'ring-green-200'
                                        }`
                                        : `bg-gradient-to-br from-gray-100 to-gray-200 ${getHoverClasses()} group-hover:scale-110 shadow-md hover:shadow-xl`
                                }`}
                            >
                                <Icon
                                    className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-300 ${
                                        isSelected
                                            ? 'text-white drop-shadow-lg'
                                            : 'text-gray-600 group-hover:text-white group-hover:drop-shadow-lg'
                                    }`}
                                    strokeWidth={isSelected ? 2 : 1.5}
                                />
                            </div>
                            <span
                                className={`mt-3 text-sm md:text-base font-bold text-center max-w-[100px] transition-all duration-300 ${
                                    isSelected
                                        ? `text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}`
                                        : 'text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-cyan-500 group-hover:to-green-500'
                                }`}
                            >
                                {category.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
