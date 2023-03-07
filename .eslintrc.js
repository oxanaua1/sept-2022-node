module.exports = {
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  root: true,
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "req|res|next" }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};

//https://typescript-eslint.io/getting-started/ (встановити eslint, створити файл .eslintrc.js,
// скопіювати туди модулі по дефолту module.exports = {...)
//встановлюємо npm i eslint-config-prettier,
//встановлюємо npm i eslint-plugin-prettier,
//змінюємо  на "plugin:prettier/recommended",
//в налаштуваннях eslint, Automatic Eslint conf,
//alt+enter - fix current file,
//"no-unused-vars": ["error", { argsIgnorePattern: "req|res|next" }] - кидатиме помилку на все крім трьох змінних,
//npm i --save-dev eslint-plugin-simple-import-sort- для порядкування імпортів
