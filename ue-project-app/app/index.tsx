import { Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

// Importamos el componente que se encarga de proteger las rutas de la app
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";

// React Router native components here
import { NativeRouter, Routes, Route, Navigate } from "react-router-native";
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./dashboard/dashboard";
import GetStartedMain from "./get-started/get-started-main";
import MateriasRegister from "./materias/registro-materias";
import TemasRegister from "./temas/registro-temas";
import GetStartedProfesores from "./profesores/get-started-profesores";
import ListMaterias from "./materias/list-materias";
import DetailMaterias from "./materias/detail-materia";
import MateriasUpdate from "./materias/upodate-materias";
import ListContentMaterias from "./temas/list-content-materias";
import ListContent from "./temas/content-detail";
import DetailContent from "./temas/update-content";
import TemasUpdate from "./temas/edit-content";
import ListContentMateriasSavedUser from "./materias/list-materias-saved-user";

export default function Index() {
  return (
    <NativeRouter>
      <Routes>
        {/* Ruta principal de la app '/' que renderiza el componente del Login */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
          />

        {/* Ruta principal de la app '/' que renderiza el componente del Login */}
        
        {/* Apartado del get Started y demás procesos de la app */}

        <Route
          path="/get-started"
          element={
            <ProtectedRoutes>
              <GetStartedMain />
            </ProtectedRoutes>
          }
          />

        <Route
          path="/info-profesores"
          element={
            <ProtectedRoutes>
              <GetStartedProfesores />
            </ProtectedRoutes>
          }
        />
      
      {/* Apartado del get Started y demás procesos de la app */}

      {/* Rutas para manejar la información	de materias y temas */}

        <Route
          path="/register-materias"
          element={
            <ProtectedRoutes>
              <MateriasRegister />
            </ProtectedRoutes>
          }
          />

        <Route
          path="/register-temas"
          element={
            <ProtectedRoutes>
              <TemasRegister />
            </ProtectedRoutes>
          }
          />

        <Route
          path="/list-materias"
          element={
            <ProtectedRoutes>
              <ListMaterias />
            </ProtectedRoutes>
          }
          />

        <Route
          path="/list-content-materias"
          element={
            <ProtectedRoutes>
              <ListContentMaterias />
            </ProtectedRoutes>
          }
          />

          <Route
          path="/materias/:_id_materia/details"
          element={
            <ProtectedRoutes>
              <DetailMaterias />
            </ProtectedRoutes>
          }
          />

        <Route
          path="/materias/:id_materia/edit"
          element={
            <ProtectedRoutes>
              <MateriasUpdate />
            </ProtectedRoutes>
          }
          /> 


        <Route
          path="/materias/:id_materia/content"
          element={
            <ProtectedRoutes>
              <ListContent />
            </ProtectedRoutes>
          }
          /> 

        <Route
          path="/materias/:id/content/details"
          element={
            <ProtectedRoutes>
              <DetailContent />
            </ProtectedRoutes>
          }
          /> 

        <Route
          path="/materias/:id/content/details/edit"
          element={
            <ProtectedRoutes>
              <TemasUpdate />
            </ProtectedRoutes>
          }
          />

        <Route
          path="/materias/saved"
          element={
            <ProtectedRoutes>
              <ListContentMateriasSavedUser />
            </ProtectedRoutes>
          }
          />  
  

        {/* Rutas para manejar la información	de materias y temas */}

        <Route path="*" element={<Navigate to="/dashboard" replace={true} />} />
      </Routes>
    </NativeRouter>
  );
}
