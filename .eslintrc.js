module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  parserOptions: {
    project: './tsconfig.json', // Chemin vers ton fichier tsconfig.json
  },
  rules: {
    // Désactivation des règles
    'no-console': 'off', // Désactive l'interdiction d'utiliser console
    '@typescript-eslint/no-confusing-void-expression': 'off', // Désactive la règle sur les expressions de type void
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off', // Désactive l'obligation d'utiliser unknown dans le catch
    '@typescript-eslint/no-unsafe-assignment': 'off', // Désactive la règle sur l'assignation d'`any`
    'import/no-default-export': 'off', // Désactive la règle sur les exports par défaut
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'warn', // Avertir mais pas bloquer
    '@typescript-eslint/no-unsafe-return': 'warn',

  },
};
