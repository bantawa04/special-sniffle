import {Button, Card} from "@/components/atom";
// import {getBeers} from "@/services";
// import {useInfiniteQuery} from "@tanstack/react-query";
import {Skeleton} from "@/components/atom/skeleton";
import {Loader2} from "lucide-react";
import {Beer} from "@/interface/Beer";

interface IProps {
    status: string
    data:any
    fetchNextPage: () => void 
    isFetchingNextPage:boolean
}
const BeerList:React.FC<IProps> = ({status, data, fetchNextPage, isFetchingNextPage}) => {

    // const {data: data, status, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    //     queryKey: ['getBeers'],
    //     queryFn: getBeers,
    //     initialPageParam: 1,
    //     getNextPageParam: (_, allPages)=> {
    //         return allPages.length + 1
    //     },
    //     retry: 1
    // })

    const content = data?.pages.map((data) => {
           return data.map((beer:Beer) =>{
               return <Card key={beer.id} beer={beer}/>
           })
    })

    if(status === 'pending') {
        return <div className="flex items-center space-x-4">
            <Skeleton className="h-40 w-40 "/>
            <div className="space-y-2">
                <Skeleton className="h-40 w-full"/>
                <Skeleton className="h-40 w-full"/>
            </div>
        </div>
    }
    if(status === 'error'){
        return  (
            <div className="flex justify-center items-center">
                <p>Error fetching data.</p>
            </div>
        )
    }
    return (
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-1 mb-10">
                {content}
            </div>
            <div className="flex justify-center items-center">
                <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {"Please wait"}
                        </>
                    ) : (
                        "Load more"
                    )}
                </Button>

            </div>
        </div>
    )
}
export {BeerList}