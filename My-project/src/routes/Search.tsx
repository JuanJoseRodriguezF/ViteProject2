import NavLayout from "../layout/NavLayout";
export default function Profile() {
    return (
        <NavLayout>
            <h1>Busqueda:</h1>
            {/* <label>Por usuario</label> */}
            <input type="text" />
            <button>Search</button>
        </NavLayout>
    )
}