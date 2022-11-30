import fs from 'fs'

import { OpenSearch } from './OpenSearch'

const fundsPath = '../funds.json'
const sectorsPath = '../funds_sectors.json'

const host = "localhost"
const protocol = "https"
const port = 9200
const auth = "admin:admin"

;(async () => {
  console.log('Opening funds...')
  const rawFunds = fs.readFileSync(fundsPath)
  const funds = JSON.parse(rawFunds.toString())

  console.log('Opening sectors...')
  const rawSectors = fs.readFileSync(sectorsPath)
  const sectors = JSON.parse(rawSectors.toString())

  const openSearch = new OpenSearch({
    auth: auth,
    host: host,
    port: port,
    protocol: protocol,
  })

  // console.log('Adding all funds to index...')

  // funds.forEach(async (fund: any) => await openSearch.addDocument('funds', fund))

  // console.log('Finished adding all funds to index...')

  console.log('Adding all sectors to index...')

  await openSearch.addDocument('sectors', sectors[0])

  // await openSearch.bulkCreateAtIndex('sectors', sectors)

  console.log('Finished adding all sectors to index...')
})()

