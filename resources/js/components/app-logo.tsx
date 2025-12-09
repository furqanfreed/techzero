export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md">
                <img
                    src="/logo-icon.png"
                    alt="TechZero"
                    className="h-8 w-auto"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    TechZero
                </span>
            </div>
        </>
    );
}
