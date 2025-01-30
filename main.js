const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const schedule = require('node-schedule');
const { sql } = require('./lib');
const app = express();
const port = 3000;

// Cấu hình EJS làm template engine
app.set('view engine', 'ejs');

// Set timezone for Vietnam (GMT+7)
const scheduleRule = new schedule.RecurrenceRule();
scheduleRule.tz = 'Asia/Ho_Chi_Minh';
scheduleRule.hour = 0;
scheduleRule.minute = 1;

// Function to fetch dictionary data
async function fetchDictionaryData() {
    try {
        const response = await axios.get("https://www.oxfordlearnersdictionaries.com/", {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Connection': 'keep-alive',
            },
            timeout: 5000
        });
        
        const html = response.data;
        const $ = cheerio.load(html)
        const word = $('.headword div').text().trim();
        const partOfSpeech = $(".pos").text().trim()
        const usPronunciation = $('#us_pron').attr('data-src-mp3');
        const ukPronunciation = $('#uk_pron').attr('data-src-mp3');

        await sql`INSERT INTO word_of_the_day (word, part_of_speech, us_pronunciation_file, uk_pronunciation_file) VALUES (${word}, ${partOfSpeech}, ${usPronunciation}, ${ukPronunciation})`

        console.log('Data fetched successfully at:', new Date().toLocaleString());
        return null;
    } catch(err) {
        console.error('Error fetching data:', err.message);
        throw err;
    }
}

// Schedule job using scheduleRule
schedule.scheduleJob(scheduleRule, async () => {
    try {
        await fetchDictionaryData();
        console.log('Data updated successfully');
    } catch (error) {
        console.error('Error during automatic update:', error.message);
    }
});

app.get("/word", async (req, res) => {
    try {
     
        const word = await sql`SELECT * from word_of_the_day ORDER BY created_at DESC LIMIT 1;`
        
        res.status(200).json({
            data: word,
            lastUpdated: new Date().toLocaleString()
        });

    } catch(err) {
        console.log('Error details:', err.message);
        res.status(500).json({
            error: "Error fetching data",
            message: err.message
        });
    }
});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    // Fetch data when server starts
    fetchDictionaryData()
        .then(data => {
            latestData = data;
            console.log('Initial data fetch successful');
        })
        .catch(err => console.error('Initialization error:', err.message));
});