import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'AppDB.db';
const database_version = '1.0';
const database_displayname = 'SQLite App Database';
const database_size = 200000;

let db;
const tableName = {
    users: "users98765210",
    cart: "cart98765210",
    favorites: "favorites98765210",
    orders: "orders98765210",
}

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
            `CREATE TABLE IF NOT EXISTS ${tableName.users} ( id INT PRIMARY KEY, name VARCHAR(255) NOT NULL , email VARCHAR(255) NOT NULL , picture VARCHAR(255) NULL , role VARCHAR(50) NOT NULL DEFAULT 'customer' , last_used TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , token VARCHAR(255) NOT NULL, active BOOLEAN NOT NULL );`,
            `CREATE TABLE IF NOT EXISTS ${tableName.cart} ( product_id INT PRIMARY KEY, product_qty INT NOT NULL DEFAULT 1 );`,
            `CREATE TABLE IF NOT EXISTS ${tableName.favorites} ( product_id INT PRIMARY KEY );`,
            `CREATE TABLE IF NOT EXISTS ${tableName.orders} ( order_id INT PRIMARY KEY, order_count INT NOT NULL CHECK (order_count > 0), order_price INT NOT NULL CHECK (order_price > 0) );`
        ];
        await Promise.all(query.map(q => {
            console.table({ query: JSON.stringify(q, null, 2) })
            return database.executeSql(q)
        }));
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
            INSERT INTO ${tableName.cart} (product_id, product_qty)
            VALUES (?, 1)
            ON CONFLICT(product_id) DO UPDATE SET product_qty = product_qty + 1;
        `;
        await SQLiteService.executeQuery(query, [productId]);

        // Return the updated row
        const selectQuery = `SELECT * FROM ${tableName.cart} WHERE product_id = ?;`;
        const [updatedItem] = await SQLiteService.executeQuery(selectQuery, [productId]);
        return updatedItem;
    },
    removeFromCart: async (productId) => {
        const checkQuery = `SELECT product_qty FROM ${tableName.cart} WHERE product_id = ?;`;
        const rows = await SQLiteService.executeQuery(checkQuery, [productId]);

        if (rows.length && rows[0].product_qty > 1) {
            const updateQuery = `
                UPDATE ${tableName.cart}
                SET product_qty = product_qty - 1
                WHERE product_id = ?;
            `;
            await SQLiteService.executeQuery(updateQuery, [productId]);

            const [updatedItem] = await SQLiteService.executeQuery(`SELECT * FROM ${tableName.cart} WHERE product_id = ?;`, [productId]);
            return updatedItem;
        } else {
            const deleteQuery = `DELETE FROM ${tableName.cart} WHERE product_id = ?;`;
            await SQLiteService.executeQuery(deleteQuery, [productId]);
            return null; // Item was removed
        }
    },
    getCartItemById: async (productId) => {
        const query = `SELECT * FROM ${tableName.cart} WHERE product_id = ?;`;
        const result = await SQLiteService.executeQuery(query, [productId]);
        return result.length ? result[0] : null;
    },
    getCartItems: async () => {
        const query = `
            SELECT *, (SELECT SUM(product_qty) FROM ${tableName.cart}) as total_qty
            FROM ${tableName.cart};
        `;
        return await SQLiteService.executeQuery(query);
    },
    toggleFavorite: async (productId) => {
        const exists = await SQLiteService.executeQuery(
            `SELECT product_id FROM ${tableName.favorites} WHERE product_id = ?;`,
            [productId]
        );

        if (exists.length > 0) {
            await SQLiteService.executeQuery(`DELETE FROM ${tableName.favorites} WHERE product_id = ?;`, [productId]);
            return false; // Removed
        } else {
            await SQLiteService.executeQuery(`INSERT INTO ${tableName.favorites} (product_id) VALUES (?);`, [productId]);
            return true; // Added
        }
    },
    getFavorites: async () => {
        const query = `SELECT * FROM ${tableName.favorites};`;
        return await SQLiteService.executeQuery(query);
    },
    isFavorite: async (productId) => {
        const result = await SQLiteService.executeQuery(
            `SELECT product_id FROM ${tableName.favorites} WHERE product_id = ?;`,
            [productId]
        );
        return result.length > 0;
    },
    getActiveUser: async () => {
        const query = `SELECT * FROM ${tableName.users} WHERE active = 1;`;
        return await SQLiteService.executeQuery(query);
    },
    loginUser: async ({ id, name, email, picture, role, token }) => {
        const query_1 = `UPDATE ${tableName.users} SET active = 0;`;
        await SQLiteService.executeQuery(query_1);
        const query_2 = `INSERT OR REPLACE INTO ${tableName.users} (id, name, email, picture, role, last_used, token, active) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, 1);`
        const result = await SQLiteService.executeQuery(query_2, [
            id, name, email, picture, role, token
        ]);
        return result;
    }

};

export default SQLiteService;
