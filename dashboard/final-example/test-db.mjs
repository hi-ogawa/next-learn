// @ts-check

async function main() {
	// need to make sure same version as @vercel/storage
	const { neonConfig } = await import("@neondatabase/serverless");

	neonConfig.wsProxy = (host, port) => `${host}:${port}/v1`;
	neonConfig.useSecureWebSocket = false;
	neonConfig.pipelineConnect = false;

	// also done by by @vercel/postgres/index-node
	neonConfig.webSocketConstructor = (await import("ws")).default;

	const connectionString =
		"postgres://postgres:password@localhost:6432/development";
	process.env.POSTGRES_URL = connectionString;

	// TODO
	// explicit pool creation is working but not when using `sql` helper directly

	// OK
	// {
	// 	const { Pool } = await import("@neondatabase/serverless");
	// 	const pool = new Pool({ connectionString });
	// 	const client = await pool.connect();
	// 	const rows = await client.query("SELECT 1 + 1");
	// 	console.log(rows);
	// }

	// NOT OK
	// {
	// 	const { neon } = await import("@neondatabase/serverless");
	// 	const sql = neon(connectionString);
	// 	const rows = await sql`SELECT 1 + 1`;
	// 	console.log(rows);
	// }

	// OK
	{
		const { createPool } = await import("@vercel/postgres");
		const pool = createPool({ connectionString });
		const client = await pool.connect();
		console.log(await client.sql`SELECT 1 + 1`);
	}

	// NOT OK
	// {
	//   const { sql } = await import("@vercel/postgres");
	//   await sql.connect();
	//   // console.log(await sql`SELECT 1 + 1`);
	// }

	{
		const { sql } = await import("./vercel-postgres-local/index.js");
		console.log(await sql`SELECT 1 + 1`);
	}
}

main();
