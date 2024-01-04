"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Search = () => {
    const [value, setValue] = useState("")
    const router = useRouter()

    const onSubmit = (e: React.FormEvent) =>{
        e.preventDefault()
        if (!value) return;
        router.push(`/search?q=${value}`);
    }

    return (
        <form
            onSubmit={onSubmit}
            className="relative w-full max-w-md flex items-center md:gap-2"
        >
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search"
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
            {value && (
                <X
                    className="absolute top-2.5 right-11 md:right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition" onClick={() => setValue("")}
                />
            )}
            <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="rounded-l-none"
            >
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </form>
    )
}

export default Search