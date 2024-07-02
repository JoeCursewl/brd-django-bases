import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "react-router-native";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Shadow } from "react-native-shadow-2";

// Hooks and constants imported
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { ColorsButton } from "@/constants/ColorsButton";

// Importamos la función que maneja el register con toda la seguridad y devuelve dos objetos:
// { error, result } que nos permiten controlar si el registro ha sido exitoso o no.
import { thrRegisterUser } from "./services/thrRegister";

// Fecha actual del sistema importado desde las configuraciones
import { current_day, _role } from "@/config/config.brd";

// Esta es la importación dónde se crea el objeto para poder navegar
import { useNavigate } from "react-router-native";

export default function Register() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  // Manejo de errores y manejo de carga
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Objeto para manejar la navegación
  const navigate = useNavigate();

  // handleSumbitRegister es la función que se ejecuta cuando el usuario hace clic en el botón de inicio de sesión
  // y que maneja la lógica para poder iniciar sesión y crear la sesion con el JWT.
  const handleSumbitRegister = async () => {
    const { error, result } = await thrRegisterUser(
      name,
      lastname,
      email,
      password,
      passwordRepeat,
      current_day,
      _role,
      setLoading,
      setError
    );

    if (error) {
      alert(error);
    }
    
    if (result) {
      alert(result);
      navigate("/");
    }
  };

  return (
    <ScrollView>
      <ThemedView
        darkColor="#121212"
        lightColor="white"
        style={styleRegister.container}
      >
        <ThemedView style={styleRegister.containerAll}>
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
            <View style={styleRegister.logo}>
              <Image
                source={require("@/assets/images/logo-main.png")}
                style={{ width: 100, height: 100 }}
              />

              <Text style={{ fontSize: 14, color: Colors.dark.text }}>
                {error === false
                  ? "Registro de Usuarios"
                  : "Por favor, rellene todos los campos"}
              </Text>
            </View>

            <View style={{ gap: 15 }}>
              <View style={styleRegister.inputGroup}>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Image
                    source={require("@/assets/images/icon-name.png")}
                    style={{ width: 18, height: 18 }}
                  />
                  <ThemedText
                    style={
                      error === false
                        ? { fontSize: Colors.dark.letterSize }
                        : { fontSize: Colors.dark.letterSize, color: "#FF6B57" }
                    }
                  >
                    Nombre
                  </ThemedText>
                </View>

                <TextInput
                  style={
                    error === false
                      ? styleRegister.inputStyle
                      : styleRegister.inputStyleError
                  }
                  onChangeText={(text) => {
                    setName(text);
                    setError(false);
                  }}
                />
              </View>

              <View style={styleRegister.inputGroup}>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Image
                    source={require("@/assets/images/icon-name.png")}
                    style={{ width: 18, height: 18 }}
                  />
                  <ThemedText
                    style={
                      error === false
                        ? { fontSize: Colors.dark.letterSize }
                        : { fontSize: Colors.dark.letterSize, color: "#FF6B57" }
                    }
                  >
                    Apellido
                  </ThemedText>
                </View>

                <TextInput
                  style={
                    error === false
                      ? styleRegister.inputStyle
                      : styleRegister.inputStyleError
                  }
                  onChangeText={(text) => {
                    setLastname(text);
                    setError(false);
                  }}
                />
              </View>

              <View style={styleRegister.inputGroup}>
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
                      ? styleRegister.inputStyle
                      : styleRegister.inputStyleError
                  }
                  onChangeText={(text) => {
                    setEmail(text);
                    setError(false);
                  }}
                />
              </View>

              <View style={styleRegister.inputGroup}>
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
                      ? styleRegister.inputStyle
                      : styleRegister.inputStyleError
                  }
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError(false);
                  }}
                />
              </View>

              <View style={styleRegister.inputGroup}>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Image
                    source={require("@/assets/images/lock-password-2.png")}
                    style={{ width: 18, height: 18 }}
                  />
                  <ThemedText
                    style={
                      error === false
                        ? { fontSize: Colors.dark.letterSize }
                        : { fontSize: Colors.dark.letterSize, color: "#FF6B57" }
                    }
                  >
                    Repita su contraseña
                  </ThemedText>
                </View>

                <TextInput
                  style={
                    error === false
                      ? styleRegister.inputStyle
                      : styleRegister.inputStyleError
                  }
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    setError(false);
                    setPasswordRepeat(text);
                  }}
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              {loading !== true ?
                <TouchableHighlight
                  underlayColor={ColorsButton.secondary}
                  style={styleRegister.allButtons}
                  onPress={() => {
                    handleSumbitRegister();
                  }}
                >
                  <ThemedText style={{ color: Colors.dark.text, fontSize: 15 }}>
                    Registrarme
                  </ThemedText>
                </TouchableHighlight>
              : <ActivityIndicator color={ColorsButton.primary}/>}
            </View>

          </Shadow>
        </ThemedView>

        <View>
          <Text style={{ fontSize: 12, color: Colors.dark.textNotVisible }}>
            <Link to={"/"} underlayColor={"transparent"}>
              <View>
                <ThemedText
                  style={{ color: Colors.dark.textNotVisible, fontSize: 13 }}
                >
                  ¿Ya tienes una cuenta?{" "}
                  <Text style={{ color: ColorsButton.primary, fontSize: 13 }}>
                    Inicia sesión aquí
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

const styleRegister = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 20,
    width: "100%",
    backgroundColor: "#F2F4FE",
    paddingTop: 30,
    paddingBottom: 60,
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
