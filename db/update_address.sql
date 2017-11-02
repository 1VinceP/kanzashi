UPDATE Users
    SET street1 = $2,
        street2 = $3,
        city = $4,
        state = $5,
        zip = $6
            WHERE id = $1
                RETURNING *;