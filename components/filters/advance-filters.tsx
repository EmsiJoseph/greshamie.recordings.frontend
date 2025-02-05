import { ListFilter } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { ICallFilters } from "@/lib/interfaces/call-interface"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

interface AdvanceFiltersProps {
  title?: string
  description?: string
  register: UseFormRegister<FieldValues>
}

export const AdvanceFilters = ({
  title = "Advance Filters",
  description = "Filter your list by more specific criteria",
  register,


}: AdvanceFiltersProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><ListFilter /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Call type
            </Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select call type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
