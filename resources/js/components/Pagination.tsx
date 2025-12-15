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

    // Check if a link is Previous or Next
    const isPreviousOrNext = (label: string): boolean => {
        const labelText = label.toLowerCase().replace(/[^a-z]/g, '');
        return labelText.includes('previous') || labelText.includes('next') || labelText === 'laquo' || labelText === 'raquo';
    };

    return (
        <div className="flex justify-center">
            <nav className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
                {links.map((link, index) => {
                    const isPrevOrNext = isPreviousOrNext(link.label);

                    return (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-3 py-2 sm:px-4 rounded-md text-sm sm:text-base font-medium transition-colors ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''} ${
                                // Always show Previous/Next buttons
                                // On mobile: only show active page number
                                // On tablet+ (md): show all page numbers
                                isPrevOrNext
                                    ? 'inline-flex'
                                    : link.active
                                      ? 'inline-flex'
                                      : 'hidden md:inline-flex'
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    );
                })}
            </nav>
        </div>
    );
}
