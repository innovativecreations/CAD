const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/cad', express.static(path.join(__dirname, 'public', 'cad')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.get('/models', (req, res) => {
    const basePath = path.join(__dirname, 'public', 'cad');
    fs.readdir(basePath, (err, folders) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }

        const projects = folders.map(folder => {
            const projectPath = path.join(basePath, folder);
            const files = fs.readdirSync(projectPath).filter(file => file.endsWith('.stl'));
            return files.map(file => ({
                name: folder,
                file
            }));
        }).flat();

        res.json(projects);
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
