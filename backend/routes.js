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

    if( !authorName || authorName.length === '' || authorName.length < 1 ) {
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

const authorPapers = async function (req, resp) {
    const authorId = req.params.authorId;
    if (!authorId || authorId.length === 0) {
        resp.status(400).send('Author ID cannot be empty');
        return;
    }

    connection.query(`
        select distinct p.*
        from paper p
        join paper_author pa on p.paper_id = pa.paper_id
        join author a on pa.author_id = a.author_id
        join paper_field pf on p.paper_id = pf.paper_id
        join field f on pf.field_id = f.field_id
        where a.author_id = ${authorId} order by pub_date desc
    `, ( error, result ) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error');
        } else {
            resp.json(result);
        }
    });
}

const authorCollaborators = async function (req, resp) {
    const authorId = req.params.authorId;
    if (!authorId || authorId.length === 0) {
        resp.status(400).send('Author ID cannot be empty');
        return;
    }

    connection.query(`
        with co as (SELECT a.author_id,
        COUNT(DISTINCT pa.paper_id) AS collab_count
        FROM author a
        JOIN paper_author pa ON a.author_id = pa.author_id
        WHERE pa.paper_id IN (
        SELECT paper_id FROM paper_author WHERE author_id = ${authorId}
        )
        GROUP BY a.author_id
        ORDER BY collab_count DESC
        LIMIT 10 offset 1)
        select author.*,collab_count  from author join co on author.author_id = co.author_id
    `, (error, result) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error');
        } else {
            resp.json(result);
        }
    });
}

const paper = async function (req, resp) {
    const paperId = req.params.paperId;
    if (!paperId || paperId.length === 0) {
        resp.status(400).send('Paper ID cannot be empty');
        return;
    }

    connection.query(`
        select p.*,e.ArXiv,e.DOI,a.content abstract 
        from paper p join external_ids e on p.paper_id = e.paper_id
        left join abstract a on p.paper_id = a.paper_id
        where p.paper_id = ${paperId}
    `, (error, result) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error');
        } else {
            resp.json(result);
        }
    });
}

const relatedPaper = async function (req, resp) {
    const paperId = req.params.paperId;
    if (!paperId || paperId.length === 0) {
        resp.status(400).send('Paper ID cannot be empty');
        return;
    }

    connection.query(`
        with temp as (select venue,pub_date from paper where paper_id = ${paperId})
        select * from paper where venue = 
        (select venue from temp) and pub_date between 
        (select pub_date from temp) - 45 and 
        (select pub_date from temp) + 45 and paper_id <> ${paperId}
    `, (error, result) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error');
        } else {
            resp.json(result);
        }
    });
}

const topAuthors = async function (req, resp) {
    let topN = req.query.topN;
    let criterion = req.query.criterion;
    let filed_name = req.query.filed_name;
    if (!topN || topN.length === 0) {
        topN = 10;
    }
    if (!criterion || criterion.length === 0) {
        criterion = 'h_index';
    }
    if (!filed_name || filed_name.length === 0) {
        resp.status(400).send('Field Name cannot be empty');
        return;
    }

    connection.query(`
        SELECT * FROM author LIMIT ${topN}
    `, (error, result) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error');
        } else {
            resp.json(result);
        }
    });
}

const topPapers = async function (req, resp) {
    let topN = req.query.topN;
    let criterion = req.query.criterion;
    let field_name = req.query.field_name;
    if (!topN || topN.length === 0) {
        topN = 10;
    }
    if (!criterion || criterion.length === 0) {
        criterion = 'citation_count';
    }
    if (!field_name || field_name.length === 0) {
        resp.status(400).send('Field Name cannot be empty');
        return;
    }

    connection.query(`
        select p.* from paper p join paper_field pf on p.paper_id = pf.paper_id
        join field f on pf.field_id = f.field_id
        where f.field_name = '${field_name}' order by ${criterion} desc limit ${topN}
    `, (error, result) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error');
        } else {
            resp.json(result);
        }
    });
}

const risingStartPapers = async function (req, resp) {
    const topN = req.query.topN;
    const field_name = req.query.field_name;

    if (!topN || topN.length === 0) {
        topN = 10;
    }

    if (!field_name || field_name.length === 0) {
        resp.status(400).send('Field Name cannot be empty');
        return;
    }

    connection.query(`
        select p.* from paper p join paper_field pf on p.paper_id = pf.paper_id
        join field f on pf.field_id = f.field_id
        where f.field_name = '${field_name}' order by citation_count desc limit ${topN}
    `, (error, result) => {
        if (error) {
            console.log(error);
            resp.status(500).send('Error');
        } else {
            resp.json(result);
        }
    });
}

module.exports = {
    author, authorPapers, authorCollaborators, paper, relatedPaper, topAuthors, topPapers, risingStartPapers
}
