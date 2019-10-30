INSERT INTO users (
    first_name,
    last_name,
    email,
    password
) VALUES (
    ${firstName},
    ${lastName},
    ${email},
    ${password}
)
RETURNING*;