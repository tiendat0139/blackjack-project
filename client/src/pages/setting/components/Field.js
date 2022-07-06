import "../../../css/components/field.css"

export default function Field({ label, content }) {
    return (
        <div className="field">
            <div className="label">
                { label }
            </div>
            <div className="content">
                { content }
            </div>
        </div>
    )
}