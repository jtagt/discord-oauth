const express = require('express');
const app = express();

// @ts-ignore
const { Client, types: { AUTHORIZATION } } = require('../dist');

const oauthClient = new Client("id", "secret");
const auth = oauthClient.create(AUTHORIZATION, {
    scopes: ['identify'],
    redirect: "callback",
    returnUrl: "return"
});

app.get('/auth', (req, res) => {
    const url = auth.generate().url;
    res.redirect(url + "&prompt=none");
});

app.get('/callback', async (req, res) => {
    const data = await auth.callback(req.query);

    if (data.error) return res.redirect('/');

    //do stuff

    res.redirect('/');
});

app.listen(5000);