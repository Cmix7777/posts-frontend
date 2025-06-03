module.exports = {
    root: true,
    env:{
        browser:true,
        node:true,
        es2024:true,
    },
    parser:'@typescript-eslint/parser',
    parserOptions:{
        ecmaVersion:'2024',
        sourceType:'module',
    },
    extends:[
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@nuxtjs/eslint-config',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    plugins:[
        'vue',
        '@typescipt-eslint',
    ],
    rules:{}
}