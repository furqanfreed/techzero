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
const getCategoryIcon = (categoryName: string, categorySlug: string): LucideIcon => {
    const name = categoryName.toLowerCase();
    const slug = categorySlug.toLowerCase();

    
    
    if (name.includes('desktop') || slug.includes('desktop')) return Monitor;
    if (name.includes('laptop') || slug.includes('laptop')) return Laptop;
    if (name.includes('tablet') || slug.includes('tablet')) return Tablet;
    if (name.includes('phone') ||  slug.includes('phone')) return Smartphone;    
    
    // Default icon
    return Tag;
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
                    className="flex flex-col items-center group cursor-pointer transition-all duration-200"
                >
                    <div
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-200 ${
                            !selectedCategory
                                ? 'bg-blue-600 shadow-lg scale-105'
                                : 'bg-gray-100 group-hover:bg-gray-200 group-hover:scale-110'
                        }`}
                    >
                        <Tag
                            className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-200 ${
                                !selectedCategory ? 'text-white' : 'text-gray-700 group-hover:text-blue-600'
                            }`}
                            strokeWidth={1.5}
                        />
                    </div>
                    <span
                        className={`mt-3 text-sm md:text-base font-medium transition-colors duration-200 ${
                            !selectedCategory
                                ? 'text-blue-600'
                                : 'text-gray-700 group-hover:text-blue-600'
                        }`}
                    >
                        All
                    </span>
                </button>

                {/* Category Buttons */}
                {categories.map((category) => {
                    const Icon = getCategoryIcon(category.name, category.slug);
                    const isSelected = selectedCategory === category.slug;

                    return (
                        <button
                            key={category.id}
                            onClick={() => onCategorySelect(category.slug)}
                            className="flex flex-col items-center group cursor-pointer transition-all duration-200"
                        >
                            <div
                                className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-200 ${
                                    isSelected
                                        ? 'bg-blue-600 shadow-lg scale-105'
                                        : 'bg-gray-100 group-hover:bg-gray-200 group-hover:scale-110'
                                }`}
                            >
                                <Icon
                                    className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-200 ${
                                        isSelected
                                            ? 'text-white'
                                            : 'text-gray-700 group-hover:text-blue-600'
                                    }`}
                                    strokeWidth={1.5}
                                />
                            </div>
                            <span
                                className={`mt-3 text-sm md:text-base font-medium text-center max-w-[100px] transition-colors duration-200 ${
                                    isSelected
                                        ? 'text-blue-600'
                                        : 'text-gray-700 group-hover:text-blue-600'
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
