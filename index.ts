import express, { Request, Response } from 'express';
import cors from 'cors';
import {Laptops} from './scraper';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/:brand', async (req: Request, res: Response) => {
    let brand = req.params.brand;
    try {
        const laptops = await Laptops(brand);
        res.json(laptops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar laptops', error });
    }
});

app.post('/', async (req: Request, res: Response) => {
    let brand = req.body.filter;
    try {
        const laptops = await Laptops(brand);
        res.json(laptops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar laptops', error });
    }
});

app.use((req: Request, res: Response) => {
    res.status(400).json({
        message: 'Por favor, especifique um modelo, ex: http://127.0.0.1:3000/Lenovo!'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`http://127.0.0.1:${PORT}`);
});
