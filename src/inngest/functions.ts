import { inngest } from "./client";
import { createAgent, gemini} from "@inngest/agent-kit"
import { Sandbox } from "@e2b/code-interpreter"
import { getSnadbox } from "./utils";

export const helloworld = inngest.createFunction(
    {id: "hello-world", triggers: {event: "test/hello.world"}},
    async ({event, step}) => {

        const sandBoxId = await step.run("get-sandbox-id", async () => {
            const sandbox = await Sandbox.create("bismaybibhabasu33/creator-nextjs-template")
            return sandbox.sandboxId
        })

        const aiAgent = createAgent({
            name: "AI Helper",
            system: "You are an expert ai agent helping user getting answer to his/her query accurately",
            model: gemini({model: "gemini-3.5-flash-lite"})
        })

        const {output} = await aiAgent.run(`answer the following query from the user: ${event.data.prompt}`)

        const sandboxUrl = await step.run("get-sandbox-url", async () => {
            const sandbox = await getSnadbox(sandBoxId);
            const host = sandbox.getHost(3000);
            return `https://${host}`
        })
        return {"ai-response": output, "sandbox_url": sandboxUrl}
    }
)