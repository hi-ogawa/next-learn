// @ts-check

async function main() {
	process.env.POSTGRES_URL = "postgres://postgres:password@localhost:5432/development";
	const { sql } = await import("./vercel-postgres-local/index.js");
	console.log(await sql`SELECT 1 + 1`);
}

main();
