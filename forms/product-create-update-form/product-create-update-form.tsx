import { isNotNil } from "@/app/utils/is-not-nil";
import { Button } from "@/components/ui/button/button";
import { ProductCreateUpdateFormValues } from "@/forms/product-create-update-form/types";
import { Product } from "@prisma/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ProductCreateUpdateFormProps {
    defaultValues?: ProductCreateUpdateFormValues;
    onSubmit: (values: ProductCreateUpdateFormValues) => void;
    onResetAvailable?: (resetFn: () => void) => void;
    editingProduct?: Product | null;
}

export function ProductCreateUpdateForm(props: ProductCreateUpdateFormProps) {
    const { onResetAvailable } = props;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductCreateUpdateFormValues>({
        defaultValues: props.defaultValues,
    });

    useEffect(() => {
        if (isNotNil(props.defaultValues)) {
            reset(props.defaultValues);
        } else if (isNotNil(onResetAvailable)) {
            onResetAvailable(reset);
        }
    }, [onResetAvailable, props.defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="space-y-4 rounded-lg bg-gray-300 px-6 py-12">
            <h1 className="text-2xl font-bold">
                {isNotNil(props.editingProduct) ? "Upravit produkt" : "Přidat nový produkt"}
            </h1>

            <div>
                <label className="mb-1 block">Název</label>
                <input
                    type="text"
                    {...register("name", { required: "Název je povinný" })}
                    className="w-full rounded border p-2"
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
                <label className="mb-1 block">Cena (Kč)</label>
                <input
                    type="number"
                    {...register("price", { required: "Cena je povinná" })}
                    className="w-full rounded border p-2"
                    inputMode="decimal"
                />
                {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
            </div>
            <Button variant="secondary" type="submit" className="rounded bg-black px-4 py-2 text-white">
                {props.defaultValues ? "Uložit změny" : "Přidat produkt"}
            </Button>
        </form>
    );
}
