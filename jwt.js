var jwt = require('jsonwebtoken');

var token = jwt.sign({ data: 'demoon' }, 'myScret', { expiresIn: '1h' });
console.log(token);

var tokenValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGVtb29uIiwiaWF0IjoxNjQzNTgwOTA1LCJleHAiOjE2NDM1ODQ1MDV9.JowK9-ZhnOMstXtc07YbW8WFUs89rTOOQYVRaS3uvlU'
