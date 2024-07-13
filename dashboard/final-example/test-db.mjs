// @ts-check

async function main() {
	process.env.POSTGRES_URL = "postgres://postgres:password@localhost:5432/development";
  const { sql, _pool } = await import("@vercel/postgres");
  console.log(await sql`SELECT 1 + 1`);
  await _pool.end();
}

main();
