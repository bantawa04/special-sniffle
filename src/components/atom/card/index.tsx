import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/atom/tooltip";
import { MyBeer } from "@/interface";
import {TooltipArrow} from "@radix-ui/react-tooltip";

interface IProps {
    beer: MyBeer
}

const Card: React.FC<IProps> = ({beer}) => {
    return (
        <div
            className="p-1 group sm:flex space-x-6 bg-white  shadow-xl cursor-pointer hover:bg-slate-100 transition-all">
            <div className="h-[120px] sm:h-full w-full sm:w-3/12 flex items-center justify-center">
                <Tooltip>
                    <TooltipTrigger>
                        <img
                            src={beer.image_url}
                            alt={beer.name}
                            className="max-h-[120px] md:max-h-[300px] w-auto"
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 text-white" side={"bottom"}>
                        {"Ingredients: "}
                        {Object.keys(beer.ingredients).map((ingredient, index, array) => (
                            <span key={index}>
                          {ingredient}
                                {index < array.length - 1 && ', '}
                        </span>
                        ))}
                        <TooltipArrow className="TooltipArrow" />
                    </TooltipContent>
                </Tooltip>

            </div>

            <div className="sm:w-9/12 pl-0 p-5">
                <div className="space-y-2">
                    <div className="space-y-4">
                        <h4 className="text-2xl font-semibold text-cyan-900">{beer.name}</h4>
                        <h4 className="text-lg font-semibold text-amber-500">{beer.tagline}</h4>
                        <p className="text-gray-600">{beer?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export {Card}