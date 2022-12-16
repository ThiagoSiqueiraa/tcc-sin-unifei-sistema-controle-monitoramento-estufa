import { Typography } from "@mui/material"
import "./index.css"

const Placeholder = ({ content, onClick, children }) => {
    return (
        <div onClick={onClick} className="placeholder__content" style={{ width: "100%" }}>
            <Typography variant="button">
                {content}
            </Typography>
            {children}
        </div>
    )
}

export default Placeholder