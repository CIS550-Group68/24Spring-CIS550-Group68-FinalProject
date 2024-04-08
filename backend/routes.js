const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

const author = async function(req, res) {
    const authorName = req.query.authorName;
    console.log('Received request for author');
    connection.query(`SELECT * FROM author_name_or_alias WHERE name_or_alias LIKE \'%${authorName}\'`, (err, results) => {
        if (err) {
            res.status(500).send('An error occurred: ' + err);
            return;
        }
        res.json(results);
    }
)};

module.exports = {
    author
}
