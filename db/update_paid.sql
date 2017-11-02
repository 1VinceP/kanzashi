UPDATE Products
    SET paid = true
        WHERE creatorid = $1
            RETURNING *;