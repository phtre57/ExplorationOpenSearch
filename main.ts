import fs from 'fs'

import { OpenSearch } from './OpenSearch'

const dataPath = '../funds.json'

const host = "localhost"
const protocol = "https"
const port = 9200
const auth = "admin:admin"

console.log('Opening funds...')
const raw = fs.readFileSync(dataPath);
const funds = JSON.parse(raw.toString());

const openSearch = new OpenSearch({
  auth: auth,
  host: host,
  port: port,
  protocol: protocol,
})

console.log('Adding all funds to index...')

funds.forEach((fund: any) => openSearch.addDocument('funds', fund))

console.log('Finished adding all funds to index...')

