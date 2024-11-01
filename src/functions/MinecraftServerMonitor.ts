import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function MinecraftServerMonitor(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const address = request.query.get('address') || 'localhost';
    const dark = request.query.get('dark') || 'true';
    const rounded = request.query.get('rounded') || 'true';
    const timeout = parseFloat(request.query.get('timeout') || '5.0');
    const backgroundColor = dark ? '#0E0E0E' : '#F1F1F1';

    return {
        headers: { "Content-Type": "text/html" },
        body: `<body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: ${backgroundColor};">
                <img src="https://api.mcstatus.io/v2/widget/java/${address}?dark=${dark}&rounded=${rounded}&timeout=${timeout}" alt="${address}" />
               </body>`
    };
};

app.http('MinecraftServerMonitor', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: MinecraftServerMonitor
});
