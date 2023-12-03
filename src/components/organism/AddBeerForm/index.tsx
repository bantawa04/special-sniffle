/* eslint-disable @typescript-eslint/no-explicit-any */
import {DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/atom/dialog";
import {Button, Input} from "@/components/atom";
import {Loader2} from "lucide-react";
import {Checkbox} from "@/components/atom/checkbox";
import {CheckedState} from "@radix-ui/react-checkbox";
import {BeerRequest} from "@/interface";
import {convertIngredientsToObject} from "@/lib/utils.ts";

interface IProps{
    mutate: any
    loading: boolean
    register:any
    handleSubmit:any
    setValue:any
    getValues:any
    errors:any
}


const AddBeerForm:React.FC<IProps> = ({mutate, loading, register, handleSubmit, setValue, getValues, errors}) => {

    const submitData = async (data:BeerRequest) => {

        const updatedData: BeerRequest = convertIngredientsToObject(data);
        mutate(updatedData)
    }


    const handleIngredients = (checked: CheckedState, ingredient: string) => {
        const currentValues = getValues("ingredients");

        if (checked && !currentValues.includes(ingredient)) {
            setValue("ingredients", [...currentValues, ingredient]);
        } else if (!checked) {
            const updatedValues = currentValues.filter(value => value !== ingredient);
            setValue("ingredients", updatedValues);
        }

    };

    return (
        <DialogContent className="sm:max-w-[640px]">
            <form onSubmit={handleSubmit(submitData)}>
                <DialogHeader>
                    <DialogTitle>Add new battery</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 items-baseline gap-4">
                        <label htmlFor="name" className="text-right">
                            Name
                        </label>
                        <div className="col-span-2">

                            <Input
                                id="name"
                                placeholder="Turborg"
                                className="col-span-3"
                                {...register("name")}
                                type="text"
                            />
                            {errors.name &&
                                <span className="text-sm font-medium text-destructive">{errors.name.message}.</span>
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="tagline" className="text-right">
                            Tagline
                        </label>
                        <div className="col-span-2">
                            <Input
                                id="tagline"
                                placeholder="Open for fun"
                                className="col-span-3"
                                type="text"
                                {...register("tagline")}
                            />
                            {errors.tagline &&
                                <span
                                    className="text-sm font-medium text-destructive">{errors.tagline.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="image_url" className="text-right">
                            Image url
                        </label>
                        <div className="col-span-2">
                            <Input
                                id="image_url"
                                placeholder="https://example.com/img.jpg"
                                className="col-span-3"
                                {...register("image_url")}
                            />
                            {errors.image_url &&
                                <span
                                    className="text-sm font-medium text-destructive">{errors.image_url.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <label htmlFor="description" className="text-right">
                            Description
                        </label>
                        <div className="col-span-2">
                            <Input
                                id="description"
                                placeholder="Description goes here"
                                className="col-span-3"
                                {...register("description")}
                            />
                            {errors.image_url &&
                                <span
                                    className="text-sm font-medium text-destructive">{errors?.description?.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-6 items-center gap-4">
                        <label htmlFor="hops" className="text-right col-span-2">
                            Ingredients
                        </label>
                        <div className="col-span-4 flex gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="hops"
                                    value="hops"
                                    onCheckedChange={(checked) => handleIngredients(checked, 'hops')}
                                />
                                <label
                                    htmlFor="hops"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Hops
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="malt"
                                    value="malt"
                                    onCheckedChange={(checked) => handleIngredients(checked, 'malt')}
                                />
                                <label
                                    htmlFor="malt"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Malt
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="wheat"
                                    value="wheat"
                                    onCheckedChange={(checked) => handleIngredients(checked, 'wheat')}
                                />
                                <label
                                    htmlFor="wheat"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Wheat
                                </label>
                            </div>

                        </div>
                        {errors.ingredients &&
                            <div
                                className="text-center text-sm font-medium text-destructive col-span-6">{errors?.ingredients?.message}</div>}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" disabled={loading}>
                        {loading ?
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null} Create</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
export {AddBeerForm}