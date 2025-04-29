import { ProductCreateUpdateInput } from "@/app/api/hooks/products/use-add-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateProductInput = ProductCreateUpdateInput & { id: string };

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedProduct: UpdateProductInput) => {
            const res = await fetch(`/api/products/${updatedProduct.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: updatedProduct.name,
                    price: updatedProduct.price,
                }),
            });

            if (!res.ok) {
                throw new Error("Nepodařilo se aktualizovat produkt");
            }

            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
}
