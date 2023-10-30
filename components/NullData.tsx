interface NulldataProps{
    title: string;
}

const NullData:React.FC<NulldataProps> = ({title}) => {
 return (
    <div className="w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl">
        <p className="font-medium">{title}</p>
    </div>
 )
}

export default NullData;