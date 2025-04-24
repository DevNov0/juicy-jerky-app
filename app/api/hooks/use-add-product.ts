import { Product } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CreateProductInput = Pick<Product, "name" | "price">;

export function useAddProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProduct: CreateProductInput) => {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("Nepodařilo se přidat produkt");
            }

            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
}
