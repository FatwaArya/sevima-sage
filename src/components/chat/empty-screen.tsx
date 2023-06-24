import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
    {
        heading: 'Explain technical concepts',
        message: `What is a "serverless function"?`
    },
    {
        heading: 'Summarize an article',
        message: 'Summarize the following article for a 2nd grader: \n'
    },
    {
        heading: 'Draft an email',
        message: `Draft an email to my boss about the following: \n`
    }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="rounded-lg border bg-background p-8">
                <h1 className="mb-2 text-lg font-semibold">
                    Welcome to Sage Inc AI Chatbot!
                </h1>
                <p className="mb-2 leading-normal text-muted-foreground">
                    Ask our Instructor to help you with your questions.
                </p>
                <p className="leading-normal text-muted-foreground">
                    You can start a conversation here or try the following examples:
                </p>
                <div className="mt-4 flex flex-col items-start space-y-2">
                    {exampleMessages.map((message, index) => (
                        <Button
                            key={index}
                            variant="link"
                            className="h-auto p-0 text-base"
                            onClick={() => setInput(message.message)}
                        >
                            <ArrowRight className="mr-2 text-muted-foreground" />
                            {message.heading}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}