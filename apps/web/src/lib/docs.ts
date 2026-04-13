import { getCollection } from 'astro:content';

export async function getDocs() {
	const docs = await getCollection('docs');
	return docs.sort((a, b) => {
		const orderA = a.data.sidebarOrder ?? 999;
		const orderB = b.data.sidebarOrder ?? 999;
		return orderA - orderB;
	});
}