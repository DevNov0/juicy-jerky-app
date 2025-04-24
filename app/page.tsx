"use client";

import { useAddProduct } from "@/app/api/hooks/use-add-product";
import ProductList from "@/components/product-list";
import { Button } from "@/components/ui/button/button";

import React, { useState } from "react";

export default function Page() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    const { mutate, isPending, isSuccess, isError, error } = useAddProduct();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        mutate(
            { name, price },
            {
                onSuccess: () => {
                    setName("");
                    setPrice(0);
                },
            },
        );
    };

    return (
        <main className="mx-auto max-w-md p-6">
            <h1 className="mb-4 text-2xl font-bold">Přidat produkt</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block">Název</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>
                <div>
                    <label className="mb-1 block">Cena (Kč)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        className="w-full rounded border p-2"
                        required
                    />
                </div>
                <Button type="submit" isDisabled={isPending}>
                    {isPending ? "Přidávám…" : "Přidat"}
                </Button>
                <Button>Bomby</Button>
                {isSuccess && <p className="text-sm text-green-600">✅ Produkt přidán!</p>}
                {isError && <p className="text-sm text-red-600">❌ {error?.message}</p>}
            </form>

            <ProductList />
        </main>
    );
}
