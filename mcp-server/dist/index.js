"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("zod");
const API_URL = process.env.API_URL || 'http://localhost:5151/api/product';
const server = new mcp_js_1.McpServer({
    name: 'webshop-mcp',
    version: '1.0.0'
});
server.tool('get_products', 'Lekéri az összes terméket a webshopból', {}, async () => {
    const response = await axios_1.default.get(API_URL);
    return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
    };
});
server.tool('search_products', 'Termékek keresése név alapján', { query: zod_1.z.string().describe('Keresési kifejezés') }, async ({ query }) => {
    const response = await axios_1.default.get(API_URL);
    const filtered = response.data.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    return {
        content: [{ type: 'text', text: JSON.stringify(filtered, null, 2) }]
    };
});
server.tool('get_category_stats', 'Statisztikák kategóriánként', {}, async () => {
    const response = await axios_1.default.get(API_URL);
    const stats = {};
    response.data.forEach((p) => {
        stats[p.category] = (stats[p.category] || 0) + 1;
    });
    return {
        content: [{ type: 'text', text: JSON.stringify(stats, null, 2) }]
    };
});
server.tool('get_low_stock', 'Alacsony készletű termékek listája', { threshold: zod_1.z.number().describe('Készlet limit').default(5) }, async ({ threshold }) => {
    const response = await axios_1.default.get(API_URL);
    const lowStock = response.data.filter((p) => p.stock <= threshold);
    return {
        content: [{ type: 'text', text: JSON.stringify(lowStock, null, 2) }]
    };
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error('Webshop MCP Server started!');
}
main().catch(console.error);
