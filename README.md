# Word of the Day API Documentation

## Overview
The **Word of the Day API** provides a new English word each day, including its meaning, part of speech, pronunciation files, and example usage. The data is sourced from the Oxford Dictionary, ensuring accuracy and high-quality content.

## Base URL
```
https://wordoftheday.thich.in/api/v1
```

## Endpoints

### 1. Get Word of the Day
**Endpoint:**
```
GET /word-of-the-day
```

**Description:**
Retrieves the latest word of the day.

**Response Example:**
```json
{
  "word": "serendipity",
  "part_of_speech": "noun",
  "definition": "The occurrence of events by chance in a happy or beneficial way.",
  "us_pronunciation_file": "https://example.com/us-serendipity.mp3",
  "uk_pronunciation_file": "https://example.com/uk-serendipity.mp3",
  "example": "Finding that book was pure serendipity!"
}
```

### 2. Get Word by Date
**Endpoint:**
```
GET /word-of-the-day/{date}
```

**Description:**
Retrieves the word of the day for a specific date.

**Parameters:**
- `date` (string, required): Date in `YYYY-MM-DD` format.

**Example Request:**
```
GET /word-of-the-day/2024-01-30
```

**Response Example:**
```json
{
  "word": "ephemeral",
  "part_of_speech": "adjective",
  "definition": "Lasting for a very short time.",
  "us_pronunciation_file": "https://example.com/us-ephemeral.mp3",
  "uk_pronunciation_file": "https://example.com/uk-ephemeral.mp3",
  "example": "The beauty of the sunset was ephemeral but breathtaking."
}
```

### 3. Get Random Word
**Endpoint:**
```
GET /random-word
```

**Description:**
Retrieves a random word from the database.

**Response Example:**
```json
{
  "word": "lucid",
  "part_of_speech": "adjective",
  "definition": "Expressed clearly; easy to understand.",
  "us_pronunciation_file": "https://example.com/us-lucid.mp3",
  "uk_pronunciation_file": "https://example.com/uk-lucid.mp3",
  "example": "She gave a lucid explanation of the complex topic."
}
```

## Error Responses
| Status Code | Meaning |
|-------------|---------|
| 400 | Bad Request – Invalid input or missing parameters. |
| 404 | Not Found – No word found for the given date. |
| 500 | Internal Server Error – An unexpected error occurred. |

## Authentication
This API is **public** and does not require authentication at this time.

## Deployment & Contribution
The API source code is available at: [GitHub Repository](https://github.com/nguyentuan1696/word-of-the-day-api)

If you would like to contribute, submit a pull request or open an issue in the repository.

## License
This project is licensed under the MIT License.

