import axios from "axios";
import { mapearCampoES, fieldsPeople } from "../../utils/attributesTranslate";
import { responseApi } from "../../utils/response";
export const getPeopleSwapi = async (language = "en") => {
    try {
        const { data } = await axios.get("https://swapi.py4e.com/api/people/");
        console.log(data);
        const dataResponse = data.results;
        console.log(dataResponse);
        if (dataResponse.length === 0) {
            return responseApi(data, "No hay datos registrados.", 404);
        }
        if (language === "es") {
            const datResponseConverted = dataResponse.map((person) => {
                return {
                    ...mapearCampoES(fieldsPeople, person),
                };
            });
            return responseApi(datResponseConverted, "Lista de personajes obtenida correctamente.", 200);
        }
    }
    catch (error) {
        console.log({ error: error });
        return responseApi(null, "Hubo un problema al listrar los personajes.", 500, error);
    }
};
//# sourceMappingURL=getPeople.js.map