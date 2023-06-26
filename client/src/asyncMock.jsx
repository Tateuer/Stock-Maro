import ToyotaLogo from "./assets/ToyotaLogo.png";
import VolvoLogo from "./assets/VolvoLogo.png";
import GuidiLogo from "./assets/GuidiLogo.png";
import HondaLogo from "./assets/HondaLogo.png";
import TBALogo from "./assets/TBALogo.png";
import VolkswagenLogo from "./assets/VolkswagenLogo.png";
import MercedesBenzLogo from "./assets/Mercedes-BenzLogo.png";
import PeugeotLogo from "./assets/PeugeotLogo.png";

const clientes = [
    {
        id: "1",
        cliente: "Toyota",
        img: ToyotaLogo,
    },
    {
        id: "2",
        cliente: "Volvo",
        img: VolvoLogo,
    },
    {
        id: "3",
        cliente: "Industrias Guidi",
        img: GuidiLogo,
    },
    {
        id: "4",
        cliente: "Honda",
        img: HondaLogo,
    },
    {
        id: "5",
        cliente: "Toyota(Metalsa)",
        img: ToyotaLogo,
    },
    {
        id: "6",
        cliente: "TBA",
        img: TBALogo,
    },
    {
        id: "7",
        cliente: "Volkswagen",
        img: VolkswagenLogo,
    },
    {
        id: "8",
        cliente: "Mercedes-Benz",
        img: MercedesBenzLogo,
    },
    {
        id: "9",
        cliente: "Peugeot",
        img: PeugeotLogo,
    },
];

export const getClientes = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(clientes);
        }, 500);
    });
};
