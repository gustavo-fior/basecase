import { invoke, initLogger, wrapTraced } from "braintrust";

initLogger({
  projectName: "basecasesh",
  apiKey: process.env.BRAINTRUST_API_KEY,
  asyncFlush: true,
});

export async function POST(req: Request) {
  const { username } = await req.json();
  const result = await handleRequest(username);
  return Response.json({ appropriate: result === 'true' });
}

const handleRequest = wrapTraced(async function handleRequest(username: string) {
  return await invoke({
    projectName: "basecasesh",
    slug: "validate-username",
    input: {
      username
    },
  });
});