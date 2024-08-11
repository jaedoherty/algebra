import ToolbarButton from '../ToolbarButton/ToolbarButton'

import './Toolbar.css'

const Toolbar = (props) => {
    return (
        <menu className='toolbar'>
            <li>
                <ToolbarButton name="Fraction Blocks" color="blue" />
            </li>
            <li>
                <ToolbarButton name="Toggle Grid" color="green" />
            </li>
            <li>
                <ToolbarButton name="Algebra Blocks" color="red" />
            </li>
            <li>
                <ToolbarButton name="Test Button" color="yellow" />
            </li>
        </menu>
    )
}

export default Toolbar;