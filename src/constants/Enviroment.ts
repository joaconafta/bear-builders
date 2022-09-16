export const enviroment = process.env.REACT_APP_ENV || 'production'

export const isDevelopment = enviroment === 'development'

export const isProduction = enviroment === 'production'
