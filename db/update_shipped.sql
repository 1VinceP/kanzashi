UPDATE Products
    SET shipped = $2
        WHERE id = $1;