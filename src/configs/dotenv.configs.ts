import 'dotenv/config';
import * as joi from 'joi';

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVER: joi.string().required(),
  })
  .unknown(true);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

interface Env {
  PORT: number;
  NATS_SERVER: string;
}

const env: Env = value as Env;

export const envs = {
  PORT: env?.PORT,
  NATS_SERVER: env?.NATS_SERVER,
};
