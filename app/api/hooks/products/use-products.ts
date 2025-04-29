import { useQuery } from "@tanstack/react-query";

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch("/api/products");
            if (!res.ok) {
                throw new Error("Chyba při načítání produktů");
            }
            return res.json();
        },
    });
}
