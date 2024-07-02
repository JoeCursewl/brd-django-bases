import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Navigate } from "react-router-native";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import { Shadow } from "react-native-shadow-2";

// Hooks and constants imported
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { ColorsButton } from "@/constants/ColorsButton";
import { useGlobalState } from "../store/useGlobalState";

// Importamos de la config el objeto para crear la fechas
import { date, current_day } from "@/config/config.brd";

// Importamos la función para poder procesar el Inicio de Sesión
import { thrLogin } from "./services/thrLogin";

// Esta es la importación dónde se crea el objeto para poder navegar
import { useNavigate } from "react-router-native";
import { getAsyncStorage } from "../store/AsyncStorage/getAsyncStorage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Objeto para navegar entre rutas
  const navigate = useNavigate()

  // Estado global de la aplicación
  const { AuthTokenUser, setAuthTokenUser }: any = useGlobalState();

  // handleSumbitLogin es la función que se ejecuta cuando el usuario hace clic en el botón de inicio de sesión
  // y que maneja la lógica para poder iniciar sesión y crear la sesion con el JWT.
  const handleSumbitLogin = async () => {
    const { errorString, result } = await thrLogin(email, password, setLoading, setError, setAuthTokenUser);

    if (errorString) {
      Alert.alert('BRD | UE', errorString);
    }

    if (result) {
      Alert.alert('BRD | UE', `¡Bienvenido de nuevo!`);
      Navigate

      // Redirigimos al usuario a la pantalla de inicio de sesión
      navigate('/dashboard')
    }
  };

  if (AuthTokenUser) {
    return <Navigate to="/dashboard" />;
  }


  return (
    <ScrollView>
      <ThemedView
        darkColor="#121212"
        lightColor="white"
        style={styleLogin.container}
      >
        <ThemedView style={styleLogin.containerAll}>
          <Shadow
            style={{
              width: "100%",
              height: "100%",
              padding: 25,
              borderRadius: 15,
              gap: 25,
            }}
            distance={8}
            startColor="#ECE2FC"
          >
            <View style={styleLogin.logo}>
              <Image
                source={require("@/assets/images/logo-main.png")}
                style={{ width: 100, height: 100 }}
              />

              <Text style={{ fontSize: 14, color: Colors.dark.text }}>
                {error === false
                  ? "Iniciar Sesión"
                  : "Por favor, rellene todos los campos"}
              </Text>
            </View>

            <View style={{ gap: 15 }}>
              <View style={styleLogin.inputGroup}>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Image
                    source={require("@/assets/images/icon-email.png")}
                    style={{ width: 18, height: 18 }}
                  />
                  <ThemedText
                    style={
                      error === false
                        ? { fontSize: Colors.dark.letterSize }
                        : { fontSize: Colors.dark.letterSize, color: "#FF6B57" }
                    }
                  >
                    Correo Electrónico
                  </ThemedText>
                </View>

                <TextInput
                  style={
                    error === false
                      ? styleLogin.inputStyle
                      : styleLogin.inputStyleError
                  }
                  onChangeText={(text) => {
                    setEmail(text);
                    setError(false);
                  }}
                />
              </View>

              <View style={styleLogin.inputGroup}>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Image
                    source={require("@/assets/images/lock-password.png")}
                    style={{ width: 18, height: 18 }}
                  />
                  <ThemedText
                    style={
                      error === false
                        ? { fontSize: Colors.dark.letterSize }
                        : { fontSize: Colors.dark.letterSize, color: "#FF6B57" }
                    }
                  >
                    Contraseña
                  </ThemedText>
                </View>

                <TextInput
                  style={
                    error === false
                      ? styleLogin.inputStyle
                      : styleLogin.inputStyleError
                  }
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>

              {loading !== true ? 
                <TouchableHighlight
                  underlayColor={ColorsButton.secondary}
                  style={styleLogin.allButtons}
                  onPress={() => {
                    handleSumbitLogin();
                  }}
                >
                  <ThemedText style={{ color: Colors.dark.text, fontSize: 15 }}>
                    Iniciar Sesion
                  </ThemedText>
                </TouchableHighlight>
              : <ActivityIndicator color={ColorsButton.primary} />}

            </View>

          </Shadow>
        </ThemedView>

        <View>
          <Text style={{ fontSize: 12, color: Colors.dark.textNotVisible }}>
            <Link to={"/register"} underlayColor={"transparent"}>
              <View>
                <ThemedText
                  style={{ color: Colors.dark.textNotVisible, fontSize: 13 }}
                >
                  ¿No tienes cuenta?{" "}
                  <Text style={{ color: ColorsButton.primary, fontSize: 12 }}>
                    Regístrate aquí
                  </Text>
                </ThemedText>
              </View>
            </Link>
          </Text>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

export const styleLogin = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 20,
    width: "100%",
    backgroundColor: "#F2F4FE",
    paddingTop: 150,
    paddingBottom: 150,
  },
  containerAll: {
    // borderWidth: 0.4,
    //borderColor: "#B78BFA",
    backgroundColor: "transparent",
    padding: 20,
    height: "100%",
    width: "100%",
    borderRadius: 15,
    gap: 10,
    justifyContent: "center",
  },
  inputStyle: {
    borderWidth: 0.5,
    borderColor: "#B78BFA",
    padding: 10,
    height: 40,
    width: "100%",
    borderRadius: 10,
    color: "#A7B5FF",
  },
  inputStyleError: {
    borderWidth: 0.5,
    borderColor: "#FF6B57",
    padding: 10,
    height: 40,
    width: "100%",
    borderRadius: 10,
    color: "#A7B5FF",
  },
  inputGroup: {
    gap: 15,
  },
  allButtons: {
    borderWidth: 0.5,
    borderColor: ColorsButton.primary,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
