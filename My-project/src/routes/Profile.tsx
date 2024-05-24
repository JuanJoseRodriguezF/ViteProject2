import NavLayout from "../layout/NavLayout";
import { useAuth } from "../auth/AuthProv";

export default function Profile() {
    const auth = useAuth();

    return <NavLayout>
        <h1>Perfil</h1><h2>Nombre: {auth.getUser()?.username ?? ""}</h2><h2>Email: {auth.getUser()?.email ?? ""}</h2>
    </NavLayout>;
}