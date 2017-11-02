UPDATE Products
    Set quantity = $2
        WHERE id = $1;