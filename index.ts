import express, { Request, Response } from 'express';
import cors from 'cors';
import {Laptops} from './scraper';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/laptops/:marca', async (req: Request, res: Response) => {
    let marca = req.params.marca;
    try {
        const laptops = await Laptops(marca);
        res.json(laptops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar laptops', error });
    }
});

app.get('/laptops', async (req: Request, res: Response) => {
    res.status(500).json({ message: 'Por favor, especifique um modelo, ex: http://127.0.0.1:3000/Lenovo!'});
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
