export default {
    API: {
        NAME: 'Micro-Services Punto de venta NodeJS',
        PORT: 5000,
        ENVIRONMENT: 'Development'
    },
    NOTIFY: {
        DELAY: 1000 * 10        // 10 Segundos
    },
    TOKEN: {
        SECRET_KEY:'passwordKwy123',
        EXPIRES: 5000  // 5segundos
    },
    MONGODB: {
         HOST: '165.22.234.116',
         PORT: 27017,
         USER_NAME: 'dba-root',
         USER_PASSWORD: 'mongoadminpwd',
         DEFAULT_DATABASE: 'admin'
    }
};