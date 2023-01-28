import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Popover from "react-bootstrap/Popover";


function SummaryForm() {
    const [checked, setChecked] = useState(false)
    
    return (
    <div>

        <input
        type="checkbox"
        id="termConditions"
        onChange={(e)=> setChecked(e.target.checked)}
        />
        <label htmlFor="termConditions">terms and conditions</label>

        <button
        disabled = {!checked}
        >
            Confirm Order
        </button>
    </div>
    )
}

export default SummaryForm