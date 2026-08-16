import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { adminRouter } from './routes/admin.router';

dotenv.config();

const app = express();
const PORT = process.env.ADMIN_PORT || 3001;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);

app.get('/', (_req: Request, res: Response) => {
    res.redirect('/admin');
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`[Shop.Admin] Админка запущена на http://localhost:${PORT}/admin`);
});
