import app from './server.js';

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => console.log(`Election API ready on http://localhost:${port}`));
