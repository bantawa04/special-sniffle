import { Card } from "@/components/atom";
import { MyBeer } from "@/interface";


interface IProps{
    isOpen: boolean,
    handleClick: (val: boolean) => void;
    data: MyBeer[]
}
const MyBeers:React.FC<IProps> = ({isOpen, handleClick, data}) => {

    const content = data?.map((beer:MyBeer, index:number) => (
        <Card beer={beer} key={index} />
    ));

    return (
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            {data.length > 0 ? (
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-1 mb-10">
                    {content}
                </div>
            ) : (
                <div className="h-screen bg-zinc-100 flex flex-col items-center justify-center">
                    <p>Nothing to see yet.</p>
                    <p>
                        <a
                            onClick={() => handleClick(!isOpen)}
                            className="text-blue-500 cursor-pointer font-semibold"
                        >
                            Click here
                        </a>
                        to add a new beer
                    </p>
                </div>
            )}
        </div>
    );
};

export { MyBeers };
