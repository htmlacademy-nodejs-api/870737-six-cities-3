import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import cors from 'cors';
import YAML from 'yaml';
const app = express();

const file = fs.readFileSync('specification/specification.yml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8000, () => {
  console.log('Swagger add on 8000 port');
});


