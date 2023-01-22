import express, { Express, Request, Response } from 'express';
import fetch, { RequestInit } from 'node-fetch';
import dotenv from 'dotenv';
import { askGPT, initGPT } from './gpt.js';
import { ChatGPTAPIBrowser } from 'chatgpt';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let GPTSesion: ChatGPTAPIBrowser | null = null;

app.get('/initAPI', async (req: Request, res: Response) => {
  GPTSesion = await initGPT();
  if (GPTSesion){
    res.status(200).send({message: 'GPT initialized'});
  }
  else {
    GPTSesion = null;
    res.status(500).send({error: 'GPT unavailable'});
  }
});

app.get('/generateManifest', async (req: Request, res: Response) => {
  if (!req.query.url){
    res.status(400).send({error: 'URL not specified'});
    return;
  }

  const request = await fetch(req.query.url.toString());
  let rawHTML = await request.text();
  let headerHTML;

	if (typeof rawHTML === 'string') {
		rawHTML = rawHTML.replace(/\r|\n/g, '').replace(/\s{2,}/g, '');
		headerHTML = /<head>(.*)<\/head>/.test(rawHTML)? (rawHTML.match(/<head>(.*)<\/head>/) as string[])[0] : 'Head not found';
	}

  if (!GPTSesion){
    res.status(500).send({error: 'API not initialized'});
    return;
  }
  
  if (headerHTML){
    const manifest = await askGPT(headerHTML, GPTSesion);
    if (manifest) {
      res.status(200).send({manifest});
    }
    else 
      res.status(400).send({error: 'GPT unavailable or failed to generate manifest'});
  }
  else {
    res.status(400).send({error: '<head> HTML not found'});
  }
});

app.post('/generateWinPackage', async (req: Request, res: Response) => {
  if (!req.body?.manifest){
    res.status(400).send({error: 'Manifest not specified'});
    return;
  }
  if (!req.query?.url){
    res.status(400).send({error: 'URL not specified'});
    return;
  }

  let manifest = null;
  if (typeof req.body.manifest == 'object'){
    manifest =  req.body.manifest;
  } else { 
    res.status(400).send({error: 'Manifest is not a valid JSON'});
    return;
  }

  if (manifest?.icons?.length < 1) {
    res.status(400).send({error: 'Manifest has no icons'});
    return;
  }

  // {"name":"Microsoft Apps","short_name":"Microsoft Apps","start_url":"/","display":"standalone","theme_color":"#ffffff","background_color":"#ffffff","description":"Make Microsoft Windows your own with apps and themes that help you personalise Windows and be more productive.","icons":[{"src":"/store/images/logo-16x16.png?v=lOdDASudWX5I0YkpCu1DicAbwXJ87mUk-1A_lczTIEc","sizes":"16x16","type":"image/png"},{"src":"/store/images/logo-32x32.png?v=gBZzyJYt3-JPdgfYPGGoJ0bEEL2ozU5k4XVSpXSC3Ts","sizes":"32x32","type":"image/png"},{"src":"/store/images/logo-64x64.png?v=goKXuTDLKbFD3lo_TP4Vtbi7zdyQKKDs7GzLl-kv7K4","sizes":"64x64","type":"image/png"},{"src":"/store/images/logo-128x128.png?v=Gw_i5pK1zHf0Cp_XZ8FyU3fYU3JgX9W0x8aZU0-L5j4","sizes":"128x128","type":"image/png"},{"src":"/store/images/logo-256x256.png?v=vIx_WpJnNgKj-L5o_v5S5MjK5S5Jm7z9aF5xV1-L5j4","sizes":"256x256","type":"image/png"},{"src":"/store/images/logo-512x512.png?v=YsT9zC0xhEZ3q3Zb1OJh1fKj-L5o_v5S5MjK5S5Jm7z9","sizes":"512x512","type":"image/png"}]}
  // "backgroundColor":"#FFFFFF",
  let payload = {
    "name": (manifest.name || manifest.short_name || "Web Application") as string,
    "packageId":"PWA.ChatGPT.PoC",
    "url": req.query.url,
    "version":"1.0.1",
    "allowSigning":true,
    "publisher":{"displayName":"PWABuilder","commonName":"CN=3a54a224-05dd-42aa-85bd-3f3c1478fdca"},
    "generateModernPackage":true,
    "classicPackage":{"generate":false},
    "edgeHtmlPackage":{"generate":false},
    "manifest": manifest,
    "images":{"baseImage":manifest.icons[manifest.icons.length - 1].src,"padding":0},
    "resourceLanguage":"en","targetDeviceFamilies":["Desktop"]};

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }
  const request = await fetch("https://pwabuilder-winserver.centralus.cloudapp.azure.com/msix/generatezip", options);

  // res.setHeader('Content-disposition', `attachment; filename=${payload.name.trim()}.zip`);
  res.attachment(`${payload.name.trim()}.zip`);
  request.body?.pipe(res);
});

app.use('/', express.static('dist/ui'));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});