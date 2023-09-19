#!/usr/bin/env node
const nameArg = capitalize(process.argv[2] || process.env.USER || 'World')
console.log(`Hello ${nameArg}`)

function capitalize(str) {
    return str
        .trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}