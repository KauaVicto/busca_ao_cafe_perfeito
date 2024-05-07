import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from '@router/index';
import { errorMiddleware } from '@middleware/errorMiddleware';
import swagger from 'swagger-ui-express';
import swaggerDocs from '@doc/swagger.json';

dotenv.config();

// Set TimeZone
process.env.TZ = 'America/Sao_Paulo';

const app = express();

app.use(express.json());


// Configuração do cors
app.use(cors({
    origin: '*'
}));

// Rotas da API
app.use(router);

// Rota da documentação da API
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocs));

app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.json({ msg: 'opa' })
});

// Middleware para tratamento de erros
app.use(errorMiddleware);

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`Server is running on port ${port}.`));