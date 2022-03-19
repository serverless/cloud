import { data } from '@serverless/cloud'

export interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
}

export async function getProducts(): Promise<Product[]> {
    const { items } = await data.get('products:*');
    return items.map((item: any) => item.value as Product)
};

export async function getProduct (id: string): Promise<Product | undefined> {
    return await data.get(`products:${id}`) as Product;
};
