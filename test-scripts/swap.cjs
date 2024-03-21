const fs = require('fs');

const path = require('path');

const projectRoot = path.resolve(__dirname, '../');

const swapFiles = [
    {
        original: path.join(projectRoot, 'src/components/Navigation/Navigation.tsx'),
        swap: path.join(projectRoot, 'src/components/Navigation/Navigation.swap.tsx')
    }
];

swapFiles.forEach(({ original, swap }) => {
    const fd = fs.openSync(original);
    const originalContent = fs.readFileSync(original, 'utf8');
    fs.writeFileSync(`${original}.bak`, originalContent);
    console.log('wrote on bak');
    fs.closeSync(fd);
    const fdS = fs.openSync(swap);
    const swapContent = fs.readFileSync(swap, 'utf8');
    fs.writeFileSync(original, swapContent);
    console.log('wrote on original');
    fs.closeSync(fdS);
    fs.writeFileSync(swap, originalContent);
    console.log('wrote on swap');
    fs.unlinkSync(`${original}.bak`);
    console.log('Removed backup file');
    console.log('Files swapped for testing');
});