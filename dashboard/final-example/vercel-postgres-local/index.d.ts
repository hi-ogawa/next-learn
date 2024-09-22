export const _pool: any;

export const db: any;

export function sql<T = any>(
	strings: TemplateStringsArray,
	...values: unknown[]
): Promise<{ rows: T[] }>;
