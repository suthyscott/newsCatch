UPDATE users
SET email = ${email}, first_name = ${first_name}, last_name = ${last_name}, password = ${password}
WHERE user_id = ${user_id}
RETURNING*;
