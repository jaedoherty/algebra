import './FractionBlocks.css'
import FractionBlock from '../FractionBlock/FractionBlock';

const FractionBlocks = () => {
    return (
        <div className="fraction-blocks">
            <FractionBlock denom={1} />
            <FractionBlock denom={2} />
            <FractionBlock denom={3} />
            <FractionBlock denom={4} />
            <FractionBlock denom={5} />
            <FractionBlock denom={6} />
            <FractionBlock denom={7} />
            <FractionBlock denom={8} />
            <FractionBlock denom={9} />
            <FractionBlock denom={10} />
            <FractionBlock denom={12} />
        </div>
    )
}

export default FractionBlocks;