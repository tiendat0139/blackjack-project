import "../../css/field.css"

export default function Field({ label, content }) {
    return (
        <div className="field">
            <div className="field-label">
                { label }
            </div>
            <div className="content">
                { content }
            </div>
        </div>
    )
}