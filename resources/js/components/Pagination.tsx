import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
}

export default function Pagination({ links }: PaginationProps) {
    // Don't render if there are 3 or fewer links (typically just Previous, Current, Next)
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="flex justify-center">
            <nav className="flex space-x-2">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                            link.active
                                ? 'bg-blue-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                    />
                ))}
            </nav>
        </div>
    );
}
