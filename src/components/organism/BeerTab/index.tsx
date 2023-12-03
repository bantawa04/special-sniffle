import {Button, Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/atom";
import {BeerList} from "@/components/molecule";
import {AddBeerForm} from "../AddBeerForm";
import {Dialog, DialogTrigger} from "@/components/atom/dialog";
import {Plus} from "lucide-react";
import {useEffect, useState} from "react";
import {MyBeers} from "@/components/molecule/MyBeers";
import {useInfiniteQuery, useMutation} from "@tanstack/react-query";
import { createBeer, getBeers } from "@/services";
import { updateLocalStorage } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {array, object, string} from "yup";


const schema = object({
    name: string().required("Name is required"),
    tagline: string().required("Tagline is required"),
    image_url: string().url().required("Image URL code is required"),
    description: string().required("Description is required"),
    ingredients: array().required("Ingredients is required.").min(1, "Ingredients must have at least 1 item"),
})

const BeerTab = () => {
    const [open, setOpen] = useState(false)
    const [beerData, setBeerData] = useState([]); 
    const initialValues = {
        name: "",
        tagline: "",
        image_url: "",
        description: "",
        ingredients: []
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        setValue,
        getValues

    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues
    })
    
    const {data: data, status, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ['getBeers'],
        queryFn: getBeers,
        initialPageParam: 1,
        getNextPageParam: (_, allPages)=> {
            return allPages.length + 1
        },
        retry: 1
    })

    const {isPending: loading, mutate, status:mutateStatus} = useMutation(
        {
            mutationFn: createBeer,
            onSuccess: (success) => {
                if (success.success) {
                    updateLocalStorage(success?.data);
                    setOpen(!open)
                    reset()
                }
            },
        }
    )
    useEffect(() => {
        const getLocalStorageData = () => {
            const storedDataString = localStorage.getItem('beerData');
            if (storedDataString) {
                const storedData = JSON.parse(storedDataString);
                setBeerData(storedData); 
            }
        };
    
        getLocalStorageData();
    }, []);

    useEffect(() => {
        if (mutateStatus === 'success') {
            const storedDataString = localStorage.getItem('beerData');
            if (storedDataString) {
                const storedData = JSON.parse(storedDataString);
                setBeerData(storedData);
            }
        }
    }, [mutateStatus]);
    return (
        <Tabs defaultValue="beers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#f4f4f5]">
                <TabsTrigger value="beers">Beers</TabsTrigger>
                <TabsTrigger value="my-beers">My Beers</TabsTrigger>
            </TabsList>
            <TabsContent value="beers">
                <BeerList data={data} status={status} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
            </TabsContent>
            <TabsContent value="my-beers">
                <div className="flex justify-end my-4">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="default" className="ml-4">
                                <Plus className="mr-2 h-4 w-4" color="#ffffff"/>
                                Add a new beer
                            </Button>
                        </DialogTrigger>
                        <AddBeerForm 
                            mutate={mutate}
                            loading={loading}
                            register={register}
                            handleSubmit={handleSubmit}
                            setValue={setValue}
                            getValues={getValues}
                            errors={errors}
                            />
                    </Dialog>
                </div>
                <MyBeers handleClick={(val) => setOpen(val)} isOpen={open} data={beerData}/>
            </TabsContent>
        </Tabs>
    )
}
export {BeerTab}