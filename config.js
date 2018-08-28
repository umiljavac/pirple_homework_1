/**
 * Title: Configuration files
 * Description: environment variables to export
 * Date: 28/08/2018*
 */

const environments = {};

// Development environment also default
environments.dev = {
    'httpPort' : 3000,
    'envName' : 'development'
};

// Production environment
environments.prod = {
    'httpPort' : 5000,
    'envName' : 'production'
};

// Determine which environment was passed as a command-line argument

const currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that current environment is contained in const environments, if not, default dev environment

const envToExport = typeof environments[currentEnv] === 'object' ? environments[currentEnv] : environments.dev;

module.exports = envToExport;