import { useRoutes } from "react-router-dom/dist"
import { Formulario } from "./src/components/Formulario.jsx";

const routes = useRoutes([
    {path: '/Formulario', element: <Formulario/>}
]);

export default routes