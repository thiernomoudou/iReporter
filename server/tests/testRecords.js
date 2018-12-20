
export const user1Query = `INSERT INTO
users(username, email, password, registered, modifieddate)
VALUES($1, $2, $3, $4, $5) returning *`;

export const user2Query = `INSERT INTO
users(username, email, password, registered, modifieddate, isadmin)
VALUES($1, $2, $3, $4, $5, $6) returning *`;

export const incident1Query = `INSERT INTO
incidents(type, location, createdby, title)
VALUES($1, $2, $3, $4) returning *`;

export const incident2Query = `INSERT INTO
incidents(type, location, createdby, title)
VALUES($1, $2, $3, $4) returning *`;
