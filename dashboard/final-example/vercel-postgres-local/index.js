import pg from "pg";

// quick alias package of @vercel/postgres for the ease of local db use
// https://github.com/vercel/storage/blob/0e8ede4fd4a8344422704a210494de4f8687bbd8/packages/postgres/src/index.ts

class MyPool extends pg.Pool {
	constructor() {
		// https://node-postgres.com/features/connecting
		super({
			connectionString: globalThis.process?.env?.POSTGRES_URL,
		});
	}

	/**
	 *
	 * @param {TemplateStringsArray} strings
	 * @param  {...any} values
	 */
	sql = (strings, ...values) => {
		let query = "";
		strings.forEach((s, i) => {
			if (i > 0) query += `$${i}`;
			query += s;
		});
		// https://node-postgres.com/features/queries
		return this.query(query, values);
	};
}

export const _pool = new MyPool();

export const sql = _pool.sql;

// quick workaround for seed/route.ts
//   const client = await db.connect();
export const db = {
	connect: () => _pool,
};
