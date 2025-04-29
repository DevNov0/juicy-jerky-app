import { ProductCreateUpdateInput } from "@/app/api/hooks/products/use-add-product";
import { CreateProductFormValues } from "@/forms/product-create-update-form/product-create-update-form";
import { Product } from "@prisma/client";

export function mapCreateProductInput(values: CreateProductFormValues): ProductCreateUpdateInput {
    return {
        name: values.name,
        price: parseFloat(values.price),
    };
}

export function mapProductToFormValues(product: Product): CreateProductFormValues {
    return {
        name: product.name,
        price: product.price.toString(), // převedeme number na string, aby to šlo do inputu
    };
}
