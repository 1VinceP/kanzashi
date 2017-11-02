INSERT INTO Users
    ( username, email, auth_id )
    VALUES
        ( $1, $2, $3 )
            RETURNING *;