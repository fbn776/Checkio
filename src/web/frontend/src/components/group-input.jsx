import {useEffect, useRef, useState} from "react"
import {Check, ChevronsUpDown, Plus} from "lucide-react"
import {useForm} from "react-hook-form";

import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {cn} from "@/lib/utils"
import {toast} from "sonner";
import {Button} from "@/components/ui/button.jsx";
import axios from "axios";


export default function GroupSelector() {
    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [selectedGroup, setSelectedGroup] = useState(null);
    const debounceRef = useRef()

    const form = useForm({
        defaultValues: {
            id: "",
        },
    })

    const fetchGroups = async (search) => {
        setLoading(true)
        try {
            const response = await axios.get('/api/group/', {
                params: {
                    keyword: search
                }
            });

            const data = response.data;
            setGroups(data)
        } catch (error) {
            console.error("Error fetching groups:", error)
            toast({
                title: "Error",
                description: "Failed to load groups. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    // Initial fetch
    useEffect(() => {
        fetchGroups()
    }, [])

    // Handle search with debounce
    const handleSearch = (value) => {
        setSearchValue(value)

        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            fetchGroups(value)
        }, 300)
    }

    const handleCreateGroup = async (data) => {
        if (!(/^[a-zA-Z0-9_]+$/.test(data.id))) {
            return toast.error("Group ID can only contain letters, numbers, and underscores")
        }

        try {
            const resp = await axios.post("/api/group/", {
                id: data.id
            });

            setGroups((prev) => [...prev, resp.data.data]);
            setSelectedGroup(resp.data.data);
            setDialogOpen(false);
            form.reset()

            toast.success("Group created successfully")
        } catch (error) {
            console.error("Error creating group:", error)
            toast.error(error instanceof Error ? error.message : "Failed to create group");
        }
    }

    // Check if search term matches any existing group
    const hasExactMatch = groups.some((group) => group.id.toLowerCase() === searchValue.toLowerCase())

    return (
        <div className="flex-1">
            <Popover open={open} onOpenChange={setOpen} className="w-full">
                <PopoverTrigger asChild className="w-full">
                    <button aria-expanded={open} className="w-full p-3 flex-1 flex items-center justify-between border bg-white border-gray-300 rounded-md px-4 py-2 focus:border-[#009be5] focus:outline-none mb-[8px]">
                        {selectedGroup ? selectedGroup.id : <span className="text-gray-500">Select a group...</span>}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Search groups..." value={searchValue} onValueChange={handleSearch}/>
                        <CommandList>
                            <CommandEmpty>
                                {loading ? (
                                    <p className="py-6 text-center text-sm">Loading groups...</p>
                                ) : (
                                    <div className="py-6 text-center text-sm">
                                        <p>No groups found.</p>
                                        {searchValue && !hasExactMatch && (
                                            <Button
                                                variant="outline"
                                                className="mt-2"
                                                onClick={() => {
                                                    setDialogOpen(true)
                                                    form.setValue("id", searchValue)
                                                    setOpen(false)
                                                }}
                                            >
                                                <Plus className="mr-2 h-4 w-4"/>
                                                Create &#34;{searchValue}&#34;
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </CommandEmpty>
                            <CommandGroup>
                                {groups.map((group) => (
                                    <CommandItem
                                        key={group.id}
                                        value={group.id}
                                        onSelect={() => {
                                            setSelectedGroup(group)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn("mr-2 h-4 w-4", selectedGroup?.id === group.id ? "opacity-100" : "opacity-0")}
                                        />
                                        {group.id}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={form.handleSubmit(handleCreateGroup)}>
                        <DialogHeader>
                            <DialogTitle>Create new group</DialogTitle>
                            <DialogDescription>Enter a name for the new group.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="id" className="text-right">
                                    Group ID
                                </label>
                                <Input id="id" className="col-span-3" {...form.register("id", {required: true})} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button className="cursor-pointer" type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="cursor-pointer">Create Group</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

