/**
 * Provides data-access helpers for retrieving publisher records from the database.
 */
import { asc } from 'drizzle-orm';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';
import type { Database } from './db';

/**
 * Returns all publishers ordered alphabetically by name.
 *
 * @param db - The injectable database client used to query publishers.
 * @returns A promise resolving to publisher ids and names.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row): Publisher => ({
        id: row.id,
        name: row.name,
    }));
}
