import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import axios from 'axios';
import { z } from 'zod';

const API_URL = process.env.API_URL || 'http://localhost:5151/api/product';

const server = new McpServer({
  name: 'webshop-mcp',
  version: '1.0.0'
});

server.tool(
  'get_products',
  'Lekéri az összes terméket a webshopból',
  {},
  async () => {
    const response = await axios.get(API_URL);
    return {
      content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
    };
  }
);

server.tool(
  'search_products',
  'Termékek keresése név alapján',
  { query: z.string().describe('Keresési kifejezés') },
  async ({ query }) => {
    const response = await axios.get(API_URL);
    const filtered = response.data.filter((p: any) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    return {
      content: [{ type: 'text', text: JSON.stringify(filtered, null, 2) }]
    };
  }
);

server.tool(
  'get_category_stats',
  'Statisztikák kategóriánként',
  {},
  async () => {
    const response = await axios.get(API_URL);
    const stats: Record<string, number> = {};
    response.data.forEach((p: any) => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    return {
      content: [{ type: 'text', text: JSON.stringify(stats, null, 2) }]
    };
  }
);

server.tool(
  'get_low_stock',
  'Alacsony készletű termékek listája',
  { threshold: z.number().describe('Készlet limit').default(5) },
  async ({ threshold }) => {
    const response = await axios.get(API_URL);
    const lowStock = response.data.filter((p: any) => p.stock <= threshold);
    return {
      content: [{ type: 'text', text: JSON.stringify(lowStock, null, 2) }]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Webshop MCP Server started!');
}

main().catch(console.error);
