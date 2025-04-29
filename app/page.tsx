"use client";

import { useAddProduct } from "@/app/api/hooks/products/use-add-product";
import { useUpdateProduct } from "@/app/api/hooks/products/use-update-product";
import { isNotNil } from "@/app/utils/is-not-nil";
import ProductList from "@/components/product-list";
import { mapCreateProductInput, mapProductToFormValues } from "@/forms/product-create-update-form/mapper";
import { ProductCreateUpdateForm } from "@/forms/product-create-update-form/product-create-update-form";
import { ProductCreateUpdateFormValues } from "@/forms/product-create-update-form/types";
import { Product } from "@prisma/client";
import { useState } from "react";

export default function ProductPage() {
    const [resetForm, setResetForm] = useState<(() => void) | null>(null);

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const addProduct = useAddProduct();
    const updateProduct = useUpdateProduct();

    const handleCreate = (values: ProductCreateUpdateFormValues) => {
        addProduct.mutate(mapCreateProductInput(values), {
            onSuccess: () => {
                resetForm?.();
                setEditingProduct(null);
            },
        });
    };

    const handleUpdate = (values: ProductCreateUpdateFormValues) => {
        if (!editingProduct) return;
        updateProduct.mutate(
            { id: String(editingProduct.id), ...mapCreateProductInput(values) },
            {
                onSuccess: () => setEditingProduct(null),
            },
        );
    };

    return (
        <div className="space-y-8 p-8">
            <ProductCreateUpdateForm
                defaultValues={isNotNil(editingProduct) ? mapProductToFormValues(editingProduct) : undefined}
                onSubmit={isNotNil(editingProduct) ? handleUpdate : handleCreate}
                onResetAvailable={(resetFn) => setResetForm(() => resetFn)}
            />

            <ProductList
                onEditProduct={setEditingProduct}
                onCancelEdit={() => setEditingProduct(null)}
                editingProductId={isNotNil(editingProduct) ? String(editingProduct.id) : null}
            />
        </div>
    );
}
