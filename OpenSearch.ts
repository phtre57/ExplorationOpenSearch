import { Client } from '@opensearch-project/opensearch'

type IOpenSearch = {
  auth: string
  host: string
  protocol: string
  port: number
}

export class OpenSearch {
  auth: string
  host: string
  protocol: string
  port: number
  client: Client

  constructor({ auth, host, protocol, port }: IOpenSearch) {
    this.auth = auth
    this.host = host
    this.protocol = protocol
    this.port = port

    this.client = new Client({
      node: protocol + "://" + auth + "@" + host + ":" + port,
    });
  }

  addDocument(index: string, doc: Record<any, any>) {
    this.client.index({
      index: index,
      body: doc,
      refresh: true,
    })
  }

  search(index: string, query: Record<any, any>) {
    this.client.search({
      index: index,
      body: query,
    })
  }
}