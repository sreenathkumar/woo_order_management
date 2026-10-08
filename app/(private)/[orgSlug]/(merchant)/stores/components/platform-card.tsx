import { Check, Store } from "lucide-react";

interface PlatformCardProps {
    isSelected: boolean;
    platformName: string;
    description?: string;
}

function PlatformCard({ isSelected, platformName, description }: PlatformCardProps) {
    return <>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 pointer-events-none" />

        <div className="relative z-10 flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold transition-colors group-hover:text-primary ${isSelected ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-foreground'}`}>
                <Store className="w-6 h-6" />
            </div>
            <div className="flex-grow">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-foreground">{platformName}</h3>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-primary bg-primary text-white' : 'border-border bg-card'
                        }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                </div>
                {description && <p className="text-xs text-muted-foreground mt-1 max-w-3xs">{description}</p>}
            </div>
        </div>
    </>

}

export default PlatformCard