import './index.css'
import { BeerTab} from "@/components/organism";
function App() {
    return (
        <main className={"flex min-h-screen flex-col"}>
            <div className="flex-1">
                <div className="container relative">
                    <h1 className="text-4xl font-bold tracking-tight my-4">Beers</h1>
                    <BeerTab/>
                </div>
            </div>
        </main>
    )
}

export default App
