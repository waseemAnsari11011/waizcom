export default function Loading() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header Skeleton */}
                <div className="mb-12 text-center">
                    <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-gray-200"></div>
                    <div className="mx-auto mt-4 h-4 w-96 animate-pulse rounded bg-gray-200"></div>
                </div>

                {/* Blog Grid Skeleton */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-2xl bg-white shadow-lg"
                        >
                            {/* Image Skeleton */}
                            <div className="h-48 w-full animate-pulse bg-gray-200"></div>

                            <div className="p-6">
                                {/* Date Skeleton */}
                                <div className="mb-4 h-4 w-24 animate-pulse rounded bg-gray-200"></div>

                                {/* Title Skeleton */}
                                <div className="mb-2 h-6 w-full animate-pulse rounded bg-gray-200"></div>
                                <div className="mb-4 h-6 w-2/3 animate-pulse rounded bg-gray-200"></div>

                                {/* Description Skeleton */}
                                <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200"></div>
                                <div className="mb-4 h-4 w-full animate-pulse rounded bg-gray-200"></div>

                                {/* Tags Skeleton */}
                                <div className="flex gap-2">
                                    <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
                                    <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
