import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/chat/prompt-form'
import { RefreshCwIcon, StopCircle } from 'lucide-react'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RouterOutputs, api } from '@/utils/api'
import { Avatar } from '../ui/avatar'
import { useState } from 'react'
import { useInstructorStore } from '@/store/instructor-store'

type Instructor = RouterOutputs['instructor']['getInstructor'][number]
export interface ChatPanelProps
    extends Pick<
        UseChatHelpers,
        | 'append'
        | 'isLoading'
        | 'reload'
        | 'messages'
        | 'stop'
        | 'input'
        | 'setInput'
    > {
    id?: string
}


export function ChatPanel({
    id,
    isLoading,
    stop,
    append,
    reload,
    input,
    setInput,
    messages,
}: ChatPanelProps) {
    const { data: instructor } = api.instructor.getInstructor.useQuery()
    const instructorState = useInstructorStore(state => state.instructor)
    const selectInstructor = useInstructorStore(state => state.setInstructor)
    return (
        <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
            <ButtonScrollToBottom />
            <div className="mx-auto sm:max-w-2xl sm:px-4">
                <div className="flex h-10 mb-2 items-center justify-center gap-2">
                    {isLoading ? (
                        <Button
                            variant="outline"
                            onClick={() => stop()}
                            className="bg-background"
                        >
                            <StopCircle className='mr-2' />
                            Stop generating
                        </Button>
                    ) : (
                        messages?.length > 0 && (
                            <Button
                                variant="outline"
                                onClick={() => void reload()}
                                className="bg-background"
                            >
                                <RefreshCwIcon className='mr-2' />
                                Regenerate response
                            </Button>
                        )
                    )}

                    <Select onValueChange={
                        (value) => {
                            selectInstructor(value)
                        }
                    }
                        // set null if value empty string
                        value={instructorState || undefined}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Instructor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Instructor</SelectLabel>
                                {
                                    instructor?.map((instructor: Instructor) => (
                                        <SelectItem key={instructor.id} value={instructor.name}
                                        >{instructor.name}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
                    <PromptForm
                        onSubmit={async value => {
                            await append({
                                id,
                                content: value,
                                role: 'user'
                            })
                        }}
                        input={input}
                        setInput={setInput}
                        isLoading={isLoading}
                    />
                    {/* <FooterText className="hidden sm:block" /> */}
                </div>
            </div>
        </div>
    )
}
