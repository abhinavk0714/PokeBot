const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop.js')(sequelize, Sequelize.DataTypes);
require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Poke Ball', cost: 1 }),
		CurrencyShop.upsert({ name: 'Great Ball', cost: 3 }),
		CurrencyShop.upsert({ name: 'Ultra Ball', cost: 5 }),
        CurrencyShop.upsert({ name: 'Potion', cost: 1 }),
		CurrencyShop.upsert({ name: 'Super Potion', cost: 3 }),
		CurrencyShop.upsert({ name: 'Hyper Potion', cost: 5 }),
	];

	await Promise.all(shop);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);