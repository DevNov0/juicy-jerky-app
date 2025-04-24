import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET - získání všech produktů
export async function GET() {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}

// POST - přidání nového produktu
export async function POST(req: Request) {
    const body = await req.json();

    const product = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price,
        },
    });

    return NextResponse.json(product);
}
