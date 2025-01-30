# word-of-the-day-api

```sql
CREATE TABLE word_of_the_day (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL,
    part_of_speech VARCHAR(50) NOT NULL,
    us_pronunciation_file VARCHAR(255),
    uk_pronunciation_file VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```