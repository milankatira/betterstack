import express from 'express';
import prisma from 'store/client';
const app = express();

app.use(express.json());

app.post('/website', async (req, res) => {
    if (!req.body.url) {
        res.status(411).json({ error: 'url is required' });
        return;
    }
    try {
        const existing = await prisma.website.findUnique({
            where: { url: req.body.url },
        });
        if (existing) {
            res.status(409).json({
                error: 'Website already exists',
                website: existing,
            });
            return;
        }
        const website = await prisma.website.create({
            data: {
                url: req.body.url,
            },
        });
        res.status(201).json(website);
    } catch (error) {
        console.error('Error creating website:', error);
        res.status(500).json({ error: 'Failed to create website' });
    }
});

app.get('/status/:websiteId', (req, res) => {
    const websiteId = req.params.websiteId;
    res.send(`Status of website with ID: ${websiteId}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;
