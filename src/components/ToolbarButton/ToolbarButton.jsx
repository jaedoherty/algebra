import './ToolbarButton.css'

const ToolbarButton = (props) => {
    return <button className={`toolbar-button ${props.color}-button`}>{props.name}</button>
}

export default ToolbarButton;