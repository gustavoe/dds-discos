const dbConfig = {
    dialect: 'sqlite',
    storage: process.env.DB_LOCATION || './.datos/discos.db'
};

module.exports = dbConfig;