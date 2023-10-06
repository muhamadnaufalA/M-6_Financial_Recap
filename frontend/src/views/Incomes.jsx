import React from "react";
import { Link } from "react-router-dom";

export default function Incomes() {
    return (
        <div>
            <p>this is incomes pages</p>
            <Link to="/" className="underline">
                go to dashboard
            </Link>
        </div>
    )
}