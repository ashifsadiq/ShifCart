import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'AppDB.db';
const database_version = '1.0';
const database_displayname = 'SQLite App Database';
const database_size = 200000;

let db;

const SQLiteService = {
    open: async () => {
        if (db) return db;
        db = await SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
        );
        return db;
    },

    close: async () => {
        if (db) {
            await db.close();
            db = null;
        }
    },

    initDB: async () => {
        const database = await SQLiteService.open();
        const query = [
            `CREATE TABLE IF NOT EXISTS cart (
            product_id INT PRIMARY KEY,
            product_qty INT NOT NULL DEFAULT 1
        );`,
            `CREATE TABLE IF NOT EXISTS favorites (
            product_id INT PRIMARY KEY
        );`
        ];
        await Promise.all(query.map(q => database.executeSql(q)));
        console.log('tables created')
    },

    executeQuery: async (query, params = []) => {
        const database = await SQLiteService.open();
        try {
            const [results] = await database.executeSql(query, params);
            const rows = [];
            for (let i = 0; i < results.rows.length; i++) {
                rows.push(results.rows.item(i));
            }
            return rows;
        } catch (error) {
            console.error('SQLite query error:', error);
            throw error;
        }
    },
    addToCart: async (productId) => {
        const query = `
            INSERT INTO cart (product_id, product_qty)
            VALUES (?, 1)
            ON CONFLICT(product_id) DO UPDATE SET product_qty = product_qty + 1;
        `;
        await SQLiteService.executeQuery(query, [productId]);

        // Return the updated row
        const selectQuery = `SELECT * FROM cart WHERE product_id = ?;`;
        const [updatedItem] = await SQLiteService.executeQuery(selectQuery, [productId]);
        return updatedItem;
    },
    removeFromCart: async (productId) => {
        const checkQuery = `SELECT product_qty FROM cart WHERE product_id = ?;`;
        const rows = await SQLiteService.executeQuery(checkQuery, [productId]);

        if (rows.length && rows[0].product_qty > 1) {
            const updateQuery = `
                UPDATE cart
                SET product_qty = product_qty - 1
                WHERE product_id = ?;
            `;
            await SQLiteService.executeQuery(updateQuery, [productId]);

            const [updatedItem] = await SQLiteService.executeQuery(`SELECT * FROM cart WHERE product_id = ?;`, [productId]);
            return updatedItem;
        } else {
            const deleteQuery = `DELETE FROM cart WHERE product_id = ?;`;
            await SQLiteService.executeQuery(deleteQuery, [productId]);
            return null; // Item was removed
        }
    },
    getCartItemById: async (productId) => {
        const query = `SELECT * FROM cart WHERE product_id = ?;`;
        const result = await SQLiteService.executeQuery(query, [productId]);
        return result.length ? result[0] : null;
    },
    getCartItems: async () => {
        const query = `SELECT * FROM cart;`;
        return await SQLiteService.executeQuery(query);
    },
    toggleFavorite: async (productId) => {
        const exists = await SQLiteService.executeQuery(
            `SELECT product_id FROM favorites WHERE product_id = ?;`,
            [productId]
        );

        if (exists.length > 0) {
            await SQLiteService.executeQuery(`DELETE FROM favorites WHERE product_id = ?;`, [productId]);
            return false; // Removed
        } else {
            await SQLiteService.executeQuery(`INSERT INTO favorites (product_id) VALUES (?);`, [productId]);
            return true; // Added
        }
    },
    getFavorites: async () => {
        const query = `SELECT * FROM favorites;`;
        return await SQLiteService.executeQuery(query);
    },
    isFavorite: async (productId) => {
        const result = await SQLiteService.executeQuery(
            `SELECT product_id FROM favorites WHERE product_id = ?;`,
            [productId]
        );
        return result.length > 0;
    },

};

export default SQLiteService;
