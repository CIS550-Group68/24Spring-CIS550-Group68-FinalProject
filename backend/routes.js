const mysql = require('mysql')
const config = require('./config.json')

// const queries = require('./query.js');

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

const author = async function (req, resp) {
    // Extracts the query parameter from the request URL
    const authorName = req.query.authorName;

    if(!authorName || authorName.length === '' || authorName.length < 1) {
        resp.status(400).send('Author name cannot be empty');
        return;
    }
    // Executes the query stored in query.js
    connection.query(`
        with temp as
        (select a.author_id,field_name, count(distinct p.paper_id) paper_count from author_name_or_alias aa
        join author a on aa.author_id = a.author_id
        join paper_author pa on a.author_id = pa.author_id
        join paper p on pa.paper_id = p.paper_id
        join paper_field pf on p.paper_id = pf.paper_id
        join field f on pf.field_id = f.field_id
        where name_or_alias like '%${authorName.trim()}%'
        group by a.author_id, field_name),
        author_fields as (select max_field.author_id, GROUP_CONCAT(field_name ORDER BY field_name SEPARATOR ', ') AS fields from temp inner join
        (select author_id, max(paper_count) max_count from temp group by author_id) max_field
        on temp.author_id = max_field.author_id and temp.paper_count = max_field.max_count
        group by max_field.author_id)
        select author.*, author_fields.fields from author join author_fields on author_fields.author_id = author.author_id order by h_index desc limit 10
    `, (err, res) => {
        if (err) {
            console.log(err);
            resp.status(500).send('Error');
        } else {
        // Sends the response in JSON format
            resp.json(res);
        }
    });
};

module.exports = {
    author
}
