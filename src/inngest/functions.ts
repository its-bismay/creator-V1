import { inngest } from "./client";
import { createAgent, gemini} from "@inngest/agent-kit"

export const helloworld = inngest.createFunction(
    {id: "hello-world", triggers: {event: "test/hello.world"}},
    async ({event, step}) => {
        const aiAgent = createAgent({
            name: "AI Helper",
            system: "You are an expert ai agent helping user getting answer to his/her query accurately",
            model: gemini({model: "gemini-3.5-flash-lite"})
        })

        const {output} = await aiAgent.run(`answer the following query from the user: ${event.data.prompt}`)
        return {"ai-response": output}
    }
)