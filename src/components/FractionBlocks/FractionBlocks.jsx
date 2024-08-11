import './FractionBlocks.css'
import FractionBlock from '../FractionBlock/FractionBlock';

const FractionBlocks = () => {
    return (
        <div className="fraction-blocks">
            <FractionBlock denom={1} />
            <FractionBlock denom={2} />
            <FractionBlock denom={3} />
            <FractionBlock denom={4} />
        </div>
    )
}

export default FractionBlocks;