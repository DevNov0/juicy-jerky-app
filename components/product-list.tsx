"use client";

import { useDeleteProduct } from "@/app/api/hooks/products/use-delete-product";
import { useProducts } from "@/app/api/hooks/products/use-products";
import { ApiErrorBoundary } from "@/components/shared/api-error-boundary/api-error-boundary";
import { Column, DataGrid } from "@/components/shared/data-grid/data-grid";
import { Button } from "@/components/ui/button/button";
import { Product } from "@prisma/client";

type ProductListProps = {
    onEditProduct: (product: Product) => void;
    editingProductId: string | null;
    onCancelEdit: () => void;
};

export default function ProductList(props: ProductListProps) {
    const products = useProducts();
    const deleteProduct = useDeleteProduct();

    const productColumns: Column<Product>[] = [
        { header: "Název", accessor: "name" },
        { header: "Cena", accessor: "price" },
        /* { header: "Skladem", render: (row) => (row.inStock ? "✅" : "❌") },
         { header: "Obrázek", render: (row) => row.imageUrl ? <img src={row.imageUrl} alt={row.name} className="h-8 w-8 object-cover" /> : "Žádný" },*/
        {
            header: "Akce",
            width: "100px",
            render: (row) => (
                <div className="flex gap-2">
                    <Button variant="primary" onClick={() => props.onEditProduct(row)}>
                        Upravit
                    </Button>
                    <Button variant="primary" color="danger" onClick={() => deleteProduct.mutate(row.id)}>
                        Smazat
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <ApiErrorBoundary error={products.error} loading={products.isLoading} data={products.data} nested>
            {(data) => <DataGrid columns={productColumns} data={data} />}
        </ApiErrorBoundary>
    );
}
