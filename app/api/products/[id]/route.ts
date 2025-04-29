import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const productId = Number(params.id);

    try {
        const body = await req.json();

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name: body.name,
                price: body.price,
            },
        });

        return new Response(JSON.stringify(updatedProduct), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to update product", { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
        const deletedProduct = await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json(deletedProduct);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 404 });
    }
}
