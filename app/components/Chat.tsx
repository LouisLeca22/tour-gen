"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { generateChatResponse } from "@/utils/action"
import type { ChatCompletionMessageParam } from "openai/resources"

import toast from "react-hot-toast"
function Chat() {
    const [text, setText] = useState<string>('')
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])
    const { mutate, isPending } = useMutation({
        mutationFn: (query: ChatCompletionMessageParam) => generateChatResponse([...messages, query]),
        onSuccess: (data) => {
            if (!data) {
                toast.error("Un erreur s'est produite...")
                return
            }
            setMessages((prev) => [...prev, data])
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const query: ChatCompletionMessageParam = { role: "user", content: text }
        mutate(query)
        setMessages((prev) => [...prev, query])
        setText('')
    }

    return (
        <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr_auto]">
            <div>
                {messages.map((message, index) => {
                    const avatar = message.role == 'user' ? '👤' : '🤖';
                    const bcg = message.role == 'user' ? 'bg-base-200' : 'bg-base-100';
                    return (
                        <div
                            key={index}
                            className={` ${bcg} flex py-6 -mx-8 px-8
               text-xl leading-loose border-b border-base-300`}
                        >
                            <span className='mr-4 '>{avatar}</span>
                            {typeof message.content === "string" && <p className='max-w-3xl'>{message.content}</p>}
                        </div>
                    );
                })}
                {isPending && <span className='loading'></span>}
            </div>
            <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
                <div className="join w-full">
                    <input type="text" placeholder="Envoyer votre message" className="input input-bordered join-item w-full" value={text} required onChange={(e) => setText(e.target.value)} />
                    <button className="btn btn-primary join-item text-white" type="submit" disabled={isPending}>{isPending ? 'Patientez' : 'Posez votre question'}</button>
                </div>
            </form>
        </div>
    )
}
export default Chat