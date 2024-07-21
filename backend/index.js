const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'meowmeow',
  database: 'crm'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Endpoint to fetch all assessments
app.get('/assessments', (req, res) => {
  const sql = 'SELECT * FROM assessments';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint to create a new job
app.post('/assessments', (req, res) => {
  const { client_name, assessment_type, start_date, end_date, budget } = req.body;
  const sql = 'INSERT INTO assessments (client_name, assessment_type, start_date, end_date, budget) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [client_name, assessment_type, start_date, end_date, budget], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: result.insertId, client_name, assessment_type, start_date, end_date, budget });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
