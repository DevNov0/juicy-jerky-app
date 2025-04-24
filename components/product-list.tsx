"use client";

import { useProducts } from "@/app/api/hooks/use-products";
import { Product } from "@prisma/client";

export default function ProductList() {
    const { data, isLoading, error } = useProducts();

    if (isLoading) return <p>Načítám produkty...</p>;
    if (error) return <p>Chyba při načítání produktů</p>;

    return (
        <div className="mt-8 grid gap-4">
            {data.map((product: Product) => (
                <div key={product.id} className="rounded-lg border p-4 shadow-sm transition hover:shadow-md">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.price} Kč</p>
                </div>
            ))}
        </div>
    );
}
