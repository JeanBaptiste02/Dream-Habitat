CREATE TABLE IF NOT EXISTS app_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS photo (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    dateTaken DATE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS room (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    photo_id INT,
    FOREIGN KEY (photo_id) REFERENCES photo(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS result (
    id SERIAL PRIMARY KEY,
    beforePhoto_id INT,
    afterPhoto_id INT,
    description TEXT,
    dateresult DATE,
    FOREIGN KEY (beforePhoto_id) REFERENCES photo(id) ON DELETE SET NULL,
    FOREIGN KEY (afterPhoto_id) REFERENCES photo(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS history (
    id SERIAL PRIMARY KEY,
    user_id INT,
    result_id INT,
    dateviewed DATE,
    FOREIGN KEY (user_id) REFERENCES app_user(id) ON DELETE CASCADE,
    FOREIGN KEY (result_id) REFERENCES result(id) ON DELETE CASCADE
);