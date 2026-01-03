import express from 'express';
const app = express();

app.post('/website', (req, res) => {
    res.send('Hello, World!');
});

app.get('/status/:websiteId', (req, res) => {
    const websiteId = req.params.websiteId;
    res.send(`Status of website with ID: ${websiteId}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;
