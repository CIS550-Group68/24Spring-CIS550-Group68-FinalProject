const searchAuthorQuery = `
    with temp as
    (select a.author_id,field_name, count(distinct p.paper_id) paper_count from author_name_or_alias aa
    join author a on aa.author_id = a.author_id
    join paper_author pa on a.author_id = pa.author_id
    join paper p on pa.paper_id = p.paper_id
    join paper_field pf on p.paper_id = pf.paper_id
    join field f on pf.field_id = f.field_id
    where name_or_alias like "${authorName}%"
    group by a.author_id, field_name),
    author_fields as (select max_field.author_id, GROUP_CONCAT(field_name ORDER BY field_name SEPARATOR ', ') AS fields from temp inner join
    (select author_id, max(paper_count) max_count from temp group by author_id) max_field
    on temp.author_id = max_field.author_id and temp.paper_count = max_field.max_count
    group by max_field.author_id)
    select author.*, author_fields.fields from author join author_fields on author_fields.author_id = author.author_id order by h_index desc limit 10;
`;

const getAuthorByIdQuery = `
    select * from author where author_id = ${author_id};
`;

const getPaper = `
    select distinct p.*
    from paper p
    join paper_author pa on p.paper_id = pa.paper_id
    join author a on pa.author_id = a.author_id
    join paper_field pf on p.paper_id = pf.paper_id
    join field f on pf.field_id = f.field_id
    where a.author_id = 46865129 order by pub_date desc;
`;

module.exports = { searchAuthorQuery, getAuthorByIdQuery, getPaper };