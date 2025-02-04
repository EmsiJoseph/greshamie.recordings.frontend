import { ListFilter } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { ICallFilters } from "@/lib/interfaces/call-interface"

interface AdvanceFiltersProps {
  onValueChange: () => void
}

export const AdvanceFilters = ({ onValueChange }: AdvanceFiltersProps) => {
  const [callType, setCallType] = useState<ICallFilters['callType']>()
  const [minDuration, setMinValue] = useState<ICallFilters['minDuration']>()
  const [maxDuration, setMaxValue] = useState<ICallFilters['maxDuration']>()
  const [minSize, setMinSize] = useState<ICallFilters['minSize']>()
  const [maxSize, setMaxSize] = useState<ICallFilters['maxSize']>()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><ListFilter /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Advance Filters</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
