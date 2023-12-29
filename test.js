const base62 = require('base62/lib/ascii');
// import base62 from 'base62';

base62.encode(999); // "g7"
base62.decode('g7'); // 999

console.log(base62.encode(999));
console.log(base62.decode('g7'));
