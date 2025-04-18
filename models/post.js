const sequelize = require('sequelize');

// Função para converter string em boolean
const strToBool = (value) => {
  return value === 'true';
};

const DB_DATABASE = process.env.DB_DATABASE || "noticiasdb";
const DB_USERNAME = process.env.DB_USERNAME || "noticias";
const DB_PASSWORD =  "pg1234";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT, 10) || 5432; 
const DB_SSL_REQUIRE =  strToBool(process.env.DB_SSL_REQUIRE) || false;

const seque = new sequelize.Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: DB_SSL_REQUIRE ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  });

class Post extends sequelize.Model {
  
  // save() {

  //   console.log('Entrou')
  //   super.save();
  // }
}

exports.initDatabase = (seque) => {

  if (!seque) {
    seque = new sequelize.Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
      dialectOptions: {
        ssl: DB_SSL_REQUIRE ? {
          require: true,
          rejectUnauthorized: false
        } : false
      }
    });
  }

  Post.init({
    title: {
      type: sequelize.DataTypes.STRING,
      require: true
    },
    summary: {
      type: sequelize.DataTypes.STRING,
      require: true
    },
    publishDate: {
      type: sequelize.DataTypes.DATEONLY,
      require: true
    },
    content: {
      type: sequelize.DataTypes.STRING(2000),
      require: true
    },
  }, {
    sequelize: seque, // We need to pass the connection instance
    modelName: 'Post' // We need to choose the model name
  })

  console.log(DB_PORT);
    seque.sync({ alter: true })
}

exports.Post = Post;

