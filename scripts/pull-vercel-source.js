/* eslint-disable */
// Downloads all source files from a Vercel deployment into a target directory.
// Requires: node >= 18, a Vercel API token.
// Usage: node scripts/pull-vercel-source.js <deploymentId> <teamId> <outDir>

const fs = require('fs');
const path = require('path');

const TOKEN = process.env.VERCEL_TOKEN;
const [, , deploymentId, teamId, outDir] = process.argv;
if (!TOKEN || !deploymentId || !teamId || !outDir) {
  console.error('Usage: VERCEL_TOKEN=... node scripts/pull-vercel-source.js <deploymentId> <teamId> <outDir>');
  process.exit(1);
}

const API = 'https://api.vercel.com';
const headers = { Authorization: `Bearer ${TOKEN}` };

async function fetchJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} ${url}`);
  return res.json();
}

async function fetchFile(uid) {
  const url = `${API}/v7/deployments/${deploymentId}/files/${uid}?teamId=${teamId}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} uid=${uid}`);
  const body = await res.json();
  return Buffer.from(body.data, 'base64');
}

let downloaded = 0;
let skipped = 0;
const queue = [];

function enqueue(node, prefix) {
  const p = path.join(prefix, node.name);
  if (node.type === 'directory') {
    for (const child of node.children || []) enqueue(child, p);
  } else if (node.type === 'file') {
    queue.push({ fullPath: p, uid: node.uid });
  }
}

async function worker() {
  while (queue.length) {
    const job = queue.shift();
    const rel = job.fullPath.replace(/^src[\\/]/, '');
    const dest = path.join(outDir, rel);
    try {
      const data = await fetchFile(job.uid);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, data);
      downloaded++;
      if (downloaded % 20 === 0) console.log(`  …${downloaded} files`);
    } catch (err) {
      console.error(`  skip ${rel}: ${err.message}`);
      skipped++;
    }
  }
}

(async () => {
  console.log(`Fetching deployment tree ${deploymentId}`);
  const tree = await fetchJson(`${API}/v6/deployments/${deploymentId}/files?teamId=${teamId}`);
  for (const root of tree) enqueue(root, '');
  console.log(`Total files to fetch: ${queue.length}`);
  fs.mkdirSync(outDir, { recursive: true });

  const workers = Array.from({ length: 8 }, worker);
  await Promise.all(workers);

  console.log(`Done. ${downloaded} downloaded, ${skipped} skipped.`);
})();
