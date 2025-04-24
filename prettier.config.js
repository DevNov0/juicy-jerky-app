/** @type {import("prettier").Config} */
const prettierConfig = {
    bracketSameLine: false,
    bracketSpacing: true,
    printWidth: 120,
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "all",

    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            options: {
                parser: "typescript",
                plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
                organizeImportsSkipDestructiveCodeActions: true,
                tailwindFunctions: ["cx", "cxa"],
            },
        },
        {
            files: "*.js",
            options: {
                parser: "babel",
                plugins: ["prettier-plugin-organize-imports"],
                organizeImportsSkipDestructiveCodeActions: true,
            },
        },
        {
            files: "*.css",
            options: {
                parser: "css",
                plugins: ["prettier-plugin-css-order", "prettier-plugin-tailwindcss"],
                cssDeclarationSorterOrder: "alphabetical",
            },
        },
    ],
};

module.exports = prettierConfig;
