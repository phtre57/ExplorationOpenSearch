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
      node: `${protocol}://${auth}@${host}:${port}`,
      ssl: {
        rejectUnauthorized: false,
      }
    });
  }

  async addDocument(index: string, doc: Record<any, any>): Promise<any> {
    return await this.client.index({
      index: index,
      body: doc,
      refresh: true,
    })
  }

  async bulkCreateAtIndex(index: string, documents: any[]) {
    return await this.client.helpers.bulk({
      datasource: documents,
      onDocument: (document) => ({
        create: { _index: index },
      }),
      refreshOnCompletion: true,
    })
  }

  async search(index: string, query: Record<any, any>): Promise<any> {
    return await this.client.search({
      index: index,
      body: query,
    })
  }
}