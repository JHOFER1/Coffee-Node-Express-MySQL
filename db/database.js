import { createPool } from 'mysql2/promise';
// const { patch } = require('../routes');
import {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE
} from './config.js';

export const pool =  createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
});

pool.getConnection(async (err, connection) => {
    if (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('DATABLASE CONECTIION VAS CLOSED')
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('DATABASE HAS TO MANY CONNECTIONS')
                break;
            case 'ECONNREFUSED':
                console.error('DATABASE CONECTION WAS REFUSED')
                break;
            case 'ER_BAD_DB_ERROR':
                console.error('database specified in the connection string does not exist.DATABLASE CONECTIION VAS CLOSED')
                break;
            case 'ER_ACCESS_DENIED_ERROR':
                console.error(' user name and password are not valid')
                break;
            case 'ER_NO_SUCH_TABLE':
                console.error('references a table that does not exist in the database')
                break;
            case 'ER_HOST_NOT_PRIVILEGED':
                console.error('conectar a un host que no existe o no es accesible.')
                break;
            case 'ER_HOST_NOT_REACHABLE':
                console.error(' problema de red o a una configuración de firewall')
                break;
            case 'ER_HOSTNAME':
                console.error(' problema con el nombre del HOst')
                break;
            case 'ER_HOST_IS_BLOCKED':
                console.error('HOST BLOQUEADO')
                break;
            default:
                console.error('Unknow ERROR')
                console.log(err.code)
                console.log(err)
        }
    }
    if (connection) {
        connection.release();
        console.log('DB is Connected');
        return;
    }
});
